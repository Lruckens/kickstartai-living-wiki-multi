# Deliverable: Generator Module

**Last updated:** 2026-06-19
**Status:** scoped (Should Have for digests/summaries; blog drafts a Could Have); **integrated into the wiki architecture & functional (2026-06-11)**; **UI built + working MVP (2026-06-12)**; **prompt-engineering test planned (2026-06-15)**

## Summary
A module that produces periodic outputs from the wiki — weekly project digests, stakeholder summaries, or draft blog posts — aligned with a configurable tone and audience.

## Details
Serves the Summarizer and Content Generator user journeys. It transforms project knowledge into coherent, up-to-date content tailored to different audiences, with configurable tone and level of detail. Blog post drafts should be written in KickstartAI's voice and evaluated against a human-written baseline (see [[evaluation-deliverable]]). Tone/voice specification is not yet defined — see [[_gaps]].

### Built MVP — Lovable UI + FastAPI backend (2026-06-12)
The 2026-06-12 mock-up artifact (see [[mockup-artifact-2026-06-12]]) describes the working generator MVP:
- **UI built with Lovable.** Users configure, in steps: **(1) output type, (2) stakeholder, (3) tone, (4) length**, plus **explicit include/exclude details** (step 4). Pressing generate shows the result in a side panel. An example brief, conversational **LinkedIn draft** is shown.
- **Output types fixed in collaboration with KickstartAI** during a discussion (partially resolves the publication/output-type open question — the specific list is referenced but not enumerated in extractable form; see [[_gaps]]).
- **Technical stack:** the `generate` operation + instructions (based on Quinten's thesis functional design) are added to **CLAUDE.md**; generated outputs are saved to `wiki/generator`; the **KickstartAI-provided Anthropic API key** is stored in a gitignored `.env` (with `.env.example` template); a separate **wiki-reader Python module** gathers relevant wiki pages/content so the LLM has real project context; the **FastAPI backend** sends a prompt (CLAUDE.md instructions + relevant wiki context + UI config) to Anthropic and passes the result back to the UI.
- **Integration:** the transformations were sent in a **pull request to Laurenz's main GitHub**, integrating into the actual wiki (corroborates [[team-meeting-2026-06-11]]).
- ⚠️ **Deployment problem:** the backend runs **locally on Quinten's laptop** — the generator only works while he runs it. Central deployment (Sanne suggested **Vercel**) is the next step; otherwise each member needs the right installations. See [[wiki-generation-engine]], [[_gaps]].

### Prompt-engineering test planned (2026-06-15)
At the 2026-06-15 meeting (see [[team-meeting-2026-06-15]]), **Quinten will run a prompt-engineering test**, after which the **backend may be updated**. Separately, the **branch-per-member workflow** adopted at that meeting (any member can run the integrated UI via a personal branch + local repo, with Laurenz gatekeeping merges to `main`) **partially mitigates** the laptop-local deployment gap — though it is not the central/URL deployment that Vercel would provide. See [[wiki-generation-engine]], [[_gaps]].

### Build status (2026-06-04 → 2026-06-11)
**Quinten** built the generator module (see [[team-meeting-2026-06-04]]). As of **2026-06-11** it is **integrated into the wiki architecture and functional** (see [[team-meeting-2026-06-11]]) — the earlier integration risk is **resolved** (see below). Because his module is integrated and functional, Quinten can **already start applying evaluation metrics** and is now leading **evaluation-metric selection** for the [[evaluation-framework]]. (This corroborates Quinten ≈ Member 2 as a *soft signal*, not an assertion — see [[project-team]], [[_gaps]].)

> ✅ **Generator↔GitHub integration — RESOLVED (2026-06-11).** Earlier framing (2026-05-14, 2026-06-04) recorded the integration of the generator module with Laurenz's GitHub architecture as an **active, at-risk** task. The 2026-06-11 meeting (see [[team-meeting-2026-06-11]]) confirms **Quinten's and Laurenz's modules are already integrated** and the generator is **functional within the wiki** — the 2026-06-12 artifact confirms the PR-based integration. The at-risk warning is therefore **resolved**, not a standing risk. See [[wiki-generation-engine]], [[_gaps]].

> ✅ **Sourcing approach — RESOLVED toward "from the wiki" (2026-06-12).** Earlier (2026-05-14) Quinten raised an **undecided** design choice: generate **based on the wiki** vs. **search the underlying source documents**. The implemented MVP (see [[mockup-artifact-2026-06-12]]) resolves this **toward "from the wiki"**: a **wiki-reader module** gathers relevant **wiki pages/content** as context for generation. Recorded as resolved for the implemented MVP. See [[team-meeting-2026-05-14]], [[_gaps]].

### Integration with the system architecture (2026-05-14 → 2026-06-12)
**Laurenz and Quinten** worked out how to **combine the generator module with the GitHub wiki architecture** (the first MVP — see [[wiki-generation-engine]], [[team-meeting-2026-05-14]]). The architecture runs on **Claude Code + Anthropic API** (repo `github.com/Lruckens/kickstartai-living-wiki` — see [[laurenz-sanne-email-2026-05-15]]). As of **2026-06-11** the two modules are **integrated and functional**, with the generator merged via PR into `main` (see [[team-meeting-2026-06-11]], [[mockup-artifact-2026-06-12]]).

### Generation strategies (Assignment 1a report, 2026-04-22)
The Member 2 RQ investigates **multiple LLM-based generation strategies**, named explicitly in the report: **direct prompting, retrieval-augmented generation (RAG), and template-driven generation**. Output quality is systematically evaluated across factual accuracy, freshness, coverage, and usefulness. See [[assignment-1-report-2026-04-22]].

### MoSCoW & ownership (Assignment 1, 2026-04-22)
- **Should Have:** generator module producing **weekly digests + stakeholder summaries**.
- **Could Have:** **blog-post draft generation with tone alignment** (a stretch goal this iteration).
- **Ownership:** Assigned to **Member 2**. The Member 2 RQ ties generation and evaluation together: "How can different LLM-based generation methods effectively produce periodic, stakeholder-specific project outputs, and how can the quality of these outputs be systematically evaluated?" See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]], [[project-team]].

The content-generation rationale aligns directly with KickstartAI's "We share" pillar (publicly labeled **"Amplify"** on the homepage) — openly sharing learnings and replicable patterns with the Dutch ecosystem (see [[kickstartai]]). KickstartAI has a Content Strategist on staff (Ioanna Lykiardopoulou — see [[kickstartai-team]]) who is a possible owner of the "KickstartAI voice" spec, though this is unconfirmed.

### Publication venues (possibilities only)
No source connects the Living Wiki's generated output to any specific channel, though the implemented MVP includes a **LinkedIn draft** example. Two plausible public venues are documented:
- **[[kickstartai-blog]]** — KickstartAI's public news/blog. The *more plausible* venue for generated blog posts; its existing **"GenAI project management lessons"** theme is a concrete example of the target genre and voice.
- **[[techdays]]** — KickstartAI's flagship conference; a possible venue, but more event- than article-oriented.

Both are noted as possibilities only, not assertions — see [[_gaps]].

## Related
- [[user-journeys]]
- [[evaluation-deliverable]]
- [[wiki-generation-engine]]
- [[mockup-artifact-2026-06-12]]
- [[team-meeting-2026-05-14]]
- [[team-meeting-2026-06-04]]
- [[team-meeting-2026-06-11]]
- [[team-meeting-2026-06-15]]
- [[laurenz-sanne-email-2026-05-15]]
- [[assignment-1-presentation-2026-04-22]]
- [[assignment-1-report-2026-04-22]]
- [[project-team]]
- [[kickstartai]]
- [[kickstartai-team]]
- [[kickstartai-blog]]
- [[techdays]]

## Sources
- 2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md
- KickstartAI_About_us.md (https://kickstart.ai/about-us, created 2026-05-07)
- KickstartAI_homepage.md (https://kickstart.ai/, created 2026-05-07)
- KickstartAI_News.md (https://kickstart.ai/news, created 2026-05-07)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-04-22-problem-definition.md (Assignment 1a written project-definition report, text-extractable)
- 2026-05-14-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-05-15-Laurenz-Sanne-email-content.md (KickstartAI x UvA demo follow-up email thread, 2026-05-15 → 2026-05-18)
- 2026-06-04-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-06-11-meeting-notes.md (internal UvA team working meeting notes, development phase)
- 2026-06-12-mock-up-artifact.md (Living Wiki UI mock-up artifact description + Sanne feedback, development phase)
- 2026-06-15-meeting-notes.md (internal UvA team working meeting notes, development → evaluation phase transition)
