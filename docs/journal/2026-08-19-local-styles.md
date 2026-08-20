---
title: Local styles and Link folder
date: 2026-08-19
tags: [components, css, design-system]
article: none
---

# Local styles and Link folder

## What changed

- [0009](../decisions/0009-component-folders-by-role.md): prefer local/scoped styles unless they cannot work or there is a strong reason not to. Applies to every module, not only kit primitives.
- `Link` lives in `src/components/ui/link/` (`Link.astro` + scoped `link.css`). Layout (inline/stack) is in that CSS. Global `.link*` rules left `components.css`.
- Lab routes that still need the look import `Link`.

## Why

Kit CSS sitting in `components.css` so lab pages could use class names made the POC a load-bearing consumer. The component is the API; the lab can be deleted.

## What we learned

`<style>` with `@import "./link.css"` scopes the look to elements `Link` renders. Markdown `<a>` tags will need a prose rule or MDX map when writing ships — not a global `.link` class.
