---
title: Implementing And Understanding NeRF
date: '2024-12-21T17:50:26.323Z'
---

### **Introduction**

Neural Radiance Fields (NeRF), introduced in the paper ["NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"][nerf-paper] by Mildenhall et al., offers a groundbreaking approach for representing volumetric fields and 3D scenes. By leveraging the power of deep neural networks and differentiable volume rendering, NeRF can synthesize photo-realistic views of complex scenes from a sparse set of input images.

Unlike traditional methods, NeRF encodes scene geometry and appearance into a continuous 5D function parameterized by a neural network. This function takes as input a 3D spatial point and a viewing direction and outputs color ($RGB$) and volume density values. This formulation allows NeRF to model intricate lighting effects, occlusions, and detailed textures.

### **What Are Neural Radiance Fields?**

At its core, a Neural Radiance Field (NeRF) is a neural network that models the radiance emitted by a scene at every point in 3D space, along every possible viewing direction. Formally, it can be described as a function:

$$
F_\theta(\mathbf{x}, \mathbf{d}) \to (\mathbf{c}, \sigma)
$$

where:

- $\mathbf{x} = (x, y, z)$ is the 3D spatial coordinate of the point.
- $\mathbf{d} = (\theta, \phi)$ represents the viewing direction, parameterized in spherical coordinates.
- $\mathbf{c} = (r, g, b)$ is the RGB color at the given point.
- $\sigma$ is the volume density (a measure of opacity or likelihood of light being scattered or absorbed).
- $F_\theta$ is the neural network, parameterized by $\theta$, which is optimized during training.

Ray are marched through the scene (starting from the camera), and this neural network is evaluated on multiple _query points_ alongs these rays. Finally the color and density information at these query points for each ray are combined into a single color which is the final output color of the ray. Colors from all such rays are used to make up the final 2D rendered image.

## **Implementing NeRF**

Below is a step by step implementation of NeRF, in Python and PyTorch. Throughout the code, assume the following imports are available throughout.

```py
import torch
from torch import nn
import torch.nn.functional as F
import matplotlib.pyplot as plt
```

#### Let's start

Given a camera pose (position and viewing direction), the first thing we do is march a bundle of rays from the camera through every pixel of the image plane. The image plane is a plane placed in front of the camera where the final render of the 3D scene will be drawn. Think of it as a canvas where the final rendered scene will be drawn.

Before moving on, let's clear up what a _camera pose_ even is. A camera pose is a $4 \times 4$ transformation matrix defining a transformation from camera-space to world-space.

$$
\text{Pose} = T_{\text{cam-to-world}} = \begin{bmatrix}
R_{00} & R_{01} & R_{02} & T_x \\
R_{10} & R_{11} & R_{12} & T_y \\
R_{20} & R_{21} & R_{22} & T_z \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

where the top $3 \times 3$ sub-matix represents the rotation of the camera, while the last column contains the translation $[T_x, T_y, T_z]$ of the camera.

The first step will be to create a bundle of rays (origins and directions) passing through each pixel of the image.

```py
def nf_get_ray_bundle(
    height: int,
    width: int,
    focal_length: torch.Tensor,
    pose: torch.Tensor
):
    points_x, points_y = torch.meshgrid(
        torch.arange(width),
        torch.arange(height),
        indexing='xy'
    )

    points_x = (points_x - width / 2.0) / focal_length
    # Note the -ve here, y in grid increases downwards while
    # y in NDC increases upwards
    points_y = -(points_y - height / 2.0) / focal_length
    # Camera faces the -ve Z direction in NDC
    points_z = -torch.ones_like(points_x)

    ray_dirs = torch.stack(
        (
            points_x,
            points_y,
            points_z,
        ),
        dim=-1
    )

    transform_rot = pose[:3, :3]
    ray_dirs = ray_dirs @ transform_rot.T

    ray_origins = pose[:3, -1].expand(ray_dirs.shape)

    return ray_origins, ray_dirs

```

Now we have a set of $H \times W$ rays passing through each pixel. The next step is to create a set of query points along each rays. The following function does just that.

```py
def nf_create_query_points(
    # (H, W, 3)
    ray_origins: torch.Tensor,
    # (H, W, 3)
    ray_dirs: torch.Tensor,
    thresh_near: float,
    thresh_far: float,
    num_samples_per_ray: int,
):
    # (N,)
    depths = torch.linspace(thresh_near, thresh_far, num_samples_per_ray)

    # (H, W, N, 3)
    query_points = (
        ray_origins[..., None, :]
        + ray_dirs[..., None, :] * depths[:, None]
    )

    #      (H, W, N, 3)  (*, N)
    return query_points, depths
```

Recall that the neural network's output should be 4 values representing the color $(R, G, B)$ and the volume density $\sigma$ at the given query point. We will create the model later on, but for now assume that the `model` variable is, well, the NeRF model. It will take the query point as well as it's viewing direction (which is just the position of the camera) concatenated together into a 6-tuple (3 for position and 3 for viewing direction). We can then evaluate this model on the query points created and returned by this function above as follows.

```py
def nf_render_pose(
    height: int,
    width: int,
    # This will input tensor of shape (*, 6) and output
    # tensor of shape (*, 4)
    model: torch.nn.Module,
    focal_length: torch.Tensor,
    pose: torch.Tensor,
    thresh_near: int,
    thresh_far: int,
    num_samples_per_ray: int,
):

    # Create rays
    ray_origins, ray_dirs = nf_get_ray_bundle(
        height,
        width,
        focal_length,
        pose
    )

    # Create query points
    query_points, depths = nf_create_query_points(
        ray_origins,
        ray_dirs,
        thresh_near,
        thresh_far,
        num_samples_per_ray,
    )

    # (H*W*N, 3)
    flat_query_points = query_points.view(-1, 3)

    # (H, W, N, 3)
    viewdirs_origin = ray_dirs / torch.linalg.norm(ray_dirs, dim=-1)[..., None]
    viewdirs = viewdirs_origin[..., None, :].expand(query_points.shape)

    # (H*W*N, 3)
    flat_viewdirs = viewdirs.reshape(-1, 3)

    # (H*W*N, 6)
    flat_inputs = torch.cat([flat_query_points, flat_viewdirs], dim=-1)

    # (H*W*N, 4)
    flat_view_field = model(chunk)

    # (H, W, N, 4)
    view_field = flat_view_field.view(list(query_points.shape[:-1]) + [-1])

    # ....

    # (This function nf_render_view_field() will be implemented later)
    # (H, W, 3)
    return nf_render_view_field(view_field, depths)
```

All this (<small>_convoluted_</small>) piece of code does is create and evaluate the query points (along each ray) on the model to get their color and volume density values stored in the `view_field` variable.

#### Combining the Query Points

The paper presents the following equation to get the final accumulated color of a ray $\mathbf{r}$.

$$
\text{C}(\mathbf{r}) = \sum_{i=1}^{n}T_i(1 - \text{exp}(-\sigma_i\delta_i))\mathbf{c}_i
$$

where

$$
T_{i} = \text{exp}(-\sum_{j=i}^{i-1}\sigma_j\delta_j)
$$

and $\delta_i = t_{i+1} - t_{i}$ is the distance between consective query points $t_i$. This function reduces to traditional alpha compositing with alpha values $\alpha_i = 1 - \text{exp}(-\sigma_i\delta_i)$.

We will implement this rendering in the following `nf_render_view_field()` function.

```py
def cumprod_exclusive(tensor: torch.Tensor) -> torch.Tensor:
    cumprod = torch.cumprod(tensor, dim=-1)
    cumprod = torch.roll(cumprod, 1, dims=-1)
    cumprod[..., 0] = 1.
    return cumprod

def nf_render_view_field(
    # (H, W, N, 4)
    view_field: torch.Tensor,
    # (N,) or (H, W, N)
    depths: torch.Tensor,
):
    # (H, W, N, 3)
    rgb_field = view_field[..., :3]
    # (H, W, N)
    sigma_field = view_field[..., 3]

    # Sigmoid function is used as rgb color must be in the range [0, 1]
    rgb_field = F.sigmoid(rgb_field)
    # Similarly relu is used here as density is always positive
    sigma_field = F.relu(sigma_field)

    # (*, N - 1)
    deltas = depths[..., 1:] - depths[..., :-1]

    # (*, N)
    deltas = torch.cat(
        (
            # (*, N - 1)
            deltas,
            # (*, 1)
            torch.tensor([1e10]).expand(deltas[..., :1].shape)
        ),
        dim=-1
    )

    # (H, W, N)
    alpha = 1. - torch.exp(-sigma_field * deltas)
    # (H, W, N)
    weights = alpha * cumprod_exclusive(1. - alpha + 1e-10)

    # (H, W, N, 3)
    rgb_map_points = (
      # (H, W, N, 1)
      weights[..., None]
      *
      # (H, W, N, 3)
      rgb_field
    )

    # (H, W, 3)
    c_r = rgb_map_points.sum(dim=-2)

    return c_r
```

That the bulk of rendering part done. Now we will move to designing the actual neural network.

### Creating the Neural Network

The network will be simple MLP with position and view direction input and will output 4 values representing the $(R, G, B)$ color and the volume density $\sigma$ at the given position.

#### Positional Encoding

We can directly feed the query points and viewing directions into the neural network. However, as the paper suggest, it is beneficial to map the query points to a high-dimensional space before evaluation. NeRF employs **positional encoding** of the input coordinates $\mathbf{x}$ and $\mathbf{d}$. Raw inputs are transformed into higher-dimensional representations using sinusoidal functions.

The encoding maps a 3D coordinate into a $3 + 6L$-D coordinate, where $L$ is a configurable hyperparameter.

$$
\gamma(p) = \left(\sin(2^0 \pi p), \cos(2^0 \pi p), \ldots, \sin(2^{L-1} \pi p), \cos(2^{L-1} \pi p)\right)
$$

This function $\gamma(p)$ is applied separately to each of the three coordinate values.

Here is the code for that

```py
def positional_encoding(
    points: torch.Tensor,
    L: int=6,
):
    encoding = [points]

    freqs = 2.0 ** torch.linspace(0.0, L - 1, L)

    for freq in freqs:
        encoding.append(torch.sin(points * freq))
        encoding.append(torch.cos(points * freq))

    if len(encoding) == 1:
        return encoding[0]
    else:
        return torch.cat(encoding, dim=-1)
```

This encoding allows the neural network to capture fine details and complex variations in lighting and geometry, as highlighted in the NeRF paper.

Also, we will need a few more helper functions for the working of the network.

```py
embed_num_pos = 6
embed_num_dir = 6

def split_queries(
    self,
    # (B, 6)
    queries: torch.Tensor
):
    # (B, 3)
    points = queries[..., :3]
    # (B, 3)
    viewdirs = queries[..., 3:]

    x_pos = positional_encoding(points, embed_num_pos)
    x_dir = positional_encoding(viewdirs, embed_num_dir)

    return x_pos, x_dir

def embed_len_3d(L: int):
    return 3 + 6 * L
```

And finally, here is a simple network.

```py
class SimpleNeRF(nn.Module):
    def __init__(self):
        super().__init__()

        hidden_size = 128

        self.layers = nn.Sequential(
            # Layer 1: input (both pos and view dir)
            nn.Linear(
                embed_len_3d(embed_num_pos) + embed_len_3d(embed_num_dir),
                hidden_size
            ),
            nn.ReLU(),
            # Hidden layers
            torch.nn.Linear(hidden_size, hidden_size), nn.ReLU(),
            torch.nn.Linear(hidden_size, hidden_size), nn.ReLU(),
            # Output layer (colors + density)
            torch.nn.Linear(hidden_size, 4),
        )

    def forward(self, queries: torch.Tensor):
        x_pos, x_dir = split_queries(queries)
        x = torch.cat([x_pos, x_dir], dim=-1)
        return self.layers(x)
```

### Training the Neural Network

The neural network is optimized to minimize the MSE loss between the rendered pixel values and the ground truth from input images:

#### Loss Calculation

The loss function used in the paper is a simple mean squared error loss between the predicted color and the true color of each pixel of the image.

$$
\mathcal{L} = \sum_{\mathbf{r} \in \mathcal{R}} \left\| \mathbf{C}(\mathbf{r}) - \mathbf{C}^\text{GT}(\mathbf{r}) \right\|_2^2
$$

Here, $\mathcal{R}$ is the set of rays corresponding to the input images, and $\mathbf{C}^\text{GT}(\mathbf{r})$ represents the true pixel color for each ray.

#### Training Loop

We can use a standard pytorch training flow for training the network. I will not get into the details of the loading the training data, but on a high level, each training example is a pose along with it's ground truth rendered image.

```py
# Assume this is a list of (pose, image) tuples
train_dataset = ...

# Also assume that variables (like height and width, etc) are
# set appropriately

def predict(pose: torch.Tensor):
    return nf_render_pose(
        height,
        width,
        model,
        focal_length,
        pose=pose,
        thresh_near=2,
        thresh_far=6,
        num_samples_per_ray=32,
    )

# Create the model
model = SimpleNeRF()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

num_epochs = 16
for i in range(num_epochs):
    for target_pose, target_image in train_dataset:
        optimizer.zero_grad()

        image_predicted = predict(target_pose)
        loss = F.mse_loss(image_predicted, target_image)

        loss.backward()
        optimizer.step()
```

Once the training is complete, the network can be used to view the scene from any arbitrary position and viewing angle! You can do something like this

```py
# Generates a random pose on a sphere of given radius
def random_spherical_pose(radius=4):

    theta = (torch.rand(1) * torch.pi * 2).item()
    phi = (torch.rand(1) * torch.pi * 2).item()

    R_x = torch.tensor([[1, 0, 0],
                        [0, torch.cos(theta), -torch.sin(theta)],
                        [0, torch.sin(theta), torch.cos(theta)]])

    R_y = torch.tensor([[torch.cos(phi), 0, torch.sin(phi)],
                        [0, 1, 0],
                        [-torch.sin(phi), 0, torch.cos(phi)]])

    cam_rot = R_y @ R_x

    # Make the camera look towards the origin
    cam_backwards = cam_rot[:, -1]
    cam_pos = radius * cam_backwards

    pose = torch.eye(4)
    pose[:3, :3] = cam_rot
    pose[:3, -1] = cam_pos

    return pose

plt.imshow(predict(random_spherical_pose()).detach())
```

### Conclusion

Neural Radiance Fields (NeRF) does offer unprecedented quality and flexibility for reconstructing scenes from sparse image data. However, its computational demands and static scene assumption are some areas for improvement. Training a NeRF model is computationally intensive and often requirs hours or even days on powerful GPUs.

There are some interesting ideas that I haven't touched in this post, such as hierarchical sampling which optimizes NeRF’s efficiency, and converting the learned scene volume representation into 3D point cloud meshes — all of this perhaps for another post.

One thing to note is that the standard NeRF formulation assumes that the scene is static, making it unsuitable for dynamic environments where objects or lighting conditions change over time. Extensions like _Dynamic NeRF_ attempt to address this, but these approaches add complexity and often require significantly more data.

At the end, I recommend reading the original paper ["NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"][nerf-paper] by Mildenhall et al.


[nerf-paper]: <https://arxiv.org/abs/2003.08934>