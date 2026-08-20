---
title: Feature branches; merge complete work onto main
date: 2026-08-20
status: accepted
tags: [git, workflow, cloudflare, pages]
article: none
---

# Feature branches; merge complete work onto main

## Context

The site is in a minimal deliverable state on `main`. Cloudflare Pages builds on every Git push: `main` is production, every other branch is a preview ([journal/2026-08-18-cloudflare-pages-deploy.md](../journal/2026-08-18-cloudflare-pages-deploy.md)). The Free plan allows 500 builds per month; previews count.

Pushing unfinished features to `main` ships half-done work to the live site. Pushing every small commit — on `main` or on a feature branch — burns that quota. Feature branches only save deploys if they stay local until merge, and if Pages is not building every non-`main` push.

## Decision

1. **One branch per ROADMAP feature or milestone.** Work there until the feature is complete and the human is satisfied, then merge onto `main`. Do not land half-done features on `main`.
2. **Always branch from current `origin/main`**, unless told otherwise. Do not stack a new feature on another feature branch.
3. **Names:** `milestone-N-short-slug` (e.g. `milestone-2-case-studies`). Smaller work uses `feat/short-slug` or `fix/short-slug`.
4. **One active feature branch.** Switching is checkout, not a nested branch. Docs (`ROADMAP`, ADRs, journal) live on that branch and land with the feature.
5. **Keep every commit.** Merge with `git merge --no-ff` so `main` gets the individual messages plus a merge commit that marks the feature. Never squash. Do not fast-forward.
6. **Do not push the feature branch by default.** Day-to-day preview is `pnpm dev` / `pnpm preview`. Push `main` once after the merge (one production build). Push a feature branch only when a preview URL is requested, or for backup.
7. **Pages preview branch control is None** (or a tight allowlist). Otherwise the first push of a feature branch is another build. `[skip ci]` / `[pages skip]` in a commit message skips that build if a push is only for backup.
8. **Agents create the branch** when a new milestone or ROADMAP feature starts, unless told to stay on the current branch. They do not merge or push until asked. Same commit bar as always: commit only when asked.
9. **Exceptions:** production hotfixes (short `fix/…` from `main`, or a direct commit if told); work the human explicitly wants on `main` or on another base.

## Consequences

- Production stays at complete, reviewable chunks. History on `main` still has the real commits, grouped by merge commit.
- Deploy quota is spent on ships (and rare requested previews), not on every save.
- Unpushed work exists only on the local machine until merge or an explicit backup push. Preview URLs are opt-in, not automatic.
- Agents need a Cursor rule to create the branch; this ADR alone will not change their default.
- The Pages dashboard must actually set preview branches to **None**. The repo cannot enforce that.

## Alternatives considered

- **Keep committing straight to `main`** — simple during scaffold; now ships unfinished work and spends a build per push. Rejected now that the site is live.
- **Feature branches that are pushed after every commit** — still spends a preview build per push. Worse than `main` if production is also rebuilt later. Rejected unless previews are off or `[skip ci]` is used.
- **Squash merge** — one clean commit on `main`, but drops the messages this workflow is meant to keep. Rejected.
- **Rebase-and-merge** — keeps commits, linear history, no merge commit to mark the feature. Rejected in favour of `--no-ff`.
- **GitHub PRs as the default ship path** — useful for review, but opening the PR pushes the branch and (with default Pages settings) triggers a preview. Optional later; not the default while deploys are scarce. If PRs are used, disable squash and rebase in the repo merge settings.
