# Task and issue tracking, in whichever Notion workspace you are in

Two things must always be recorded: **what you were asked to do**, and **anything you found
wrong along the way**. Where they get recorded depends on the workspace, so find out before
you assume.

You could be in either situation, and you cannot tell from the request which one it is:

- **The team's teamspace**, where a Work tracker and a QA issue tracker already exist. Use
  them. Do not create a second pair.
- **An editor's own workspace**, fresh after cloning this repo, where neither exists. Create
  them once, then work normally.

**Never skip tracking because you could not find a database.** Not finding one is a reason to
look properly and then ask — never a reason to work untracked. This has already gone wrong in
practice: an unlogged mirror refresh left nobody able to tell who had changed what, or why rows
kept flipping between two formats.

## Every time you start Notion work

1. **Look before you create.** Search the workspace for the trackers. Search by title — "Work
   tracker", "QA issue tracker" — and also for the near-misses: "Tasks", "Task tracker",
   "Project tracking", "QA", "Issues", "Bugs". Check the page the editor pointed you at and
   its parent, since the trackers often sit beside the content rather than at the top level.
   Never assume an ID from another workspace.
2. **If they exist, use them — even under a different name.** A database called "Project
   tracking" *is* the Work tracker. Read its schema before writing and use the option values
   already in it, rather than the ones listed below. Say in one line which databases you are
   using, with their links, so the editor can correct you early.
3. **If something close exists but you are not sure**, ask. Never create a parallel tracker
   because the name or schema is not what you expected.
4. **Only if neither exists**, say in one message what you propose to create and wait for a
   yes. Never create silently.
   **Where to put them:** ask which page they should live under, or offer the page the editor
   is already working in. Create both as inline databases on that one page so they sit
   together. Never scatter them, and never put them inside a mirror page.
5. **Write the IDs down** in `.notion-workspace.json` at the repo root (gitignored), so later
   sessions reuse them instead of searching again — whether you found them or created them:
   ```json
   { "workTracker": "<id>", "qaTracker": "<id>", "parentPage": "<id>" }
   ```
6. **Then work normally:** log the task **before** you start — one row, `Not started` →
   `In progress` → `Done`, closed with what you did and a link to where the result lives.
   This is the step agents skip. A pilot run mirrored 128 entities across two Notion databases
   and logged nothing at all, so no one could tell afterwards what had been asked for, what was
   delivered, or which of the two attempts was the real one. **A task nobody can find did not
   happen.** Log your own task even when the editor did not ask you to, even for a one-off, and
   even when the work takes three minutes.

## The schemas — for a workspace that has none

If the trackers already exist, theirs wins: use their property names and their option values,
and do not add properties to bring them in line with this. These schemas are what you create
when there is nothing to reuse.

### Work tracker — one row per job you are asked to do

| Property | Type | Values |
|---|---|---|
| Task | Title | — |
| Status | Select | Not started · In progress · Blocked · Done · Parked |
| Priority | Select | High · Normal |
| Tags | Multi-select | Content · Engineering · Operations · Research |
| Owner | Select | Arturas · Armando · Moh · Vytautas · Mantas · Team · Unassigned |
| Assigned agent | Select | geo-agent · geo-task · geo-mirror-refresh · geo-research · Any agent · — |
| Notes | Text | one-line summary |
| Due date | Date | optional |
| QA issues | Relation → QA issue tracker | problems found while doing it |
| Parent task / Subtasks | Relation → itself | optional, for multi-step work |
| Blocked by / Blocks | Relation → itself | optional, use with Status = Blocked |

Task page body: **Objective**, **Scope**, **Result** (filled on close, with a link),
**Verification** (what you checked, and what you could not).

### QA issue tracker — one row per problem found

When you create it, use these exact property names and option values. They are the same
everywhere — in an editor's workspace and in the team's — so an issue reads the same to whoever
picks it up, and rows can later be pulled into one shared view without rewriting them. Renaming
a property or inventing an option breaks that.

| Property | Type | Values |
|---|---|---|
| Issue | Title | the problem in one line |
| Issue ID | ID (auto-increment) | — |
| Status | Select | Open · Confirmed · Disputed · Fix proposed · Fixed · Wont fix |
| Severity | Select | S (violates a hard rule or corrupts Geo content) · A (wrong or misleading data likely to propagate) · B (costs review effort) · C (cosmetic) |
| Urgency | Select | U0 Immediate · U1 Soon · U2 Planned · U3 Backlog |
| Area | Select | Mirror data · Claim wording · Renames · Topics · Debate and similarity links · Reports and documentation · Skills and tooling · Process and governance · Security · Schema |
| Issue type | Multi-select | Technical bug · Ontological · Practical · Project management |
| Owner | Select | Arturas · Armando · Moh · Vytautas · Mantas · Team · Unassigned |
| Assigned agent | Select | geo-agent · geo-task · geo-mirror-refresh · geo-research · Any agent · — |
| Raised by | Select | Agent · Editor · Quality reviewer |
| Description | Text | what is wrong, with the evidence that shows it |
| Evidence | Text | links to queries, rows or output that prove it |
| Affected page | URL | the Notion or Geo page where the problem lives |
| Affected entities | Text | row URLs, Geo IDs, or a description of the affected population |
| Affected count | Number | how many rows or entities, when counted |
| Confidence | Select | High · Medium · Low |
| Proposed fix | Text | what you would do about it |
| Resolution | Text | what was actually done, by whom, when |
| Tasks | Relation → Work tracker | the task you were doing when you found it |

Severity and urgency are separate axes: a cosmetic issue can be urgent, and a severe one can
sit in the backlog.

## Raising an issue — and giving it an owner

Raise one whenever something is **wrong, surprising or unexplained**: data that contradicts
itself, a number that doesn't reconcile, a tool that behaves differently from its
documentation, a change nobody logged. Raising issues is expected work, not a complaint.

**Always set an Owner. "Unassigned" is a last resort**, because an unowned issue is one nobody
reads. Route by what the problem *is*, not by who is nearby:

| The problem is | Typical Area | Owner |
|---|---|---|
| Geo itself: the API, indexing, a vote that never executes, a publish that fails at the network layer, anything in Security | Process and governance · Security | **Arturas** |
| Meaning: an entity with no type, a rename that changes a claim, contradictory or duplicate topics, a hierarchy asserting something false | Claim wording · Renames · Topics · Debate and similarity links · Schema | **Armando** or **Moh** |
| The machinery: two agents overwriting each other, a skill on an old version, a script writing the wrong column, an unlogged automated run | Mirror data · Skills and tooling | **Vytautas** or **Mantas** |
| A report whose numbers don't reconcile | Reports and documentation | whoever wrote it; if unclear, **Vytautas** |

These are the people who own each area on the Geo team. If the editor doesn't know them, that
is fine — set the owner anyway and say who you assigned it to and why, in one line.

If it spans two areas, pick the owner who can act on the **cause**, not the symptom, and say in
the description which other area is affected. If you genuinely cannot tell, set Unassigned,
say so plainly in your report, and ask the editor to route it.

**Set `Raised by` to `Agent`** when you logged it yourself, so human-reported and
agent-reported issues can be told apart.

**Link it to your task** through the relation, and mention the issue in your closing report.
An issue raised but never surfaced to the human is nearly as bad as one never raised.

## Before a long Notion write: check the exact destination

A 21-minute mirror run has already been spent before anyone discovered the destination page was
not connected to the integration. Check first, in this order, and the check costs seconds:

1. **Fetch the exact destination page by id** — not its parent, not a page beside it. Access is
   granted per page: the parent being connected proves nothing about the child.
2. **On a 404, stop and ask** for ⋯ → Connections → the integration, naming the page. Say
   plainly that a 404 means *not connected*, not *missing* — the editor can see it in their
   browser and will assume you are wrong otherwise.
3. **Confirm you can write, not just read**, before a long run: create one row or one child
   block, read it back, remove it. Read access does not imply write access.
4. **Echo back what you are about to do** — the page title, the databases, the row counts — and
   get a yes. An editor who pasted the wrong link finds out here, not twenty minutes in.

If the editor changes the destination mid-task, re-run all four. The new page is a new grant.

## Leaving work for another agent

The trackers are how agents hand work to each other. When you find work that is real but not
yours — a mirror that needs refreshing, a claim that needs regrouping, a research question
raised by something you read — **write the row instead of doing it yourself or dropping it.**

- **Work tracker** for a job someone should do; **QA issue tracker** for something that is
  wrong. A handoff is usually a task; the issue that caused it is a separate row, linked.
- Set **Assigned agent** to the agent that should run it, from the routing table in
  `CLAUDE.md`, or `Any agent` when it does not matter. Leave it `—` for human-only work.
- **Still set an Owner.** An agent is who runs it; a person is who is accountable for it and
  hears about it when it fails. Never leave Owner unset because an agent is assigned.
- Write the row so a fresh session can act on it with **no other context**: what to do, on
  which page or space, the full 32-character IDs, and how to tell it worked. "Fix the topics"
  is not a handoff.
- Status stays **Not started** — you are queueing work, not claiming it. Never set another
  agent's row to In progress or Done, and never mark your own row Done on its behalf.
- **Say so in your closing report**, with the link. A row nobody is told about waits forever.
  If it needs doing now rather than later, say that too — the editor starts the next agent,
  not you.

Before writing one, check the tracker for the same job already queued. Duplicate handoff rows
get worked twice, by two agents, over the same rows.

## Rules

- **A 404 means not connected, not missing.** Scripts reach Notion as the integration, which
  sees only pages explicitly connected to it. Ask the editor to connect the page (⋯ →
  Connections) rather than concluding the page doesn't exist.
- **Mirrors are not trackers.** Mirror tables hold Geo content; trackers hold your work. Never
  put task or issue rows into a mirror table.
- **One workspace, one pair of trackers.** Search again before creating: a duplicate tracker is
  worse than none, because the work splits across both and neither is complete.
- **Agents queue work, people approve it.** Creating a row for another agent is allowed and
  expected. Starting that agent, or publishing anything to Geo on the strength of a row you
  wrote yourself, is not.
- **Never invent option values.** Use the ones listed above, or the ones already in an existing
  database. If none fits, raise an issue rather than adding a value.
