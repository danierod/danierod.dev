---
title: Component folders by role
date: 2026-08-19
status: accepted
tags: [astro, components, ui]
article: none
---

# Component folders by role

## Context

[0008](0008-ui-lab-is-visual-poc.md) locked the look and left production file layout unset. Before extracting lab CSS into components, we need a map for where new files go.

Astro already splits **pages** (routes and data loading), **layouts** (document shell), and **components** (UI). The remaining question is how to group files inside `src/components/`.

## Decision

`src/components/` is sorted by **role**:

| Folder     | Role                                      | Examples                                      |
| ---------- | ----------------------------------------- | --------------------------------------------- |
| `ui/`      | Primitives used across the site           | Button, Link, Notice, Chip, ThemeToggle       |
| `layout/`  | Site chrome used by `BaseLayout`          | Header, Footer, Nav                           |
| `sections/`| Page blocks composed by routes            | Hero, About, CaseStudyList                    |
| `cli/`     | Interactive island only (Milestone 4)     | Terminal drawer                               |

`ui/`, `layout/`, and `cli/` already exist. Add `sections/` when the first page block is extracted.

Rules:

- Pages in `src/pages/` route and compose. Layouts in `src/layouts/` own the document shell. Components render UI. Reusable files do not live under `src/pages/` — they become URLs.
- CSS classes in `src/styles/components.css` stay the visual source for primitives until a class is used on more than one route or needs props; then wrap it in `ui/`.
- Prefer `.astro`. React lives in `cli/` only.

Content stays in collections ([0002](0002-content-collections-ssot.md)). Components receive data as props; they do not own copy.

## Consequences

- New UI files have an obvious home without inventing a taxonomy per feature.
- Lab routes can keep inline markup until a primitive or section is reused.
- `sections/` appears with Milestone 1 (Hero + About), not as empty folders today.

## Alternatives considered

- **Atomic Design directories** (`atoms/` / `molecules/` / `organisms/`) — a size taxonomy on top of Astro’s pages and layouts. Classification (is ThemeToggle an atom or a molecule?) costs more than it helps at this catalog size.
- **Colocate with `_` next to pages** — valid in Astro (underscore files are not routes), but messy once home, listing, and detail share a block. Role folders scale better here.
