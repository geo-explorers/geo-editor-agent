<!--
  Exported from the Agent Composition catalog (Notion) — the canonical editorial source.
  Page:    https://app.notion.com/p/3dc273e214eb818aacf3c92e1146bd1a
  Key:     publishcontract
  Level:   3 — Agent role   Status: Working guide   Form: Project-specific guide
  Summary: Defines the required mapping, approval and conflict checks for reviewed return-path changes.
  Exported: 2026-09-18 by tools/export-docs.mjs — re-run to refresh; do not hand-edit here.
-->

# publication-contract.md — Notion to Geo
## Practical use
### Define publication readiness per operation
For each operation, record the reviewed proposal, exact destination, current supported implementation and read-back criterion. Treat a text rename, relation change, new entity and intentional clear as different operation types. Use the linked current readiness report for implementation scope, then verify the intended path before claiming it works in this environment. Preserve newly edited proposals when reconciling an earlier publication.
## Controlled path
Select explicit proposed changes, verify their review state and map each editable field to a Geo property or relation in an explicit destination space. Distinguish unchanged, intentional clear, new value and unsupported field.
Compare baseline, current Notion and current Geo. Stop conflicted fields and re-read touched values before writing. Validate ontology, types, duplicate candidates, relation identities and data types. Produce a readable before/after dry run with an operation hash and applicable approval.
Submit the permitted operations, record proposal and transaction receipts, verify execution and indexed values, then reconcile fulfilled proposals without erasing new editorial changes.
## How it is implemented
Notion → Geo publishing works for any mirrored table (geo-mirror 0.11.0). A Notion database with a Geo ID column is mirrored Geo content, whatever the table or page is called. plan-notion-changes.mjs finds those tables and plans the changes, and sync-to-geo.mjs publishes them: a dry run first, then an explicit publish. In a DAO space the publish creates a proposal and vote; in a personal space it writes directly. Direct-table publishing has been used live; those proposals were published and voted through.
- Field mapping, by column name: title → Name, Geo <X> → X, Proposed rename → Name, Proposed <X> → X. Property IDs are resolved from Geo; ambiguous names are skipped.
- Proposal tables (have Proposed … columns, e.g. the "- new" pages) follow the controlled path above:
  - Selection: only rows whose Publish status is Approved.
  - Conflict check: the row's Geo … value is the baseline, compared with the proposal and the live value in the space. Stale rows stop.
  - Validation: fallback names, QA-flagged rows and rows from another space are skipped.
  - Reconciliation: published rows are marked Sent to Geo, then Live on Geo once the value lands.
- Direct tables (no Proposed … columns): edited mirrored columns are published after the same live checks. Approval applies if the table has a Publish status column. An empty cell never clears a Geo value.
## Still open
- Relation proposals (topics, tags, hierarchy), new entities and intentional clears. Publish these through geo-publish.
- Approval is per row, not per field.
- Transaction and proposal IDs aren't written back to Notion.
## Edition and source
Catalog edition prepared 16 September 2026. Proposed procedure for review. Source route: Shared mirror readiness report. Geo mirror editorial-to-publish readiness — consolidated final report. Local files and private records remain unchanged.
