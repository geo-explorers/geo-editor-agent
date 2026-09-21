# Environment — paths, IDs and access

Everything an agent needs to locate the toolkit, the credentials and the shared catalog.
All paths are relative to the **repository root**; run every script from there.

## Paths

| What | Where |
|---|---|
| Skills (the contracts) | `skills/actionable/*`, `skills/non-actionable/*` |
| Skill discovery stubs (Claude Code) | `.claude/skills/*` — generated, never edited |
| Subagent definitions | `.claude/agents/*.md` |
| Credentials | `.env` (create from `.env.example`; never committed) |
| Read-only Notion helper | `scripts/notion-read.mjs` |
| Geo GraphQL client · publisher | `lib/gql.mjs` · `src/functions.ts` |
| Team instruction documents | `docs/` — start at `docs/README.md` |
| Context pack (6 files, captured 2026-09-16, trimmed 2026-09-21) | `context/` |
| Skill integrity check | `skill-dev/skill_versions.py` — run by the doctor |
| Install, doctor, sync | `tools/` |

## Credentials

All in `.env`. Confirm a variable *exists*; never read or print a value.

```bash
grep -oE '^[A-Za-z_][A-Za-z0-9_]*' .env | sort -u
```

| Variable | Used by | Notes |
|---|---|---|
| `GEO_PRIVATE_KEY` | `publishOps` → every Geo write | **Human-filled only.** Its presence is why "never publishes" must be a rule the agent obeys, not a boundary the environment enforces. Read-only skills work without it. |
| `NOTION_TOKEN` | every Notion script | Internal integration token. Reaches **only** pages explicitly connected to the integration. |
| `DEMO_SPACE_ID` | personal-space publishes | An identifier, not a secret. |
| `INJECT_BASE_URL`, `INJECT_API_KEY` | news-worker injection | Unrelated to editor work; leave unset unless told otherwise. |

Scripts load env only through Node's flag — `node --env-file=.env …`.

## Endpoints

| | |
|---|---|
| Geo GraphQL read | `https://api-testnet.geobrowser.io/graphql` — note the hyphen position |
| Retired host | `testnet-api.geobrowser.io` — **still answers 200 with stale data**; never use it |
| Notion API | `https://api.notion.com/v1` (scripts pin `Notion-Version: 2022-06-28`; see `notion-operations`) |
| Geo browser | `https://www.geobrowser.io/space/<spaceId>/<entityId>` |

## Canonical spaces

Never fuzzy-resolve a space name — a live name lookup once matched "World affairs" to "AI".
Use the ID.

| Space | ID |
|---|---|
| AI | `41e851610e13a19441c4d980f2f2ce6b` |
| World affairs | `89bd89bf28ff8a0963faf92a8c905e20` |
| Crypto | `c9f267dcb0d270718c2a3c45a64afd32` |
| Health | `52c7ae149838b6d47ce0f3b2a5974546` |
| Relationships | `224406e0de3c48d78ef12774111b8b2f` |
| US Politics | `4582fbbee28a16589154f7e36f1ee3c5` |
| Podcasts (catch-all) — **never linked by claim grouping** | `b5a31f8182b042437ede0f84ee02f104` |

The full registry — dataset spaces, types, properties, never-touch IDs — is
`context/space-type-and-property-ids.md`; `src/constants.ts` wins if
they disagree.

## The Notion teamspace

Operating contract: `docs/toolkit/agents-AGENT-WORKFLOW.md`. The IDs it names:

| Page / database | ID |
|---|---|
| Agents flow center (start page) | `3da273e214eb80599115cdca4c631888` |
| Geo content work (mirror hub) | `3d6273e214eb80dfbf64e9b33ad15f2b` |
| Project tracking | `3db273e214eb818c90ebe4d42baace74` |
| Work tracker (data source) | `collection://21bdbf37-b876-4ab5-8608-7fa7e42bd8a3` |
| QA issue tracker (data source) | `collection://d9398afb-b542-4c9a-931a-b279f1acd2b2` |
| Agent Composition (catalog) | `3dc273e214eb814088b8de2e3184f988` |
| MDs & documents (catalog DB) | `28ae8943f8ab4e5d8e7fa6dc4d8e05d6` |
| Skills (catalog DB) | `149cd4c4e37f4ca690fe2f1cd38c40ed` |

Query the catalog live rather than trusting a snapshot; it is under active edit. Read it with
the toolkit helper, from the repository root:

```bash
node --env-file=.env scripts/notion-read.mjs rows 28ae8943f8ab4e5d8e7fa6dc4d8e05d6 --limit 60 --props "Key,Name,Document level,Summary"
node --env-file=.env scripts/notion-read.mjs rows 149cd4c4e37f4ca690fe2f1cd38c40ed --limit 20 --props "Key,Trigger,Availability"
```

## Runtime facts

- **Node 22+** with type stripping, so `.ts` skill scripts run under `node --env-file=.env …`
  directly. `bun` is not used.
- `npm ci` must have run — anything importing the Geo SDK needs `node_modules/`.
- **Python 3** is needed only for the skill integrity check (`skill-dev/skill_versions.py`).
  On Windows the Store's `python` alias is a stub; use a real install.
- `api.notion.com` and `api-testnet.geobrowser.io` must be reachable. Sandboxed hosts
  (Claude Desktop, Codex) need those hosts allowlisted — see `SETUP.md`.
