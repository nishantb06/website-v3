---
title: Vector Databases
tags: [ai, infrastructure]
---

# Vector Databases

Vector databases store high-dimensional embeddings and answer *approximate nearest neighbor* (ANN) queries: "which stored vectors are most similar to this one?"

## Why they exist

Embeddings from [[transformers]] capture semantic meaning — similar texts land close together in vector space. Searching millions of vectors exactly is too slow, so vector DBs use ANN indexes like HNSW and IVF.

## Popular options

- **Qdrant** — Rust-based, great filtering support
- **Pinecone** — managed service
- **pgvector** — Postgres extension, simplest to operate

## Typical use

The retrieval half of RAG: embed documents, store them, then at query time embed the question and fetch the closest chunks as context for a [[machine-learning]] model.

Most of these ship as containers, so local setups usually start with [[docker]].
