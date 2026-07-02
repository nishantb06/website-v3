---
title: Machine Learning
tags: [ai]
---

# Machine Learning

Machine learning is the practice of teaching computers to learn patterns from data instead of programming explicit rules.

## Core ideas

- **Supervised learning** — learn a mapping from inputs to labels (classification, regression)
- **Unsupervised learning** — discover structure in unlabeled data (clustering, dimensionality reduction)
- **Self-supervised learning** — the trick powering modern [[transformers]]: generate labels from the data itself

## In practice

Most production ML systems today involve embedding data into vector spaces and searching over them — see [[vector-databases]] for how retrieval works at scale.

Training and serving models reliably needs reproducible environments, which is where [[docker]] comes in.
