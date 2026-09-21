# Research Agent — Basic Agent MVP

**Owner:** Vytautas · **Judge:** Armando · **Deadline:** report by 5–6 Aug 2026 (set at the 3 Aug sync)

**The approach (Arturas, confirmed 4 Aug):** the research agent is a **top-tier model (Claude / OpenAI / Gemini) + web search + our requirements** (the trusted-sources allowlist and source policy). No self-hosted research framework, no local models. We wire the proven pieces and test whether the combination is good enough.

**The question this MVP answers:** can that combination produce output that is *publishable into Geo* — every fact grounded, every claim cited from an allowlisted source, quality good enough that an editor only reviews rather than rewrites?

Secondary question: **which top-tier model** (and which search mode) gives the best publishable output at the lowest cost — a light Claude vs GPT vs Gemini read on the same tasks.

---

## What we are NOT doing

Per Arturas's startup-style directive (30 Jul):

- **No local/open-weight models.** That whole track (Jan-v1-4B, RunPod, etc. — see `./research-agent-model-report.md`) is shelved until the system works end to end. Top-tier models only (Claude, GPT, Gemini).
- **No self-hosted research framework.** No local-deep-research / GPT-Researcher / any deep-research engine we run ourselves. The agent is a top-tier model doing its own web search under our source policy — nothing more to stand up.
- **No building research tooling from scratch.** We wire proven parts (the model's own search + our requirements) and fix details while using a working system.
- **No automated citation-check layer yet.** That's a confirmed build-ourselves gap, but for the MVP the citation check is done by hand (a checklist, below).
- **No SearXNG self-hosting for the MVP.** The models' built-in web search is enough for a 1–2 day quality test; cost numbers are still recorded so results inform any later search decision.

## The MVP pipeline

The basic working flow — a top-tier model does the research, our requirements constrain it, a human gates the output:

1. **Editor asks a research question in the model** (Claude Code, or GPT/Gemini for the comparison runs).
2. **The model researches it with its own web search** under our source policy — no external engine to stand up. The same question is run through **Claude / GPT / Gemini** so we get a light quality + cost read across the three; there is no self-hosted-framework config.
3. **Source policy is enforced by prompt**, not code: the model is instructed to cite only allowlisted domains and to flag any non-allowlisted source it wants to use as a *proposal* (with an argument), per the allowlist rules. The full source-quality standard is `./research-agent-source-policy.md` — grounded-only prime directive, entity-match gate, per-fact attribution, the strict socials rule. It is injected into every run.
4. **Manual citation check** (stand-in for the future checking layer) — for every output, before it reaches Armando:
   - [ ] every statement has ≥1 citation (preferably more)
   - [ ] every cited URL actually states the specific fact it's attached to (not just the topic)
   - [ ] every cited domain is on the allowlist, or listed separately as a source proposal
   - [ ] no fact is more specific than its sources support
   - [ ] dates on sources match the claim (no stale-page traps)
5. **Editor review → publish to Geo** via the existing geo-publish flow, facts becoming entities/claims with **Source** relations.

## Trusted sources (MVP allowlist)

**Unblocked 5 Aug:** Mantas's news-worker Top 200 landed — 134 domains across tiers 1–4, each tagged with the spaces it serves. The injectable copy lives at `./research-agent-allowlist.md` (Notion "Trusted-sources allowlist" is canonical); inject it into every run together with the source policy.

Still pending: Armando's government / primary sources — congress.gov and sec.gov remain *Proposed* from the 30 Jul call, so the policy/regulatory question (#3) will exercise the **source proposal** path (suggest-with-argument → human approves) rather than a pre-approved cite. Anything else the agent wants outside the 134 goes through the same proposal loop.

## Test plan

Start with 3 (add #4–5 only if time), each run through Claude / GPT / Gemini:

| # | Question type | Why it's in the set |
| --- | --- | --- |
| 1 | Enrich an existing Geo entity (person or org) — verify facts, description, socials | The core dataset-building job; exercises the entity-match gate |
| 2 | A current-events question (news-shaped, answerable from tier-1 outlets) | Tests freshness + supersession discipline |
| 3 | A policy/regulatory question (congress.gov / sec.gov — both still *Proposed*, not approved) | Tests primary-source use **and** the source-proposal path |
| 4 | One deliberately allowlist-poor question | Forces the source-proposal path |
| 5 | (high-stakes) mapping a debate — run on the strongest model's deep-research mode | Benchmarks the quality ceiling so Armando sees the best case |

**Recorded per run:** output quality (Armando's judgment), citation-check pass rate, cost (tokens / $), wall-clock time, setup friction.

## Success criteria

- Armando judges at least the enrichment and news outputs **publishable after light review** (edit, don't rewrite).
- Citation checklist passes without hand-fixing sources.
- A clear recommendation on which top-tier model + search mode to use, with real cost/quality numbers, feeding back into Moh's stack doc.

## Deliverables

1. The research outputs themselves (published to Geo where Armando approves).
2. A short report: per-question results table, Claude/GPT/Gemini cost + quality comparison, and any allowlist source proposals the runs generated.
3. Feedback upstream: gaps found in the source policy / allowlist / stack doc.

## Open questions

- ~~Which Geo space do MVP outputs publish into?~~ **Resolved: a personal space, for the MVP only** — test outputs never touch a production topical space.
- Citation shape in Geo: wiki-style linked text vs claims-with-Sources is Moh's priority #4 and undecided — MVP defaults to **claims with Source relations** (matches the existing geo-publish contract) unless told otherwise.
- Does Armando judge raw agent output, or output after editor review? (Assumed: after the manual citation check, before any content rewriting.)
