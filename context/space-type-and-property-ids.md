<!-- geo-agent-context -->
> **Source:** derived from `src/constants.ts` in the canonical toolkit (243 lines, TypeScript) — vendored in this repository  
> **Captured:** 2026-09-16 · **Read as:** durable reference — the working ID registry
> ℹ️ This file did not exist as markdown. It was written for this pack so an agent can look IDs up without parsing TypeScript. `src/constants.ts` remains the source of truth — re-derive if it changes.

---

# Geo ID registry — spaces, types, properties, data types

All IDs are 32-char lowercase hex, no dashes. The API also accepts the dashed UUID form in requests but always returns the undashed form.

Entity URL shape: `https://www.geobrowser.io/space/{spaceId}/{entityId}`

---

## 1. Spaces

### Canonical spaces

A duplicate resident in one of these outranks one that is not. Each has a representative topic entity, resolved at runtime via `space(id){ topicId }`.

| Space | Space ID |
|---|---|
| Root (Geo) | `a19c345ab9866679b001d7d2138d88a1` |
| Crypto | `c9f267dcb0d270718c2a3c45a64afd32` |
| AI | `41e851610e13a19441c4d980f2f2ce6b` |
| Health | `52c7ae149838b6d47ce0f3b2a5974546` |
| Pharma | `19f11bc6f1a62ac434936af814d1f8b5` |
| Technology | `870e3b3068661e6280fad2ab456829bc` |
| World affairs | `89bd89bf28ff8a0963faf92a8c905e20` |
| U.S. Politics | `4582fbbee28a16589154f7e36f1ee3c5` |
| Industries | `d69608290513c2a91102c939b3265bd7` |
| Education | `ec349623f33236aee13c12dcd629ee81` |
| Software | `9b611b848b12491b9b6b43f3cf019b8b` |
| Places | `84a679ce188f061ac9a92380bac2bab5` |
| Documentation / Geo Education | `784bfddae3f3976118c561bf28195b44` |
| Podcasts | `b5a31f8182b042437ede0f84ee02f104` |

Two facts that trip agents up:

- **Root is special.** A Root-resident candidate is always canonical-eligible, and "Root must never lose a topic" is an invariant of the merge tooling.
- **Podcasts is a catch-all, not a topical space.** Every entity touched by a podcast episode gets published there (~510k entities, ~61k Topics). A topic whose *only* home is Podcasts is "not yet properly placed" — it is demoted in canonical selection, and Podcasts is excluded from cleanup scope by editor decision (2026-07-17).

### Dataset (bulk-import) spaces

Hard exclusion: a candidate living in any of these can never be selected as canonical, **and is left untouched by merges**.

| Space | Space ID |
|---|---|
| Crypto datasets | `5908c73ad336472ccbd983491d2d17e4` |
| AI datasets | `941964642f4d3e70ef48f54a3915277d` |
| Health datasets | `44eb138f564fbed6ed9ce543de1b849c` |
| World affairs datasets | `da96a4c26e718bfa6c27c3b1f3c316cd` |
| U.S. Politics datasets | `1b3d2963d14de99d4e440000125edb65` |

### Personal spaces

Resolved at runtime (`space.type === 'PERSONAL'`), not hardcoded. Never reference or keep a topic from one.

---

## 2. Types

| Type | Type ID |
|---|---|
| Type (meta-type) | `e7d737c536764c609fa16aa64a8c90ad` |
| Property (meta-type) | `808a04ceb21c4d888ad12e240613e5ca` |
| Text Block | `76474f2f00894e77a0410b39fb17d0bf` |
| Data Block | `b8803a8665de412bbb357e0c84adf473` |
| Image | `ba4e41460010499da0a3caaa7f579d0e` |
| Page | `480e3fc267f3499385fbacdf4ddeaa6b` |
| Topic | `5ef5a5860f274d8e8f6c59ae5b3e89e2` |
| Claim | `96f859efa1ca4b229372c86ad58b694b` |
| Quote | `043a171c69184dc3a7dbb8471ca6fcc2` |
| Article | `a2a5ed0cacef46b1835de457956ce915` |
| Person | `7ed45f2bc48b419e8e4664d5ff680b0d` |
| Role | `e4e366e9d5554b6892bf7358e824afd2` |
| Skill | `9ca6ab1f3a114e49bbaf72e0c9a985cf` |
| Podcast | `4c81561d1f9541319cdddd20ab831ba2` |
| Episode | `972d201ad78045689e01543f67b26bee` |

Domain-specific (fitness dataset): Exercise `1362f6523665771634fafe2cd9a5854f` · Muscle group `ace998708d25f56dbc8e72a784526a11` · Training category `ef193dcb3282afebe466b46b8441c479` · Exercise equipment `ed834cda5168124075774c543866e81d`

> The Knowledge Graph Ontology spec lists a *different* ID for `Type` (`8f151ba4de204e3c9cb499ddf96f48f1` is the **Types property**, i.e. the relation type used for type membership — not the Type meta-type). Keep the two straight: `Types` is the edge, `Type` is the node.

---

## 3. Properties

| Property | Property ID | Notes |
|---|---|---|
| Name | `a126ca530c8e48d5b88882c734c38935` | |
| Description | `9b1f76ff9711404c861e59dc3fa7d037` | |
| Types | `8f151ba4de204e3c9cb499ddf96f48f1` | relation: entity → its Type(s) |
| Blocks | `beaba5cba67741a8b35377030613fc70` | relation: attaches blocks to a parent |
| Markdown content | `e3e363d1dd294ccb8e6ff3b76d99bc33` | text-block body |
| Data source type | `1f69cc9880d444abad493df6a7b15ee4` | query vs collection |
| Filter | `14a46854bfd14b1882152785c2dab9f3` | JSON-encoded data-block filter |
| Collection item | `a99f9ce12ffa4dac8c61f6310d46064a` | relation: collection → member entity |
| View | `1907fd1c81114a3ca378b1f353425b65` | view preference on a Blocks relation |
| Data Type | `6d29d57849bb4959baf72cc696b1671a` | relation: Property → Data Type entity |
| Renderable Type | `5338cc2897044e96b5477dfc58da6fc7` | from the ontology spec |

### Tags, featured, curated

| Thing | ID |
|---|---|
| Tags (relation type) | `257090341ba5406f94e4d4af90042fba` |
| Featured topic (tag entity) | `b69b8b1659df4e6d99d79956a30e8932` |
| Curated topic (tag entity) | `7f796eb5bfc5449c98649bf7d996a2ca` |

A topic is "featured" / "curated" if it has a `Tags` relation — **in any space** — pointing at the corresponding tag entity.

### Claim-relation properties

Three Root-space properties on the Claim schema, used in a strict two-step process (step 1 links every adjudicated pair with **Related claims**; step 2 assigns established groups to a bracket):

| Relation | Property ID | Means |
|---|---|---|
| Related claims | `504e5776788844f6a77dba3ee811d8f0` | same broader issue / topic / event / context, **distinct** assertions |
| Duplicate claims | `982866bf8ae94afe8cce8b805713e4af` | the same claim created 2+ times, near-identical |
| Similar claims | `e81750db3f09440cab9dd01808a43ccb` | Root-schema, description-less; see the campaign memory for the full bracket definitions |

Per-direction edge IDs are composed as `from16 + to16` for the edge and `to16 + from16` for the relation entity — so an edge ID can share a 16-char prefix with an unrelated property ID. Match on the full 32 chars, never a prefix. Full taxonomy and the hard rules (e.g. Podcasts claims are never linked) are in `skills/actionable/geo-claim-grouping/SKILL.md` (HARD RULES).

---

## 4. Never-touch IDs

### Voting data — system-maintained, never migrated

Geo's entity-voting feature records a vote as a `Rank Votes` relation from a Rank entity (usually in the voter's personal space) to the voted entity, aggregated into `Score`. **None of this belongs to the entities you operate on.** Merge / move / copy must never copy, redirect, or delete it — doing so fabricates or destroys votes. `Score` stays readable for canonical selection; it just never appears in generated ops.

| Thing | ID |
|---|---|
| Score (value property) | `85a4668a42fa4f488969c0a9de0c294b` |
| Rank Votes (relation type) | `19a4cfff45f24150abf2af0f43eb2eec` |
| Vote Ordinal Value | `49ee1b8918204e75a1ae38a2dcaad4a5` |
| Vote Weighted Value | `103701ddcabe4a8e835b10345327b647` |

Rule of thumb: **if both duplicates are scored, do not merge — escalate to a human.**

### Anchored (identity) entities

A space's identity lives on its `page` (home) entity: name, description, Avatar, Cover. Deleting these empties the space's identity even if the rest is repopulated. A space wipe must skip them by default.

| Thing | ID |
|---|---|
| Avatar (profile photo) | `1155befffad549b7a2e0da4777b8792c` |
| Cover image | `34f535072e6b42c5a84443981a77cfa2` |

> Why this guard exists: an Aug-2026 personal-space wipe deleted the profile photo and space description because a bulk script processed the page entity and its Avatar/Cover images as ordinary rows.

---

## 5. Data types and views

### Data-type entity IDs (what a Property's Data Type relation points at)

| Data type | Entity ID | SDK discriminant |
|---|---|---|
| Text | `9edb6fcce4544aa5861139d7f024c010` | `text` |
| Checkbox / Boolean | `7aa4792eeacd41868272fa7fc18298ac` | `boolean` |
| Integer | `149fd752d9d04f80820d1d942eea7841` | `integer` |
| Float64 | `9b597aaec31c46c88565a370da0c2a65` | `float` |
| Decimal | `a3288c22a0564f6fb409fbcccb2c118c` | — |
| Date | `e661d10292794449a22367dbae1be05a` | `date` |
| Time | `ad75102b03c04d59903813ede9482742` | `time` |
| Datetime | `167664f668f840e1976b20bd16ed8d47` | `datetime` |
| Schedule | `caf4dd12ba4844b99171aff6c1313b50` | `schedule` |
| Point | `df250d17e364413d97792ddaae841e34` | — |
| Bytes | `66b433247667496899b48a89bd1de22b` | — |
| Embedding | `f732849378ba4577a33fac5f1c964f18` | — |
| Relation | `4b6d9fc1fbfe474c861c83398e1b50d9` | — |

A property with **no** Data Type relation is a relation-only property.

> These are the in-graph *entity* IDs. The Knowledge Graph Ontology spec also lists a second, different set of UUIDs for data types (`db22a933…` for Text, etc.) — those are the **serialization-spec** identifiers. Use the entity IDs above when writing ops against the live graph; use the spec table when reading the GRC-20 wire format.

### Data source singletons

| Source | ID |
|---|---|
| Query data source | `3b069b04adbe4728917d1283fd4ac27e` |
| Collection data source | `1295037a5d9c4d09b27c5502654b9177` |

### View types

| View | ID |
|---|---|
| Table (default) | `cba271cef7c140339047614d174c69f1` |
| List | `7d497dba09c249b8968f716bcf520473` |
| Gallery / grid | `ccb70fc917f04a54b86e3b4d20cc7130` |
| Bulleted list | `0aaac6f7c916403eaf6d2e086dc92ada` |

---

## 6. Endpoints

| Purpose | URL |
|---|---|
| GraphQL read (current) | `https://api-testnet.geobrowser.io/graphql` |
| GraphQL read (**retired**) | ~~`https://testnet-api.geobrowser.io/graphql`~~ |
| Testnet RPC | `https://rpc-geo-test-zc16z3tcvf.t.conduit.xyz` |

Note the hyphen position — `api-testnet` (current) vs `testnet-api` (dead). Many documents in this pack predate the switch and are flagged accordingly. In code, read the endpoint from `GeoTestnetConfig.apiOrigin` rather than hardcoding it.

Related reading: `topic-reference-and-canonical-rules.md` (which ID to reference when duplicates exist), `skills/actionable/geo-clean/SKILL.md` (canonical selection) (how these IDs feed the selection rules), `graphql-schema-quirks.md` (how to query without hitting the slow paths).
