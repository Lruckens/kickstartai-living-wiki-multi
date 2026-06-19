# Project / onboarding summary

**Type:** onboarding-summary
**Variant:** N/A
**Stakeholder:** New team member
**Generated:** 2026-06-19
**Wiki pages consulted:** [[_overview]], [[index]], [[evaluation-deliverable]], [[gap-detector]], [[generator-module]], [[ingestion-pipeline]], [[permission-layer]], [[wiki-generation-engine]]

## Output

## Welcome to the Living Project Wiki

This document is your orientation to the project you've just joined. It's intentionally detailed — read it once end-to-end, then keep it open as a reference for your first few weeks. Fittingly, the Living Wiki documents itself, so much of what you read here is also a live example of what we're building.

---

## Background

The Living Project Wiki is a self-documenting GenAI system. The core idea: continuously ingest a project's heterogeneous documents — PDFs, markdown, GitHub repos, meeting notes, emails, slide decks — and produce a *living, auto-updating knowledge base*. Crucially, it goes beyond document search. It synthesizes, summarizes, detects changes over time, and surfaces connections across the knowledge base.

The concept is inspired by Andrej Karpathy's "LLM Wiki" idea. The recursive twist that defines this project: **the first thing the system documents is itself.** That's not just a cute demo — it's our primary dogfooding loop. If the wiki can't keep its own scope, decisions, and gaps coherent, it isn't ready for a real client project.

A few facts worth internalizing early:

- The project is run **for [[kickstartai]]** by students at the **[[uva-ai4business-lab]]**.
- The architecture is explicitly designed for **reuse across all KickstartAI projects** once this initial use case is complete. Don't build something that only works for our own docs.
- The founding brief was received **2026-04-02** (`2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md`). It's the canonical source for scope; when in doubt, check it.

---

## Objectives & Deliverables

The work is organized into six deliverables. Each maps to one or more of the five defining product requirements in [[user-journeys]].

### 1. Ingestion Pipeline ([[ingestion-pipeline]])
Connects to internal document sources, handles heterogeneous file types, and maintains a **versioned document index with change detection**. The versioning matters: changes to source documents must be detectable and propagated downstream. Must handle PDFs, markdown, GitHub repos, meeting notes/transcriptions, emails, and slide decks.

### 2. Wiki Generation Engine ([[wiki-generation-engine]])
The LLM-powered core. Processes ingested documents into **structured, interlinked wiki pages** organized by topic. Pages regenerate or update on a configurable schedule (e.g., daily) as source material changes.

### 3. Generator Module ([[generator-module]])
Produces periodic outputs *from* the wiki — weekly digests, stakeholder summaries, draft blog posts — aligned to a configurable tone and audience. (This onboarding document was produced by it.) Blog drafts are meant to be written in **KickstartAI's voice** and evaluated against a human baseline. The content-generation angle aligns with KickstartAI's public "We share" / **"Amplify"** pillar — openly sharing learnings with the Dutch ecosystem.

### 4. Gap Detector ([[gap-detector]])
Flags underdocumented areas, unresolved decisions, and missing rationale — decisions without rationale, PRs without explanations, meetings without recorded outcomes. Its output feeds pages like `[[_gaps]]`, which you should read early (see below).

### 5. Permission Layer ([[permission-layer]])
Design plus partial implementation of **document-level access control**. The guiding principle: deploying to a sensitive project later should require **configuration, not a rewrite**. See [[permission-model]] for design intent.

### 6. Evaluation Framework ([[evaluation-deliverable]])
Measures the wiki across four dimensions — **coverage, freshness, accuracy, usefulness** — with human-in-the-loop feedback to improve generation over time. A specific sub-goal: evaluate Generator blog drafts against a human-written baseline to make the "creativity/opinion" angle measurable.

---

## Current Status

**Phase: scoping / kickoff.** As of the last update (2026-06-16):

- ✅ Scope, user journeys, and sub-deliverables are **defined**. All six deliverables above are in `scoped` status (the Permission Layer is "scoped — design + partial implementation").
- ⏳ **Not yet documented:** team composition, timeline, and tech stack.
- ⏳ Several design decisions are still open (see below).

The wiki currently holds 16 pages. There are no recorded meetings, decisions, or saved queries in the index yet — itself a signal of how early we are.

---

## Key Decisions Made So Far

Two decisions are locked in and should shape how you think about everything else:

1. **Privacy/permissions are a first-class design concern.** Building for a sensitive deployment is a configuration problem, not a future rewrite. Bake this assumption into any design you touch.
2. **Blog post drafts must be evaluated against a human-written baseline.** This is what makes the Generator's quality measurable rather than vibes-based.

---

## Open Questions & Gaps (read [[_gaps]] first)

Because we're early, much is genuinely undecided. Be careful **not to treat possibilities as facts** — the wiki is deliberately disciplined about this distinction, and so should you be. Current known gaps include:

- **Team, timeline, and tech stack** — not yet documented.
- **Source connectors** — which sources we connect first is undecided.
- **Regeneration cadence** — "daily" is an example, not a commitment.
- **Permission mechanism** — RBAC vs. ACLs not yet chosen.
- **Tone/voice spec** — the "KickstartAI voice" the Generator should write in is not yet specified.
- **Evaluation baseline** — no human-written baseline document exists yet. KickstartAI's existing public blogs ([[kickstartai-blog]]) are a *candidate* corpus — real, human-authored, in-voice articles, including a "GenAI project management lessons" theme — but **no specific article has been selected or ingested.**
- **Publication venue** — no source connects our generated output to any specific channel. The blog is the *more plausible* venue for generated posts; [[techdays]] (KickstartAI's flagship conference) is possible but more event- than article-oriented. Both are possibilities only.

A useful early task for any new joiner: skim `[[_gaps]]` and notice how many of these unknowns block work you might otherwise assume is "just engineering."

---

## Team

- **KickstartAI technical mentor** — TBD.
- **UvA AI4Business Lab students** — TBD.
- A connection to **KickstartAI's engineering team** is available for technical discussion.
- On the content side, KickstartAI has a **Content Strategist on staff (Ioanna Lykiardopoulou** — see [[kickstartai-team]]) who is a *possible* owner of the "KickstartAI voice" spec. This is unconfirmed — don't route work to her assuming it's settled.

---

## Suggested First Steps

1. Read the founding brief (`2026-04-02-UvA-AI4BusinessLab-Living-Wiki-Brief.md`) — it's the source of truth.
2. Read [[living-wiki]], [[user-journeys]], and [[_gaps]] in that order.
3. Browse a few existing wiki pages to see the house style: interlinked, source-attributed, explicit about what's a fact vs. a possibility.
4. Pick one open gap that overlaps your skills and propose how you'd close it — that's the fastest way to turn scoping into momentum.

Welcome aboard. The best way to understand this system is to watch it document its own progress — including yours.

## Generation notes

_to be documented_
