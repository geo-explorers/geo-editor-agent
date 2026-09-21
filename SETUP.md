# Setup — the parts only a human does

`node tools/install.mjs` does everything an agent is allowed to do. This page is the rest.
Nothing here is needed for read-only work; skip straight to *Try it* in the README if you
only want lookups and reviews.

## 1. Your wallet key — only for publishing to Geo

The actionable skills (`geo-publish`, `geo-clean`, `geo-mirror` Part 2, `geo-orchestrate`,
`geo-discovery`'s publish stage, `geo-claim-grouping`'s publish stage) sign proposals with your
Geo account. They need your private key in `.env`.

1. Go to [geobrowser.io/export-wallet](https://www.geobrowser.io/export-wallet).
2. Click **Copy key** — not the copy button next to the wallet address; they are different values.
3. Open `.env` in the repository folder with any text editor. Paste the key after
   `GEO_PRIVATE_KEY=`. Save.

**Never paste the key into a chat, on any tool. Your agent must never ask for it.** If a key
ever lands in a chat, export a fresh wallet and replace it.

`.env` is ignored by git and will never be committed. The variable name is `GEO_PRIVATE_KEY`;
older guides that say `PK` are out of date and silently stopped working in August 2026.

Actionable skills run only in Claude Code, Cowork or a self-hosted agent — never in a chat
window, which has no filesystem for `.env` to live in.

## 2. Notion — for mirrors, claim grouping into Notion, and the team trackers

Scripts reach Notion as an **internal integration**, which starts with access to nothing.

1. In Notion: **Settings → Connections → Develop or manage integrations → New integration.**
   Give it a name (the team's is "Notion - Geo"). Copy the **Internal Integration Secret**.
2. Open `.env`, paste it after `NOTION_TOKEN=`. Save.
3. **Connect the pages the integration may touch.** On each page: **•••** → **Connections** →
   add the integration. Children inherit the connection.

   For the team workflow, connect the **Agents flow center** page
   (`3da273e214eb80599115cdca4c631888`); everything the trackers and mirrors need is beneath it.

A page you can open in your browser still returns **404** to a script until it is connected.
That is the single most common "it's broken" report, and it is not a bug. The agent is told to
name the page and stop rather than work around it.

Verify: `node --env-file=.env scripts/notion-read.mjs whoami` prints the integration and
workspace names.

## 3. Network — sandboxed hosts only

| Host | What to do |
|---|---|
| **Claude Code** | Nothing. Ready after `tools/install.mjs`. |
| **Claude Desktop / Cowork** | Settings → Capabilities → Code execution and file creation → allow `api-testnet.geobrowser.io` and `api.notion.com`. Then **Work in project or file** → select this folder. |
| **Codex** | `node tools/install.mjs --host codex` deploys the skills to `~/.codex/skills`. Then add to `~/.codex/config.toml` and restart Codex: |

```toml
default_permissions = "workspace"

[permissions.workspace.network]
enabled = true
mode = "limited"

[permissions.workspace.network.domains]
"api-testnet.geobrowser.io" = "allow"
"api.notion.com" = "allow"
```

The endpoint is `api-testnet.geobrowser.io` — hyphen after `api`. The older
`testnet-api.geobrowser.io` still answers, with stale data, which is worse than failing.

## 4. Python — only for the integrity check

`skill-dev/skill_versions.py verify` proves every skill matches the version the team approved.
It needs Python 3. On Windows the Store's `python` command is a stub that opens the Store;
install Python from python.org or via `uv`. Without it, `tools/doctor.mjs` skips the check and
says so.

## 5. Confirm

```bash
node --env-file=.env tools/doctor.mjs
```

Every line should be `✓`. Warnings are fine for read-only work; `✗` lines need fixing.

## What the integration should NOT be able to see

Keep the connection scoped to the Agents flow teamspace. The integration token is a
workspace-wide credential in the sense that anything connected to it is reachable by every
script that holds the token — including a script an agent writes. Connect only what the work
needs.
