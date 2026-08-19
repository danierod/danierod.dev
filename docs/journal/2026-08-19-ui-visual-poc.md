---
title: Visual UI POC on lab routes
date: 2026-08-19
tags: [design-system, poc]
article: none
---

# Visual UI POC on lab routes

## What changed

- Tokens: Polar Night surfaces, frost accent, gold hover. Light/dark plus `html[data-theme]`.
- Lab routes (noindex, sitemap-filtered): `/design-system` (component matrix), `/palette` (color boards), `/ui-idea` (homepage mock).
- Shared classes in `src/styles/components.css`; theme toggle; links-only Tab ([0007](../decisions/0007-keyboard-focus-links-only.md)).
- [0008](../decisions/0008-ui-lab-is-visual-poc.md): this is a look-and-feel POC. Code organization comes next.

## Why

Agree on what the site should feel like before locking file layout and building Milestone 1.

## What we learned

A Dialect-style matrix plus a one-page mock is enough to decide tokens and link/button motion. The CSS and page files are disposable relative to that look.
