---
title: Content collections as the single source of truth
date: 2026-08-17
status: accepted
tags: [content, mdx, astro]
article: long-form
---

# Content collections as the single source of truth

## Context

The site will expose the same narrative in several shapes: HTML pages, raw markdown routes for humans and LLMs (`/about.md`), `/llms.txt`, a `/cv` view, and a CLI `cat about.md`. Copying that text into each surface would drift immediately.

## Decision

All authored content lives in Astro content collections with Zod schemas, validated at build time:

| Collection     | Format | Purpose                   |
| -------------- | ------ | ------------------------- |
| `about`        | MDX    | Engineer / human sections |
| `case-studies` | MDX    | Work write-ups            |
| `writing`      | MDX    | Public articles and TILs  |
| `testimonials` | YAML   | Structured quotes         |

Site identity (name, role, socials, `knowsAbout`) is typed TypeScript in `src/data/site.ts`, not a collection.

`docs/` is **not** a collection. It is unpublished working memory; promote into `writing` when a post is ready.

HTML pages, markdown endpoints, RSS, CV, and `llms.txt` must **read** from these sources. They must not duplicate prose.

## Consequences

- Adding a case study is one MDX file; every consumer updates on the next build.
- Invalid frontmatter fails the build instead of shipping a broken page.
- Empty collections are allowed so the scaffold can ship before copy is written.

## Alternatives considered

- **Headless CMS** — extra latency and a second source of truth. Rejected for a solo, git-versioned site.
- **Put About copy in `src/pages/about.astro`** — simpler for one page, but breaks SSOT for `/about.md`, CV, and the CLI.
