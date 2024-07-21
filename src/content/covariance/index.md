---
title: Covariance and Correlation
date: '2019-04-16T00:00:00.000Z'
---

<script>
  import CovPositive from './cov-positive.png';
  import CovNegative from './cov-negative.png';
  import CovZero from './cov-zero.png';
</script>

Covariance and Correlation are key statistical measures which quantify the degree to which two variables change together. This concept forms the foundation of many advanced techniques, from portfolio optimization in finance to dimensionality reduction in machine learning.

## What is Covariance ?

Lets start with a formal definition. The covariance between two variables, $X$ and $Y$, is calculated using the following formula:

$$
\text{Cov}(X, Y) = \frac{1}{n}\sum_{i=1}^{n}(X_{i} - \bar{X})(Y_{i} - \bar{Y})
$$

where:
  - $X_{i}​$ and $Y_{i}$ are the individual observations of $X$ and $Y$, respectively.
  - $\bar{X}$ and $\bar{Y}$ are the means of $X$ and $Y$.
  - $n$ is the number of observations.

The formula essentially computes the average product of the deviations of $X$ and $Y$ from their respective means.

The sign and magnitude of covariance tell us about the direction and strength of the linear relationship between two variables:

- **Positive Covariance**: If the value is positive, $X$ and $Y$ tend to increase or decrease together. For instance, hours studied and test scores might have a positive covariance.

- **Negative Covariance**: If the value is negative, $X$ and $Y$ move in opposite directions. For example, as temperature increases, the number of hot drinks sold may decrease, resulting in negative covariance.

<div class="flex flex-col md:flex-row w-full max-w-full gap-6 mb-6">
  <div class="flex-1">
    <img class="w-full max-w-full" src={CovPositive}>
    <p class="text-center">Positive Covariance</p>
  </div>
  <div class="flex-1">
    <img class="w-full max-w-full" src={CovNegative}>
    <p class="text-center">Negative Covariance</p>
  </div>
</div>

- **Zero Covariance**: A value close to zero implies no linear relationship between $X$ and $Y$. However, it does not rule out non-linear relationships.

<div class="flex justify-center w-full max-w-full gap-6 mb-6">
  <div class="max-w-full md:max-w-[50%]">
    <img class="w-full max-w-full" src={CovZero}>
    <p class="text-center text-content3 !mt-2">Zero Covariance</p>
  </div>
</div>

## Correlation

While covariance helps quantify the relationship between two variables, it often raises an important question: How do we compare the relationships across different datasets or variables with varying units or scales? This is where correlation comes into play.

Correlation is a normalized version of covariance that measures the strength and direction of the linear relationship between two variables. It is calculated using the formula:

$$
\text{Corr}(X, Y) = \frac{\text{Cov}(X, Y)}{\sigma_{X}\sigma_{Y}}
$$

where:
  - $\text{Cov}(X, Y)$ is the covariance between $X$ and $Y$.
  - $\sigma_{X}$ and $\sigma_{Y}$ are the standard deviations of $X$ and $Y$, respectively.

Unlike covariance, correlation is dimensionless, meaning it has no units and ranges between $−1$ and $1$

  - $\text{Corr}(X, Y) = +1$: Perfect positive linear relationship.
  - $\text{Corr}(X, Y) = -1$: Perfect negative linear relationship.
  - $\text{Corr}(X, Y) \; = \; 0$: No linear relationship

Correlation is often preferred in practical applications because it allows for easy comparison of relationships across different datasets. The bounded range of correlation makes it easier to interpret For example, a correlation of $0.8$ immediately suggests a strong positive relationship.

## Probabilistic View

Covariance can also be understood in the context of random variables. Let $X$ and $Y$ be two random variables. Covariance in the probabilistic sense is defined as the expected value of the product of their deviations from their respective means:

$$
\text{Cov}(X, Y) = \mathbb{E}[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])]
$$

where:
  - $\mathbb{E}[X]$ and $\mathbb{E}[Y]$ are the expected values (means) of $X$ and $Y$.
  - The term $(X - \mathbb{E}[X])$ represents the deviation of $X$ from its mean, and similarly for $Y$.


We can derive an alternate formula for covariance. By expanding the definition using the distributive property, this expands to:

$$
\begin{align*}

\text{Cov}(X, Y) &= \mathbb{E}[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])] \\
  &= \mathbb{E}[XY - X\mathbb{E}[Y] - \mathbb{E}[X]Y + \mathbb{E}[X]\mathbb{E}[Y]] \\
  &= \mathbb{E}[XY] - \mathbb{E}[X\mathbb{E}[Y]] - \mathbb{E}[\mathbb{E}[X]Y] + \mathbb{E}[\mathbb{E}[X]\mathbb{E}[Y]] \\
  &= \mathbb{E}[XY] - \mathbb{E}[X]\mathbb{E}[Y] - \mathbb{E}[X]\mathbb{E}[Y] + \mathbb{E}[X]\mathbb{E}[Y] \\
  &= \mathbb{E}[XY] - \mathbb{E}[X]\mathbb{E}[Y]
\end{align*}
$$

This alternate formula is particularly useful because it simplifies the computation of covariance when $\mathbb{E}[XY]$ and the individual means are known.

#### **An Important Special Case: Covariance and Variance**

An interesting consequence of the covariance formula is when $X = Y$. In this case, covariance reduces to the variance of $X$:

$$
\text{Cov}(X, X) = \mathbb{E}[(X - \mathbb{E}[X])^2] = \text{Var}(X).
$$

This result highlights that variance is simply a measure of how a single variable varies with itself. It also reinforces the idea that covariance generalizes variance to pairs of variables.

#### **A few Key Insights**

1. **Symmetry**: Covariance is symmetric, meaning $\text{Cov}(X, Y) = \text{Cov}(Y, X)$.
2. **Linearity**: Covariance is linear with respect to each variable. For example, if $Z = aX$, then:
   $$
   \text{Cov}(Z, Y) = a \cdot \text{Cov}(X, Y).
   $$
3. **Independence and Covariance**: If $X$ and $Y$ are independent, their covariance is zero because $\mathbb{E}[XY] = \mathbb{E}[X]\mathbb{E}[Y]$.

---

### **The Covariance Matrix**

We can extend our understanding of covariance to datasets with multiple variables through a **covariance matrix**. The covariance matrix is a square, symmetric matrix that contains the covariances between all pairs of variables in a dataset. For a dataset with $p$ variables $X_{1},...,X_{p}$ , the covariance matrix $\mathbf{\Sigma}$ is defined as:

$$
\mathbf{\Sigma} =
\begin{bmatrix}
\text{Var}(X_1) & \text{Cov}(X_1, X_2) & \cdots & \text{Cov}(X_1, X_p) \\
\text{Cov}(X_2, X_1) & \text{Var}(X_2) & \cdots & \text{Cov}(X_2, X_p) \\
\vdots & \vdots & \ddots & \vdots \\
\text{Cov}(X_p, X_1) & \text{Cov}(X_p, X_2) & \cdots & \text{Var}(X_p)
\end{bmatrix}.
$$

Each entry $\mathbf{\Sigma}_{i,j}$ = $\text{Cov}(X_i, X_j)$ represents the covariance between the $i$-th and $j$-th variables, and the diagonal elements $\text{Var}(X_i)$ represent the variances of the individual variables.

The covariance matrix is symmetric because $\text{Cov}(X_i, X_j) = \text{Cov}(X_j, X_i)$.

#### **Computing the Covariance Matrix**

Given a dataset with $n$ observations and $p$ variables, let $\mathbf{X}$ represent the data matrix of dimensions $n \times p$, where each row corresponds to an observation, and each column corresponds to a variable.

1. **Mean-Center the Data**
   Subtract the mean of each variable from its respective column:
   $$
   \mathbf{X}_{\text{centered}} = \mathbf{X} - \mathbf{\bar{X}},
   $$
   where $\mathbf{\bar{X}}$ is the row vector of means of each column (variable).

2. **Compute the Covariance Matrix**
   The covariance matrix is given by:
   $$
   \mathbf{\Sigma} = \frac{1}{n-1} \mathbf{X}_{\text{centered}}^T \mathbf{X}_{\text{centered}}.
   $$

#### **An Example with Three Variables**

Consider a dataset with three variables: $X_1$ (study hours), $X_2$ (test scores), and $X_3$ (sleep hours). A possible covariance matrix might look like this:

$$
\mathbf{\Sigma} =
\begin{bmatrix}
4.0 & 2.5 & -1.0 \\
2.5 & 6.0 & -1.2 \\
-1.0 & -1.2 & 3.0
\end{bmatrix}.
$$

- The variances of $X_1$, $X_2$, and $X_3$ are on the diagonal: $4.0$, $6.0$, and $3.0$.
- The covariance between study hours and test scores is $2.5$, indicating a positive relationship.
- The covariance between study hours and sleep hours is $-1.0$, indicating an inverse relationship.


## **Common Misunderstandings**

Misinterpretations about covariance can lead to flawed analyses and incorrect conclusions. Let’s address and clarify some of the most common misconceptions about covariance.

#### **1. Covariance Indicates Causation**

**Misconception**: If two variables have a high covariance, one variable must cause changes in the other.

**Clarification**: Covariance measures how two variables move together, but it does not imply that one causes the other. The relationship between the variables could be:

  - **Direct Causation**: Changes in one variable directly influence the other.
  - **Indirect Relationship**: Both variables are influenced by a third factor. For example, ice cream sales and drowning incidents may have high covariance, but the real cause is temperature—both increase during hot weather.
  - **Spurious Relationship**: In some rare cases, the relationship may be coincidental or have no meaningful connection.

#### **2. High Covariance Always Implies a Strong Relationship**

**Misconception**: If the covariance value is large, the relationship between the variables must be strong.

**Clarification**: Covariance depends on the scale of the variables, which can make its value misleading. For instance:

  - If one variable is measured in millimeters and another in kilometers, the covariance value will be significantly inflated, even if the relationship is weak.
  - Conversely, small covariance values may still represent a strong relationship if the scales of the variables are small.

To overcome this limitation, correlation provides a scale-independent measure of the strength and direction of the relationship, and should be preferred. A high correlation (closer to $1$ or $-1$) is a better indicator of a strong linear relationship than high covariance.

#### **3. Covariance of Zero Means No Relationship**

**Misconception**: If the covariance between two variables is zero, the variables are completely unrelated.

**Clarification**: A covariance of zero indicates no linear relationship between the variables. However, it does not rule out other types of relationships, such as quadratic or other non-linear patterns. For example:
- In the relationship $Y = X^2$, the covariance between $X$ and $Y$ could be zero even though they are clearly related.


#### **4. Covariance Is Always Symmetric**

**Misconception**: Covariance is symmetric in every context.

**Clarification**: While covariance is symmetric mathematically ($\text{Cov}(X, Y) = \text{Cov}(Y, X)$), this symmetry does not imply that the roles of $X$ and $Y$ are interchangeable in practical contexts. For instance:

- **Weather Analysis:** The covariance between daily temperature ($X$) and electricity usage ($Y$) is symmetric. However, interpreting these covariances is context-dependent. A rise in temperature might cause higher electricity usage due to increased air conditioning demand. On the other hand, electricity usage does not directly influence temperature. The practical relevance of the covariance is asymmetric even though the numerical value is symmetric.

Thus practical context must be considered when interpreting symmetry in covariance.

## Conclusion

Covariance is a foundational concept in statistics that quantifies how two variables change together. Its applications span various fields, from understanding relationships in datasets to forming the basis for advanced techniques like Principal Component Analysis and multivariate modeling.