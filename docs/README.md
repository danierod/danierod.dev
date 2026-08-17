# Project log

This folder is the working memory for [danierod.dev](https://danierod.dev): what we plan to build, which technical choices we made, and what changed along the way.

It is **not** part of the public site. Published posts live in [`src/content/writing/`](../src/content/writing/). When an entry is worth an article or TIL, copy it into that collection and edit it for readers.

| Path                       | Use for                                             |
| -------------------------- | --------------------------------------------------- |
| [ROADMAP.md](ROADMAP.md)   | Features to implement, with status                  |
| [decisions/](decisions/)   | Architecture Decision Records (one choice per file) |
| [journal/](journal/)       | Dated notes after major human or agent work         |
| [ideas/article/](ideas/article/) | Draft long-form post ideas                    |
| [ideas/til/](ideas/til/)   | Draft Today I Learned notes                         |

## How to add an entry

1. Copy the template in that folder (`_template.md`).
2. For decisions, use the next four-digit number (`0005-…`).
3. For journal entries, use `YYYY-MM-DD-slug.md`.
4. Fill in frontmatter. Set `article` to `long-form`, `til`, or `none` so future-you can grep for post ideas.
5. Scratch notes for a future post go in [`ideas/article/`](ideas/article/) or [`ideas/til/`](ideas/til/). Promote into `src/content/writing/` when you publish.

Cursor agents follow [`.cursor/rules/decision-log.mdc`](../.cursor/rules/decision-log.mdc) and should update this folder when they make a decision or land a major change.
