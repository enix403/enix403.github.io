<script>
  import { base } from "$app/paths";
  import {math, display} from 'mathlifier';

  import CovPositive from './cov-positive.png';
  import CovNegative from './cov-negative.png';
  import CovZero from './cov-zero.png';
</script>

<style lang="scss">
  @charset "UTF-8";
  @use 'sass:math';
  @use './variables.scss';

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

# Covariance and Correlation

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

- **Positive Covariance**: If the value is positive, $X$ and $Y$ tend to increase or decrease together. For instance, hours studied {base} and test scores might have a positive covariance.

- **Negative Covariance**: If the value is negative, $X$ and $Y$ move in opposite directions. For example, as temperature increases, the number of hot drinks sold may decrease, resulting in negative covariance.

<div class="flex w-full max-w-full gap-6 mb-6">
  <div class="flex-1">
    <img class="w-full max-w-full" src={CovPositive}>
    <p class="text-center text-content3 !mt-2">Positive Covariance</p>
  </div>
  <div class="flex-1">
    <img class="w-full max-w-full" src={CovNegative}>
    <p class="text-center text-content3 !mt-2">Negative Covariance</p>
  </div>
</div>

- **Zero Covariance**: A value close to zero implies no linear relationship between $X$ and $Y$. However, it does not rule out non-linear relationships.

<div class="flex justify-center w-full max-w-full gap-6 mb-6">
  <div class="max-w-[50%]">
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

Covariance is deeply rooted in the probabilistic framework, making it an essential concept in understanding the relationships between random variables. By examining covariance from a probabilistic perspective, we can uncover its connections to expected values, variance, and other fundamental ideas in statistics.

Let $X$ and $Y$ be two random variables. Covariance in the probabilistic sense is defined as the expected value of the product of their deviations from their respective means:

$$
\text{Cov}(X, Y) = \mathbb{E}[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])]
$$

where:
  - $\mathbb{E}[X]$ and $\mathbb{E}[Y]$ are the expected values (means) of $X$ and $Y$.
  - The term $(X - \mathbb{E}[X])$ represents the deviation of $X$ from its mean, and similarly for $Y$.


We can derive an alternate formula for covariance. By expanding the definition using the distributive property, this expands to:

$$
\begin{align}

\text{Cov}(X, Y) &= \mathbb{E}[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])] \\
  &= \mathbb{E}[XY - X\mathbb{E}[Y] - \mathbb{E}[X]Y + \mathbb{E}[X]\mathbb{E}[Y]] \\
  &= \mathbb{E}[XY] - \mathbb{E}[X\mathbb{E}[Y]] - \mathbb{E}[\mathbb{E}[X]Y] + \mathbb{E}[\mathbb{E}[X]\mathbb{E}[Y]] \\
  &= \mathbb{E}[XY] - \mathbb{E}[X]\mathbb{E}[Y] - \mathbb{E}[X]\mathbb{E}[Y] + \mathbb{E}[X]\mathbb{E}[Y] \\
  &= \mathbb{E}[XY] - \mathbb{E}[X]\mathbb{E}[Y]
\end{align}
$$

This alternate formula is particularly useful because it simplifies the computation of covariance when $\mathbb{E}[XY]$ and the individual means are known.

#### **An Important Special Case: Covariance and Variance**

A fascinating consequence of the covariance formula is when $X = Y$. In this case, covariance reduces to the variance of $X$:

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
