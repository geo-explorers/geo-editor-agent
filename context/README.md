# Geo knowledge-graph — agent context pack

Six files of durable reference an editor agent needs *around* the skills: the working ID
registry, the topic-reference rules, two measured notes on how the API really behaves, what
the merge helper still gets wrong, and how to QA a claim-grouping result.

**Skills are not in this folder** — they are at `skills/` in the repository root, and their
`SKILL.md` files are the maintained source for query shapes, the publishing model and the
canonical-selection cascade. Neither are the ontology specification
(`knowledge-graph-ontology.md`, root) or the research-agent documents (`documentation/`);
each lives once, where the toolkit keeps it.

Every file carries a provenance header naming the kind of source it came from and the filename
(never a machine path), a one-line note on how to read it, and a ⚠️ flag where something has since
gone stale.

**This is a dated capture (2026-09-16), not live state.** When a file here disagrees with the
live graph or a current `SKILL.md`, the live source wins — and say so in the report.

---

## The one thing to fix on sight

Documents written before August 2026 reference the read endpoint
`testnet-api.geobrowser.io/graphql`. **That host is retired — and still answers HTTP 200 with
stale data rather than failing.** The current endpoint is:

```
https://api-testnet.geobrowser.io/graphql
```

Note the hyphen position. Nothing else about those documents' query shapes or findings changed.

---

## Where to look

| If the agent needs to… | Read |
|---|---|
| Find a space, type, property or never-touch ID | `space-type-and-property-ids.md` — *(written for this pack)* canonical and dataset spaces, types, properties, tags, data types, views, and the never-touch IDs (voting data, anchored identity entities). `src/constants.ts` wins if they disagree. |
| Decide **which** duplicate topic to reference or keep | `topic-reference-and-canonical-rules.md` — the eight topic-reference rules and the canonical space and topic ID tables. |
| Write a GraphQL query that doesn't time out | `graphql-schema-quirks.md` **first** — ten verified places where the live API disagrees with its documentation; the single highest-value file here. Then `graphql-performance-and-limits.md` — `first`/`offset` hard-capped at 1000, ~7 s deep-tail stalls that retrying will not fix. |
| Check a `geo-clean` merge dry-run | `merge-helper-quirks.md` — what `mergeEntities` still gets wrong: soft-duplicate relation detection, orphan-cascade blast radius, redundant delete ops. |
| QA a claim-grouping result | `claim-grouping-qa-method.md` — diagnosing an over-assigned relation layer (transitive hub-closure drift). |

Everything else an agent used to find here has a maintained home:

| Formerly here | Read instead |
|---|---|
| Hard rules, testing tiers, the full-ID rule, "never publish while testing" | `AGENTS.md` |
| Query shapes known to work | `skills/non-actionable/geo-query/SKILL.md` |
| The publishing model | `skills/actionable/geo-publish/SKILL.md`; the publisher is `src/functions.ts` |
| Which duplicate survives a merge | `skills/actionable/geo-clean/SKILL.md` § Canonical selection |
| Why Podcasts claims are never linked; one edge per distinct assertion | `skills/actionable/geo-claim-grouping/SKILL.md` HARD RULES |
| Multi-space copies and per-space values | `skills/actionable/geo-mirror/SKILL.md` (gotchas) |
| Press-review traps | `skills/non-actionable/geo-press-review/SKILL.md` |
| Lessons from earlier campaigns | `docs/lessons.md` |

---

## What was deliberately left out

A 2026-09-16 capture of 56 files was trimmed to 19 and then to these 6 on 2026-09-21.
Removed: everything a vendored skill or `AGENTS.md` already states; notes from other working
projects (none of them part of the editor workflow); one-off campaign logs and session specs
whose surviving rules are in the skills; skill-maintenance material; superseded SDK and
migration notes. Nothing here is the only copy — the working repository it was captured from
keeps the full set.
