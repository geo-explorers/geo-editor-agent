<!--
  Exported from the Agent Composition catalog (Notion) — the canonical editorial source.
  Page:    https://app.notion.com/p/3dc273e214eb81af80c0fc2dbe738e94
  Key:     geo
  Level:   3 — Agent role   Status: Working guide   Form: Project-specific guide
  Summary: Defines the live graph route and identities that must survive every operation.
  Exported: 2026-09-18 by tools/export-docs.mjs — re-run to refresh; do not hand-edit here.
-->

# GEO.md — graph navigation
## Practical use
### State read coverage
Define the target space and population before retrieval. Fetch all required root and nested pages, recording cursors and scoped IDs. Report requested versus retrieved coverage and retain query errors. A source publication date, entity creation time and membership-change date answer different questions and must not be substituted silently.
Use the current shared GraphQL client in content-management-main/lib/gql.mjs and its CLI. The configured graph endpoint is https://api-testnet.geobrowser.io/graphql; verify configuration if the service changes.
Record destination space, entity, type, property and relation IDs. Space membership, typing and space-scoped assertions are distinct. Preserve relation edge IDs, relation-entity IDs, positions and assertion spaces.
Filter on the server and paginate root and required nested collections. Entity creation time, source publication time and addition to a particular space are different questions. Errors must remain errors.
Route reads to geo-query, modelling to ontology-advisor and writes to the applicable publishing or cleanup skill. A Notion proposal is not a published graph assertion.
## Edition and source
Catalog edition prepared 16 September 2026. Team adaptation of the current project guidance. Source route: agent/GEO.md. Geo work — master project documentation. Local files and private records remain unchanged.
