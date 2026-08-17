---
title: One writing collection with article and TIL kinds
date: 2026-08-17
status: accepted
tags: [content, writing, rss]
article: til
---

# One writing collection with article and TIL kinds

## Context

The blueprint calls for a hybrid logbook: long-form articles and bite-sized TILs. Two collections would split the timeline and make RSS, listing pages, and “building in public” feeds harder to assemble.

## Decision

Use a single `writing` collection. Discriminate with frontmatter `kind: "article" | "til"`. `description` is optional so TILs can stay short. Filter with `getCollection('writing', …)` when a page only wants one kind.

## Consequences

- Home/logbook and RSS can sort everything by `pubDate`.
- Article and TIL templates can still diverge (check `data.kind`).
- A post cannot live in both kinds; change `kind` rather than duplicating the file.

## Alternatives considered

- **Separate `articles` and `til` collections** — cleaner schemas, worse unified timeline. Rejected.
- **No `kind` field; infer from folder** — possible later via `glob` `base`, but a field is explicit and easy to query.
