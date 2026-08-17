---
title: Repository scaffold
date: 2026-08-17
tags: [scaffold, astro, docs]
article: long-form
---

# Repository scaffold

## What changed

Initialized `danierod.dev` as a static Astro 7 site:

- pnpm, TypeScript strict, Tailwind CSS v4 (`@tailwindcss/vite`), MDX, React, sitemap
- Content collections (`about`, `case-studies`, `writing`, `testimonials`) with Zod schemas and empty folders
- Typed site identity in `src/data/site.ts`
- `BaseLayout` + a blank home page (no Hero/About copy yet)
- Placeholder design tokens in `src/styles/global.css`
- `docs/` decision log (roadmap, ADRs, journal) plus a Cursor rule so agents keep it updated

Node.js was not on the machine; it was installed with Homebrew (`node` 26.x, even-numbered Current). TypeScript is pinned to 5.x so `@astrojs/check`’s peer range is satisfied.

## Why

Lock the stack, content model, and folder layout before writing pages. The blueprint’s later milestones (case studies, writing, CLI, llms.txt, CV) should drop into this structure instead of inventing a new one each time.

## What we learned

- `create astro` refuses a non-empty directory (LICENSE + README) and nested the project under a random name (`callous-cycle`). Moving files to the repo root afterward was required.
- Homebrew’s `node` formula shipped 26, not 22 LTS. Astro’s engine range is `>=22.12.0`; even majors are the supported line. Worth a later note if we want to pin 22 or 24 LTS.
- `@astrojs/check` still peers `typescript@^5 || ^6`, so `pnpm add -D typescript` resolving to 7 had to be rolled back.
