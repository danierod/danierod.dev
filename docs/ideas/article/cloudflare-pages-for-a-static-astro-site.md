---
title: Cloudflare Pages for a static Astro site
date: 2026-08-18
tags: [hosting, cloudflare, astro, cdn]
article: long-form
---

# Cloudflare Pages for a static Astro site

What Pages is, what it gives a personal site, why this repo chose it over Vercel, and how build vs serve actually works.

Seed: the pre-deploy explanation in chat (2026-08-18). Ground the published version in [0001-static-hosting](../../decisions/0001-static-hosting.md) and [0004-cv-pdf-not-on-pages](../../decisions/0004-cv-pdf-not-on-pages.md).

## Angle

Cloudflare Pages is a CDN that builds a git repo into static files and serves them from the edge. For this site: `astro build` → `dist/` → live URL. No Node process on every request.

## What it provides

- First URL on `*.pages.dev`; custom domain later
- HTTPS, git deploys, preview URLs for other branches
- DNS + TLS in one Cloudflare account after nameservers move
- Unlimited bandwidth on the Pages model (vs Vercel caps)
- Workers / analytics later without moving the portfolio origin

What it is not: a VPS, SSR, or a place to run Chromium (CV PDF stays in GitHub Actions).

## Why this host

Two decisions: stay fully static (no Cloudflare/Vercel adapter), then treat Pages as the intended host. The CLI island hydrates in the browser. A database, if any, goes on a subdomain.

Vercel lost on bandwidth and Next.js-oriented product; stronger previews are an acceptable miss for a solo site. GitHub Pages, Netlify, S3+CloudFront, and a VPS are weaker fits if DNS already belongs on Cloudflare.

## Under the hood

1. **Build** — Isolated Linux image, install + `pnpm build`, immutable deployment from `dist/`. Failed builds do not replace production.
2. **Publish** — Artifact uploaded to Cloudflare’s asset store; hostname points at one snapshot (rollback = retarget).
3. **Serve** — Anycast DNS → nearest PoP → TLS at the edge → path → file. Cache hit at the PoP; miss fills from the asset store. No Astro/MDX on the request.

Pages Functions / Workers are optional request-path JS. v1 does not use them.

## Outline for the published piece

1. Static site vs “a server”
2. Pages as CI + storage + CDN
3. Request path diagram
4. Why no adapter (portability)
5. Why not generate PDFs in the Pages build
6. Domain step: GoDaddy registration, Cloudflare nameservers, Pages custom domain
