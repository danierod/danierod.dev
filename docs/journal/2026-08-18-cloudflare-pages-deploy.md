---
title: Cloudflare Pages Git deploy
date: 2026-08-18
tags: [hosting, cloudflare, pages, astro]
article: long-form
---

# Cloudflare Pages Git deploy

## What changed

The site is live on Cloudflare Pages from Git, fully static, no adapter:

- GitHub repo `danierod/danierod.dev` connected to a **Pages** project (not a Worker)
- Production branch `main`; build command `pnpm run build`; output directory `dist/` (`dist/` stays gitignored)
- First URL: [https://danierod-dev.pages.dev](https://danierod-dev.pages.dev)
- Pushes to `main` rebuild production; other branches get preview deployments

An earlier attempt used **Import a repository**, which creates a Worker and runs `npx wrangler deploy`. That path tried Wrangler autoconfig (`astro add cloudflare`) and failed when pnpm 11 blocked `workerd` install scripts. Recreating via **Create → Pages → Connect to Git** avoided Wrangler entirely.

## Why

[ADR 0001](../decisions/0001-static-hosting.md) called for Git-based static hosting on Pages without locking the build to a Cloudflare adapter. The first `*.pages.dev` URL unblocks the custom-domain step.

## What we learned

- The dashboard **Import a repository** flow is Workers Builds (`npx wrangler deploy`), not classic Pages. Pages is **Create application → Pages → Connect to Git**: build command plus output directory, no deploy command.
- Wrangler autoconfig treats Astro as SSR and runs `astro add cloudflare`. That fights the static-only decision. `pnpm-workspace.yaml` already allows `esbuild` and `sharp` builds, not `workerd`, so the Worker path aborted before upload.
- Empty content collections warn during `astro check` / `astro build`; they are not failures. `dist/` must not be committed — Pages creates it in the build image.
- Astro 7.2.2 is not on Wrangler’s official autoconfig support list; irrelevant once the project is Pages + static `dist/`.
