---
title: Canonical apex and www redirect
date: 2026-08-18
tags: [dns, seo, cloudflare]
article: none
---

# Canonical apex and www redirect

## What changed

- [0006](../decisions/0006-canonical-apex.md): public host is `https://danierod.dev`.
- `BaseLayout` emits `<link rel="canonical">` from `Astro.site` + the current path.
- TIL seed: [canonical-host-www-vs-apex](../ideas/til/canonical-host-www-vs-apex.md).
- Zone Redirect Rule (dashboard, not in git): `www.danierod.dev` → apex, 301, path and query preserved.

## Why

Both custom domains returned 200. One hostname avoids split SEO and matches the Astro `site` URL.

## What we learned

Pages `_redirects` cannot key off hostname. A zone Redirect Rule is the static-site-friendly 301; Functions would be a Worker on the request path.
