# Provenance

- **Upstream:** https://github.com/makenotion/notion-cookbook/tree/907dbde91795e180f7e6260305cf97a0456ff473/skills/claude/knowledge-capture
- **Pinned commit:** `907dbde91795e180f7e6260305cf97a0456ff473` (2026-09-15)
- **Licence:** MIT — Copyright (c) 2025 Notion
- **Installed:** 2026-09-17, unmodified except as noted below.

## Vetting performed before install
- No `scripts/` directory upstream: the skill is pure markdown, so there is no
  executable supply-chain surface. Only instruction content was reviewed.
- Grepped for code execution (`curl`, `| bash`, `npx`, `eval`, `sudo`): **none**.
- Grepped for credential handling (`token`, `api_key`, `keychain`, `.env`): **none**.
- Grepped for destructive verbs (`delete`, `archive`, `in_trash`, `allow_deleting`): **none**.
- Grepped for external sharing / permission changes: **none** in this skill.

## Deliberate changes from upstream
- Directory renamed `knowledge-capture` -> `notion-knowledge-capture` so it matches the `name:` field,
  as the Agent Skills specification requires. Upstream's directory name does not.
- `evaluations/` excluded: CI fixtures, not runtime material.

## Known limitation
This skill assumes MCP tools named `Notion:notion-search`, `notion-fetch`,
`notion-create-pages`, `notion-update-page`. In Claude Code the Notion connector
exposes them as `mcp__claude_ai_Notion__notion-*`, and **subagents (including
`geo-agent`) have no MCP Notion tools at all** — they reach Notion through
`scripts/notion-read.mjs` using the integration token. This skill therefore helps
the main session only.
