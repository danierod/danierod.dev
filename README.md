# danierod.dev

Personal website of Daniel Rodrigues. Static Astro site; content lives in git as MDX.

## Stack

- [Astro](https://astro.build) 7 (static HTML, React islands later)
- [Tailwind CSS](https://tailwindcss.com) v4
- MDX content collections with Zod schemas
- pnpm, Node `>=22.12.0`

Intended host: **Cloudflare Pages** (not wired up yet). No framework adapter — `astro build` emits a static `dist/`.

## Commands

```sh
pnpm dev       # local server
pnpm check     # types + content schema
pnpm build     # check, then static build
pnpm preview   # serve dist/
pnpm format    # Prettier
```

## Content

Add an MDX (or Markdown) file under the matching folder. Frontmatter is validated at build time — see [`src/content.config.ts`](src/content.config.ts).

| Collection     | Path                            | Notes                            |
| -------------- | ------------------------------- | -------------------------------- |
| `about`        | `src/content/about/`            | `title`, `order`                 |
| `case-studies` | `src/content/case-studies/`     | company, impact, technologies, … |
| `writing`      | `src/content/writing/`          | `kind: article \| til`           |
| `testimonials` | `src/content/testimonials.yaml` | structured quotes                |

Site-wide identity (name, tagline, socials) is [`src/data/site.ts`](src/data/site.ts).

Drafts: set `draft: true` and filter them out in pages when those routes exist.

## Project log

[`docs/`](docs/README.md) tracks roadmap, architecture decisions, and a work journal. It is **not** published. Promote an entry into `src/content/writing/` when you want a public post.

Planned features live in [`docs/ROADMAP.md`](docs/ROADMAP.md).
