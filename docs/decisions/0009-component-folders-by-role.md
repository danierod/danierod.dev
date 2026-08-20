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

Astro already splits **pages** (routes and data loading), **layouts** (document shell), and **components** (UI). The remaining question is how to group files inside `src/components/`, and where their CSS lives.

## Decision

`src/components/` is sorted by **role**:

| Folder      | Role                                  | Examples                                |
| ----------- | ------------------------------------- | --------------------------------------- |
| `ui/`       | Primitives used across the site       | Button, Link, Notice, Chip, ThemeToggle |
| `layout/`   | Site chrome used by `BaseLayout`      | Header, Footer, Nav                     |
| `sections/` | Page blocks composed by routes        | Hero, About, CaseStudyList              |
| `cli/`      | Interactive island only (Milestone 4) | Terminal drawer                         |

A primitive that has its own CSS is a folder (`ui/link/Link.astro` + `link.css`). Flat `ThemeToggle.astro` is fine until it needs styles beside it.

Rules:

- Pages in `src/pages/` route and compose. Layouts in `src/layouts/` own the document shell. Components render UI. Reusable files do not live under `src/pages/` — they become URLs.
- **Kit primitive → `ui/` on first production use.** If it is a named control in the design system (Link, Button, Notice, Chip, ThemeToggle), add it under `src/components/ui/` when it first ships on a real page — even if used once. Do not wait for a second route. Page blocks stay in `sections/` even if they are one-offs (Hero).
- **Prefer local styles** unless they cannot work, or there is a strong reason not to. This is not limited to kit primitives: sections, layout chrome, and pages follow it too. Colocate CSS with the module (a scoped `<style>` with `@import "./….css"`, or styles in the component). The Astro file is the API; the colocated CSS is the look.
- Do not wrap every `<a>` or `<button>` in a component until it is a named kit primitive.
- Prefer `.astro`. React lives in `cli/` only.

Content stays in collections ([0002](0002-content-collections-ssot.md)). Components receive data as props; they do not own copy.

**Global CSS is for:**

- Tokens and Tailwind `@theme` (`src/styles/global.css`)
- Document-level rules (`html` / `body`, color-scheme)
- Elements we do not render, until we wrap them (markdown `<a>` in collections)
- Leftovers in `src/styles/components.css` that still have no component (Button, Notice, …)

Lab pages are a visual POC ([0008](0008-ui-lab-is-visual-poc.md)). They are not a reason to keep a class global. If a lab route needs the look, it uses the component.

## Consequences

- New UI files have an obvious home without inventing a taxonomy per feature.
- Production and lab compose `ui/` primitives instead of copying class names. Deleting the lab does not strand a global stylesheet.
- `sections/` exists from Milestone 1 (Hero). Kit extraction is not gated on reuse of that section.
- Article/MDX links will need a prose rule or an MDX `a` → `Link` map when the writing engine ships. That is content styling, not a second kit class.

## Alternatives considered

- **Atomic Design directories** (`atoms/` / `molecules/` / `organisms/`) — a size taxonomy on top of Astro’s pages and layouts. Classification (is ThemeToggle an atom or a molecule?) costs more than it helps at this catalog size.
- **Colocate with `_` next to pages** — valid in Astro (underscore files are not routes), but messy once home, listing, and detail share a block. Role folders scale better here.
- **Wait until a class is used on more than one route** — the original extraction threshold. It delayed `Link` until a second page needed it, while Hero already encoded kit behavior (stacked icon, shared hover/focus). Replaced: kit primitives extract on first production use.
- **`components.css` as the visual source for every primitive** — one cascade, lab can use raw classes. It kept look far from implementation and made lab pages a load-bearing consumer. Replaced: local styles by default.
