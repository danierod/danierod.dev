---
title: Job styles in one file, no component style tags
date: 2026-08-22
tags: [css, components, astro]
article: none
---

# Job styles in one file, no component style tags

## What changed

`sections/jobs/` now has a single `jobs.css` (list + entry). Production components and `/work` import colocated CSS from the frontmatter (`Chip`, `Link`, `Text`, jobs, `work.css`). [0014](../decisions/0014-component-css-files-not-style-tags.md) records that as the default: this catalog will not outgrow prefixed class names, so Astro scoping is not worth a `<style>` tag. [0009](../decisions/0009-component-folders-by-role.md) points at that loading rule. Lab routes may still inline POC CSS.

## Why

`.jobs` lived in a tag on `JobList` while `.job*` lived in `job-entry.css` loaded from another tag. One folder, one sheet, markup without CSS. The same loading rule then applied to the rest of production.

## What we learned

Astro scoping was a side effect of `<style>`, not a requirement. Unique class prefixes are enough at this size. `Text` still relies on `BaseLayout` declaring cascade layers so `@layer components` beats heading preflight after the move into the Vite graph.
