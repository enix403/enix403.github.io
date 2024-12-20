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