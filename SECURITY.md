# Security policy

This repository configures AI agents that work next to an editor's Geo wallet key and a Notion
integration token. A weakness here can cost someone their Geo identity, so please report
security problems privately rather than in a public issue.

## How to report

Use GitHub's private vulnerability reporting: open the repository's **Security** tab and choose
**Report a vulnerability**. Only the maintainers see the report.

If that option isn't available, open an issue titled "Security contact request" with no
details, and a maintainer will contact you privately.

Never include a real wallet key, Notion token or other credential in a report. A redacted
example is enough.

## In scope

- Instruction files an agent follows — `AGENTS.md`, `CLAUDE.md`, `skills/`, `docs/`, `context/`
  — where a change or an injected instruction could make an agent leak a key, publish, vote or
  delete without the editor's explicit word
- How the wallet key and the Notion token are handled: `.env`, the scripts that load it, the
  doctor
- The installer (`tools/install.mjs`) and the upstream sync (`tools/sync-upstream.mjs`)
- The agent permission settings in `.claude/settings.json`

The skills are vendored from
[geo-explorers/content-management](https://github.com/geo-explorers/content-management); a
report that belongs there will be forwarded. Geo itself and Notion are out of scope — report
problems with them to their owners.

## Supported versions

Only `main` is supported. Every install clones it.

## What to expect

We aim to acknowledge a report within five working days, and then agree a fix and a disclosure
timeline with you.
