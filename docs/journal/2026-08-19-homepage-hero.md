---
title: Homepage split Hero
date: 2026-08-19
tags: [homepage, hero, astro]
article: none
---

# Homepage split Hero

## What changed

The home page is no longer a scaffold stub. It composes a `Hero` section:

- Left: `site.name` stacked one word per row, all caps, fluid type
- Right: `site.intro`
- First file under `src/components/sections/`, per [0009](../decisions/0009-component-folders-by-role.md)

The “View work” CTA is commented out until there is a real destination. About copy is still unwritten. Lab routes were not copied.

## Why

Milestone 1 starts with the first screen. The split matches the editorial layout we picked; Polar Night tokens stay the look ([0008](../decisions/0008-ui-lab-is-visual-poc.md)).

## What we learned

A short elevator pitch belongs next to name/role in `site.ts`. The about collection is for longer engineer/human sections, not the Hero lede.
