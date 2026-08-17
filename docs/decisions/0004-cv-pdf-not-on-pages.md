---
title: Do not generate the CV PDF on Cloudflare Pages
date: 2026-08-17
status: accepted
tags: [cv, ci, cloudflare, playwright]
article: til
---

# Do not generate the CV PDF on Cloudflare Pages

## Context

The blueprint wanted a build-time Puppeteer hook that writes `public/cv.pdf` from the same content as `/cv`. Cloudflare Pages builds are not a good place to run a headless browser (no Chrome, tight resources, slow/flaky).

## Decision

Defer the PDF. When we add it:

1. `/cv` is a web route styled with `@media print` so “Save as PDF” already works.
2. If a committed or deployed `public/cv.pdf` is still needed, generate it in **GitHub Actions** with Playwright (or equivalent), not in the Pages build, and not with Puppeteer-in-Node on the edge.

## Consequences

- First CV milestone can ship as HTML + print CSS only.
- PDF generation, if added, is an optional CI artifact rather than a hosting dependency.
- We avoid dragging Chromium into the Cloudflare build image.

## Alternatives considered

- **Puppeteer during `astro build` on Pages** — likely to fail or timeout. Rejected.
- **Manual PDF exports** — fine as a stopgap, but it breaks SSOT the moment the MDX changes.
