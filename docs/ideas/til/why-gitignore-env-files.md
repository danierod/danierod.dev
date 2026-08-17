---
title: Why .env files belong in .gitignore
date: 2026-08-17
tags: [git, secrets, dotenv]
---

# Why `.env` files belong in `.gitignore`

`.env` files are the usual place to put local secrets: API keys, analytics tokens, CMS credentials, database URLs. Git is a bad place for those.

Once a secret is committed, it lives in history even after you delete the file. Anyone with repo access — or a public clone — can read it. Rotating the leaked key is the real fix; `.gitignore` is how you avoid needing that fix.

Astro’s starter ignores `.env` and `.env.production` by default. This site does not use env files yet. The rules are precaution: when analytics or a form backend shows up, secrets go in `.env` locally and in the host’s dashboard (Cloudflare Pages, GitHub Actions), not in git.

`.env.production` is listed separately because some tools load that filename for production builds. Ignoring `.env` alone does not always match `.env.production`.

A later pattern:

- **Ignore** `.env`, `.env.production`, `.env.local`
- **Commit** `.env.example` with empty keys (`PUBLIC_SITE_URL=`) so the required variables are documented without values
