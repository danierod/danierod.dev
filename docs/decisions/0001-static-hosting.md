---
title: Stay fully static; host later on Cloudflare Pages
date: 2026-08-17
status: accepted
tags: [hosting, astro, cloudflare]
article: long-form
---

# Stay fully static; host later on Cloudflare Pages

## Context

The site is a personal portfolio: MDX content, a mostly static shell, and one interactive CLI island later. Hosting was undecided between Cloudflare Pages and Vercel. An adapter would lock the build to one platform.

## Decision

1. Keep Astro’s default static output. Do **not** add a Cloudflare or Vercel adapter in the scaffold.
2. Treat **Cloudflare Pages** as the intended host: Git-based static deploy, DNS/SSL in one place, unlimited bandwidth, and built-in privacy analytics when we need them.
3. If a database or other heavy backend appears later, put it on a dedicated subdomain so the primary site stays a static CDN deploy.

## Consequences

- The repo stays portable (`astro build` → any static host).
- Preview URLs and DX are slightly less polished than Vercel’s, which is an acceptable trade for a solo site.
- Workers remain available later without moving the marketing/portfolio origin.

## Alternatives considered

- **Vercel** — stronger preview workflow; bandwidth caps and a Next.js-oriented product. Fine as a fallback, not the default.
- **Add `@astrojs/cloudflare` now** — premature. The CLI island can hydrate as static JS; we do not need SSR yet.
