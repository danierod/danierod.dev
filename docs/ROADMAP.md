# Roadmap

Status values: `planned` · `in-progress` · `done` · `wont-do`

| Status  | Feature                          | Notes                                                                                                                                         |
| ------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| done    | Repository scaffold              | Astro 7, Tailwind v4, MDX collections, docs log. See [journal/2026-08-17-repository-scaffold.md](journal/2026-08-17-repository-scaffold.md).  |
| planned | Cloudflare Pages deploy          | Git integration; keep the site fully static (no adapter). First deploy serves `*.pages.dev`.                                                  |
| planned | Domain & DNS                     | Domain stays registered at GoDaddy. Switch nameservers to Cloudflare, then add `danierod.dev` as a Pages custom domain (after the first deploy). |
| planned | Milestone 1: Hero + About        | Fill `src/content/about/` and the home page shell.                                                                                            |
| planned | Milestone 2: Case studies        | MoonPay and Urban Sports Club MDX entries plus listing/detail routes.                                                                         |
| planned | Milestone 3: Writing engine      | Articles + TIL from the `writing` collection, RSS feed.                                                                                       |
| planned | Milestone 4: CLI terminal drawer | React island (`client:idle` / `client:visible`); `cat about.md`, easter eggs.                                                                 |
| planned | Raw markdown routes              | `/about.md`, `/case-studies.md` generated from collections.                                                                                   |
| planned | `/llms.txt`                      | Build-time plaintext index for LLM crawlers.                                                                                                  |
| planned | JSON-LD + Open Graph             | Person / ProfilePage graph and social preview cards.                                                                                          |
| planned | Analytics                        | Privacy-focused (Cloudflare Web Analytics or Plausible).                                                                                      |
| planned | `/cv` + PDF                      | Print CSS on `/cv`. If a static `public/cv.pdf` is needed, generate it in GitHub Actions with Playwright — not in the Cloudflare Pages build. |
| planned | Testimonials section             | Fill `src/content/testimonials.yaml`.                                                                                                         |
| planned | Visual assets & tokens           | Headshots, favicon, real design tokens.                                                                                                       |
