---
title: Canonical host is the apex danierod.dev
date: 2026-08-18
status: accepted
tags: [dns, seo, cloudflare, www]
article: none
---

# Canonical host is the apex danierod.dev

## Context

After attaching custom domains, both `danierod.dev` and `www.danierod.dev` served the same Pages project with HTTP 200. Search engines, sitemaps, and share URLs would treat them as two sites. `astro.config.mjs` already sets `site: "https://danierod.dev"`.

Pages `_redirects` does not support domain-level rules (`www` vs apex). The 301 has to live on the Cloudflare zone (Redirect Rules), not in the Git-deployed static files.

## Decision

1. **Canonical host** is `https://danierod.dev` (apex, no `www`).
2. Every HTML page emits `<link rel="canonical" href="https://danierod.dev/…">` from `Astro.site`.
3. **Redirect Rule** on the zone: hostname `www.danierod.dev` → `https://danierod.dev` + path + query, status **301**.
4. Leave `danierod-dev.pages.dev` as the Pages project URL. Do not 301 it unless we later want to hide that hostname.

## Consequences

- One public URL for SEO, Open Graph, and later `/llms.txt`.
- `www` still works; visitors land on the apex.
- The redirect is zone config, not in the repo. Recreating the zone means recreating the rule.
- HTML canonical still helps if someone hits Pages via `*.pages.dev` or before the 301 propagates.

## Alternatives considered

- **www as canonical** — valid, but longer and fights the existing `site` / `site.url` values.
- **Pages `_redirects`** — path-only; Cloudflare documents domain-level redirects as unsupported.
- **Pages Functions middleware** — a Worker on the request path; rejected by [0001](0001-static-hosting.md).
