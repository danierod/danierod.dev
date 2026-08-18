---
title: Domain and DNS on Cloudflare
date: 2026-08-18
tags: [dns, cloudflare, godaddy, pages]
article: none
---

# Domain and DNS on Cloudflare

## What changed

`danierod.dev` now uses Cloudflare for DNS while registration stays at GoDaddy ([0005](../decisions/0005-godaddy-registrar-cloudflare-dns.md)):

- Zone added as a full setup (Free plan); nameservers `archer.ns.cloudflare.com` and `arya.ns.cloudflare.com`
- Dropped GoDaddy Website Builder A records and `_domainconnect` on import; kept `www` CNAME and `_dmarc`
- Pages custom domains: `danierod.dev` and `www.danierod.dev`
- Both hostnames return HTTPS 200; `danierod-dev.pages.dev` still works as the project URL

## Why

The first Pages deploy was on `*.pages.dev`. Apex + `www` on the real domain needs the zone on Cloudflare so TLS and routing live in the same account as the Git deploy.

## What we learned

- Cloudflare’s “up to 48 hours” copy is a ceiling. Public resolvers already showed Cloudflare NS, then apex/`www` A records at Cloudflare anycast, then HTTPS 200, well before that window.
- Do not import GoDaddy Website Builder IPs as proxied A records or they keep serving the old parking site after the NS switch. Pages creates the right records when you add custom domains.
- Skip “allow only Cloudflare IPs at origin” — there is no origin server.
- Optional later, not blocking this milestone: turn DNSSEC back on **in Cloudflare** (it was off at GoDaddy for the NS move); pick a single canonical host (`www` → apex or the reverse).
