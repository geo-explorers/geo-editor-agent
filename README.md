# Geo editor agent

Everything an AI agent needs to work on the **Geo knowledge graph** the way the editorial team
does — through Notion review, with every write to Geo gated behind a dry-run and a human's
explicit word.

One repository, self-contained:

- **15 skills** — query, model, describe, press-review, mirror to Notion, group claims, publish, clean
- **4 subagents** — plan a task, run a Geo↔Notion job end to end, refresh the mirrors, research with citations
- **The team's instruction documents** — working agreements, claim semantics, session discipline, the Notion operating contract
- **A six-file context pack** — the ID registry, the topic rules, how the API really behaves, what the merge helper still gets wrong, how to QA a grouping
- **The runtime** the skills' scripts import, pinned to a known-good commit of the canonical toolkit

## Give your AI this prompt

Copy this into your agent — Claude Code, Codex, Cowork, or a self-hosted agent:

```
Download and set up this repo for me. It has the Geo editor skills in it.
https://github.com/geo-explorers/geo-editor-agent
```

The agent will clone it, read this file, run the installer, and stop at the two things only
you can do. Read-only work — lookups, press reviews, mirrors, claim grouping into Notion —
needs no key at all.

**If you are the agent reading this:** run the installer and follow what it prints.

```bash
node tools/install.mjs            # Claude Code (default)
node tools/install.mjs --host codex
node tools/install.mjs --host all
```

It checks Node 22+, runs `npm ci`, creates `.env` from the example **without filling in any
key**, generates the skill discovery stubs, deploys full skills to other hosts if asked, then
runs the doctor. Then start a **new session in this folder** — skills and agents load at
startup.

## The two things only a human can do

Both are in [`SETUP.md`](SETUP.md). In short:

1. **Your wallet key** — only if you want to publish to Geo. Export it at
   [geobrowser.io/export-wallet](https://www.geobrowser.io/export-wallet), open `.env`, paste
   it after `GEO_PRIVATE_KEY=`. **Never paste it into a chat. Your agent must never ask for it.**
2. **Network allowlists** on sandboxed hosts (Claude Desktop, Codex): `api-testnet.geobrowser.io`
   and, for Notion work, `api.notion.com`. Claude Code needs neither.

For Notion work you also need an integration token (`NOTION_TOKEN`) and the pages it may
touch explicitly connected to that integration. `SETUP.md` covers it.

## Try it

Start a new session in this folder and ask for a job by name:

```
Using geo-query: is there an entity for "Celestia" on Geo? Show its types and spaces.
```
```
Using geo-press-review: compare press coverage for the World affairs space, 3–6 July 2026 inclusive, against what is on Geo.
```
```
Using geo-mirror-and-group: mirror the Relationships claims into this Notion page and set up a grouping review.
```

Saying the skill's name explicitly always works. If the agent improvises instead, that is
the signal to name the skill.

## What is inside

| Path | What it is |
|---|---|
| `AGENTS.md` | The shared instructions every agent reads first — working agreements, hard rules, skill routing |
| `CLAUDE.md` | `@AGENTS.md` plus what Claude Code does differently |
| `SETUP.md` | The human steps: key, Notion integration, allowlists, per host |
| `skills/` | The 15 skill contracts, in the canonical toolkit's layout (`actionable/` can write Geo; `non-actionable/` cannot) |
| `.claude/skills/` | Discovery stubs so Claude Code finds every skill, plus three vendored general-purpose skills |
| `.claude/agents/` | The four subagent definitions |
| `docs/` | The team's instruction documents, exported from the Notion catalog — start at `docs/README.md` |
| `context/` | The six-file context pack: the space/type/property ID registry, the topic-reference and canonical rules, the GraphQL schema quirks and performance limits, the merge-helper quirks, and the claim-grouping QA method. A dated capture — when it disagrees with the live graph or a `SKILL.md`, the live source wins. `context/README.md` says which file to open for what |
| `knowledge-graph-ontology.md` | The ontology specification — entities, properties, relations, types, spaces. Vendored from the toolkit, not part of the context pack |
| `documentation/` | The research-agent source policy and trusted-sources allowlist that `geo-research` follows |
| `config/environment.md` | Paths, endpoints, canonical space IDs, Notion page IDs, credential names |
| `src/`, `lib/`, `scripts/` | The runtime and helpers the skills import |
| `skill-dev/` | The skill integrity manifest verifier the doctor runs |
| `tools/` | `install`, `doctor`, `sync-upstream`, `export-docs`, `rebuild-catalog`, `gen-skill-stubs` |
| `UPSTREAM.md` | What came from where, at which commit |

## The rules that never bend

- **Every write to Geo is a proposal.** Duplicate check → dry-run → the editor types `publish`. The agent never types it.
- **Never write to Geo by hand.** The skills carry the safeguards; a hand-rolled script skips them.
- **Deletion only through `geo-clean`**, behind an orphan check and a human confirmation.
- **The wallet key stays out of every chat, prompt and document.**
- **Claim and entity names never end with a period.**

The full set is in `AGENTS.md`. The safeguards are guides, not guarantees — a determined
prompt can bypass any of them, because you control your own agent. Real control lives in the
editorial layer: canonical spaces are gated by member votes. Be deliberate in personal and
dataset spaces, which are not.

## Keeping it current

The skills and runtime come from the canonical toolkit,
[geo-explorers/content-management](https://github.com/geo-explorers/content-management),
pinned to the commit recorded in `.upstream-sha`. To move to a newer one:

```bash
node tools/sync-upstream.mjs               # latest main
node tools/sync-upstream.mjs --ref <sha>   # a specific commit
```

It re-vendors, prunes the upstream maintainer tooling an editor's agent never runs, regenerates
the stubs, updates `UPSTREAM.md`, and leaves this repository's own files (`docs/`, `context/`,
`.claude/`, `tools/`) alone. Then `node --env-file=.env tools/doctor.mjs`.

The instruction documents come from the team's Notion catalog; `node --env-file=.env tools/export-docs.mjs`
refreshes them.

## Health check

```bash
node --env-file=.env tools/doctor.mjs
```

Runtime, dependencies, which env variables are set (names only — it never reads a value), stub
freshness, the skill integrity manifest, and whether Geo and Notion are reachable.

## Licence and provenance

Vendored toolkit code is MIT (see `LICENSE`). The three general-purpose skills carry their own
`PROVENANCE.md`. Everything vendored is traceable in `UPSTREAM.md`.
