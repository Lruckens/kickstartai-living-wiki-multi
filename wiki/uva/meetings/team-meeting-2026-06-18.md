# Meeting: UvA Team + Sanne Final Demo Check-in (2026-06-18)

**Last updated:** 2026-06-19
**Date:** 2026-06-18
**Type:** Internal UvA team + KickstartAI stakeholder meeting (final demo check-in)
**Status:** ingested (Gemini-generated transcript summary)

## Summary
The **final scheduled check-in with Sanne Wielinga** before the 2026-06-22 thesis defence — the "Thu 18.06: demo to Sanne + final feedback" milestone from [[team-meeting-2026-06-15]] and [[project-timeline]]. Laurenz demoed the fully integrated multi-project system live; Sanne gave final feedback. Source: `2026-06-18-meeting-notes.md` (Gemini-generated notes/transcript summary).

This meeting delivers: (a) **the Vercel deployment question resolved as "not deploying"**; (b) **Sanne's explicit statement** that she and another KickstartAI engineer intend to use this work as a **starting point for an internal KickstartAI project**; (c) a newly revealed **Obsidian graph integration** (visual knowledge-graph of wiki page links); (d) a **cross-session learning** feature description from Xiaojing; and (e) final thesis-defence logistics.

## Attendees
- **Laurenz Ruckensteiner-Geyer** — demoed the integrated system.
- **Quinten van den Heuvel** (quintenvdheuvel12@gmail.com) — present; next steps include data ingestion + presentation prep.
- **Xiaojing Li** (lee89953@gmail.com) — highlighted the cross-session learning feature.
- **Cara / Meng Cheng** (carac.m.cheng@gmail.com) — present; next steps include presentation prep.
- **Sanne Wielinga** — Senior ML Engineer, KickstartAI; main project contact. Gave final feedback and made the internal-use commitment. See [[kickstartai-team]], [[project-team]].

> ⚠️ **Transcription note:** The Gemini transcript uses "YUA" for UvA, "Baky" / "Bucky" for Bakkie — transcription artefacts throughout. All treated as UvA / Bakkie. See [[_gaps]].

## System demonstration
Laurenz demoed the fully integrated system:

### Four account types confirmed
- **UvA member** (`anna.jansen`) — UvA project only.
- **Project Bakkie member** (`bram.bakker`) — Bakkie project only.
- **Combined account** (`carla.visser`) — both projects.
- **External guest** (`gast.bezoeker`) — public content only; cannot use query or trigger functions. Permission layers restrict guest access.

This **precisely corroborates** the demo accounts documented in [[multi-project-app-2026-06-17]] and [[wiki-generation-engine]].

### Wiki functionality
- Overview page summarizes project status and milestones; index manages content growth.
- Users can query the wiki, ingest documents, and set permission levels (public/internal/restricted) for different teams.

### Generator + save features
- Generator identifies the sources of its generated information.
- Users can **save generated content or query responses directly to the wiki** — stored in a dedicated **generated outputs section**. The save-query-response angle is newly described here. See [[generator-module]].

### Gaps dashboard
- Organizes issues by priority — **high / medium / low** — and specifies the detection method: **rule-based, semantic, or graph-based**.
- The system alerts to **broken links** with the **exact location and fix recommendations**. See [[gap-detector]].

### Permission layers
- Guest accounts are restricted to public content only; they cannot use query or trigger functions.

### Project toggling
- UvA + Bakkie projects in a **single application** with a **toggle at the bottom of the interface** — corroborates the multi-project app. See [[multi-project-app-2026-06-17]].

### Obsidian graph integration — NEW
- Laurenz showcased an **Obsidian graph integration**: a **visual map of links between wiki pages**, demonstrating the interconnected nature of the documentation and potentially improving query efficiency.
- **This feature has not been mentioned in any prior ingested source.** Implementation details and whether it is part of the production system or a demo-only feature are unspecified. See [[_gaps]].

### Cross-session learning — NEW framing
- **Xiaojing** highlighted that the wiki supports **cross-session learning**: users can ask the system to summarize learnings from a project, then **ingest that summary as an internal document** so other team members can access it in future sessions.
- Whether this is a dedicated UI flow or a general wiki capability is unspecified. See [[_gaps]].

## Key decisions

### Vercel deployment — RESOLVED as "not deploying"
- The team **decided against deploying to Vercel** to prioritize **individual thesis work and test cases**.
- This **closes the long-standing Vercel deployment open gap** tracked in [[_gaps]], [[wiki-generation-engine]], and [[generator-module]]. The gap is resolved as a deliberate decision not to deploy, not a deferred action item.

### Final integration demo scheduled Friday 2026-06-20
- The team agreed to meet on **Friday 2026-06-20** to review all final details — the last pre-defence integration check. See [[project-timeline]].

### Individual thesis presentations
- Team members will create **individual PowerPoint presentations** for the thesis defence to ensure distinct student contributions.

### Individual thesis writing strategy
- Write **unique individual theses**; only specific shared sections (some business-understanding content) may be kept consistent. Strict differentiation to avoid plagiarism.

## KickstartAI internal use — significant NEW commitment
- **Sanne stated** that she and **"another engineer"** at KickstartAI intend to **use this work as a starting point for an internal KickstartAI project**.
- The wiki provides "valuable context on features and the decision-making process."
- This is the **first explicit, on-the-record statement of post-thesis internal reuse intent by KickstartAI** — the strongest evidence yet of the configuration-not-rewrite / reuse-across-projects vision becoming a concrete plan. See [[_reuse]], [[_gaps]].
- The identity of the "another engineer" is unknown — see [[_gaps]].

## Thesis defence logistics
- **Grading:** pass/fail structure; strict requirement for individual work differentiation.
- **Supervisor feedback:** supervisor is currently at a conference; indicated project work is "generally sufficient, provided individual contributions are clear" — positive signal; full feedback not yet received.
- **Presentations:** individual PowerPoint presentations; UI to be showcased.
- **Post-defence:** team plans to meet **Thursday evening** after the thesis deadline to review decisions + supervisor feedback + **demo the Bakkie project** to Sanne. See [[_gaps]].

## Next steps (from notes)
- **[Laurenz, Quinten]** Perform full data ingestion ("tomorrow" = 2026-06-19) for a clean project setup.
- **[Cara]** Prepare individual PowerPoint presentation.
- **[Quinten]** Prepare individual PowerPoint presentation; annotate thesis data manually; share intermediate results as markdown files.
- **[Laurenz, Quinten, Cara]** Meet at 11:00 AM the following day to coordinate.
- **Friday 2026-06-20:** Final integration demo meeting.
- **Monday 2026-06-22:** Thesis defence.
- **Post-defence Thursday evening:** Review decisions + feedback + demo Bakkie.

## Conflicts / ambiguities
- ✅ **Vercel deployment — RESOLVED (not deploying).** All prior open-gap entries [[_gaps]], [[wiki-generation-engine]], [[generator-module]] list Vercel as an open action item. This meeting closes it with a clear decision: not deploying, prioritizing thesis work instead. Recorded as a deliberate decision, not a failure.
- ⚠️ **Obsidian graph — NEW, undocumented feature.** No prior source mentions this. Role and implementation details unspecified. See [[_gaps]].
- ⚠️ **Cross-session learning — NEW feature framing.** Prior sources do not describe this as a distinct capability. Whether it is a dedicated UI flow or a general wiki behaviour is unspecified. See [[_gaps]].
- ⚠️ **Transcription artefacts** — "YUA" = UvA, "Baky"/"Bucky" = Bakkie. Not real conflicts.
- **No hard factual contradictions** with the existing wiki — all deltas are resolutions or additive new facts.

## Related
- [[wiki-generation-engine]]
- [[gap-detector]]
- [[generator-module]]
- [[permission-layer]]
- [[multi-project-app-2026-06-17]]
- [[project-timeline]]
- [[project-team]]
- [[_reuse]]
- [[_overview]]
- [[_gaps]]

## Sources
- 2026-06-18-meeting-notes.md (Gemini-generated transcript summary, final UvA + Sanne check-in meeting, 2026-06-18)
