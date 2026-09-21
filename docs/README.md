# docs/ — the team's instruction documents

Exported from the **Agent Composition** catalog in Notion (the canonical editorial source)
by `tools/export-docs.mjs`. Each file carries the page it came from in its header. **Do not
hand-edit these** — edit the Notion page and re-export.

The catalog organises documents by *level* — who loads them. Use that to decide what to read.

## Level 1 — every agent, at startup

| File | What it is |
|---|---|
| `shared-rules.md` | The eight working agreements. Already inlined in `AGENTS.md`. |
| `report-writing.md` | The report-writing standard: executive structure, evidence links, decision interface. Read before writing any report. |

## Level 2 — every Geo agent

| File | Read when |
|---|---|
| `toolkit/agents-AGENT-WORKFLOW.md` | **Before any work in the Agents flow Notion teamspace.** Task lifecycle, tracker fields with exact option values, hard rules, known traps. |
| `geo-team-rules.md` | Geo conventions every agent follows. |
| `SESSION.md` | Starting, resuming or finishing a substantial task. |
| `NOTION.md` | Navigating the shared workspace; what to resolve before updating a shared record. |
| `lessons.md` | Reusable Geo lessons — what earlier work learned the hard way. |
| `brain.md` | The four homes of context, and which to open for which question. |
| `coordination.md` | Handing work between agents: the minimum payload, ownership changes. *(Proposed standard.)* |

## Level 3 — by role

| File | Read when |
|---|---|
| `CLAIMS.md` | Any claim wording or relation decision. |
| `EXECUTION.md` | Before any persistent change — how changes are made and verified. |
| `ONTOLOGY.md` | Making a modelling decision. The full ontology guide is at `skills/non-actionable/ontology-advisor/references/ONTOLOGY.md`. |
| `GEO.md` | Reading the graph: coverage, scoping, which IDs to record. |
| `SOURCES.md` | Researching or supporting a claim — evidence and attribution. |
| `PRIORITIES.md` | Writing a priority recommendation. |
| `mirror-contract.md` | Geo → Notion: what a faithful mirror preserves. |
| `publication-contract.md` | Notion → Geo: field-level approval and conflict checks. *(Draft.)* |
| `debate-claim-curation.md` | Curating question-based claim collections. |
| `roles/` | Content analysis · Data and schema operations · Project management · Quality review — one instruction section per role. |

## Level 5 — per task

| File | What it is |
|---|---|
| `templates/STATUS.md` | The task-state template `SESSION.md` points to for substantial work. |

`CATALOG.json` records what was exported, from which page, when.

## What is deliberately not here

- **Documents whose canonical home is a file elsewhere in this repository** — the skills' own
  references, `knowledge-graph-ontology.md`, `documentation/`, `skill-dev/`. The catalog links
  to them; they are not duplicated.
- **Catalog rows meant for library maintainers or agent authors, not agents** — the folder
  layout guide, the platform setup references (`SETUP.md` is the operational version), the
  library map, the Markdown-management research, the skill-anatomy explainer, and the
  templates for authoring a new agent. `tools/export-docs.mjs` skips these by key.
- **One agent's identity notes.** The catalog holds an identity example for the agent that
  maintains it; other people's agents do not need it.
- **Upstream's own file manifest and agent-install notes.** They describe the canonical
  toolkit's layout, which differs from this repository's. `UPSTREAM.md` is the map here.
