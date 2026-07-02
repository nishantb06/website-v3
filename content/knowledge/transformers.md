---
title: Transformers
tags: [ai, deep-learning]
---

# Transformers

The transformer architecture ("Attention Is All You Need", 2017) replaced recurrence with **self-attention**, letting models process sequences in parallel and scale to billions of parameters.

## Why they won

- Attention gives every token a direct connection to every other token
- Parallel training makes huge datasets feasible
- The same architecture works for text, images, audio, and code

## Key components

1. Token embeddings + positional encodings
2. Multi-head self-attention
3. Feed-forward blocks with residual connections

Transformers are the foundation of modern [[machine-learning]] systems like LLMs. Their embeddings are what gets stored and searched in [[vector-databases]] for retrieval-augmented generation.
