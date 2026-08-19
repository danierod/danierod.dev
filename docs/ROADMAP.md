# Roadmap

Status values: `planned` · `in-progress` · `done` · `wont-do`

| Status  | Feature                          | Notes                                                                                                                                         |
| ------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| done    | Repository scaffold              | Astro 7, Tailwind v4, MDX collections, docs log. See [journal/2026-08-17-repository-scaffold.md](journal/2026-08-17-repository-scaffold.md). |
| done    | Cloudflare Pages deploy          | Git Pages project, static `dist/`, no adapter. Live at `danierod-dev.pages.dev`. See [journal/2026-08-18-cloudflare-pages-deploy.md](journal/2026-08-18-cloudflare-pages-deploy.md). |
| done    | Domain & DNS                     | GoDaddy registrar, Cloudflare nameservers, Pages custom domains. Canonical apex ([0006](decisions/0006-canonical-apex.md)). See [0005](decisions/0005-godaddy-registrar-cloudflare-dns.md) and [journal/2026-08-18-domain-and-dns.md](journal/2026-08-18-domain-and-dns.md). |
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
| planned | UI architecture                  | Organize tokens, components, and pages for the real site. Components by role ([0009](decisions/0009-component-folders-by-role.md)). Lab look is the target ([0008](decisions/0008-ui-lab-is-visual-poc.md)); lab code is not. |
| in-progress | Visual assets & tokens           | Visual POC on `/design-system`, `/palette`, `/ui-idea` ([0008](decisions/0008-ui-lab-is-visual-poc.md)). Still: headshots, favicon.                                    |
