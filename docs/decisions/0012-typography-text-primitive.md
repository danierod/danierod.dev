---
title: Typography is a Text primitive with named variants
date: 2026-08-20
status: accepted
tags: [design-system, typography, astro]
article: none
---

# Typography is a Text primitive with named variants

## Context

Hero inlined heading and intro recipes as Tailwind classes. The `/design-system` typography specimens used a different hero size. Page-local type classes would drift as more sections land.

[0009](0009-component-folders-by-role.md) already puts named kit primitives in `ui/` on first production use, with local CSS. Link was the first. Type needed the same gate: a catalog of looks, not a new clamp on each page.

## Decision

The type scale is variants on `ui/text/Text.astro` (`text.css` colocated). `variant` is the size recipe; `muted` is a separate color prop; `as` is the semantic tag (defaulted from the variant). Callers may pass `class` for layout only.

Variants: `hero-title`, `title`, `sub-title`, `lede`, `body`, `label`. Adding a look means adding a variant and showing it on `/design-system`.

`hero-title` uses container-query units (`cqi`). It scales only inside an `@container` (Hero already has one; specimens wrap themselves). Lede is the opening paragraph under a headline, not a heading rank.

## Consequences

- Hero and the lab catalog share the same recipes. Drift is a missing variant, not a missed class name.
- Tailwind preflight sets `h1–h6 { font-size: inherit; font-weight: inherit }` in `@layer base`. Colocated `Text` CSS is also `@layer components`, but Astro inlines it before the bundled Tailwind file. `BaseLayout` emits the layer order first so `components` stays above `base` and `hero-title` can actually size an `h1`.
- Markdown/MDX copy is not wrapped yet. Article type will need a prose rule or MDX map when the writing engine ships — same constraint as Link.
- Lab routes (`/ui-idea`, `/palette`) may still use ad-hoc Tailwind until they consume `Text`.

## Alternatives considered

- **CSS recipe classes on semantic HTML** (`<h1 class="type-hero-title">`) — fewer files, easy to apply. Rejected: a typed primitive makes inventing a one-off size harder, matching how Link works.
- **CSS recipes plus a thin wrapper** — two APIs for one scale. The component is the API; the CSS is an implementation detail.
- **Tailwind `@theme` font-size tokens only** — size without weight, tracking, transform, or color. Hero’s title is a recipe, not a token.
- **`muted` as a variant** — mixed color with size. Rejected: `muted` is a color prop on any variant.
