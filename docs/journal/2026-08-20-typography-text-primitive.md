---
title: Named typography via ui/text
date: 2026-08-20
tags: [components, design-system, typography, astro]
article: none
---

# Named typography via ui/text

## What changed

- [0012](../decisions/0012-typography-text-primitive.md): type scale is named `Text` variants, not page-local Tailwind.
- `ui/text/Text.astro`: `hero-title`, `title`, `sub-title`, `lede`, `body`, `label`. `muted` is a color prop. `as` picks the tag; `class` is layout only.
- Hero uses `hero-title` and `lede` (muted). `/design-system` typography section is the live catalog (`hero-title` specimen sits in `@container`).

## Why

Hero’s clamp/uppercase name and muted intro were the production type recipes, but the lab still showed a smaller heading. Encoding them on a primitive makes the catalog honest and keeps later pages from picking new sizes by habit.

## What we learned

`hero-title` size is container-coupled (`cqi`). The recipe can live on `Text`; the section still has to provide `@container`. Layout of the stacked name (`block` spans) is not type — it stays on Hero. Color (`muted`) is not a size variant.
