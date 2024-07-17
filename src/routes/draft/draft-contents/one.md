---
title: RE-Implementing And Understanding NeRF
date: '2024-12-21T17:50:26.323Z'
---

### **Introduction**

Neural Radiance Fields (NeRF), introduced in the paper [_"NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"_][nerf-paper] by Mildenhall et al., offers a groundbreaking approach for representing volumetric fields and 3D scenes. By leveraging the power of deep neural networks and differentiable volume rendering, NeRF can synthesize photo-realistic views of complex scenes from a sparse set of input images.

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

[nerf-paper]: https://google.com