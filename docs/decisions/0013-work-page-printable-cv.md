---
title: Work page is the printable CV
date: 2026-08-21
status: accepted
tags: [cv, astro, content]
article: none
---

# Work page is the printable CV

## Context

The live site needed a destination from the Hero. Case studies are not written yet. [0004](0004-cv-pdf-not-on-pages.md) already deferred a generated PDF: the first CV is HTML plus print CSS.

A lab route (`/work-draft`) proved the layout. Production needed a real URL, a content source, and kit primitives instead of a one-file mock.

## Decision

1. **`/work` is the dual-purpose surface.** Screen is work experience. Print (`@media print`, A4, light tokens) is the CV. No `/cv` alias. No Playwright PDF in this milestone.
2. **Experience lives in the `experience` collection** (`src/content/experience.yaml`). Site identity and stack stay in `src/data/site.ts`. CV singleton copy (lede, education, languages) lives in `src/data/cv.ts`.
3. **The job list is a compound:** `sections/jobs/JobList.astro` + `JobEntry.astro`. The page composes; it does not own job markup.
4. **Hero “View work” points at `/work`.**

## Consequences

- Print → Save as PDF is the download path until CI PDF lands ([0004](0004-cv-pdf-not-on-pages.md)).
- Case-study routes can later link from `JobEntry` without changing the collection’s job facts.
- Lab `/work-draft` is gone; do not treat lab pages as the production tree ([0008](0008-ui-lab-is-visual-poc.md)).

## Alternatives considered

- **Keep copy in `work.astro`** — faster for a mock, drifts from `/llms.txt` and later case studies. Rejected.
- **Reuse `case-studies` now** — those are long-form write-ups; jobs are structured roles. Rejected.
- **`/cv` as the URL** — Hero already said “View work”; the screen is a work page. Print styling does not need a second path.
