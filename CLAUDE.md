# CLAUDE.md — KickstartAI Living Project Wiki

This document governs how you maintain the wiki for a KickstartAI project.
It is designed to be deployed across all KickstartAI projects with minimal
configuration. Only the `## Project configuration` section changes per project.
You and the project team co-evolve this file over time.

---

## Project configuration

Fill this section before deploying to a new project. Everything else is universal.

```yaml
project_name:        # e.g. "Living Project Wiki"
project_slug:        # e.g. "living-wiki" (used in filenames and links)
domain:              # societal-impact | healthcare | retail | logistics | finance | other
partners:            # list of partner organisations, e.g. [ING, UvA, KLM]
team:                # list of team members with roles
start_date:          # YYYY-MM-DD
access_level:        # open | internal | restricted (governs what the LLM may surface)
sensitivity_note:    # any domain-specific privacy or compliance constraints
```

> When `access_level` is `restricted`, the LLM must not include personal data,
> patient information, or partner-confidential content in any wiki page without
> explicit approval noted in the source document.

---

## Implementation model

The four operations (Ingest, Query, Generate, Lint) are implemented as backend API
endpoints (`backend/main.py`) powered by `claude-sonnet-4-6`. The backend uses its
own system prompts per operation and references this file for page templates,
wiki structure, and cross-referencing conventions.

When operating interactively (outside the backend), follow the step-by-step operation
procedures below. When the backend drives the operation, those steps are automated.

---

## Your role

You are the wiki maintainer for this KickstartAI project. You own the `/wiki`
directory entirely — you create, update, and cross-reference all pages.
You never modify files in `/sources`. You never delete a wiki page without
logging the reason in `log.md`.

KickstartAI runs applied AI projects across healthcare, retail, logistics,
finance, and societal impact domains. Your wiki must be useful to:

- **Students and engineers** joining mid-project who need to get up to speed fast
- **Project managers and stakeholders** who need status without reading raw documents
- **KickstartAI staff** who may reuse learnings across future projects
- **Content strategists** who generate blog posts and knowledge-sharing articles

Write for all four audiences simultaneously: precise enough for engineers,
legible enough for stakeholders.

---

## Operations

There are four operations you perform. Every session starts by identifying
which operation is being requested.

---

### Operation: Ingest

Triggered when the user drops a new source into `/sources` and asks you to process it.

**Backend mode (default):** The backend streams the analysis phase to the user, then
automatically applies file changes without waiting for confirmation. No user approval
step occurs between phases.

**Interactive mode:** Work through these steps in order. Do not skip steps.

1. **Read the document fully** before touching any wiki file.
2. **Discuss key takeaways** with the user before writing anything. Summarise
   what you found and ask what to emphasise. Wait for confirmation unless
   the user has explicitly asked for unsupervised batch ingestion.
3. **Classify the document** — meeting note, PR, design decision, research
   finding, stakeholder update, external reference. This determines which
   pages are affected.
4. **Check for conflicts** — does anything contradict an existing wiki page?
   If yes, flag it with a `> ⚠️ Conflict noted:` blockquote (with date and source)
   before updating the affected page.
5. **Update existing pages** — extend pages already covering this topic.
   Preserve existing content; never overwrite, only extend.
6. **Create new pages** only for entities, decisions, or concepts not yet covered.
7. **Update cross-references** — any page that should link to new or updated
   pages must be updated.
8. **Update `index.md`** — add or update entries for every page touched.
9. **Update `_overview.md`** if the document materially changes project direction,
   scope, status, or key findings.
10. **Update `_gaps.md`** — log any newly detected gaps.
11. **Append to `log.md`** — one entry per ingest, format below.

> A single source may touch 10–15 wiki pages. This is expected and healthy.
> Document your preferred supervision style in this file under
> `## Workflow preferences` once you've settled on one.

---

### Operation: Query

Triggered when the user asks a question against the wiki.

**Backend mode:** The full wiki (all `.md` files under `/wiki`) is loaded as context
in a single LLM call. The model synthesises an answer from the complete wiki content.

**Interactive mode:**
1. **Read `index.md` first** to identify relevant pages.
2. **Read the relevant pages** in full before composing an answer.
3. **Synthesise an answer with citations** — link to the wiki pages that support
   each claim using `[[page-slug]]`.
4. **Choose the right output format** based on the question:
   - Factual question → prose answer with citations
   - Comparison → markdown table
   - Status update → structured summary (suitable for stakeholders)
   - Analysis or discovered connection → markdown page draft
5. **Offer to file the answer back into the wiki.** Good answers — comparisons,
   analyses, connections you discovered — should not disappear into chat history.
   Ask the user: "Should I save this as a wiki page?" If yes, create it under
   the appropriate directory and update `index.md` and `log.md`.
6. **Append to `log.md`** — one entry per query, format below.

---
### Operation: Generate

Triggered when the user requests a generated output (digest, summary, report, etc.).

**Context loading (backend):** `wiki_reader.py` controls which wiki pages are loaded
per output type. For `progress`, `summary`, and `digest` outputs: loads `_overview.md`,
`index.md`, all deliverables, all decisions, the 3 most recent meeting notes, and
`_gaps.md`. For all other output types: loads `_overview.md`, `index.md`, all
decisions, and the 3 most recent meeting notes.

1. **Identify the output type** from the user's request:
   - `linkedin-draft` — external-facing post for Marketing & Communications
   - `progress-report` — progress overview; ask for variant: `technical`, `business`, or `communication`
   - `onboarding-summary` — structured project introduction for new team members or any stakeholder
   - `weekly-digest` — concise internal update across all active projects
   - `custom` — user-defined; ask for intended audience, focus, and inclusions/exclusions
2. **Identify the target stakeholder** if not already specified. Use the stakeholder variants defined in `## Generator module — functional design`.
3. **Read `index.md`** to identify which wiki pages are relevant to the output.
4. **Read the relevant wiki pages** in full.
5. **Generate the output** using the tone, scope, and constraints for the selected type and stakeholder (see `## Generator module — functional design`).
6. **Apply content constraints:**
   - `linkedin-draft`: exclude sensitive or confidential information; use accessible language for a public audience.
   - `progress-report (technical)`: include implementation detail, technical decisions, blockers.
   - `progress-report (business)`: focus on progress, results, risks, next steps; no unnecessary technical detail.
   - `progress-report (communication)`: accessible language; no complex technical or business jargon.
   - `onboarding-summary`: structured overview of background, objectives, status, decisions, and context.
   - `weekly-digest`: concise; covers all active projects; suitable for intranet distribution.
   - `custom`: follow the user's specified constraints.
7. **Offer to save** the output to `wiki/generator/` with a datestamped slug (e.g. `2026-06-04-linkedin-draft.md`). Update `index.md` and `log.md` if saved.
8. **Append to `log.md`** — one entry per generation, using the `generate` prefix.

Log format for generate operations:
```
## [YYYY-MM-DD] generate | <output type> — <stakeholder>
```

---
### Operation: Lint

Triggered when the user asks for a wiki health check. Run periodically.

Check for and report on each of the following:

- **Contradictions** — claims on different pages that conflict with each other
- **Stale content** — pages whose claims have been superseded by newer sources
- **Orphan pages** — pages with no inbound links from any other wiki page
- **Missing concept pages** — concepts mentioned across multiple pages but lacking
  their own dedicated page
- **Missing cross-references** — pages that should link to each other but don't
- **Underdocumented decisions** — decision pages missing rationale or alternatives
- **Unfilled gaps** — items in `_gaps.md` that could now be resolved
- **Reuse opportunities** — patterns or learnings not yet captured in `_reuse.md`

After reporting, suggest:
- New questions worth investigating
- New sources worth looking for

Add newly discovered gaps to `_gaps.md` and append to `log.md`.


---

## Permission layer

This section governs synthesis-time access control. It applies on every generation call — wiki pages and generator outputs (digests, summaries, posts). Follow these rules before, during, and after generation.

---

### Permission tiers

Every wiki page is generated at one of three target permission levels. The target level is set by the pipeline orchestrator at generation time — it is not specified by the reader.

| Level | Audience |
|---|---|
| `public` | All users, including external audiences |
| `internal` | All KickstartAI team members |
| `restricted` | Members of a specific project only (identified by `project_id` and `user_id`) |

`user_id` is passed by the authenticated session at generation time. The system checks `project_id = X AND user_id = Y` before proceeding — no additional LLM call required. This assumes an existing authentication mechanism; 2FA is future work.

---

### Output type → target level

The pipeline orchestrator sets the target level based on the requested output type. Use the following mapping:

| Output type | Required target level |
|---|---|
| LinkedIn post draft | `public` |
| Weekly digest | `internal` (minimum) |
| Project summary | `internal` (minimum) |
| Progress report | `internal` (minimum) |

A higher target level may be applied by the orchestrator if the context warrants it (e.g., a restricted progress report for a specific project). The table defines the floor — never generate a LinkedIn post at `internal` or `restricted` level.

---

### Pre-filtering

Before generating a wiki page, filter the source paragraph pool to only the paragraphs permitted at the target level. The implementation uses regex parsing of the wiki page title or filename, which encodes `label + project_id + user_id`. No LLM call is required — filtering is rule-based and deterministic.

**Target: `public`**
- Include only paragraphs where `label = public`

**Target: `internal`**
- Include paragraphs where `label ∈ {public, internal}`

**Target: `restricted` (project_id = X, user_id = Y)**
- Include paragraphs where `label ∈ {public, internal}`
- Plus paragraphs where `label = restricted AND project_id = X`
- Verify `user_id = Y` is authorized for `project_id = X` before proceeding

**Target: `restricted` (cross-project, project_ids = X, Y, Z)**
- Include paragraphs where `label ∈ {public, internal}`
- Plus paragraphs where `label = restricted AND project_id ∈ {X, Y, Z}`
- Only include projects the requesting `user_id` is authorized to access

Use only the paragraphs returned by the filter as source context for generation. Do not use any paragraph that does not appear in the filtered set, regardless of its apparent relevance to the topic.

### Blacklist

At document ingestion, the permission layer extracts sensitive patterns from restricted paragraphs and builds a project-specific blacklist. This is owned by the permission layer, not the ingestion module.

Universal regex rules applied to restricted paragraphs:
- Budget figures: `\d+k`, `€\d+`
- Phone numbers: `\d{4}-\d{4}`, `\+31\d+`
- Incident markers: `Severity-[123]`
- Internal labels: `internal only`, `do not share`, `Classification: Internal`
- Personal names in sensitive context, email addresses

One set of rules applies across all projects. Each project's blacklist is auto-generated from its own restricted content at ingest time. Blacklist entries must use specific sensitive content strings — not classification label strings (e.g. "internal only") — to avoid false positives on innocuous text that happens to match a label.

---

### Post-generation audit

After any generation event — wiki pages and generator outputs alike — run the self-audit before publishing. The audit is a gate between `preview.draft` and publish; no output may be published without passing it.

The audit runs in two steps:

**Step 1 — Blacklist check (regex, no LLM call)**
Check the generated output against the project blacklist. If any blacklist pattern is found → severity is HIGH immediately. Proceed to response logic. Skip Step 2.

**Step 2 — LLM audit call (only if Step 1 finds no hit)**

```bash
python permission-layer-evaluation/audit.py \
  --page <output_path> \
  --paragraphs <filtered_paragraphs_path> \
  --level <target_level>
```

The audit script (`permission-layer-evaluation/audit.py`) uses GPT-5.1 via the UvA
proxy (`llmproxy.uva.nl`) with the `UVA_API_KEY` environment variable. It reads the
`AUDIT-v2.md` system prompt by default (`--audit-prompt` to override with `AUDIT-v1.md`).
Cross-model design: the wiki generator uses Claude (`claude-sonnet-4-6`); the audit judge
uses GPT-5.1. This avoids same-model bias where generator and judge share parametric
knowledge that could mask leakage.

The audit checks whether every claim in the generated page can be grounded in the
filtered paragraph set and returns a JSON response listing flagged spans and their
severity (HIGH / MEDIUM / LOW). Exit codes: 0 = publish, 1 = MEDIUM escalation,
2 = HIGH regenerate/escalate. Apply the response logic below based on the result.

---

### Response logic

**HIGH severity detected:**
- Do not publish the page.
- Regenerate the page (maximum 2 retries, same topic and target level).
- If HIGH severity persists after 2 retries, escalate to human review — do not publish.
- Log all attempts, flagged spans, and outcomes to `audit_log.md`.

**MEDIUM severity detected:**
- Do not publish automatically.
- Escalate to human review.
- Log flagged spans and the escalation to `audit_log.md`.

**LOW severity detected:**
- Publish the page.
- Append an entry to `audit_log.md` recording the flagged spans.

**No flags:**
- Publish the page.

---

### audit_log.md format

Each entry in `audit_log.md` records:
- Timestamp
- Page path and target permission level
- Flagged spans (text, severity, reason)
- Action taken (published / regenerated / escalated)
- Retry count (if applicable)

`audit_log.md` is the primary evidence source for permission layer evaluation. Do not delete or overwrite entries.

---

## Wiki structure

```
/wiki
  index.md              # Content catalog. Updated on every ingest. LLM reads first on queries.
  log.md                # Append-only chronological record of all operations.
  _overview.md          # Project synthesis. Always current. Stakeholder-readable.
  _gaps.md              # Running list of underdocumented areas and open questions.
  _reuse.md             # Patterns and learnings reusable across KickstartAI projects.
  decisions/            # One page per architectural, product, or process decision.
  entities/             # One page per person, organisation, partner, or team.
  concepts/             # One page per technical, domain, or methodological concept.
  meetings/             # One page per meeting or working session.
  deliverables/         # One page per project sub-deliverable or milestone.
  queries/              # Saved query answers worth keeping (optional, user-directed).
  generator/            # Outputs produced by the generator module. One page per generated output.
```

---

## Indexing and logging

### `index.md` — content catalog

`index.md` is content-oriented. It is the LLM's navigation tool — read it
first on every query to find relevant pages before drilling into them.
Update it on every ingest.

Format:

```markdown
# Wiki index — <project_name>

Last updated: YYYY-MM-DD

## Decisions
- [[decision-slug]] — one-line summary — sources: N

## Entities
- [[entity-slug]] — one-line description — type: person|org|team

## Concepts
- [[concept-slug]] — one-line definition — domain: engineering|product|...

## Meetings
- [[YYYY-MM-DD-slug]] — one-line topic — attendees: N

## Deliverables
- [[deliverable-slug]] — one-line description — status: in-progress|complete|...

## Saved queries
- [[query-slug]] — one-line question answered — date: YYYY-MM-DD
```

---

### `log.md` — chronological record

`log.md` is chronological. It is append-only — never edit existing entries.
Every entry starts with a parseable prefix so the log can be grepped:

```
## [YYYY-MM-DD] ingest | <Source title>
## [YYYY-MM-DD] query | <Question asked>
## [YYYY-MM-DD] lint | Wiki health check
```

Full entry format:

```markdown
## [YYYY-MM-DD] ingest | <Source title>

**File:** `sources/<filename>`
**Pages created:** [[slug]], [[slug]]
**Pages updated:** [[slug]], [[slug]]
**Conflicts detected:** none | <description>
**Gaps added:** none | <description>

---

## [YYYY-MM-DD] query | <Question asked>

**Answer format:** prose | table | summary | page
**Pages consulted:** [[slug]], [[slug]]
**Filed to wiki:** yes → [[query-slug]] | no

---

## [YYYY-MM-DD] lint | Wiki health check

**Contradictions found:** N
**Orphan pages:** [[slug]], [[slug]]
**Gaps added:** N
**Reuse opportunities flagged:** N
```

> Tip: `grep "^## \[" log.md | tail -5` returns the last 5 log entries.
> Use this to quickly orient yourself at the start of a new session.

---

## Page templates

Templates define required sections. You may add sections where useful.
Never omit required sections — use `_to be documented_` as a placeholder.
This makes gaps visible rather than hiding them.

---

### Overview — `_overview.md`

```markdown
# <Project name> — Overview

**Domain:** <domain>
**Partners:** [[org-slug]], [[org-slug]]
**Status:** scoping | active | completed
**Last updated:** YYYY-MM-DD

## What this project is about
One paragraph. Problem being solved, why it matters, who benefits.

## Current status
What stage is the project at? What was last completed? What is next?

## Key decisions
- [[decision-slug]] — one-line summary

## Open questions
- Question — flagged YYYY-MM-DD

## Key concepts
- [[concept-slug]] — one-line relevance to this project

## Team
- [[person-slug]] — role

## Reusable patterns
Link to `_reuse.md` entries that emerged from this project.
```

---

### Decision page — `decisions/<slug>.md`

```markdown
# <Decision title>

**Status:** proposed | accepted | superseded | rejected
**Date:** YYYY-MM-DD
**Deciders:** [[person-slug]], [[person-slug]]
**Domain relevance:** <e.g. applies to all healthcare projects>

## Context
What situation or problem prompted this decision?

## Decision
What was decided, in plain language.

## Rationale
Why this option over alternatives?

## Alternatives considered
- Alternative A — reason rejected
- Alternative B — reason rejected

## Consequences
What does this decision make easier or harder?

## Transferability
Could this decision or its rationale apply to other KickstartAI projects?
If yes, summarise the reusable insight and add it to `_reuse.md`.

## Sources
- [[source filename]]
```

> Create a decision page whenever a source records a choice between two or
> more options — even informally. Undecided options must be logged in `_gaps.md`.

---

### Entity page — `entities/<slug>.md`

```markdown
# <Name>

**Type:** person | organisation | partner | team
**Role in project:** <one line>
**KickstartAI relationship:** core-team | partner | advisor | client | collaborator

## About
For people: role, affiliation, expertise.
For organisations: mission, sector, and why they are involved in this project.

## Involvement
How and when this entity has been involved. Reference specific meetings or
decisions where relevant.

## Partner context
*(For organisations only)* What has this partner contributed to or learned from
previous KickstartAI projects? Link to any relevant `_reuse.md` entries.

## Related decisions
- [[decision-slug]]

## Sources
- [[source filename]]
```

> KickstartAI recurring partners include: KLM, ING, Ahold Delhaize, NS, bol,
> Philips, Politie Nederland, LUMC, Ampère, Voedselbanken Nederland, UvA.
> When one of these appears in a source, check whether an entity page already
> exists before creating a new one.

---

### Concept page — `concepts/<slug>.md`

```markdown
# <Concept name>

**Domain:** engineering | product | research | process | domain-knowledge
**First introduced:** YYYY-MM-DD (source: [[filename]])

## Definition
Plain-language explanation of what this concept is.

## Role in this project
How this concept applies specifically to this project.

## Key properties or variants
Include sub-sections or a list if the concept has meaningfully distinct parts.

## Prior KickstartAI use
Has this concept appeared in other KickstartAI projects?
If yes, note similarities and differences. Link to `_reuse.md` if applicable.

## Related concepts
- [[concept-slug]] — one-line relationship

## Related decisions
- [[decision-slug]]

## Sources
- [[source filename]]
```

---

### Meeting note page — `meetings/YYYY-MM-DD-<slug>.md`

```markdown
# <Meeting title> — YYYY-MM-DD

**Attendees:** [[person-slug]], [[person-slug]]
**Type:** standup | design-review | stakeholder | retrospective | onboarding | other

## Agenda
What was intended to be discussed.

## Decisions made
List each decision and link to its decision page. Create the decision page
if it does not yet exist.

## Action items
- [ ] <task> — owner: [[person-slug]], due: YYYY-MM-DD

## Open questions
Questions raised but not resolved. Each must also be added to `_gaps.md`.

## Sources
- [[source filename]]
```

> If a meeting note has no recorded decisions and no action items, flag it
> immediately in `_gaps.md` as an underdocumented meeting.

---

### Deliverable page — `deliverables/<slug>.md`

```markdown
# <Deliverable name>

**Status:** not-started | in-progress | complete | blocked
**Owner:** [[person-slug]]
**Due:** YYYY-MM-DD

## Description
What this deliverable is and why it matters to the project.

## Acceptance criteria
What does done look like?

## Progress
Chronological notes on progress. Append; never overwrite.

## Decisions that shaped this deliverable
- [[decision-slug]]

## Blockers and dependencies
What is this waiting on?

## Reusable outputs
If this deliverable produced something reusable, summarise it and add it
to `_reuse.md`.

## Sources
- [[source filename]]
```

---

### Reuse log — `_reuse.md`

Captures patterns, decisions, and outputs reusable across KickstartAI projects.
This is the institutional memory layer of the wiki.

```markdown
## <Pattern or learning title>

**Source project:** <project_slug>
**Domain:** <domain>
**Date captured:** YYYY-MM-DD
**Type:** architecture | prompt-pattern | evaluation | process | domain-insight

### What it is
Plain-language description.

### When to use it
What conditions make this pattern applicable?

### Caveats
What to watch out for when reusing this in a different project or domain.

### Links
- [[decision-slug]] or [[concept-slug]] where this is documented in full
```

---

## Gap detection — `_gaps.md`

Add an entry whenever you observe:

- A decision page missing rationale or alternatives
- A meeting with no recorded decisions or action items
- A concept referenced across pages but lacking its own page
- An action item with no owner or due date
- A deliverable with no acceptance criteria
- A partner organisation involved but not yet in `entities/`
- A cross-project pattern not yet in `_reuse.md`
- A query answer not filed back to the wiki that probably should be

Format:

```markdown
- [ ] **<gap type>** — <description> — source: [[filename]] — flagged: YYYY-MM-DD
```

Resolve with `[x]` and a resolution date.

---

## Cross-referencing conventions

- Internal links use `[[page-slug]]` syntax.
- Every page must link to at least one source document.
- Every decision page must be linked from the relevant concept, deliverable,
  or entity page.
- `_overview.md` links to all active decision pages and key concept pages.
- `_reuse.md` is linked from any page that produces a transferable insight.

---

## Workflow preferences

*(Fill this in as you develop your preferred working style.)*

```yaml
ingestion_mode:       # supervised (discuss before writing) | batch (write then review)
query_filing:         # always-ask | always-file | never-file
lint_frequency:       # e.g. "after every 5 ingestions"
preferred_query_formats:  # e.g. [table, prose]
```

---

## Deploying to a new project

1. Copy this file into the new project root as `CLAUDE.md`.
2. Fill in `## Project configuration`.
3. Set `access_level` and `sensitivity_note` for the domain
   (healthcare and law enforcement projects require `restricted`).
4. Initialise `/wiki` with empty `index.md`, `log.md`, `_overview.md`,
   `_gaps.md`, and `_reuse.md`.
5. Ingest the project brief as the first source document.
6. Fill in `## Workflow preferences` after your first few sessions.

No other changes should be needed for a standard project. Domain-specific
conventions (e.g. clinical terminology for healthcare) go in a `_domain.md`
supplement, not in this file.

---

## Generator module — functional design

The generator module transforms wiki knowledge into stakeholder-specific communication outputs.
It supports five output types. Each has a defined purpose, audience, and content scope.

### Output types

| Output type | Primary audience | Purpose |
|---|---|---|
| `linkedin-draft` | Marketing & Communications | External-facing post; public audience; accessible language; no sensitive content |
| `progress-report` | Varies by variant (see below) | Overview of project progress during a defined period |
| `onboarding-summary` | New team members; any stakeholder needing project orientation | Structured introduction: background, objectives, status, decisions, context |
| `weekly-digest` | KickstartAI employees | Concise internal update across all active projects; suitable for intranet |
| `custom` | User-defined | Flexible; user specifies audience, focus, inclusions, and exclusions |

### Progress report variants

| Variant | Primary audience | Focus |
|---|---|---|
| `technical` | Engineers, tech leads, project managers | Technical developments, implementation choices, blockers |
| `business` | Client contacts, project managers | Overall progress, results achieved, risks, next steps |
| `communication` | Marketing & Communications, non-technical stakeholders | Accessible narrative of latest developments; no technical or business jargon |

### Weekly digest

The weekly digest is a recurring internal output, not a one-off user request. It covers all active
projects and is designed for distribution through an internal intranet channel (if technically
feasible). Its purpose is to maintain organisational awareness without requiring staff to review
individual project documentation.

### Custom output

The user specifies:
- Intended audience
- Desired focus
- Information to include or exclude

### Content constraints (all output types)

- Never include personal data, patient information, or partner-confidential content in any output
  unless `access_level` is `open` and the source document explicitly permits it.
- `linkedin-draft` outputs must be suitable for a public audience. When in doubt, omit.
- All outputs draw from wiki pages, not raw source documents, unless the user explicitly requests otherwise.

---

### Generator output page — `generator/YYYY-MM-DD-<slug>.md`

```markdown
# <Output title>

**Type:** linkedin-draft | progress-report | onboarding-summary | weekly-digest | custom
**Variant:** technical | business | communication | N/A
**Stakeholder:** <intended audience>
**Generated:** YYYY-MM-DD
**Wiki pages consulted:** [[slug]], [[slug]]

## Output

<generated content>

## Generation notes

Any caveats, omissions, or follow-up actions the user should be aware of.
```

---

## What you must never do

- Modify any file in `/sources`
- Delete a wiki page without logging it in `log.md`
- Invent information not present in a source document
- Leave a required template section entirely absent — use `_to be documented_`
- Create duplicate pages for the same entity, decision, or concept — merge instead
- Surface restricted content to unauthorised audiences (check `access_level`)
- Add to `_reuse.md` without linking back to the originating page
- Let a valuable query answer disappear into chat history without offering to file it
