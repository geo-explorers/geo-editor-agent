<!-- geo-agent-context -->
> **Source:** private agent-memory note `geo-query-api-performance.md`, kept alongside the canonical toolkit clone  
> **Captured:** 2026-09-16 · **Read as:** durable reference — measured latency, hard caps, deep-tail stalls, what NOT to optimise  
> ⚠️ **Stale detail:** written against the retired read endpoint `testnet-api.geobrowser.io/graphql`. The current endpoint is `api-testnet.geobrowser.io/graphql` (note the hyphen position). Query shapes, filters and findings still hold — only the host changed.  

---
name: geo-query-api-performance
description: Verified perf profile + limits of the Geo GraphQL API (testnet-api.geobrowser.io) from 2026-07-02/03 skill tests
metadata: 
  node_type: memory
  type: project
  originSessionId: 653c1450-c0e6-416b-a247-b524f3d343c5
---

Verified by direct measurement on 2026-07-02 (~50 requests, node fetch, Windows):

- Normal request latency: **120–450 ms** (cold start ~690 ms). Errors return fast too.
- **Both `first` and `offset` are hard-capped at 1000** (400 `BAD_USER_INPUT`). The [[geo-explorers-repo-overview]] skill doc only documents the offset cap; `first ≤ 1000` is undocumented (skill examples use 500).
- **Deep-tail stall:** pages past ~row 3,500 of a large result set (tested on 4,401 Episodes) take **~6.6–7.9 s**, 8/10 reproducible. A racing duplicate request stalls equally → deterministic server-side slow path; **timeout+retry does NOT help** (would double cost). `src/functions.ts gql()` having no client timeout is therefore correct.
- Full pull of 4,401 rows: ~8 s at `first:1000` (1 deep page), ~16 s at `first:500` (2 deep pages) → **use first:1000 for bulk pulls**.
- Result sets ≤1000 rows never stall: 309 Podcasts = 1 request (327 ms); 217 JRE episodes via relation filter = 140 ms. Server-side filters keep it fast — filter, don't page-then-filter.
- Skill's "unscoped relation filter → INTERNAL_SERVER_ERROR" warning did NOT reproduce (worked, 344 ms); keep space-scoping as habit but it's not currently fatal.
- Episode→Podcast relation direction: episodes point AT the podcast via relation type `Podcast` = `f1873bbc381f4604abad76fed4f6d73f`. Podcast type `4c81561d…`, Episode type `972d201a…` (src/constants.ts).

Added 2026-07-03 (geo-query v0.2.0 test, 43 checks — full detail in repo `geo-query-report.md`):

- The 1000 cap on `first`/`offset` applies to `*Connection` queries too — past row 1000 only cursor (`after`) works.
- **`entity(id:)` NEVER returns null** — any ID (even all-zeros, even a relation edge id) returns a stub: `name:null`, `spaceIds:[]`, `typeIds:[]`, 0 values/relations/backlinks, junk createdAt. Existence check = spaceIds/typeIds non-empty. Affects orphan checks.
- **`StringFilter` has NO `equalTo`** (skill doc bug ≤v0.2.0) — exact match is `is`/`isInsensitive`. UUIDFilter: `is`/`isNot`/`in` (no equalTo), as documented.
- `every` vs logically-equivalent `none` diverge on real data (850 vs 819 on 1088 News stories; `some`+`none`==total exactly) — trust `none`, never `every`.
- `first: 0` → free count-only `{ totalCount }` queries.
- Useful undocumented surface: `Entity.backlinks` (incoming relations, totalCount matches top-level `relations(toEntityId:)` exactly), nested relations accept `filter`+`orderBy: POSITION_ASC`+`totalCount`, inline `entity{}` on relation nodes reads relation-properties in ONE query, top-level `relation(id:<edge id>)`, `search(query:)` semantic search (~5.7 s), `property(id:)`→dataTypeName. `typesList(spaceId:)` IGNORES its spaceId arg (938 global either way) — for space-scoped types use `entities(typeId: TYPE_META, spaceId:)`.
- v0.2.0 skill perf claims all reproduced: Pattern-1 filter 189 ms/238 rows; relationsConnection 1000-row page 472 ms cold/172 ms warm; scoped `none` 0.3 s vs unscoped 26.4 s (claim 26.3!). Unscoped-filter 500 (gotcha #4) again NOT reproducible (2nd session in a row, incl. 2-hop nested filter).

**Why:** "geo-query is slow" complaints are NOT the GraphQL API — culprits are the MCP path (50/page default), agent round-trips, deep-tail pulls of whole large types, or unscoped `none` exclusion filters.
**How to apply:** for bulk reads use entitiesConnection first:1000 + cursor; expect ~7 s only on deep-tail pages; never add aggressive client timeouts for reads; always scope `none` filters by spaceId+typeId; never null-test `entity(id:)` for existence.
