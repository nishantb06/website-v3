---
title: Next.js
tags: [web]
---

# Next.js

Next.js is a React framework that handles routing, rendering strategy, and bundling. This website is built with it.

## Rendering modes

- **Static (SSG)** — pages pre-rendered at build time, served from a CDN
- **Server-side (SSR)** — pages rendered per request
- **ISR** — static pages that revalidate on an interval

## App Router notes

- Server components fetch data directly (no client bundle cost)
- Client components opt in with `"use client"` for interactivity
- Heavy browser-only widgets should be loaded with `next/dynamic` and `ssr: false`

The blog on this site pulls content through the [[notion-api]] and pre-renders each post. Deployments run in containers built with [[docker]] on some platforms.
