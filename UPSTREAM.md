# Upstream — what came from where

This repository is a distribution build. Nothing in `skills/`, `src/`, `lib/`, `scripts/`,
`skill-dev/` or `documentation/` is authored here; it is vendored from the canonical toolkit
at a pinned commit so a fresh clone works without any other checkout. Everything else —
the entry documents, `docs/`, `context/`, `.claude/`, `tools/` — is this repository's own.

## The canonical toolkit

**[geo-explorers/content-management](https://github.com/geo-explorers/content-management)** @ `cc319d2416a23de7b84d4ae9c7ef6b1d75847399`
Vendored on: 2026-09-18 — also recorded in `.upstream-sha`. Licence: MIT (`LICENSE`).

| Vendored | Into |
|---|---|
| `skills/` (15 skills, `SKILL-VERSIONS.json`, `versions.md`) | `skills/` — layout unchanged |
| `src/`, `lib/` | same paths — the skills' scripts import `../../../../src/functions.ts` |
| `scripts/` | same path — `notion-read.mjs`, `press-review-coverage-map.ts`, `inject-publish-example.ts`; upstream's dated one-off scripts are pruned |
| `skill-dev/skill_versions.py` | same path — the integrity-manifest verifier the doctor runs; the rest of upstream's `skill-dev/` (authoring standard, linter, install script, README) is pruned on every sync |
| `documentation/` | same path — the research-agent spec, allowlist and source policy |
| `agents/AGENT-WORKFLOW.md` | `docs/toolkit/agents-AGENT-WORKFLOW.md` — upstream's `MD-FILES.md` and `agents/README.md` describe that repository's layout and are not carried over |
| `agents/geo-research.md`, `agents/geo-mirror-refresh.md` | `.claude/agents/` — so Claude Code loads them; three path references are rewritten to this layout on every sync (`REWRITES` in `tools/sync-upstream.mjs`) |
| `package.json`, `package-lock.json`, `tsconfig.json`, `.env.example`, `LICENSE`, `knowledge-graph-ontology.md`, `validate_migration.ts` | repository root — `validate_migration.ts` is `geo-clean`'s post-merge verifier |

**Not vendored, deliberately:** the numbered one-off migration scripts (`01_…` – `11_…`), `output/`
(run artifacts), `bun.lock`, `testing.ts`, `todo.md`, and the toolkit's own `CLAUDE.md`, `README.md`
and `skills/README.md` (this repository has its own entry points). **Pruned after every sync**
(`PRUNE` in `tools/sync-upstream.mjs`): `skill-dev/skill-quality-check/`, `skill-dev/sync-skills.sh`,
`skill-dev/README.md`, `scripts/check-space-list.ts`, `scripts/2026-07-28-sdk-v020-migration-check.ts`
— maintainer tooling and dated diagnostics an editor's agent never runs. One upstream reference is
left dangling on purpose: `geo-clean/reference.md` cites a one-off `scripts/2026-08-18-wipe-test-space.ts`
that is not in upstream's committed tree either.

Move the pin with `node tools/sync-upstream.mjs --ref <sha|branch>`. The team's own procedure for
keeping skills current fetches the same repository's archive over HTTPS; this tool does the same.

## The context pack and the generic agent

From a private working repository (`geo-agent`, local) @ `2b2e47f040a33912892cb1720de607d42a00914f`:

| Taken | Into | Changed |
|---|---|---|
| `context/` — 56 files assembled 2026-09-16 from the toolkit clone, Claude Code memory and eight sibling projects | `context/` — **6 kept** | Provenance headers name the kind of source and its filename, never a machine path. On 2026-09-21 the capture was trimmed twice — to 19, then to 6 — dropping everything a vendored skill or `AGENTS.md` already states, sibling-project notes, one-off campaign logs and session specs, skill-maintenance material, and superseded SDK and migration notes. What remains: the working ID registry, the topic-reference rules (trimmed to the rules and ID tables), two measured API-behaviour notes, the merge-helper quirks and the claim-grouping QA method. `context/README.md` lists them. |
| `.claude/agents/geo-agent.md` | `.claude/agents/geo-agent.md` | Paths made repository-relative; skill count corrected; the claim that the Notion→Geo publisher is "proposed, not built" removed — it exists in `geo-mirror` Part 2. |
| `config/environment.md` | `config/environment.md` | Rewritten generically. |

## The planning subagent

`.claude/agents/geo-task.md` — authored by the toolkit's maintainer on 2026-09-14 in the
`content-management` working tree but **not committed upstream** at the time of vendoring. Read-only
planning agent; included here so the set of four agents is complete.

## The team's instruction documents

`docs/` — 22 documents exported from the **Agent Composition** catalog in Notion
(database `28ae8943f8ab4e5d8e7fa6dc4d8e05d6`) by `tools/export-docs.mjs` on 2026-09-18, trimmed
on 2026-09-21. Only each page's "Working content" is exported; the catalog page remains the canonical
editorial source and is named in every file's header. `docs/CATALOG.json` lists them. Skipped: rows
that link to a file already vendored above, and rows the catalog marks for library maintainers or
agent authors rather than agents (the exporter skips those by key — see `docs/README.md`).

## General-purpose skills

Vendored in full into `.claude/skills/`, each with its own `PROVENANCE.md` recording the vetting:

| Skill | Source | Pinned commit | Licence |
|---|---|---|---|
| `notion-knowledge-capture` | [makenotion/notion-cookbook](https://github.com/makenotion/notion-cookbook) | `907dbde91795e180f7e6260305cf97a0456ff473` | MIT |
| `notion-research-documentation` | [makenotion/notion-cookbook](https://github.com/makenotion/notion-cookbook) | `907dbde91795e180f7e6260305cf97a0456ff473` | MIT |
| `karpathy-guidelines` | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | `2c606141936f1eeef17fa3043a72095b4765b9c2` | claimed MIT — **no LICENSE file upstream**; internal use until clarified |

## Generated files

`.claude/skills/<toolkit-skill>/SKILL.md` — fifteen discovery stubs written by
`tools/gen-skill-stubs.mjs` from the vendored skills' frontmatter. Deterministic; regenerated on
every sync. Never hand-edited.
