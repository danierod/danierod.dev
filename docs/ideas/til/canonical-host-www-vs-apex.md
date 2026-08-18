---
title: Why a site needs one canonical host
date: 2026-08-18
tags: [dns, seo, www, cloudflare]
article: til
---

# Why a site needs one canonical host

`danierod.dev` and `www.danierod.dev` can both serve the same files. Browsers treat them as **different origins**: different cookies, different “site” for search engines, different URLs when someone pastes a link.

Crawlers that see both as 200 OK may index two copies. Rank and analytics split. A sitemap that lists only the apex then disagrees with a `www` share card. That is the duplicate-content problem, even when the HTML is identical.

**Canonical** means: pick one hostname as the real address, and make every other hostname a pointer.

Two layers:

1. **`<link rel="canonical">`** — a hint in the HTML: “the official URL is this.” Search engines usually follow it. It does not stop a user from staying on `www`.
2. **HTTP 301** — the edge tells the client “this moved permanently.” Bookmarks, links, and crawlers converge on one host. Stronger than the hint.

This site’s canonical is the **apex**: `https://danierod.dev`. That matches `site` in Astro config (sitemaps and absolute URLs). `www` should 301 to the same path on the apex (`/about` stays `/about`).

Why not put that 301 in a Pages `_redirects` file? That file only matches **paths**, not hostnames. Cloudflare’s table of advanced redirects lists domain-level rules as unsupported. The 301 belongs on the **zone** (Redirect Rules), next to DNS, not in `dist/`.

`danierod-dev.pages.dev` is a third hostname: Cloudflare’s project URL. Leave it. It is for previews and a fallback, not the URL on a CV. Redirecting it is optional later; it is not the `www` vs apex question.

Rule of thumb: one public host, 301 everything else that should be that site, canonical tag on every page as a backstop.
