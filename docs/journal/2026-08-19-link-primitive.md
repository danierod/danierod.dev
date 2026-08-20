---
title: Kit primitives extract into ui/ on first use
date: 2026-08-19
tags: [components, design-system, astro]
article: none
---

# Kit primitives extract into ui/ on first use

## What changed

- [0009](../decisions/0009-component-folders-by-role.md): kit primitives (`Link`, `Button`, …) go in `src/components/ui/` when they first ship on a production page. Sections stay one-off-friendly.
- `Link.astro`: body/nav/caret variants, optional icon, `inline` or `stack` layout. Shared hit target; focus fill on the label only.
- Hero CTA and the skip link use `Link`. CSS for `.link-hit` drives all link variants.

## Why

Hero encoded kit behavior (stacked icon, shared hover/focus) inside a section that will not be reused. That belongs on the primitive, not on the page block.

## What we learned

“Wait for a second route” delayed the wrapper until after the rules existed. First production use is the better gate for named kit controls.
