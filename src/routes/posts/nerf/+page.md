<style lang="scss">
  @charset "UTF-8";
  @use 'sass:math';
  @use '../covariance/variables.scss';

  hr {
    background: variables.$color-accent;
    height: 1px;
    border: 0;
  }

  /* Heading */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    // check imported weights and styles in gatsby-browser.jsx
    margin: variables.$spacing-12 0 variables.$spacing-6;
    line-height: variables.$line-height-tight;
  }

  h3,
  h4,
  h5,
  h6 {
    font-weight: variables.$font-weight-bold;
  }

  h1 {
    margin-top: 0;
    font-weight: variables.$font-weight-black;
    font-size: variables.$font-size-6;
  }

  h2 {
    font-size: variables.$font-size-5;
    font-weight: variables.$font-weight-semibold;
  }

  h3 {
    font-size: variables.$font-size-4;
  }

  h4 {
    font-size: variables.$font-size-3;
  }

  h5 {
    font-size: variables.$font-size-2;
  }

  h6 {
    font-size: variables.$font-size-1;
  }

  /* Prose */
  p {
    line-height: variables.$line-height-relaxed;
    $baseline-multiplier: 0.179;
    $x-height-multiplier: 0.35;
    margin: variables.$spacing-0 variables.$spacing-0 variables.$spacing-4 variables.$spacing-0;
    padding: variables.$spacing-0;
  }

  ul,
  ol {
    margin-left: variables.$spacing-0;
    margin-right: variables.$spacing-0;
    padding: variables.$spacing-0;
    margin-bottom: variables.$spacing-8;
    list-style-position: inside;
    list-style-type: disc;
  }

  li p {
    display: inline;
  }

  ul li,
  ol li {
    padding-left: variables.$spacing-8;
    margin-bottom: math.div(variables.$spacing-6, 2);
  }

  li > p {
    margin-bottom: math.div(variables.$spacing-8, 2);
  }

  li *:last-child {
    margin-bottom: variables.$spacing-0;
  }

  li > ul {
    margin-left: variables.$spacing-8;
    margin-top: math.div(variables.$spacing-8, 2);
  }

  blockquote {
    color: variables.$color-theme-4;
    margin-left: calc(#{-1 + variables.$spacing-6});
    margin-right: variables.$spacing-8;
    padding: variables.$spacing-0 variables.$spacing-0 variables.$spacing-0 variables.$spacing-6;
    border-left: variables.$spacing-1 solid variables.$color-primary;
    font-size: variables.$font-size-2;
    font-style: italic;
    margin-bottom: variables.$spacing-8;
  }

  blockquote > :last-child {
    margin-bottom: variables.$spacing-0;
  }

  blockquote > ul,
  blockquote > ol {
    list-style-position: inside;
  }

  table {
    width: 100%;
    margin-bottom: variables.$spacing-8;
    border-collapse: collapse;
    border-spacing: 0.25rem;
  }

  table thead tr th {
    border-bottom: 1px solid variables.$color-accent;
  }

  /* Link */
  a {
    color: variables.$color-theme-4;
  }

  a,
  button {
    // browser will not anticipate double click so proceeds with action quicker (300 ms quicker)
    touch-action: manipulation;
  }

  button:focus,
  button:hover {
    cursor: pointer;
  }

  h1 > a {
    color: inherit;
    text-decoration: none;
  }
  h2 > a,
  h3 > a,
  h4 > a,
  h5 > a,
  h6 > a {
    text-decoration: none;
    color: inherit;
  }

  a:hover,
  a:focus {
    text-decoration: none;
  }

  figure {
    margin-bottom: variables.$spacing-6;
    padding-bottom: variables.$spacing-6;
  }

  figure figcaption {
    margin-top: variables.$spacing-2;
  }

  /* Media queries */
  @media (max-width: variables.$desktop-breakpoint) {
    h1 {
      font-size: variables.$mobile-font-size-6;
    }

    h2 {
      font-size: variables.$mobile-font-size-5;
    }

    h3 {
      font-size: variables.$mobile-font-size-4;
    }

    h4 {
      font-size: variables.$mobile-font-size-3;
    }

    h5 {
      font-size: variables.$mobile-font-size-2;
    }

    h6 {
      font-size: variables.$mobile-font-size-1;
    }

    blockquote {
      padding: variables.$spacing-0 variables.$spacing-0 variables.$spacing-0 variables.$spacing-4;
      margin-left: variables.$spacing-0;
    }
    ul,
    ol {
      list-style-position: inside;
    }
  }

  :global(pre.shiki) {
    padding: 15px;
    margin: variables.$spacing-0 variables.$spacing-0 variables.$spacing-4 variables.$spacing-0;
    @apply rounded-lg;
  }
</style>

<svelte:head>

  <title>Understanding NeRF</title>
</svelte:head>

<!--

based on tinynerf
paper ref
hirarical sampling

-->

# Understanding NeRF

### **Introduction**

Neural Radiance Fields (NeRF), introduced in the paper _"NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"_ by Mildenhall et al., offers a groundbreaking approach for representing volumetric fields and 3D scenes. By leveraging the power of deep neural networks and differentiable volume rendering, NeRF can synthesize photo-realistic views of complex scenes from a sparse set of input images.

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
from pathlib import Path

import torch
from torch import nn
import torch.nn.functional as F
import torchvision as tv

import numpy as np
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
\text{C}(\mathbf{r}) = \sum_{i=1}^{n}T_i(1 - \text{exp}(-\sigma_i\delta_i))\mathbf{c}_i \\
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

<!--

#### **Positional Encoding**

To model high-frequency details effectively, NeRF employs **positional encoding** of the input coordinates $\mathbf{x}$ and $\mathbf{d}$. Raw inputs are transformed into higher-dimensional representations using sinusoidal functions:

$$
\gamma(p) = \left(\sin(2^0 \pi p), \cos(2^0 \pi p), \ldots, \sin(2^{L-1} \pi p), \cos(2^{L-1} \pi p)\right)
$$

This encoding allows the neural network to capture fine details and complex variations in lighting and geometry, as highlighted in the NeRF paper.

---

#### **Optimization and Training**

The neural network $F_\theta$ is optimized to minimize the photometric loss between the rendered pixel values and the ground truth from input images:

$$
\mathcal{L} = \sum_{\mathbf{r} \in \mathcal{R}} \left\| \mathbf{C}(\mathbf{r}) - \mathbf{C}^\text{GT}(\mathbf{r}) \right\|_2^2
$$

Here, $\mathcal{R}$ is the set of rays corresponding to the input images, and $\mathbf{C}^\text{GT}(\mathbf{r})$ represents the true pixel color for each ray.

---


-->
