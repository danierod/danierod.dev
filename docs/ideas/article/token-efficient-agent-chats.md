---
title: Practical ways to spend fewer tokens in a long agent chat
date: 2026-08-18
tags: [cursor, agents, tokens, workflow]
article: long-form
---

# Practical ways to spend fewer tokens in a long agent chat

Seed: the 2026-08-18 pairing that shipped Cloudflare Pages, DNS, DNSSEC, and a www→apex redirect. Ground the published piece in that session (and a **measured replay** — do not publish the back-of-envelope % below as fact).

## Angle

Token cost in Cursor is mostly **context replay**: every turn resends the thread, open files, rules, and tool traces. A 25-turn dashboard walkthrough is expensive even when each user message is one screenshot. The win is fewer turns, smaller artifacts, and not mixing “click this” with “edit the repo” in the same mode.

This is not “write shorter emails.” It is **how you structure a pairing session** so the model does not re-diagnose the same deploy twice.

## Case study (this repo, 2026-08-18)

What the session actually did:

- Ask mode: Pages vs Workers, failed `npx wrangler deploy`, DNS onboarding, DNSSEC
- Agent mode: ROADMAP/journal/ADRs, canonical `<link>`, then a commit
- Many turns were **screenshots with no question**

What inflated tokens:

1. **Empty screenshot messages** — image + full history, no task. One line (“keep this template?”) is enough.
2. **Partial then complete logs** — first paste stopped at `astro check`; the error was `wrangler deploy` / `workerd` builds. Two analyses of the same failure.
3. **Wrong product first** — dashboard “Import a repository” is Workers. Specifying “Create → Pages → Connect to Git, no adapter” up front would skip the Worker detour.
4. **Ask then Agent on the same work** — coaching clicks does not need repo tools; writing ADRs does. Splitting is cheaper than one mega-thread.
5. **Docs in the middle of clicking** — decision-log rules (ADR + journal + ROADMAP) are correct; batch them when the dashboard work is done.
6. **Plugin / general “how Pages works”** before “deploy *this* static Astro repo.”

What was already cheap: constraints (“no wrangler.jsonc if it is Cloudflare-only”), the second full log, Network-tab proof of the 301.

## Back-of-envelope (not for the headline)

Until you run the measurement protocol below, treat this as a **hypothesis from turn structure**, not billing data.

Rough split of that session: ~25 user turns. Maybe **8–10** were unlabeled screenshots; **~5** were the Worker-vs-Pages detour; **2** were incomplete logs; docs/Agent work was interleaved instead of one handoff.

If those collapse (one goal message, one full log, labeled screenshots, Ask for clicks / Agent for files, docs at the end), a **~40–55%** cut in *turns* is plausible, and token use often tracks turns more than typing. Tool-heavy Ask answers (Cloudflare docs MCP on every screen) add more; an optimized chat would fetch docs once.

**Do not publish 40–55% until Chat A vs Chat B is measured.** Conversations with huge screenshots can make image tokens dominate; then saving turns still helps, but the % will differ.

## Practical tips (article body)

Lead with the outcome and constraints in one message. Example:

> Static Astro, Git Pages, no adapter, no wrangler. Repo is on GitHub. Click path for Create → Pages → Connect to Git, then custom domain. I will screenshot only if a screen does not match.

Then:

- **Ask for the next three clicks** before clicking. Product forks (Pages vs Import repository) are where hours and tokens go.
- **One artifact per failure:** settings screenshot + last 40 lines of log through `Failed:` / `✘ [ERROR]`. Skip `pnpm` progress.
- **Label every screenshot** with the decision: “DNS import — I have no email on this domain. Delete Website Builder A records?”
- **Ask mode** for dashboards and “why.” **Agent mode** for git/docs/code. One handoff: “Live at danierod.dev. Update ROADMAP, journal, ADRs.”
- **Say “no docs until I ask”** if the decision-log rule would otherwise fire mid-wizard.
- **Commit (and push) in one instruction** when you want production updated.

## Outline for the published piece

1. Tokens are context, not typing
2. Case study: Pages deploy that started as a Worker
3. Tips (above), each with a before/after prompt
4. Measured % from the protocol (fill in when you have numbers)
5. What not to over-optimize (constraints, full error logs, a single confirmation screenshot)

## Measurement protocol (run this when writing)

You need **two chats that aim at the same outcome**, not two vibes. Define the outcome in writing first, e.g. “Explain www→apex canonicalization and the Cloudflare Redirect Rule for danierod.dev” or “Diagnose this Pages build log.” Do **not** replay the entire 25-turn DNS wizard unless you want a weekend.

### The two output types

| Label | What it is | Prompt pack |
| --- | --- | --- |
| **A — conversational pairing** | How this session actually felt | Short messages, screenshots with no caption, paste logs in two chunks, mix “what is this screen?” with “update the roadmap” |
| **B — batched pairing** | The optimized protocol | One spec (goal + constraints), one complete log or one labeled screenshot, Ask vs Agent stated, “no docs unless asked” |

Same model, same repo, **new chats** (do not continue this thread). Same Cursor mode per pair: either both Ask or both Agent. If you also want Ask vs Agent, that is a **second experiment** (four chats: A-Ask, B-Ask, A-Agent, B-Agent). Agent will spend extra on tools even when the user text is identical.

### How to record usage in Cursor

Cursor’s UI moves; try in this order and note which one you used in the article:

1. **Cursor Settings → General / Usage** (or [cursor.com](https://cursor.com) account usage). If the UI shows **per-chat** input/output tokens, screenshot Chat A and Chat B after each run.
2. **In-chat / composer footer** — some builds show token or request counts on the thread. If present, photograph before closing the chat.
3. **Export the chats** (share/export if available) or copy the full transcript. Save as `chat-a.md` and `chat-b.md`.
4. If Cursor only shows **request counts** or **subscription usage**, still record: number of user turns, number of tool calls (expand the thread), and wall time. Turns × tools is a proxy when token totals are hidden.

Do not use “feels shorter” as the metric.

### Count tokens from transcripts (when the UI has no totals)

After export, run a tokenizer on **input-shaped** text (user + prior assistant + rules is what you cannot see exactly; transcript length is still a consistent proxy).

```bash
# Example: OpenAI-compatible tokenizer (cl100k_base is a proxy, not Cursor’s exact meter)
pnpm dlx tsx -e "
import { encoding_for_model } from 'tiktoken';
import { readFileSync } from 'node:fs';
const enc = encoding_for_model('gpt-4o');
for (const f of ['chat-a.md', 'chat-b.md']) {
  const n = enc.encode(readFileSync(f, 'utf8')).length;
  console.log(f, n);
}
"
```

Use the **same** tokenizer on A and B. Report:

- `turns_A`, `turns_B`
- `tokens_A`, `tokens_B` (UI or tiktoken)
- `tool_calls_A`, `tool_calls_B` if visible

Reduction:

```text
% fewer tokens = (tokens_A - tokens_B) / tokens_A × 100
% fewer turns  = (turns_A - turns_B) / turns_A × 100
```

Publish both. If they diverge, say so (e.g. B used one huge log; turns dropped more than tokens).

### Keep the experiment honest

- Same date, same model, same project rules enabled.
- Do not paste this article seed into Chat B (it would leak the “answer”).
- Stop both chats at the same success check (e.g. “301 from www to apex explained” or “root cause of the log named”).
- If Chat A includes images, Chat B should include the **same images** when they are necessary, with captions. The test is structure, not “no screenshots.”

### What to put in the published article

A small table:

| | Turns | Tokens (input+output or transcript) | Tool calls |
| --- | --- | --- | --- |
| A conversational | | | |
| B batched | | | |
| Reduction | | | |

One paragraph: what still cost money in B (rules, repo map, one docs search).
