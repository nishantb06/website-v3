---
title: Notion API
tags: [web, api]
---

# Notion API

Notion exposes two APIs in practice:

## Official API

The supported REST API (`api.notion.com`) with integration tokens. Great for querying databases and page properties — it powers the blog list on this site.

## Unofficial API

The private API used by the Notion apps themselves. Libraries like `notion-client` use it to fetch full page block maps, which render nicely with `react-notion-x`. It only works on pages shared to the web.

## Gotchas

- Uploaded file URLs expire — prefer external images for covers
- Rate limits are per-integration (~3 requests/second)
- Block content and database properties are separate concepts with separate endpoints

This site's blog wires the Notion API into [[nextjs]] static generation.
