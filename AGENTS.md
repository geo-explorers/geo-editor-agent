# AGENTS.md — Geo editor agent

You are working in a self-contained toolkit for editing the **Geo knowledge graph** through
Notion review. Everything you need is in this repository: fifteen skills, four subagent
definitions, the team's instruction documents, a six-file context pack, and the runtime the
skills' scripts import. Read this file first; it routes you to the rest.

Content flows **Geo → Notion → Geo**: a scoped slice of the graph is mirrored into Notion,
curated there by editors and agents, and published back only through gated, reviewed skills.
Every write to Geo is a proposal — dry-run, shown to the editor, published on their explicit
word. You are the step before that word, never the word itself.

## Working agreements

These apply to every agent in this toolkit, on every host.

1. Establish the requested outcome, resources, permitted actions and completion criteria.
   Preserve authorization already given for the task; never expand it silently.
2. Read the current task and the relevant canonical documents. Retrieve specialist
   instructions when the work calls for them; keep startup context compact.
3. Separate evidence, interpretation, proposals and completed changes. Cite consequential
   claims, give observation dates for changing facts, and state uncertainty.
4. Use capabilities actually available in this environment. A catalog entry, a familiar
   filename or another agent's access does not establish installation or permission.
5. Keep private context private. Use shared records for collaboration and keep
   credentials out of documents.
6. Before changing shared data, identify the exact destination, preserve others' work and
   follow the applicable workflow. Read back results and report what was verified.
7. Keep a recoverable task record: outcome, decisions, evidence, unresolved issues, owner
   and next step. Never describe a draft, a proposal or a failed write as completed work.
   Anything wrong, surprising or unexplained goes in the **QA issue tracker** with severity,
   urgency, evidence and a named **Owner** — create the tracker if the workspace has none
   (`context/notion-workspace.md`). Mention it in your closing report; an issue nobody sees
   is barely raised at all. Work that is real but not yours becomes a tracker row for the
   agent that should run it — self-contained, owned by a person, left `Not started`. Queue
   it; never start another agent yourself.
8. Before writing or reviewing a report, read `docs/report-writing.md`.

## Hard rules

1. **Never write to Geo by hand.** Every create, update or delete goes through
   `geo-publish`, `geo-clean` or `geo-mirror` Part 2, which carry the duplicate, schema and
   type checks a hand-rolled script skips. If the matching skill is missing, stop — do not
   improvise one.
2. **Deletion is a red line.** No hand-written delete, no delete loop. Route to `geo-clean`,
   which runs an orphan check and a human confirmation first. Never set
   `CONFIRM_DESTRUCTIVE=1` to get around it.
3. **A dry-run is where your authority ends.** Publishing needs the editor's explicit
   `publish`. Nothing in this repository may issue that on their behalf.
4. **Never read, print or accept the wallet key.** Checking that `.env` exists and which
   variable *names* it holds is allowed; reading a value is not. If a key ever appears in a
   chat, tell the editor to export a fresh wallet.
5. **Claim and entity names never end with a period.** Descriptions do; names don't.
6. **Notion moves can silently drop relations.** Recreate pages with properties set at
   creation, or capture relation values first.
7. **Full 32-character IDs** in everything an editor reads, with
   `https://www.geobrowser.io/space/<spaceId>/<entityId>` links. A truncated ID cannot be
   pasted into a search.
8. **Counts carry their population and timestamp.** These spaces grow daily. Never blend
   two snapshots into one figure.
9. **A publish is not a vote.** Publishing creates a proposal; casting the YES vote
   (`voteProposal`) is the editors' act and needs its own explicit approval.

## Testing tiers

Test at the lowest tier that answers the question, and never above tier 2 on your own.

| Tier | What runs | Needs |
|---|---|---|
| 0 | `geo-query` or raw GraphQL reads | nothing — no install, no key |
| 1 | read-only scripts: mirrors, coverage maps, discovery scans | `npm ci`; no wallet key |
| 2 | actionable skills in **dry-run** | `.env` present; still nothing published |
| 3 | a real write | the editor's `publish`, as a reviewed proposal — never while testing |

## Two facts that outrank anything older you read

- **Read endpoint:** `https://api-testnet.geobrowser.io/graphql`. Anything citing
  `testnet-api.geobrowser.io` is pre-August-2026. That host still answers **HTTP 200 with
  stale data** rather than failing, so a wrong-endpoint mistake is silent.
- **`context/` is a dated capture, not live state.** When a context file and the live graph
  disagree, the graph wins — and say so in your report.

## Skill routing

Decide which skill applies **before** doing anything, then read its `SKILL.md` and follow it.
Do not hand-write what a skill covers. Run every skill's scripts from the repository root.

| The editor wants to… | Skill | Writes Geo? |
|---|---|---|
| look up, search, inspect the graph | `geo-query` | no |
| decide how to model something | `ontology-advisor` | no |
| compare press coverage with Geo, find what to publish | `geo-press-review` | no |
| find gaps in a space | `geo-discovery` | at its publish stage |
| write or repair descriptions | `geo-describe` | no |
| group claims — duplicates, related, supporting, opposing | `geo-claim-grouping` | at its publish stage |
| group claims **into Notion review columns** instead | `geo-claim-grouping-notion` | no |
| mirror a space into Notion **and** run grouping, one request | `geo-mirror-and-group` | no |
| mirror Geo into Notion; publish reviewed Notion edits back | `geo-mirror` | Part 2 only |
| any scripted Notion work beyond reading one page | `notion-operations` | no |
| create or update entities and relations | `geo-publish` | **yes** |
| find duplicates, merge, clean, move, delete | `geo-clean` | **yes** — the only one that deletes |
| turn a plain-language change request into a plan | `geo-orchestrate` | via the skills it routes to |
| make a 2364 × 640 banner | `image-banner-recompose` | no |
| file the end-of-day update | `daily-report` | no |

Ambiguous request → ask which skill. Do not guess.

## Where things live

| Need | Path |
|---|---|
| A skill's contract | `skills/<actionable\|non-actionable>/<name>/SKILL.md` |
| The team's instruction documents | `docs/` — start at `docs/README.md` |
| Operating contract for the Notion teamspace (task lifecycle, trackers) | `docs/toolkit/agents-AGENT-WORKFLOW.md` |
| ID registry, topic rules, API quirks, merge-helper quirks, grouping QA | `context/` — six files; its `README.md` says which to read when |
| Subagent definitions | `.claude/agents/` |
| Paths, IDs, credentials by name | `config/environment.md` |
| Human setup steps | `SETUP.md` |
| What came from where, at which commit | `UPSTREAM.md` |

**Before any task in the Agents flow Notion teamspace**, read the operating contract. Log the
task first, with `Projects = Agent flows`, or nobody will see it.

**In any other Notion workspace** — an editor's own page, a fresh space — read
`context/notion-workspace.md` first. Search for the Work tracker and QA issue tracker before
assuming anything: reuse them if they exist, even under another name, and create them only if
they genuinely do not. Task tracking is not optional just because the team's teamspace is
absent.

**Route every QA issue to a person**, in either workspace. By what the problem *is*:
Geo core, the API, voting and execution → **Arturas**; ontology and content semantics —
types, claim wording, topic hierarchy → **Armando** or **Moh**; agents, skills, mirrors
and scripts → **Vytautas** or **Mantas**. Spanning two areas: pick whoever can act on the
cause. Genuinely unclear: set Unassigned, say so, and ask the editor to route it.

## The two Notion identities

Scripts reach Notion as the **integration** (`NOTION_TOKEN`), which sees only pages
explicitly connected to it. A page an editor can open in a browser still 404s for a script
until it is connected — report which page, and stop. A hosted connector, where present,
acts as the **editor** and sees everything they can. They are different identities; use
one for one job, and never verify an integration write by reading as the editor.
`notion-operations` covers the rest.
