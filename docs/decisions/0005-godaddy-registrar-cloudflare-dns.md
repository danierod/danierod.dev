---
title: Keep the domain at GoDaddy; use Cloudflare for DNS
date: 2026-08-18
status: accepted
tags: [dns, cloudflare, godaddy, domain]
article: none
---

# Keep the domain at GoDaddy; use Cloudflare for DNS

## Context

`danierod.dev` is already registered at GoDaddy. The site now deploys on Cloudflare Pages (`danierod-dev.pages.dev`). Pages custom domains need the zone on Cloudflare so TLS and routing sit in the same account as the deploy.

## Decision

1. Leave **registration** at GoDaddy (billing and renewal stay there).
2. Point the domain’s **nameservers** at Cloudflare (full / primary setup).
3. After the zone is Active, add `danierod.dev` (and `www` if we want it) as a Pages custom domain.

Do not transfer the domain to Cloudflare Registrar unless GoDaddy blocks nameserver changes.

## Consequences

- DNS, TLS, and the Pages project live in one Cloudflare account.
- Email, verification TXT records, and any other GoDaddy DNS must be copied to Cloudflare **before** nameservers switch, or mail and those records will break.
- Turn **DNSSEC off at GoDaddy** before replacing nameservers; turn it back on in Cloudflare after the zone is Active.

## Alternatives considered

- **Transfer to Cloudflare Registrar** — fewer vendors, but a transfer is extra downtime risk and is not required for Pages.
- **Leave nameservers at GoDaddy and CNAME to Pages** — apex `danierod.dev` is awkward without Cloudflare DNS (no ALIAS/ANAME at many registrars). Full setup is the Free-plan path Cloudflare documents.
- **Partial / CNAME setup** — Business/Enterprise only.
