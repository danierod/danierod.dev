---
title: UI lab is a visual POC, not production architecture
date: 2026-08-19
status: accepted
tags: [design-system, poc]
article: none
---

# UI lab is a visual POC, not production architecture

## Context

We needed a concrete look before organizing components, tokens, and page structure for the real site. The work landed as lab routes: `/design-system`, `/palette`, `/ui-idea`, plus tokens and classes in `global.css` / `components.css`.

## Decision

1. **These lab routes are a visual POC** for color, type, and interaction (links, buttons, notices, theme, keyboard). They are `noindex` and excluded from the sitemap.
2. **The look is the intent.** Polar Night surfaces, frost accent, gold hover/caret. Treat that as the target UI.
3. **The code layout is not.** File names, CSS layering, where ThemeToggle lives, and how the homepage will be built are unset. Next work is architecture, then implementation. Do not copy lab page structure as the production app.

## Consequences

- Homepage stays the scaffold until architecture lands. Tokens will already apply via `BaseLayout`.
- [0007](0007-keyboard-focus-links-only.md) is a lab interaction choice. Revisit it when public controls (theme, forms, CLI) need a keyboard.
- Refactors that keep the look and throw away the file arrangement are expected.

## Alternatives considered

- **Ship the homepage from `/ui-idea` now** — locks in a mock’s structure before we decide how content collections and islands should sit.
- **Tokens only, no lab pages** — harder to agree on interaction without a matrix and a page mock.
