---
title: But What is Probability ?
date: '2024-01-25T00:00:00.000Z'
---

Here's a thought experiment: Imagine that you are talking a stroll in woods, and suddenly you hear a voice from far. It does sound like a wolf, but it could also be a dog. Or maybe it’s just the terrifying sound of otherwise harmless rustling water. _What is it ?_

In this situation, you do not just pick one answer, but instead your mind considers a range of possibilities, each having its own _probability_. This ability to consider and weigh possibilities is fundamental to how our brains function. It is not just a mathematical or made-up construct — it’s deeply embedded in how we perceive and navigate the world. We do not just see the world in a rigid yes-or-no framework; instead, we interpret, estimate, and weigh probabilities. Our thoughts are mostly intertwined with _likelihoods_ or _uncertainties_, constantly evaluating the odds of one possibility over another. Our brains instinctively measure how probable something is, even if we’re unaware of it. And, the outcomes also often lie on a spectrum of possibilities.

This probabilistic view is also the backbone of the incredible advancements in machine learning and artificial intelligence. Many AI systems rely on probability to make sense of uncertain data, draw inferences, and make decisions. Even recent breakthroughs, such as generative AI and large language models, depend on probabilistic principles to generate responses and predictions.

## The Probability Distribution

At its core, probability is about quantifying uncertainty, and that’s where probability distributions come into play. A probability distribution is a function or rule that tells us how probabilities are spread over the possible outcomes of a random event. Think of it as a map of uncertainty, showing where outcomes are likely to cluster and where they are more sparse. In a way, probability distributions work just like your brain considering a range of possibilities in a situation. Instead of guessing a single outcome, it assigns different likelihoods to all potential outcomes, creating a spectrum of possibilities

Probability distributions underly most of generative AI. Once an AI model has learned the probability distribution of a dataset—be it images, text, or audio—it can use this knowledge to sample new data points. Sampling involves selecting values based on the probabilities defined by the distribution, allowing the model to generate outputs that are statistically similar to the original data. For example, in generative adversarial networks (GANs) or diffusion models, the model learns to approximate the underlying distribution of the training data. Then, by _sampling_ from this distribution, it can generate new, realistic images or soundscapes. Similarly, language models like GPT understand the probability of words and sentences in a given context, enabling them to produce coherent and contextually relevant text.

### The Bayesian View of Probability

You might have learned about probability in high school in terms of fractions, such as 1/2 for getting heads after flipping a coin and 1/6 for getting a 4 after rolling a die. This approach is called the _frequentist view_, where probabilities are interpreted as the fractions of number of possible and total events. This approach does work for simple scenarios like rolling a die, but things can get complicated when continous and infinite events are involved.

To see this, consider that your weather app tells you that there is a $35$% chance that tomorrow will be snowfall. Now how can we apply the frequentist view here? We do intuitively understand this $35$% percent chance of snowfall, but there is no way we can fit this into a fraction involving something like number of possible and/or total events.

Anyway, here we will start fresh with the _Bayesian view_ of probability.

Suppose that we have a set of $N$ possible outcomes $\{ s_1, \dots, s_N \}$ to which we assign probabilities $\{ p_1, \dots, p_N \}$. Each of these probabilities $p_i$ is a number between 0 and 1, and is a **measure of belief** or **confidence** about the outcome $E_i$ happening. Like in the above example, when we say that there is a $35$% chance that tomorrow will be snowfall, it means that the the outcome of snow falling tomorrow has been **assigned** the probability or **degree of belief** of $0.35$. Note that there is no indication of fractions or repeated experiments whatsoever in this approach.

Now this interpretation does look very general, it is still constrained by some rules. First of all the sum of probabilities two events represents the probability of atleast one of them happening:

$$
p(A \thickspace \text{or} \thickspace B) = p(A) + p(B)
$$

Additionally, the sum of probabilities over all possible outcomes must sum to $1$:

$$
\sum_{s} p(s) = 1
$$

In case of a continous set of events, like heights of people, the probabilities must integrate to $1$:

$$
\int_{s} p(s) = 1
$$

Finally, the product of probabilities two (independent) events represents the probability of both of them happening:

$$
p(A \thickspace \text{and} \thickspace B) = p(A) \times p(B)
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

### Entropy

Let's start with the notion of _surprise_. Suppose you are about to flip the unfair coin as described above, and somebody comes up to you and predicts that the outcome will be tails. You say, "Well, ahm" and go ahead and flip the coin. Now, the coin does flip to a tail, hence the prediction did hold true. _Would you be surprised or not_? You knew that the tails was much more likely to happen anyway, and thus the occurance of tails must not have surprised you that much.

Now what if, instead of tails, the somebody comes up to you and predicts that the outcome will be _heads_, and sure enough, it does turn out to be a heads. What will be your level of surprisal this time? The outcome of heads was very unlikely to occur, yet it occured. _This must be surprising_.

Now suppose that the correct prediction of heads happened twice i.e the person predicted the heads again and the outcome was also head, again. This time you will be surprised twice as much you would have been if only one coin flip had been made.

Let's try to formulize this notion of surprise. We will represent the surprise of an event with a positive real number. Based on the above thinking, we can conclude some points about the surprise of an event:

- It assigns a positve number to the event.
- It is a function of probability of the event. Let's call it $H(p)$.
- It assigns large numbers (more surprise) to events with low probability (rare events), and small numbers (less surprise) to events with high probability (common events).
- The surprise of two events happening at the same time is the sum of their individual surprises, i.e:

  $H(p_A \times p_B) = H(p_A) + H(p_B)$

We can add some more rules based on above observations:

- An event with probability $1$ bears absolutely no surprise i.e $H(1) = 0$.
- An event with probability $0$ is so much surprising that we can assign a surprise of infinity to it i.e $H(0) = \infin$.

One function that satisfies all these conditions is the negative logarithm of $p$:

$$
H(p) = -\log(p) = \log \left( \frac{1}{p} \right)
$$

This surprise value is formally known as the _entropy_ or _information content_ of the event. The entropy $H(p)$ quantifies the amount of uncertainty packed in an event.

### Entropy of the Distribution

Now that we have the the entropy of a single event, we can calculate the average entropy of the entire distribution, by just taking the sum of entropies of all the possible events weighted by their probabilities

$$
H(P) = \sum_{s} p_s \log \left( \frac{1}{p_s} \right)
$$

This quantity is called the entropy of the distribution (as opposed of entropy of a single event). This tell you how much surprised you will be on average when observing outcomes from this probability distribution. In other words, this is the **inherent uncertainty** packed into a distribution.

### Cross Entropy

To compute the entropy, we need access to underlying probability distribution. But this is often not the case for real world data. When you observe the outcome of a random variable, we do not know its true distribution (which is often called the "ground truth" distribution). Instead we create an internal model of what the underlying probability distribution _should be_. This model (assuming it is correct) is then used to assign probabilistic and to analyze the behaviour of data. The true underlying distribution is hidden and, in most cases, too complex to be modeled realistically. So all we have are approximate models of it. Most of the times these approximations capture all we need for practical purposes.

As an example, the honest, true distribution of a fair die actually contains extra events such as landing on a corner, or getting eaten by a wolf, albeit with very small probabilities. But to model a fair die, we approximate its distribution as a uniform distribution that has only six events, all of which have equal probability of $1/6$.

But what if the true distribution and the modeled distribution are way too far apart ? Consider a coin that is modeled as a fair coin with equal probability for both heads and tails, but instead is actually a coin biased towards tails with probability $0.9$. In this case the difference between true distribution and its model is huge.

Suppose you go ahead and flip this coin 10 times, getting tails 10 times in a row. Under your assumed model, where the probability of getting a tail is $0.5$, the entropy of this range of outcomes is:

$$
10 \times H(0.5) = 10 \times \log (1/0.5) \approx 6.93
$$

However according to the coin's true distribution, the entropy is:

$$
10 \times H(0.9) = 10 \times \log (1/0.9) \approx 1.05
$$

As you can see, the surprise value your model predicts is much larger than its true value. This difference in entropy is only caused because of the wrong choice of the model we believed in. To solve this, we need some measure of "relative" entropy between two distributions to compare the true one to the predicted one, and this brings us to the idea of cross entropy...

Consider a ground truth distribution $P$, and a modeled distribution $Q$. The _cross entropy_ between $P$ and $Q$, denoted as $H(P,Q)$, is defined as:

$$
H(P, Q) = \sum_{s} p_s \log \left( \frac{1}{q_s} \right)
$$

Here, the individual event probabilities are taken from the modeled distribution $Q$, but the probability weights are taken from the true distribution $P$. This gives us the average surprised we will observe from a random variable coming from the true distribution $P$, while believing in the modeled distribution $Q$.

This surprise calculated from cross entropy can come from two sources. 1) Due to believing in the wrong model. In other words because of the huge difference between the true and modeled distribution, and 2) because of the inherent uncertainty (entropy) of the underly true distribution itself. When $P = Q$ i.e when we have an perfect model, the cross entropy is just equal to the entropy:

$$
H(P, P) = \sum_{s} p_s \log \left( \frac{1}{p_s} \right) = H(P)
$$

Another notable thing about cross entropy is that it is not commutative i.e

$$
H(P, Q) \ne H(Q, P)
$$

### Kullback–Leibler Divergence

If we take the "combined" uncertainty (cross entropy) of $P$ and $Q$, and subtract from it the inherent uncertainty (entropy) of the true distribution $P$, we will be left with uncertainty between these two distribution from the first source only (mentioned above) i.e extra uncertainty induced only due to believing in the wrong model $Q$. This is called the Kullback–Leibler Divergence (or KL-divergence for short) and is denoted as $D_{KL}(P \space \Vert \space Q)$.

$$
\begin{align*}
D_{KL}(P \space \Vert \space Q) &= H(P, Q) - H(P) \\
&= \sum_{s} p_s \log \left( \frac{p_s}{q_s} \right)
\end{align*}
$$

We can interpret this quantity as a "distance" between these two distributions, and this will tell us how far apart the distribution $Q$ is from $P$. When $P = Q$, the KL-divergence is zero as the "distance" between distribution is none.

$$
\begin{align*}
D_{KL}(P \space \Vert \space P) &= H(P, P) - H(P) \\
&= H(P) - H(P) \\
&= 0
\end{align*}
$$

KL divergence is foundational to many generative AI models, as it help these systems learn to approximate and sample from complex data distributions. By framing the generation process as sampling from some modeled distribution of data, and then minimizing the KL divergence between the model's learned distribution and the true data distribution, generative models can produce outputs that closely resemble real-world data. This is the heart of most generative AI models. When the model's distribution aligns well with the true data distribution, it can sample from this learned distribution to produce new, unseen examples that maintain the characteristics of the original data and this e.g is what allows generative AI to create lifelike images.

## Conclusion

Well, probability is much more than just a branch of mathematics. It’s the foundation upon which many models are built. Probability and probability distributions serves as a bridge between randomness and understanding, and as we saw above, it provides us with some really useful tools to quantify uncertainty and make informed decisions.
