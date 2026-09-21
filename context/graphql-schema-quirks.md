<!-- geo-agent-context -->
> **Source:** private agent-memory note `geo-graphql-schema-quirks.md`, kept alongside the canonical toolkit clone  
> **Captured:** 2026-09-16 · **Read as:** durable reference — 10 verified deviations between the docs and the live API. Read before writing queries.  
> ⚠️ **Stale detail:** written against the retired read endpoint `testnet-api.geobrowser.io/graphql`. The current endpoint is `api-testnet.geobrowser.io/graphql` (note the hyphen position). Query shapes, filters and findings still hold — only the host changed.  

---
name: geo-graphql-schema-quirks
description: "Live-API schema deviations from the geo-query skill doc, verified 2026-07-03"
metadata: 
  node_type: memory
  type: project
  originSessionId: a25bfb88-019f-4e9a-bb5d-0443cd864503
  modified: 2026-08-17T23:10:41.885Z
---

Verified against `testnet-api.geobrowser.io/graphql` on 2026-07-03 (discovery for crypto role cleanup):

1. **`Relation` has no `createdAt`** — GRAPHQL_VALIDATION_FAILED. Use the inline relation entity instead: `nodes { entity { createdAt } }`.
2. **`StringFilter` has no `equalTo`** (skill doc claims it does) — use `includesInsensitive` / `startsWithInsensitive` (verified working).
3. **`UUIDFilter` has no `startsWith`** — only `is` / `isNot` / `in`.
4. **`Space` has no `entity { name }` field** — `spaces(filter…) { id type }` only; resolve space names from `src/constants.ts` or the space's own entity by other means.
5. **Slow vs fast type scan**: `entitiesConnection(filter: { typeIds: { anyEqualTo: X } })` unscoped = 60s+ timeout; the top-level arg form `entitiesConnection(typeId: X, first: 1000)` = ~1.5s for 1058 rows. Matches the geo-query gotcha "typeId is a top-level arg, not filter" — the filter form isn't just wrong-shaped, it's catastrophically slow when it does parse.
6. `relationsConnection` filters `toEntityId/fromEntityId: { in: [...] }` work fine with ~30 ids, unscoped by space (fast, indexed).
7. **Space scans: same arg-vs-filter split as #5** (verified 2026-07-17 on Root): `entitiesConnection(filter: { spaceIds: { anyEqualTo: X } })` 504s on Root (Geo) at ANY page size (500→50); arg form `entitiesConnection(spaceId: X, first: 500)` returns in ~9s. Filter-form did work on smaller spaces (World affairs, ~50k rows) — it's a big-space cliff, not a hard break. Always prefer the arg form.
8. **`hasNextPage` breaks on final pages** (verified 2026-08-18, post-migration index): `entitiesConnection` with `pageInfo { hasNextPage }` returns "Unexpected error." whenever `first` ≥ rows remaining — i.e. deterministically on every final page. Fix: request `pageInfo { endCursor }` only and stop when a page returns fewer rows than asked, or fetch `totalCount` (`first: 0`, reliable) and never over-ask. `relationsConnection` unaffected (hasNextPage fine even over-asking 1000-on-20).
9. **Entity page-size cliff by payload** (2026-08-18): full-field rows (with `description`) fail/stall at `first` ≥ ~400; `first: 300` reliable; description-less field sets fine at `first: 1000`. Some failing requests HANG instead of erroring — always use a fetch timeout (AbortSignal) + supervisor-restart for long pulls; `src/functions.ts gql()` and `lib/gql.mjs` have NO fetch timeout.
10. **Flake windows**: minutes-long bursts where most entitiesConnection calls return "Unexpected error." under load, then recover — retry with backoff + wait-out loops, don't halve page size to death.

See [[geo-query-api-performance]] for perf limits (first/offset ≤1000, deep-tail stalls) and [[clean-sweep-2026-08-18]] for the sweep that found #8-10.
