# Deliverable: Generator Module

**Last updated:** 2026-06-19
**Status:** scoped (Should Have for digests/summaries; blog drafts a Could Have)

## Summary
A module that produces periodic outputs from the wiki — weekly project digests, stakeholder summaries, or draft blog posts — aligned with a configurable tone and audience.

## Details
Serves the Summarizer and Content Generator user journeys. It transforms project knowledge into coherent, up-to-date content tailored to different audiences, with configurable tone and level of detail. Blog post drafts should be written in KickstartAI's voice and evaluated against a human-written baseline (see [[evaluation-deliverable]]). Tone/voice specification is not yet defined — see [[_gaps]].

> ⚠️ **Sourcing approach — OPEN design question (2026-05-14).** Earlier framing implied the generator produces outputs *from the wiki* (the compiled knowledge base). At the 2026-05-14 development-phase meeting (see [[team-meeting-2026-05-14]]) Quinten raised this as an **undecided design choice**: should the generator generate content **based on the wiki**, or **search through the underlying source documents** the wiki is built from and then generate? This is not yet settled — the "from the wiki" phrasing should be read as one of two open options, not a decided fact. See [[_gaps]].

### Integration with the system architecture (2026-05-14 / 2026-05-15)
**Laurenz and Quinten** are to work out a way to **combine the generator module with the GitHub wiki architecture** (the first MVP — see [[wiki-generation-engine]], [[team-meeting-2026-05-14]]). The architecture runs on **Claude Code + Anthropic API** (repo `github.com/Lruckens/kickstartai-living-wiki` — see [[laurenz-sanne-email-2026-05-15]]), which is the platform the generator must integrate with.

### Generation strategies (Assignment 1a report, 2026-04-22)
The Member 2 RQ investigates **multiple LLM-based generation strategies**, named explicitly in the report: **direct prompting, retrieval-augmented generation (RAG), and template-driven generation**. Output quality is systematically evaluated across factual accuracy, freshness, coverage, and usefulness. See [[assignment-1-report-2026-04-22]].

### MoSCoW & ownership (Assignment 1, 2026-04-22)
- **Should Have:** generator module producing **weekly digests + stakeholder summaries**.
- **Could Have:** **blog-post draft generation with tone alignment** (a stretch goal this iteration).
- **Ownership:** Assigned to **Member 2**. The Member 2 RQ ties generation and evaluation together: "How can different LLM-based generation methods effectively produce periodic, stakeholder-specific project outputs, and how can the quality of these outputs be systematically evaluated?" See [[assignment-1-presentation-2026-04-22]], [[assignment-1-report-2026-04-22]], [[project-team]].

The content-generation rationale aligns directly with KickstartAI's "We share" pillar (publicly labeled **"Amplify"** on the homepage) — openly sharing learnings and replicable patterns with the Dutch ecosystem (see [[kickstartai]]). KickstartAI has a Content Strategist on staff (Ioanna Lykiardopoulou — see [[kickstartai-team]]) who is a possible owner of the "KickstartAI voice" spec, though this is unconfirmed.

### Publication venues (possibilities only)
No source connects the Living Wiki's generated output to any specific channel. Two plausible public venues are documented:
- **[[kickstartai-blog]]** — KickstartAI's public news/blog. The *more plausible* venue for generated blog posts; its existing **"GenAI project management lessons"** theme is a concrete example of the target genre and voice.
- **[[techdays]]** — KickstartAI's flagship conference; a possible venue, but more event- than article-oriented.

Both are noted as possibilities only, not assertions — see [[_gaps]].

## Related
- [[user-journeys]]
- [[evaluation-deliverable]]
- [[wiki-generation-engine]]
- [[team-meeting-2026-05-14]]
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
