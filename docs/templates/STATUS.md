<!--
  Exported from the Agent Composition catalog (Notion) — the canonical editorial source.
  Page:    https://app.notion.com/p/3dd273e214eb8110a3b2c94e8a0832b8
  Key:     task-state
  Level:   5 — Current task   Status: Template to fill in   Form: Project-specific guide
  Summary: A compact continuity record with authorization, evidence, uncertainty and next steps.
  Exported: 2026-09-18 by tools/export-docs.mjs — re-run to refresh; do not hand-edit here.
-->

# STATUS.md — task state template
## Practical use
### Keep one current continuation record
Record what actually happened, with links to evidence and uncertain outcomes. Separate the latest status from the dated operation log. Before retrying an interrupted step, inspect its receipt and current destination. If Notion is the canonical task record, a local STATUS.md may simply route to it and identify local evidence.
## Use
Recommended for work spanning sessions or agents. Use a task-specific Notion record or STATUS.md; do not maintain two independently edited authorities. Short one-off tasks may need only a final result.
## Template
```markdown
# [Task] — [current status]
Updated: [timestamp and timezone]
Owner: [current writer / accountable person]
Objective and acceptance criteria: [...]
Authorized targets and actions: [...]
Canonical deliverable: [link or path]
Source scope and freshness: [IDs, bounds, fetched-at]
Completed and verified: [result + evidence]
Decisions and reasons: [...]
Pending / blocked / uncertain: [...]
Next action: [...]
Recovery notes: [operation receipts; avoid duplicate writes]
```
Keep secrets and unrelated private notes out of shared handoffs. Summarize applied work, not hidden reasoning. Preserve disagreements and proposed changes as such. Record a transfer of ownership before overlapping writes.
## Basis
External structured notes support continuity beyond the conversation window. A5: Effective context engineering for AI agents. Clear completion boundaries help agents carry substantial tasks through the requested outcome. O5: Rethinking skills and prompts for GPT-6 Astra.
This is a team design recommendation, not proof that any platform automatically loads STATUS.md.
