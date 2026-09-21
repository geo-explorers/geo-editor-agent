# Working in a Notion workspace that isn't the team's

The operating contract assumes the Agents flow teamspace, with its Work tracker and
QA issue tracker. An editor's own workspace has neither. Do not silently skip task
tracking: set it up once, then work normally.

## Every time you start Notion work

1. **Find out what exists.** Search the workspace for databases named "Work tracker"
   and "QA issue tracker". Search by title; never assume an ID from another workspace.
2. **If both exist**, use them and follow the normal lifecycle.
3. **If either is missing**, tell the editor what you propose to create, in one message,
   and wait for a yes. Never create silently, and never create a second copy of
   something that already exists under a different name — ask instead.
4. **Write the IDs down** in `.notion-workspace.json` at the repo root (gitignored) so
   later sessions reuse them:
   `{ "workTracker": "<id>", "qaTracker": "<id>", "parentPage": "<id>" }`
5. **Then work normally:** log the task before starting, set it In progress, and close
   it with what you did and a link to where the result lives.

## What to create

**Work tracker** — one row per job.

| Property | Type | Values |
|---|---|---|
| Task | Title | — |
| Status | Select | Not started · In progresd |
| Priority | Select | High · Normal |
| Tags | Multi-select | Content · Engineerin|
| Notes | Text | one-line summary |
| Due date | Date | optional |
| QA issues | Relation → QA issue tracker | problems found while doing it |

Task page body: **Objective**, **Scope**, **Result** (filled on close, with a link),
**Verification** (what you checked, and what

**QA issue tracker** — one row per problem f

| Property | Type | Values |
|---|---|---|
| Issue | Title | the problem in one line |
| Status | Select | Open · Confirmed · Disputed · Fix proposed · Fixed · Wont fix |
| Severity | Select | S (breaks a rule or coa likely to spread) · B (costs review time) ·C (cosmetic) |
| Urgency | Select | U0 Immediate · U1 Soon |
| Area | Select | Mirror data · Claim wording · Renames · Topics · Reports · Skills and tooling · Process · Schema |
| Description | Text | what is wrong, with t
| Evidence | Text | links to rows, queries or output |
| Affected page | URL | where the problem li
| Confidence | Select | High · Medium · Low |
| Proposed fix | Text | what you would do |
| Tasks | Relation → Work tracker | the task you were doing |

Severity and urgency are separate: a cosmetic issue can be urgent.

## Rules

- **A 404 means not connected, not missing.** Scripts reach Notion as the integration,
  which only sees pages explicitly connectedconnect the page
  rather than concluding it doesn't exist.
- **Mirrors are not trackers.** Mirror tablers hold your work.
  Never put task rows in a mirror table.
- **One workspace, one pair of trackers.** Bin — a duplicate
  tracker is worse than none, because work splits across both.
