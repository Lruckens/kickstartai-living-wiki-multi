# Deliverable: Project Timeline / Gantt Chart

**Last updated:** 2026-06-19
**Status:** referenced (Gantt image-only); 12-week/3-phase structure known textually; **final-demo / thesis-defence date pinned to 2026-06-22**; **multi-project app built 2026-06-17**

## Summary
A **project Gantt chart / timeline** for the Living Wiki exists, dated **2026-04-13** (the kickoff day). The chart artifact is **a single embedded image** (CDN-hosted JPG) with **no extractable text**, so its visual contents (phases, tasks, durations, milestones) are **not ingested**. However, the **Assignment 1 presentation** (see [[assignment-1-presentation-2026-04-22]]) supplies an explicit **12-week / 3-phase** schedule textually, and the **2026-06-15 team meeting** (see [[team-meeting-2026-06-15]]) now pins concrete **end-of-project dates** (final demo + thesis defence on **2026-06-22**), partially resolving the long-standing "absolute dates not pinned" gap.

## Details
- **What:** A Gantt chart laying out the project schedule. Quinten van den Heuvel shared a **rough draft** at kickoff.
- **12-week / 3-phase structure (Assignment 1 presentation, 2026-04-22):**
  - **Phase 1 (weeks 1–4)** — Problem definition & Design.
  - **Phase 2 (weeks 5–9)** — Development & Iteration.
  - **Phase 3 (weeks 10–12)** — Evaluation & Synthesis.
  - Week numbers only — **absolute start dates not pinned** in the deck; the end is now anchored (see below). See [[_gaps]].
- **Concrete end-of-project schedule (2026-06-15 meeting):**
  - **Wed 2026-06-17** — Quinten + Laurenz design the evaluation framework / ingestion-evaluation experiment (text-generation evaluation). **Multi-project app also built this day** (see [[multi-project-app-2026-06-17]]).
  - **Thu 2026-06-18** — demo to Sanne + final feedback; then re-ingest project docs into an empty wiki.
  - **Fri 2026-06-19** — ingest a fake KickstartAI project as a new-project use-case.
  - **Mon 2026-06-22** — **final demo of the artifact + individual thesis defence** (anchors the Phase 3 end / project end). See [[team-meeting-2026-06-15]], [[evaluation-deliverable]].
- **Methodology (from kickoff notes + presentation):** The plan follows **CRISP-DM** (6 phases: business understanding → data understanding → data prep → modelling → evaluation → deployment), now layered with **Design Science Research (DSR)** per the presentation. The Gantt was **assumed to start April 1st**.
- **Status — draft needing revision:** The kickoff plan **needed updating** due to a delay in project selection. Whether the 12-week/3-phase structure exactly matches the (still-unread) revised Gantt image is **not confirmed** — see [[_gaps]].
- **Content status (Gantt image):** The ingested source (`2026-04-13-Gantt_chart.md`) is image-only. The chart's specific task breakdown, durations, dependencies, and milestone dates are not readable and have **not** been fabricated. See [[_gaps]].
- **Re-ingest flag:** Enrich once the chart is OCR'd / transcribed or a text/structured version of the (updated) schedule is supplied.

## Timeline anchors
- ~2026-04-01 — assumed CRISP-DM start (per draft Gantt; needs revision due to selection delay).
- 2026-04-13 — kickoff meeting (KickstartAI x UvA), 10:00 CEST; draft Gantt shared (image-only, contents not ingested).
- ~2026-04-22 (Wed) — Assignment 1 (project definition) presentation, 9–11 AM; 12-week/3-phase schedule presented.
- **2026-06-17** — multi-project app built; Quinten + Laurenz evaluation experiment design meeting.
- 2026-06-17 → 2026-06-22 — final demo run-up: eval-framework design + multi-project app (17.06), Sanne demo + re-ingest (18.06), fake-project ingest (19.06), **final demo + thesis defence (22.06)**.

## Related
- [[assignment-1-project-definition]]
- [[assignment-1-presentation-2026-04-22]]
- [[kickoff-meeting-2026-04-13]]
- [[team-meeting-2026-06-15]]
- [[multi-project-app-2026-06-17]]
- [[evaluation-deliverable]]
- [[_overview]]
- [[project-team]]

## Sources
- 2026-04-13-Gantt_chart.md (project Gantt chart, image-only; contents not ingested)
- 2026-04-13-KAI-UvA-Kickoff-meeting-notes.md (Gemini-generated kickoff meeting notes)
- 2026-04-22-presentation-slides.md (Assignment 1 project-definition presentation deck, text-extractable)
- 2026-06-15-meeting-notes.md (internal UvA team working meeting notes, development → evaluation phase transition)
- 2026-06-17-MULTI-APP.md (multi-project Living Wiki app README / architecture overview, 2026-06-17)
