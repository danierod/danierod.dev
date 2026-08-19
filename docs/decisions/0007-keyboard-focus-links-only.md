---
title: Keyboard focus is links only
date: 2026-08-18
status: accepted
tags: [a11y, design-system, keyboard]
article: none
---

# Keyboard focus is links only

## Context

Tab through `/design-system` and `/ui-idea` hit dozens of specimen buttons, theme toggles, inputs, and the terminal `<summary>` before a real link. The lab UI is meant to feel like walking a terminal: Tab should land on destinations, not chrome controls. Buttons and fields stay mouse-usable.

## Decision

1. **Tab order** includes links (`<a href>`) only. Buttons, inputs, selects, textareas, `<summary>`, `<pre>`, and overflow `auto`/`scroll` regions get `tabindex="-1"`. (Chromium puts overflowing `<pre>` and other scroll boxes in the tab order.) A layout script re-applies that so new controls do not sneak back in.
2. **Focus styles** exist only on `.link`, `.link-nav`, and `.caret-link` (gold last-character fill). Other controls have no `:focus` / `:focus-visible` ring.

## Consequences

- Keyboard users cannot reach theme toggle, buttons, fields, or the terminal drawer via Tab. Pointer still works.
- Skip-to-content stays in the tab order because it is a link.
- This is a lab aesthetic ([0008](0008-ui-lab-is-visual-poc.md)). Revisit before Milestone 1 if the public site needs keyboard-operable controls (forms, theme, CLI).

## Alternatives considered

- **Skip specimen matrices only** — still leaves theme toggle and live buttons in the tab order.
- **`disabled` / `inert`** — blocks clicking, which we still want for the live button row.
- **CSS-only** — cannot remove an element from sequential focus; `outline: none` only hides the ring.
