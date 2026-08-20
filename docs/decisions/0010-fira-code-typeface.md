---
title: Fira Code as the site typeface
date: 2026-08-19
status: accepted
tags: [design-system, typography]
article: none
---

# Fira Code as the site typeface

## Context

The lab locked Polar Night color and interaction ([0008](0008-ui-lab-is-visual-poc.md)) but left type as system UI sans plus a generic mono stack. The production Hero is a full-viewport name plus engineer intro; we needed one face that reads as an engineer’s site without a second display font.

## Decision

**Fira Code** is the only typeface: body, display (Hero), and chrome (`font-mono`). Load it with Astro’s Fonts API and the Fontsource provider so files are self-hosted at build. Fallbacks are `monospace`. Ligatures (`calt`, `liga`) stay on.

## Consequences

- Huge stacked names are monospaced; tracking and `clamp` matter more than with a geometric sans.
- No Google Fonts runtime request. Build needs network the first time Fontsource is fetched.
- Lab copy that said “sans for body, mono for chrome” is outdated; both stacks point at Fira Code.

## Alternatives considered

- **System sans + Fira Code for mono only** — keeps the inspiration’s geometric display, but the homepage would not actually use Fira Code where it is most visible.
- **Google Fonts `<link>`** — extra third-party request and weaker caching than Astro’s self-hosted `_astro/fonts` output.
