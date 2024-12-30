---
title: But What is Probability ?
date: '2024-12-20T00:00:00.000Z'
---

Here's a thought experiment: Imagine that you are talking a stroll in woods, and suddenly you hear a voice from far. It does sound like a wolf, but it could also be a dog. Or maybe it’s just the terrifying sound of otherwise harmless rustling water. _What is it ?_

In this situation, you do not just pick one answer, but instead your mind considers a range of possibilities, each having its own _probability_. This ability to consider and weigh possibilities is fundamental to how our brains function. It is not just a mathematical or made-up construct — it’s deeply embedded in how we perceive and navigate the world. We do not just see the world in a rigid yes-or-no framework; instead, we interpret, estimate, and weigh probabilities. Our thoughts are mostly intertwined with _likelihoods_ or _uncertainties_, constantly evaluating the odds of one possibility over another. Our brains instinctively measure how probable something is, even if we’re unaware of it. And, the outcomes also often lie on a spectrum of possibilities.

This probabilistic view is also the backbone of the incredible advancements in machine learning and artificial intelligence. Many AI systems rely on probability to make sense of uncertain data, draw inferences, and make decisions. Even recent breakthroughs, such as generative AI and large language models, depend on probabilistic principles to generate responses and predictions.

## The Probability Distribution

At its core, probability is about quantifying uncertainty, and that’s where probability distributions come into play. A probability distribution is a function or rule that tells us how probabilities are spread over the possible outcomes of a random event. Think of it as a map of uncertainty, showing where outcomes are likely to cluster and where they are more sparse. In a way, probability distributions work just like your brain considering a range of possibilities in a situation. Instead of guessing a single outcome, it assigns different likelihoods to all potential outcomes, creating a spectrum of possibilities

Probability distributions underly most of generative AI. Once an AI model has learned the probability distribution of a dataset—be it images, text, or audio—it can use this knowledge to sample new data points. Sampling involves selecting values based on the probabilities defined by the distribution, allowing the model to generate outputs that are statistically similar to the original data. For example, in generative adversarial networks (GANs) or diffusion models, the model learns to approximate the underlying distribution of the training data. Then, by _sampling_ from this distribution, it can generate new, realistic images or soundscapes. Similarly, language models like GPT understand the probability of words and sentences in a given context, enabling them to produce coherent and contextually relevant text.

### The Bayesian View of Probability

You might have learned about probability in high school in terms of fractions, such as 1/2 for getting heads after flipping a coin and 1/6 for getting a 4 after rolling a die. This approach is called the *frequentist view*, where probabilities are interpreted as the fractions of number of possible and total events. This approach does work for simple scenarios like rolling a die, but things can get complicated when continous and infinite events are involved.

To see this, consider that your weather app tells you that there is a $35$% chance that tomorrow will be snowfall. Now how can we apply the frequentist view here? We do intuitively understand this $35$% percent chance of snowfall, but there is no way we can fit this into a fraction involving something like number of possible and/or total events.

Anyway, here we will start fresh with the *Bayesian view* of probability.

Suppose that we have a set of $N$ possible outcomes $\{ s_1, \dots, s_N \}$ to which we assign probabilities $\{ p_1, \dots, p_N \}$. Each of these probabilities $p_i$ is a number between 0 and 1, and is a **measure of belief** or **confidence** about the outcome $E_i$ happening. Like in the above example, when we say that there is a $35$% chance that tomorrow will be snowfall, it means that the the outcome of snow falling tomorrow has been **assigned** the probability or **degree of belief** of $0.35$. Note that there is no indication of fractions or repeated experiments whatsoever in this approach.

Now this interpretation does look very general, it is still constrained by some rules. First of all the sum of probabilities two events represents the probability of atleast one of them happening:

$$
p(A \thickspace \text{or} \thickspace B) = p(A) + p(B)
$$

Additionally, the sum of probabilities over all possible outcomes must sum to $1$:

$$
\sum_{s} p(s) = 1
$$

In case of a continous set of events, like heights of people, the probabilites must integrate to $1$:

$$
\int_{s} p(s) = 1
$$

Now this assignment of probabilities to events is what's called a _probability distribution_. It is a function $p(e)$ that maps an event to its assigned probability.

### Designing Probability Distributions

Because all probabilities must add up to $1$, we cannot just assign or manipulate the probability of one event independently of other events. We must talk about the probability distribution of the entire set of events, rather than considering only one event. A probability distribution characterizes the system _as a whole_, describing all the information and uncertainty present in all of its events.

We can see some examples of probability distributions, for example the **Uniform Distribution**, where all the events are equally likely to happen. The distribution of a fair 6 sided die is such uniform distribution. Each of the six sides has the same probability $1/6$.

One other example of a continuous probability distribution might be the distribution of heights of a large group of people. It usually follows the [**Gaussian Distribution**](https://en.wikipedia.org/wiki/Normal_distribution), which is widely used to model real-world.

### Interacting with Probability Distributions - Sampling

Machine learning models often interact with probability distributions in high-dimensional spaces, sometimes involving thousands or even millions of features. These models learn the underlying distribution of the input data by capturing the relationships and patterns that define how the data behaves. Now once the model has learned the probability distribution, it can **sample** from it to generate new data that shares the same characteristics as the training data.

To understand the concept of sampling in a simpler context, consider rolling a fair six-sided die. Everytime the die is rolled, it generate a new _sample_ according to the probabilities assigned by the distribution. You can keep rolling the die, and you will get different results at random. This is called **sampling**. It means selecting an outcome according to this probability distribution. The distribution in this case is uniform, where each outcome is equally likely with probability of $1/6$.

However the distribution is not always uniform. To understand this, consider an **unfair** coin that is biased towards tails. It follows a distribution where flipping a tails has a probability of $0.9$, while that of flipping a heads is only $0.1$. Now when we sample from this distribution, most of the times we expect to see that the outcome is tails instead of heads.

## Analysis of Probability Distributions

Now that the foundational stuff is cleared up, we can start exploring some mathematical tools to study and understand probability distributions.

### Entopy

Let's start with the notion of _surprise_. Suppose you are about to flip the unfair coin as described above, and somebody comes up to you and predicts that the outcome will be tails. You say, "Well, ahm" and go ahead and flip the coin. Now, the coin does flip to a tail, hence the prediction did hold true. _Would you be surprised or not_ ? You knew that the tails was much more likely to happen anyway, and thus the occurance of tails must not have surprised you that much