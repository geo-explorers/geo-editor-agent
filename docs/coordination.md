<!--
  Exported from the Agent Composition catalog (Notion) — the canonical editorial source.
  Page:    https://app.notion.com/p/3dc273e214eb81d09affcb2bfc86d66a
  Key:     coordination
  Level:   2 — All Geo agents   Status: Proposal to review   Form: Project-specific guide
  Summary: Defines one writer per overlapping target and a verifiable handoff contract.
  Exported: 2026-09-18 by tools/export-docs.mjs — re-run to refresh; do not hand-edit here.
-->

# coordination.md — task ownership and handoff
## Practical use
### Minimum handoff payload
Provide the objective, target IDs, input revision, completed work, evidence, remaining risks and exact next action. Name the current writer and the receiving owner. The receiver checks that inputs still match before starting dependent changes. A task status or message is not proof that an atomic lock exists.
## Proposed standard
Before work begins, identify the task, target database and field scope, writer, input revision and dependent tasks. Parallel analysis can use one shared snapshot; overlapping writes need one owner.
## Handoff example
Agent A refreshes a scoped mirror and hands Agent B the manifest, snapshot timestamp, row count, field mapping, verification result and unresolved exceptions. Agent B checks the receipt and current touched values before drafting changes. If the prerequisite failed or the source changed, B blocks the dependent write and records the difference.
## Ownership changes
Record who releases and accepts the write scope. A stale task status is not a lock. Recheck scope and current rows immediately before mutation. Use a claim or lock implementation only when its atomic behavior has been tested.
This catalog specifies the procedure. It does not install a scheduler, distributed lock or message transport.
## Edition and source
Catalog edition prepared 16 September 2026. Proposed procedure for review. Source route: Team sync + shared transport guide. Cross-agent communication transport — implementation guide and design debate. Local files and private records remain unchanged.
