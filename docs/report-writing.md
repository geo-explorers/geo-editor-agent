<!--
  Exported from the Agent Composition catalog (Notion) — the canonical editorial source.
  Page:    https://app.notion.com/p/3dd273e214eb81d5aba6d4f27da8c9ba
  Key:     report-writing-standard
  Level:   1 — All agents   Status: Working guide   Form: Project-specific guide
  Summary: One shared standard for clear executive reports: navigable structure, evidence, severity and priorities, actionable alternatives, and editable Notion decisions.
  Exported: 2026-09-18 by tools/export-docs.mjs — re-run to refresh; do not hand-edit here.
-->

# report-writing.md — report standard
## Practical use
### Apply the standard to each report
Lead with the result or decision needed, then provide only the context required to assess it. Use headings to expose the document's structure and put evidence beside consequential claims. Preserve the user's actual decisions separately from recommendations. The existing synced examples and practice database below remain illustrative; they do not record approval of a real project decision.
Working standard · 16 September 2026 · Maintainer: Noesis / Agent flows
> [!] A report should help its reader understand the situation, identify what matters, and make the next decision. Lead with the answer, show the most consequential issues first, and put evidence one click away.
  Required in every report: a table of contents, all three heading sizes, a concise executive overview, precise source links, and clear next steps. Where a decision is needed, provide alternatives, a recommendation, and an editable place for the user’s answer and context.
Quick links: Decision memo · Severity, urgency, and priority · Quality checklist
# 1. Write for the decision maker
## Executive overview
The opening should answer what is happening, why it matters, and what we should do next. Aim for three to five short bullets that a manager can understand in about a minute.
- Assessment: the direct answer to the report’s main question, including any important condition.
- Top issues: the few problems most likely to change a decision or block the goal.
- Recommendation: the preferred course and its main reason.
- Decision needed: the exact choice, responsible person, and real deadline when known.
- Next progress: the concrete outcome the next work period should produce.
### Writing rules
- Keep paragraphs to three sentences or fewer. Use plain language, meaningful labels, and short table cells.
- Explain consequences before implementation details. Replace “the relation adapter is incomplete” with “editing this column does not yet reliably update the intended Geo relationship.”
- Separate observed facts, interpretation, recommendations, and unknowns. Use “verified,” “sampled,” “reported,” or “not tested” accurately.
- Include useful positive findings and completed outcomes, especially when they narrow the remaining problem.
- Put logs, long inventories, technical details, and supporting evidence behind links or in the final evidence section.
- Do not force a decision where none is needed. Write “No decision required; next action is …” when appropriate.
## Define the report’s frame
Near the top, name the purpose, audience, author, date, scope, and evidence cutoff. For changing data, give the observation time and timezone; a page’s last-edited date does not establish when its facts were checked.
### Make the coverage explicit
Identify the projects, databases, spaces, entity types, date range, and fields actually reviewed. Distinguish a complete review from a sample and state material access gaps.
# 2. Structure and navigation
## Use all three heading sizes
Use H1 for major sections, H2 for questions or workstreams, and H3 for findings, options, or checks within them. Use descriptive headings in order; do not skip from H1 to H3 or count the page title as an H1 section.
Place a native table of contents near the top of every report. Even a short report should have a compact, meaningful hierarchy; shorten the content rather than adding filler to satisfy the structure.
### Standard report outline
  | Level | Section | What belongs here |
  | H1 | Executive assessment | Main answer, what changed, top issues, recommendation, and decisions needed. |
  | H2 → H3 | Current state → Key finding | Only the facts needed to understand the assessment, with evidence and limits. |
  | H1 | Issues and decisions | Ranked findings and short decision memos. |
  | H2 → H3 | Specific question → Options and recommendation | Alternatives, tradeoffs, choice control, decision owner, and notes. |
  | H1 | Next steps and evidence | Today’s outcomes, owners, dependencies, completion checks, and source register. |
  | H2 → H3 | Action plan → Verification | How we will know the work is complete, and what remains untested. |
Adapt section names to the report. Put a consequential decision in the opening summary even when its full memo appears later.
## Choose the right presentation
- Flat tables: compare alternatives, issues, status, ownership, or next actions. One row should mean one thing; keep the default view narrow enough to scan.
- Bullets: present parallel findings, requirements, or steps.
  - Sub-bullets: explain evidence, implications, or exceptions.
    - Further sub-bullets: use when the extra level expresses a real dependency or distinction.
- Database views: show records the reader should filter, update, choose, or comment on.
- Callouts: highlight a verdict, a blocker, or a decision needed now. Use them sparingly.
### Keep navigation useful
Use descriptive links such as “Hierarchy mismatch — evidence” rather than “here.” Link a related page once where it helps; link the exact supporting block beside a consequential claim.
# 3. Executive memos and user decisions
## One memo per consequential question
  ### Decision memo — required contents
  - Question: one exact, answerable question, with the scope of the choice.
  - Why now: the consequence of deciding or delaying, including the relevant deadline or dependency.
  - Evidence: the few facts that distinguish the alternatives, with precise links and uncertainty.
  - Alternatives: usually two to four viable answers. Include deferral or the current approach when it is a real option.
  - Recommendation: the preferred answer and why; state what evidence would change it.
  - User decision: a visible, editable choice, separate from the recommendation.
  - Context: rationale, constraints, exceptions, and comments.
  - Accountability: decision owner, decision date when made, resulting task, and completion check.
### Compare real alternatives
For each option, show what changes, the benefit, the cost or risk, and prerequisites. Avoid making the preferred option sound effortless while describing the others unfairly.
  | Option | Benefit | Cost or risk | When it fits |
  | A — Focused pilot | Tests the essential workflow quickly. | Does not establish larger-scale performance. | The approach still needs end-to-end evidence. |
  | B — Broader rollout | Covers more work immediately. | More costly rework if assumptions fail. | The core workflow is already verified. |
  | C — Defer | Preserves capacity for a higher priority. | Delays the expected benefit. | A prerequisite or decision is missing. |
Illustrative comparison only: these alternatives do not establish a decision about the current Geo project.
## Make answering easy in Notion
### Choose the appropriate control
  | Decision type | Control | Rule |
  | Exactly one answer | Select property | Use for mutually exclusive alternatives. |
  | Several compatible answers | Multi-select property | State which combinations are valid and any selection limit. |
  | Independent yes/no choices | Checkbox per option, or one option per database row | An unchecked box is unanswered unless “No” is explicitly recorded. |
  | Explanation or exception | Your notes / Decision rationale text | Keep the reasoning beside the chosen answer. |
  | Discussion of a passage | Native Notion comment on the exact block or row | Record the final outcome in the decision record so it survives a resolved discussion. |
Keep Recommended answer and User choice separate. Leave the user’s choice empty until they decide; do not treat a recommended option, a default selection, silence, or a comment asking a question as acceptance.
### Customize options without confusing other decisions
Select and multi-select options belong to a database property, so changing that property changes the vocabulary available to every row using it. A filtered tab does not create a different option set for each row.
For a recurring family of questions, use a shared vocabulary. For a unique question, use a small decision-specific choice table within its canonical Decision page, or an Options database with one row per option and a relation to its Decision.
### Keep one authoritative decision record
Use the existing My decisions for actual project decisions. Link the report, project, relevant QA issue, and resulting task; embed filtered linked views when useful instead of copying records.
The current database already records Decision owner, Status, Summary, Decision date, and related records. It does not currently have generic user-choice or rationale properties; the controls demonstrated below are examples for configuring a decision interface, not a claim that every existing decision has those fields.
Use Proposed / In discussion while a decision is open, and Accepted / Rejected when the responsible person has decided. Record the chosen answer and rationale in the record, preserve changed decisions through Supersedes / Superseded by, and keep implementation status separate from decision status.
# 4. Severity, urgency, and priority
## Show the most important work first
  ### Three distinct judgments
  Severity is the consequence of the problem. Urgency is how soon it needs attention. Priority is the order in which we should act, considering severity, urgency, dependencies, expected benefit, confidence, and effort.
  Use the existing QA labels: S = violates a hard rule or corrupts Geo content; A = wrong or misleading data likely to propagate; B = costs review effort; C = cosmetic.
  Use the existing urgency labels: U0 Immediate, U1 Soon, U2 Planned, U3 Backlog. Explain the actual time constraint or dependency rather than assigning urgency from severity alone.
### Rank by consequence and what it unlocks
- Put active corruption, hard-rule violations, and immediate blockers first.
- Identify decisions and prerequisites that unlock the project’s main outcome.
- Compare the reach of each problem, recurrence, reversibility, and cost of delay.
- Consider confidence and effort; an uncertain but potentially serious problem may need a small investigation first.
- Give each top item a one-sentence “why now”. If everything is high priority, make the relative order explicit.
Keep the existing Work tracker’s High / Normal field and add a clear ordered shortlist in the report. Do not silently introduce a competing scoring system or pretend that an arbitrary numerical score is measured evidence.
## Use a compact issue table
### Minimum useful fields
Rank · Issue / consequence · Severity · Urgency · Recommended next action · Owner / task link.
Put confidence, affected counts, dependencies, and detailed evidence in the linked issue or a second view when the main table becomes too wide. Preserve the issue’s current status and distinguish the reporter’s recommendation from an agreed team priority.
Use the My QA issues and PRIORITIES.md — editorial priorities for the established context.
# 5. Evidence and precise links
## Put evidence beside the claim
Link the relevant document, database, filtered view, row, and specific content block at the appropriate level. Use Notion’s Copy link to block for the exact heading, paragraph, table, or finding; verify that it opens the intended passage.
### Deep-link rules
- Use a real block ID returned by Notion or copied from the interface. Never invent a heading fragment from its title.
- Label the linked evidence with its meaning and observation date where freshness matters.
- Link a database row for one entity and a saved filtered view for a defined population. State the filter and scope in prose.
- If only a page link is available, name the section and disclose that the link opens the whole page.
- Check that the intended audience can access evidence. Keep private notes and credentials out of shared reports.
## Make numerical and completion claims auditable
### Evidence discipline
- Report requested, retrieved, changed, and verified counts when they differ. Give denominators, date bounds, and exclusions.
- Separate entity counts from relation counts and overlapping memberships.
- Identify whether a view is live or whether a count describes a dated snapshot.
- Separate draft → saved in Notion → submitted proposal → executed change → indexed verification → reconciled mirror.
- A successful write is not proof of a correct result. State what was read back and what remains unverified.
- Treat old session reports as dated evidence. Recheck facts that determine today’s recommendation.
The Agent flows — current state and today’s priorities · 16 September 2026 provides examples of scoped counts, verified findings, limitations, and concrete next steps. Its historical formatting is not the complete template for this new standard.
# 6. Views, next steps, and recurring reports
## Useful report tabs
### Configure each tab for its purpose
  | Tab | Filter | What the reader sees |
  | Decisions needed | Relevant project/report; Proposed or In discussion. | Question, recommendation, answer control, owner, notes. |
  | Priority issues | Relevant active issues; S/A severity or U0/U1 urgency. | Impact, urgency, owner, next step, evidence link. |
  | Today’s actions | Relevant work explicitly selected for today. | Ordered outcomes, owner, dependency, completion check. |
  | All records | Report scope only; retain resolved items. | Full context and completed or superseded records. |
These are view specifications; create only the tabs useful for that report and verify the actual filters. Name temporary or illustrative views clearly, and keep an “All” route so a filter cannot hide the record permanently.
## Next steps must describe outcomes
### Today’s action plan
For each of the few most important actions, state the result, owner, dependency, and completion check. Use a real deadline when agreed; otherwise label it “proposed” or “not set.”
“Verify a complete selected-entity round trip and record the comparison” is actionable. “Improve mirroring” is too vague to establish completion.
## Update efficiently
### Preserve continuity
Refresh only the facts needed for the report’s decisions and the records that changed. Reuse stable context, preserve user answers and comments, and do not overwrite a decision while refreshing its evidence.
Lead a recurring report with what changed since the last edition and explain changes in priority. Keep the previous evidence cutoff, a short revision note, and links to decisions that were made; correct or supersede stale conclusions explicitly.
# 7. Before delivery
## Author and review checks
Copy this checklist as ordinary blocks into each report. Keep the master unchecked; do not use a synced reference for per-report checkmarks.
  ### Report quality checklist
  - [ ] The opening answers the main question and names the most important issues and next outcome.
  - [ ] A table of contents and meaningful H1, H2, and H3 headings are present.
  - [ ] Paragraphs have no more than three sentences; tables and bullets are easy to scan.
  - [ ] Facts, interpretations, recommendations, and unknowns are distinguishable.
  - [ ] Severity, urgency, and action order are justified; the top items explain why they matter now.
  - [ ] Each real decision has alternatives, a recommendation, an editable answer, room for rationale, and an identified owner or explicit owner gap.
  - [ ] User answers are not preselected; mutually exclusive answers use a single-choice control.
  - [ ] Consequential claims link to precise evidence; block links, view filters, and access have been checked where available.
  - [ ] Counts, observation dates, scope, and verification limits are stated.
  - [ ] Next steps have outcomes, responsibility, dependencies, and completion checks.
### Ownership and maintenance
The author checks evidence and presentation before delivery. Use the project’s independent review process when the work calls for it; identify unresolved objections rather than claiming agreement.
Maintain these rules here, under Agent Composition. Other guides should link here instead of maintaining competing copies.
## Sources and related work
### Basis for this standard
- The editor’s report requests on 16 September 2026: executive clarity, three heading sizes, tables, precise links, actionable priorities, and interactive choices with comments.
- Agent flows — work and communication guide: canonical records, comments, decision ownership, and status.
- Working agreements — instruction section: evidence, uncertainty, authority, and verification.
- Live Decisions, QA issue tracker, and Work tracker schemas checked on 16 September 2026.
# 8. Try the decision controls
## Editable examples
### Practice without recording a project decision
The database below is an illustrative practice area. Open a row, choose an answer, add Your notes, and use the row’s native comments for discussion.
Use Choose one for exclusive alternatives and Choose several for compatible improvements. Recorded is a practice checkbox only; no selection here accepts a project decision, publishes content, or starts work.
[DB] Decision practice — examples only   id=f6dfeefa89a44a1f94807f5ba112094e
