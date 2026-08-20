---
title: Feature branches before touching main
date: 2026-08-20
tags: [git, workflow, cloudflare, pages]
article: none
---

# Feature branches before touching main

## What changed

Recorded [0011](../decisions/0011-feature-branches-onto-main.md): one branch per ROADMAP feature, branched from `origin/main`, merged with `--no-ff` only when the work is complete. Agents follow `.cursor/rules/feature-branches.mdc`. Feature branches stay local by default so Cloudflare Pages does not spend a build on every commit.

## Why

`main` is live. Pages Free is 500 builds/month, and preview deploys count. Continuing to push small commits (or unpushed-looking feature branches that still get preview builds) would ship unfinished UI and burn quota.

## What we learned

- Branching does not save deploys by itself. Every Git push still builds unless preview branch control is **None** or the commit has `[skip ci]` / `[pages skip]`.
- `git merge --no-ff` is the way to keep individual commit messages and still mark the feature on `main`. Squash would drop the messages.
