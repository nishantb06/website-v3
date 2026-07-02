---
title: Docker
tags: [infrastructure]
---

# Docker

Docker packages applications with their dependencies into containers — lightweight, reproducible units that run the same everywhere.

## Core concepts

- **Image** — immutable snapshot built from a `Dockerfile`
- **Container** — a running instance of an image
- **Volume** — persistent storage that outlives containers
- **Compose** — declare multi-container setups in one YAML file

## Why it matters here

- [[machine-learning]] training and serving environments stay reproducible
- [[vector-databases]] like Qdrant run locally with a single `docker run`
- [[nextjs]] apps deploy as containers on most cloud platforms

## Handy commands

```bash
docker compose up -d
docker ps
docker logs -f <container>
```
