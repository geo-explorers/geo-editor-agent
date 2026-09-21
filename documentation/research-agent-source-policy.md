# Research Agent — Trusted-Sources Policy

*The Geo-specific standard for judging which sources to trust when researching entities (people, podcasts, organizations, authors) for dataset building. Engine-agnostic: inject into the local model's prompt, hand to `local-deep-research` / Claude deep research, or reference from the Geo-layer skill. Companion to `research-agent-model-report.md`.*

> **Why this exists:** judging source quality is the step *every* leading research tool is worst at (Anthropic's agent preferred spam until fixed; OpenAI's struggles to tell reporting from rumor — see Moh's survey). None of them knows *our* standards. This is the one part actually worth writing down.

---

## 0. Prime directive — grounded only

**Never state a fact the open sources don't support.** No prior knowledge, no inference, no "probably." If the sources don't cover a field, it stays **null** — a blank cell is correct; a confident guess is a data-quality defect. (Proven in the pilot: grounded, the model was accurate; ungrounded, it invented three fake company founders.)

Every fact carries the **source URL it came from**. Not a bibliography at the end — per-fact attribution, because each becomes a Geo **Source** relation.

## 1. Entity-match gate (the #1 failure mode — check FIRST)

Same names collide constantly. A single-name search already returns **8 "Richard Socher" entities** on Geo, some of them different people. Before accepting *any* fact or social from a page:

**Confirm the page is about the SAME entity** — match on a distinguishing anchor the query already fixes (affiliation, field, employer, the podcast's network, a co-founder, a home city). If a page could be about a different same-named person, **discard it** — don't average two people into one entity.

For a page that is genuinely ambiguous: lower confidence, don't use it as a sole source.

## 2. Source tiers — what to trust for what

| Fact type | Trust (in order) | Never accept from |
|---|---|---|
| **Identity / role / affiliation / founding** | The entity's own official page (site, company "About", org registry) → major reputable outlet → Wikipedia **as a lead to corroborate**, not as the sole source | A same-name-different-person page; a listicle; an AI-generated bio |
| **Socials (handles/profiles)** | A link that **physically appears on a source that is verifiably about this exact entity** (their site, official bio, a reputable profile page) | A handle *inferred from the name* (`twitter.com/<firstname><lastname>`); a same-name account; a link on a page that failed the §1 match |
| **Dates / numbers / counts** | Primary source → tier-1 outlet | A single low-tier outlet; a figure no source states |
| **Description prose** | Synthesis of ≥1 trusted source above; verbatim titles/roles ("co-founder" stays "co-founder") | Anything not traceable to a cited source |

## 3. Socials — the strict rule (highest poisoning risk)

A social account is only valid if it **appears as a real link on a page that passed §1**. Do **not**:
- construct a handle from a name pattern,
- accept a same-name account without a distinguishing confirmation,
- promote a "mentioned" handle (someone tweeting *about* them) to "their account."

Better to return `null` for a social than a wrong one — a wrong social is worse than a missing one (it misattributes a real third party).

## 4. Conflicts & confidence

- **Sources disagree on a number → cite the range and the most recent tier-1 figure, never a single unbacked number** (e.g. "3–13 dead; 13 per JPost, Jul 21"). Do not average.
- **Downgrade to `low` confidence (or leave blank)** when: only one source, only low-tier sources, sources conflict on identity, or the §1 match is shaky.
- **Specificity ceiling:** the output may only be as specific as its sources support. If sources are vague, the description is vague — don't invent precision (named round, exact title, exact date) the sources don't state. *(Same discipline as the press-review source-faithfulness gate.)*

## 5. Low-trust patterns — reject as sole/primary sources

Reject (or use only as a weak corroborator, never as the sourcing that carries a claim):
- **SEO/content farms, AI-generated aggregators, listicles, "bio" mill sites.**
- **Syndication wrappers that hide the origin** (`yahoo.com/news/…`, `msn.com/…`, `aol.com/…`) — trace to and cite the originating outlet instead.
- **PR-wire republishers, topic hubs with no specific article, live-blogs** (fine as a lead, not as the citation for a specific fact).
- **Social-media posts as a sole factual source; random personal blogs; user-generated wikis other than Wikipedia** (Wikipedia is a lead, not a terminal source).
- **Raw uploaded files with opaque names** (UUID/`wp-content` PDFs) unless the hosting entity is itself authoritative.

*(Concrete offenders observed in the press-review runs: `yournews.com`, `techtimes.com`, `watchers.news`, advocacy-framed outlets, 2024/2025-dated pages surfaced for a 2026 query — wrong-date results are a distinct trap: check the source's date matches the claim.)*

## 6. What makes a citeable Geo Source

A URL is only attached as a Geo **Source** if it **substantiates the specific fact it's cited for** — not just the broad topic. "Person is CEO of X" needs a source that says *that*, not a generic industry page mentioning both. If you can't point to where the source states the fact, drop the source rather than pad the list.

---

## Compact prompt block (paste into the fact-fill model / hand to any engine)

```
SOURCE RULES (follow exactly):
1. Use ONLY facts present in the provided sources. No prior knowledge. Unsupported field → null.
2. SAME-ENTITY CHECK: only use a page if it is clearly about THIS entity (match on affiliation/field/employer). Same name ≠ same person — discard ambiguous pages.
3. SOCIALS: accept a handle only if it appears as a real link on a page that passed the same-entity check. Never guess a handle from the name. Wrong social is worse than none → null if unsure.
4. Copy titles/roles verbatim ("co-founder" stays "co-founder"). Don't invent precision the sources don't state.
5. Numbers conflict → give the range + most recent source, never a single unbacked figure.
6. Every fact must trace to a source URL. Reject SEO farms, aggregator wrappers, listicles, same-name pages.
7. Thin/single/low-tier sourcing → confidence: low.
```
