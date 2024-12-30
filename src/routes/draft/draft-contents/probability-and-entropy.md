---
title: But What is Probability ?
date: '2024-12-20T00:00:00.000Z'
---

Here's a thought experiment: Imagine that you are talking a stroll in woods, and suddenly you hear a voice from far. It does sound like a wolf, but it could also be a dog. Or maybe it’s just the terrifying sound of otherwise harmless rustling water. _What is it ?_

In this situation, you do not just pick one answer, but instead your mind considers a range of possibilities, each having its own _probability_. This ability to consider and weigh possibilities is fundamental to how our brains function. It is not just a mathematical or made-up construct — it’s deeply embedded in how we perceive and navigate the world. We do not just see the world in a rigid yes-or-no framework; instead, we interpret, estimate, and weigh probabilities. Our thoughts are mostly intertwined with _likelihoods_ or _uncertainties_, constantly evaluating the odds of one possibility over another. Our brains instinctively measure how probable something is, even if we’re unaware of it. And, the outcomes also often lie on a spectrum of possibilities.

This probabilistic view is also the backbone of the incredible advancements in machine learning and artificial intelligence. Many AI systems rely on probability to make sense of uncertain data, draw inferences, and make decisions. Even recent breakthroughs, such as generative AI and large language models, depend on probabilistic principles to generate responses and predictions.

## The Probability Distribution

At its core, probability is about quantifying uncertainty, and that’s where probability distributions come into play. A probability distribution is a function or rule that tells us how probabilities are spread over the possible outcomes of a random event. Think of it as a map of uncertainty, showing where outcomes are likely to cluster and where they are more sparse. In a way, probability distributions work just like your brain considering a range of possibilities in a situation. Instead of guessing a single outcome, it assigns different likelihoods to all potential outcomes, creating a spectrum of possibilities

Probability distributions underly most of generative AI. Once an AI model has learned the probability distribution of a dataset—be it images, text, or audio—it can use this knowledge to sample new data points. Sampling involves selecting values based on the probabilities defined by the distribution, allowing the model to generate outputs that are statistically similar to the original data. For example, in generative adversarial networks (GANs) or diffusion models, the model learns to approximate the underlying distribution of the training data. Then, by sampling from this distribution, it can generate new, realistic images or soundscapes. Similarly, language models like GPT understand the probability of words and sentences in a given context, enabling them to produce coherent and contextually relevant text.

### The Bayesian View of Probability

You might have learned about probability in high school in terms of fractions, such as 1/2 for getting heads after flipping a coin and 1/6 for getting a 4 after rolling a die. This approach is called the *frequentist view*, where probabilities are interpreted as the fractions of number of possible and total events. However, this is just one view of probability. Here we will start fresh with the *Bayesian view* of probability.

Suppose that we have a set of $N$ possible states $\{ S_1, S_2, \dots, S_N \}$ to which we assign probabilities $\{ p_1, p_2, \dots, p_N \}$. Each of these probabilities $p_i$ is a number between 0 and 1, and is a **measure of belief** or **confidence** about the outcome $S_i$ happening.

