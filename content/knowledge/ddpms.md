# Inference or Sampling in a DDPM

We need to iteratively sample from the decoding distributions
To get a sample $x_0 \sim P_{x_0}$, we need to traverse through the backward / Decoding process

$$X_T \rightarrow X_{T-1} \rightarrow X_{T-2} \cdots \rightarrow X_0$$

$\Rightarrow$ we need to sample iteratively from decoding distributions:

$$x_{t-1} \sim p_\theta(x_{t-1} \mid x_t) \qquad \text{for } t = T \text{ to } 1$$

$$X_T \sim \mathcal{N}(0, I), \quad X_{T-1} \sim p_\theta(x_{T-1} \mid x_T)$$

$$X_{T-2} \sim p_\theta(x_{T-2} \mid x_{T-1})$$

$$\vdots$$

$$X_0 \sim p_\theta(x_0 \mid x_1)$$

We have,

$$x_{t-1} \sim p_\theta(x_{t-1} \mid x_t)$$

$$p_\theta(x_{t-1} \mid x_t) = \mathcal{N}\!\left(x_{t-1};\ \mu_\theta(x_t),\ \sigma_q^2 \cdot I\right)$$

$$x_{t-1} = \mu_\theta^*(x_t) + \sigma_q \cdot \epsilon \qquad \epsilon \sim \mathcal{N}(0, I)$$

where $\mu_{\theta^*}(x_t) = \dfrac{(1-\bar{\alpha}_{t-1})\cdot\sqrt{\alpha_t}}{1-\bar{\alpha}_t}\; x_t + \dfrac{(1-\alpha_t)\cdot\sqrt{\bar{\alpha}_{t-1}}}{1-\bar{\alpha}_t}\; \hat{x}_{\theta^*}(x_t)$
# Inference in a DDPM

Start with $X_T \sim \mathcal{N}(0, I)$

for $t = T, T-1, \ldots, 1$

do:

- get $\hat{x}_{\theta^*}(x_t)$ from the NN

## Diagram

$$x_t,\, t \rightarrow \underbrace{\text{U-net}}_{\substack{\text{decrease} \\ \text{dim}}\;\theta^*\;\substack{\text{increase} \\ \text{dim}}} \rightarrow \hat{x}_{\theta^*}(x_t) \xrightarrow{\text{forward pass to get } \hat{x}_{\theta^*}(x_t)}$$

$$x_{t-1} = \mu_{\theta^*}(x_t) + \sigma_q\, \epsilon \qquad \epsilon \sim \mathcal{N}(0, I)$$

$\hookrightarrow$ sampling from $p_\theta(x_{t-1} \mid x_t)$

$$\mu_{\theta^*}(x_t) = \frac{(1-\bar{\alpha}_{t-1})\cdot\sqrt{\alpha_t}}{1-\bar{\alpha}_t}\; x_t + \frac{(1-\alpha_t)\cdot\sqrt{\bar{\alpha}_{t-1}}}{1-\bar{\alpha}_t}\; \hat{x}_{\theta^*}(x_t)$$

return $x_0$ : A new generated sample.

To sample in a DDPM, we need to perform $T$ number of forward passes through the trained NN $(\theta^*)$.

Unlike in a VAE or a GAN we wont get the generated sample in one shot, rather we would be getting that in T number of forward passes. 

----

All we are doing  is trying to find P_theta using a latent variable model such that [[KL-Divergence]] between P_x and P_theta is minimised . Minimising the KL divergence is the same as maximising the [[Maximum Likelihood Estimation | Log Likelihood]] . For latent variable models we cant find the exact Log likelihood so we maximise the [[Evidence Lower Bound | Lower Bound for it]] . 

We simply learned the parameters of the [[Gaussian Transitions]] [[Conditional Probability Distribution]] of the decoding [[Markov Chain]] and sampling in a DDPM , which is running through the MC using the mean that we have learned. 

[[Training DDPM's]] is simply a regression problem

The distribution that we are sampling from is not conditioned on another Data variable. it is conditioned only on the Latent space. 

Next we need to see how to change the formulation of the DDPM's so it samples from the Conditional Distributions
These are

[[Classifier Guided Diffusion]] and [[Classifier Free Diffusion]]
