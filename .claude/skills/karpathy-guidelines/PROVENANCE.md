# Provenance

- **Upstream:** https://github.com/multica-ai/andrej-karpathy-skills/tree/2c606141936f1eeef17fa3043a72095b4765b9c2/skills/karpathy-guidelines
- **Pinned commit:** `2c606141936f1eeef17fa3043a72095b4765b9c2`
- **Installed:** 2026-09-18, unmodified.
- **Author:** forrestchang (org: multica-ai). Content derived from Andrej Karpathy's
  public observations on LLM coding pitfalls. **Not authored or endorsed by him**, and
  not an Anthropic or Notion skill.

## Vetting performed before install
- No `scripts/` directory upstream — pure markdown, so no executable supply-chain surface.
- Grepped every file in the repo for code execution, credential access, destructive verbs
  and external sharing: **none**. The only `curl` lines download a file to disk (no pipe
  to a shell); the only "delete" lines are the skill advising *against* deleting.
- Read the full SKILL.md, plugin.json and marketplace.json.

## Caveats recorded at install time
- **No LICENSE file in the repository** (confirmed 404). The SKILL.md frontmatter and
  plugin.json both claim MIT, but nothing in the repo backs that grant. Redistribution
  rights are therefore unclear; treat as read-only internal use until clarified.
- **Popularity is not validation.** The repo showed ~213k stars / ~21k forks for nine
  files. Stars establish attention, not safety or accuracy — this install rests on the
  file review above, not on that number.
- **Two owner paths.** This was installed from `multica-ai/…`; the repo's own README
  points installers at `forrestchang/…`. Same content, different org path.
- **Partial overlap** with Claude Code's built-in `/simplify` and `/code-review`, and
  with default behaviour. Sections 1 (surface assumptions) and 4 (verifiable success
  criteria) add the most here.
- Installed as the skill folder only. The upstream `/plugin marketplace add` route would
  also install the plugin wrapper and a CLAUDE.md; neither was wanted.
