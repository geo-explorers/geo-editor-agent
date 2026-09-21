<!-- geo-agent-context -->
> **Source:** private agent-memory note `geo-clean-merge-quirks.md`, kept alongside the canonical toolkit clone  
> **Captured:** 2026-09-16 · **Read as:** durable reference — what mergeEntities still gets wrong; eyeball these in every dry-run  

---
name: geo-clean-merge-quirks
description: "Empirical quirks/limitations of geo-clean's mergeEntities helper, found by dry-run testing (updated 2026-07-14 after the geo-merge-topics port)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 2785721e-feb7-4c86-a35a-4fe4ea25dd25
---

Originally found by dry-running `mergeEntities` on a real same-space DAO duplicate ("Mojtaba Khamenei", World Affairs). Status as of 2026-07-14, after the geo-merge-topics port (geo-clean 0.3.0):

**FIXED by the port:**
1. ~~Editor can't force the Main~~ — `disableAutoSelect: true` + `out` now exist; the helper honors the passed `mainEntityId`. Skill 0.3.0 mandates the flag (and picks Main via the deterministic cascade in `src/select_canonical.ts`). The fallback auto-select order also changed: Featured tag → Curated tag → blocks → backlinks → props.
2. Main's own relations pointing at a merged secondary are now deleted (previously left dangling at a husk).
3. Voting data (Score `85a4668a…`, Rank Votes `19a4cfff…`) is excluded from all ops — the pre-port helper would migrate votes (fabrication/destruction).
4. `allowCanonicalDelete` guard retained through the port (gmt upstream had dropped it); recursive sub-merges propagate it.

**STILL PRESENT — watch in dry-runs:**
1. **Soft-dup relation detection is inconsistent.** It matches same relation-type + same-NAME + shared-type target; two different "Iran" entity ids with identical names should be caught, but historically a duplicate `Country → Iran` edge slipped through while `Roles → Supreme Leader` was caught. Eyeball added-relation ops.
2. **Recursive orphan deletion widens blast radius** (secondary's Avatar + role targets got cascade-deleted → 3 entities removed, not 1). `orphanTypeFilter` / `skipOrphanCleanup` options exist to bound it; the skill's plan output should count cascade deletions.
3. **Redundant `deleteRelation` ops** (same edge emitted twice; idempotent on publish, but inflates op counts vs the Big-Merge 200-op cap).

New since 0.3.0: post-merge verification via `validate_migration.ts` (snapshot pre-publish → 3-rule check post-publish) is the sanctioned way to prove a merge migrated everything. See [[geo-explorers-repo-overview]] and [[testing-read-only-dry-run-only]].
