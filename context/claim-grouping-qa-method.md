<!-- geo-agent-context -->
> **Source:** private working note `geo-related-claims-qa-2026-08-21.md` in the canonical toolkit clone (not committed upstream)  
> **Captured:** 2026-09-16 · **Read as:** case study — how to QA an over-assigned relation layer (transitive hub-closure drift)  
> ⚠️ **Not in this repository:** the `scripts/2026-08-21-related-qa/` files this note cites were one-off campaign scripts in the toolkit clone. The method is the durable part.  

---

# QA — Related-claims layer on "Claim grouping in AI space" (2026-08-21)

**Status: assessment only — NOTHING PUBLISHED, no ops staged.**
Page: `adf48ffe073a4d9c8b96a21ccfa31fe6` (AI space `41e851610e13a19441c4d980f2f2ce6b`), 48 debate claims, 13 topic tables.
Artifacts: `scripts/2026-08-21-related-qa/` (qa-pairs.json — all 618 pairs classified; qa-prune-lists.json + prune-lists.md — full-ID prune candidates; qa-edges.json — raw live pull).

## Headline numbers

- **618 unique Related pairs** touch the 48 page claims (1,120 directed edges). Per-claim spread: **1 to 37 partners** (median ≈ 11).
- Provenance: **105 same-block** (curated, solid) · **77 adjacency-class** (08-18 density round, editor-approved policy, lightly adjudicated) · **64 pass-1/manual** (adjudicated) · **372 closure-round bulk** (08-21, hub-sibling mesh, never per-pair adjudicated — 60% of the volume).
- Brackets on the page today: Similar 24 · Duplicate 4 · Supports 22 · Opposes 54 directed edges — **excluding the 46 r3 bracket edges still awaiting votes** (AI `0x82da5516…`, WA `0x7a5c7352…`).

## Verdict

**The editor's instinct is right on both counts, with one nuance.**

1. **Over-assignment is real but concentrated.** The closure round converted three adjacent theme families (Chinese AI models × Geopolitics & Chips × Open weight AI) plus (AGI × consciousness) into near-complete cliques. Result: 11 claims carry 27–37 Related partners — 3× the team's "popular claims ≥10" target — and those table cells are unusably long.
2. **Outright errors are few.** Only **29 pairs (~5% of the closure output) fail the topic bar entirely** — cross-family links whose sole connection is a shared hub neighbor. Worst examples: "AI can never become conscious." ↔ "Governments should not have the power to slow AI development." (via the AGI-pause hub); "Democracies should form a global AI alliance…" ↔ "Once an AI model is released as open source, there is no mechanism to moderate…"; "AGI should never have human rights." ↔ "We should slow down AI development". Transitive hub-closure (A~H, B~H ⇒ A~B) is exactly the drift mechanism the step-1 bar warns about.
3. **The bulk of the mesh is *valid but excessive*.** 204 closure pairs are within one debate family (topic bar: pass) and 136 re-mesh the adjacent families exhaustively — duplicating in bulk what the 08-18 density round had already done with curated selection (its 77 adjacency links).
4. **Under-assignment is real too.** AI benchmarks claims have **1 Related each** (only each other); healthcare 7; 2026 Controversies 8; companions/IP 9. The imbalance the editor senses is mostly the mega-cluster's contrast, but benchmarks is genuinely starved — obvious candidates exist and are listed below.

## Recommended remediation (four levers, none executed)

| Lever | Action | Size | Effect |
|---|---|---|---|
| **1 — correctness** | Prune the 29 cross-family closure pairs (full IDs in prune-lists.md) | ~58 edge deletions | removes the genuinely wrong links |
| **2 — density rollback** | Prune the 136 closure adjacent-family mesh pairs — the curated 08-18 adjacency links (77) remain | ~272 edge deletions | Open-weight claims 31→13–15, Geopolitics 27→11–12, AGI/consciousness 14→10–12 |
| **3 — additions** | Small step-1 addendum for starved claims: benchmarks ↔ {`bf4b152f` safety-over-competitive-advantage, `718e78ee` mandatory evals, `792903e9` UK AISI evaluations}; plus the 3 missing pairs from r3 (`missing-related-pairs.json`) | ~12–15 new pairs | benchmarks 1→4–5; fills documented gaps |
| **4 — brackets** | Vote the r3 proposals (46 edges); then promote a QA-selected subset of the 28 recorded medium calls | 0 new work now | Similar/Supports/Opposes columns fill without new adjudication |

**Projected after levers 1+2:** the page ranges ~7–27 instead of 1–37. The five Chinese-AI-theme claims stay at 25–27 — *not* an error: that family genuinely holds ~20 distinct positions/arguments/facts of one hot debate. If that still feels heavy, an optional lever 5 (thin the within-family news-fact fan-outs: Kimi K3 / Alibaba / Nvidia-progress each meshed to ~7–10 positions) takes them to ~20–22, at the cost of pruning links that do pass the topic bar — taste call, not correctness.

## Notes

- The prune levers are `deleteRelation`-only (geo-clean route, same as the Podcasts unlink) and reversible via the ops files.
- The benchmarks pair ("AI benchmarks no longer reflect real-world capability" / "AI companies optimize for benchmark scores rather than usefulness") is the adjudication rubric's own worked example of SIMILAR, but live it carries only Related + a Supporting edge — bracket-promotion candidate.
- Root cause worth recording: the closure round's "bulk-accepted siblings" skipped per-pair adjudication by design; combined with hub-transitivity it over-densified. Future closure passes should stay within one family and exclude news-fact × position meshing.
