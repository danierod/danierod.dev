---
title: Component CSS lives in files, not style tags
date: 2026-08-22
status: accepted
tags: [astro, css, components]
article: none
---

# Component CSS lives in files, not style tags

## Context

[0009](0009-component-folders-by-role.md) colocates CSS with the module and allowed two ways to load it: a scoped `<style>` with `@import "./….css"`, or rules written in the component. Job list styles split across both: `JobEntry` imported `job-entry.css` from a `<style>` tag; `JobList` kept `.jobs` in its own tag.

`<style>` hides the stylesheet, invites one-off rules next to markup, and makes a compound look like two styling systems. Astro scoping would also prevent a parent sheet from matching a child’s classes.

This site will not grow a catalog where two unrelated `.chip` classes collide. Scoped CSS is protection we do not need.

## Decision

Frontmatter `import` of a colocated `.css` file is the default for production components and production pages.

- Put the look in a `.css` file next to the Astro module. Import it from the frontmatter (`import "./jobs.css"`).
- A compound shares one stylesheet named for the folder. `sections/jobs/` uses `jobs.css` for both `JobList` and `JobEntry`; each file imports it so either can render without the other.
- Class names are global. Prefix by module (`.jobs`, `.job-*`, `.type-`, `.chip`) as hygiene, not as a scaling strategy.
- Do not use a `<style>` tag when a colocated file can hold the rules.

Lab routes may keep large inline POC styles ([0008](0008-ui-lab-is-visual-poc.md)).

## Consequences

- Markup stays markup. The CSS file is the place to read and change the look.
- Selectors are unscoped. A class used in markdown or a lab page will pick up the look if the name matches. That is acceptable here.
- Frontmatter CSS joins the Vite graph. Layered files (`@layer components` on `Text`, `Link`, `Chip`) still beat Tailwind preflight because `BaseLayout` declares layer order first ([0012](0012-typography-text-primitive.md)).
- `Chip`, `Link`, `Text`, jobs, and `/work` all load this way.

## Alternatives considered

- **Keep scoped `<style> @import` for kit primitives** — safer if class names collide. Rejected: this site will not reach that size, and it would be two loading styles for one codebase.
- **Inline rules in the Astro file** — no extra file, but the look is trapped in the template and cannot be shared by a compound without duplication.
- **One global jobs sheet in `src/styles/`** — works, but pulls section CSS away from the modules that own the markup ([0009](0009-component-folders-by-role.md)).
