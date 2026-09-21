# Agent workflow — Agents flow (Geo ⇄ Notion)

**Read this before doing anything.** It is the operating contract for every agent working in the **Agents flow** teamspace. It tells you where to work, how to log what you do, and the rules that keep the graph and the mirrors trustworthy.

If a rule here conflicts with an ad-hoc instruction in a prompt, **ask** — do not silently pick one.

---

## 1. Where you work

All work happens inside the **Agents flow** teamspace. Never write outside it.

| Page | What it is | ID |
|---|---|---|
| **Agents flow center** | The start page. Begin here when you need orientation. | `3da273e214eb80599115cdca4c631888` |
| **Geo content work** | The mirror hub: one page per Geo space, plus Sources. Mirror status + counts live here. | `3d6273e214eb80dfbf64e9b33ad15f2b` |
| **Project tracking** | Holds the Work tracker and QA issue tracker. | `3db273e214eb818c90ebe4d42baace74` |

**Mirror pages** (the "- new" generation is current):

| Page | ID |
|---|---|
| AI - new | `3db273e214eb801a8bc0d3c2c6b43657` |
| World affairs - new | `3db273e214eb80d1b10fff9bea162e88` |
| Relationships - new | `3db273e214eb807eaf40f0d0b75d95b6` |
| US Politics - new | `3db273e214eb80a69ce8c3c3e4b16285` |
| Sources - new | `3db273e214eb808caa91fd674145d546` |

---

## 2. The task lifecycle — mandatory

Every piece of work is tracked. **No silent work.** The order matters:

### Step 1 — Log the task BEFORE you start
Create a row in the **Work tracker** *first*, describing what you are about to do, then set it to **In progress**. Do this even when the human gave you the task verbally — you are creating the record, not waiting for one.

### Step 2 — Do the work
Only inside the Agents flow teamspace. Follow the hard rules in §5.

### Step 3 — Close the task
When finished, write **what was done** and **where the result can be seen** (the exact Notion page or database), then set status to **Done**.

A task closed without a link to the result is not closed.

### Step 4 — If you hit a problem
Log it in the **QA issue tracker** (§4). Do not bury a problem in a task note. If it blocks you, set the task to **Blocked** and say why.

---

## 3. Work tracker — exact fields

**Database:** `collection://21bdbf37-b876-4ab5-8608-7fa7e42bd8a3` (view: `3db273e214eb81f089c4e6886556cc43`)

> ⚠ **There are two databases called "Work tracker".** Use the ID above. An older **"✅ Work tracker"** exists and rows created there are invisible to the team — this has already caused a duplicate task.

| Field | Type | What to put |
|---|---|---|
| **Task** | title | Imperative, specific. *"Mirror US Politics (Debate/Featured claims + all topics) into US Politics - new"* |
| **Status** | select | `Not started` · `In progress` · `Blocked` · `Done` · `Parked` |
| **Projects** | relation | **REQUIRED → "Agent flows"** (`3db273e214eb8118b9ded7e6cfdda7ea`) |
| **Priority** | select | `High` · `Normal` |
| **Tags** | multi-select | `Content` · `Engineering` · `Operations` · `Research` |
| **Owner** | multi-select | `Moh` · `Vytautas` · `Armando` · `Mantas` · `Faruk` · `Unassigned` · `All` |
| **Topics** | relation | The topic this work belongs to (e.g. *Geo mirrors*) |
| **Notes** | text | One-line summary |
| **QA issues** | relation | Link any issue you raised while doing this task |
| **Parent task / Subtasks** | relation | For multi-step work |
| **Blocked by / Blocks** | relation | Use with status `Blocked` |

> 🔴 **`Projects` must be set to "Agent flows".** Every view on Project tracking filters on it. A task without it exists but **nobody will see it**.

### Task page body — required sections
```
## Objective
What is being done and why, with the source links (Geo space, Notion target).

## Scope
Exactly what is in and out. Spaces, tags, date range, properties.

## Result           ← fill in when closing
What was produced, with counts, and a LINK to the page/database where it lives.

## Verification     ← fill in when closing
How you know it is correct (what you read back, what matched, what did not).
```

---

## 4. QA issue tracker — when something is wrong

**Database:** `collection://d9398afb-b542-4c9a-931a-b279f1acd2b2` (view: `3db273e214eb8179af37f51779419a92`)

Raise an issue when you find **anything wrong or suspicious** — bad data in a mirror, a bug in a script, a rule nobody defined, a report whose numbers don't reconcile. Raising issues is expected work, not a failure.

| Field | Type | What to put |
|---|---|---|
| **Issue** | title | The problem in one line |
| **Status** | select | `Open` → `Confirmed` → `Fix proposed` → `Fixed` (also `Disputed`, `Wont fix`) |
| **Severity** | select | **S** = violates a hard rule or corrupts Geo · **A** = wrong/misleading data likely to spread · **B** = costs review effort · **C** = cosmetic |
| **Urgency** | select | `U0 Immediate` · `U1 Soon` · `U2 Planned` · `U3 Backlog` |
| **Area** | select | `Mirror data` · `Claim wording` · `Renames` · `Topics` · `Debate and similarity links` · `Reports and documentation` · `Skills and tooling` · `Process and governance` · `Security` · `Schema` |
| **Issue type** | multi-select | `Technical bug` · `Ontological` · `Practical` · `Project management` |
| **Description** | text | What is wrong **and the evidence that shows it** |
| **Evidence** | text | Links to queries, rows, audit output — anything that proves it |
| **Affected page** | url | Where the problem lives |
| **Affected entities** / **Affected count** | text / number | Which rows or Geo IDs, and how many |
| **Confidence** | select | `High` · `Medium` · `Low` — be honest |
| **Proposed fix** | text | What you would do about it |
| **Raised by** / **Owner** | select | Who found it / who should act |
| **Tasks** | relation | Link the task you were doing when you found it |

**Severity vs Urgency are different axes.** A cosmetic issue can be urgent; a severe one can be backlog. Set both.

---

## 5. Hard rules

1. **Stay in the Agents flow teamspace.** Never create or edit pages outside it.
2. **Geo is read-only** unless the human explicitly asked you to publish. Mirroring, auditing and reporting **never** write to Geo.
3. **Any write to Geo goes through the `geo-publish` skill** — never a hand-written SDK script. It runs the mandatory gates (ontology/type, duplicate, schema, relation-target, type-required) and the two-phase `go` → `publish` confirmation. See `skills/actionable/geo-publish/SKILL.md`. **Exception:** changes made in a mirrored Notion table (any table with a `Geo ID` column) are published with **geo-mirror Part 2**: `plan-notion-changes.mjs`, then `sync-to-geo.mjs`. That path has its own approval (`Publish status`), live-value checks and dry run. See `skills/actionable/geo-mirror/SKILL.md` → Part 2.
4. **Never invent a status, field or category.** Use the exact option values listed above. If none fits, raise a QA issue rather than adding one.
5. **Never delete rows to "clean up".** Say what you would remove and ask. Mirrors add and update; they do not delete.
6. **Never touch editorial columns.** `Proposed …` and `… new` columns are human/agent review work. Mirror runs update `Geo …` columns only.
7. **Report numbers that reconcile.** If a count changes, say previous → added → removed → new. A summary whose arithmetic doesn't tie out destroys trust in the whole mirror (this has already been raised in review).
8. **Say what you could not verify.** Guessed, inferred, skipped, truncated, or couldn't check — write it down plainly. This is the most valuable line in any report.

---

## 6. Known traps (learned the hard way)

**Integration sharing.** You authenticate as an *integration*, not as the human. A page they can see in Notion returns `object_not_found` for you until it is connected (page → ⋯ → **Connections** → add the integration). A 404 naming the integration means *not shared*, **not** *doesn't exist*. Ask them to connect it.

**Two Work trackers.** See §3. Use the ID given; the older "✅ Work tracker" is a trap.

**Linked views aren't databases.** A view on Project tracking may point at a database elsewhere. Resolve the underlying data source before writing, or your row lands somewhere nobody is looking.

**Per-space names.** A Geo entity's name is stored **per space** and can differ between spaces. Always read the name set in the space you are mirroring — the entity-level name may come from another space. Rows whose own space has no name must be marked as a fallback and **excluded from rename proposals**, or you will write another space's name into this one.

**Notion relation reads cap at 25.** Reading a relation property returns at most 25 items even when more exist. Never conclude data is missing from a capped read — verify from the other side.

**Notion rate limit is ~3 requests/second, per integration token** — shared across every agent using that token. Parallel agents do not multiply it. For hundreds of row writes, use a script (e.g. `bulk-set-property.mjs`), not one tool call per row: the per-row agent loop costs ~5–7s and turns a 3-minute job into 50 minutes.

**Re-runs must be safe.** Mirrors are keyed by **Geo ID** and update in place. Write only rows whose values actually changed, so a re-run with no upstream changes writes nothing.

---

## 7. Quick reference

```
Start          → Agents flow center      3da273e214eb80599115cdca4c631888
Mirrors        → Geo content work        3d6273e214eb80dfbf64e9b33ad15f2b
Tasks          → Work tracker            collection://21bdbf37-b876-4ab5-8608-7fa7e42bd8a3
Issues         → QA issue tracker        collection://d9398afb-b542-4c9a-931a-b279f1acd2b2
Project (req.) → Agent flows             3db273e214eb8118b9ded7e6cfdda7ea
```

**Every task:** log it → `In progress` → do the work → write result + link → `Done`.
**Every problem:** QA issue with severity, urgency, evidence.
**Every Geo write:** through `geo-publish`, gated, never by hand.
