---
title: Work page that prints as a CV
date: 2026-08-21
tags: [work, cv, astro]
article: none
---

# Work page that prints as a CV

## What changed

`/work` is a real route: experience YAML, a `JobList` / `JobEntry` compound, `Chip`, print CSS. The Hero CTA points here. Lab `/work-draft` is gone. [0013](../decisions/0013-work-page-printable-cv.md) records the dual-purpose page.

## Why

The homepage needed a destination. Case studies can wait; a structured work history that prints as a CV does not.

## What we learned

A lab draft is useful for layout, but copy in the page file should not survive promotion. Compound list/entry keeps the route as composition.
