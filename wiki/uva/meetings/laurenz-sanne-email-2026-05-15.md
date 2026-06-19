# Correspondence: Laurenz ↔ Sanne Demo Follow-up (2026-05-15 → 2026-05-18)

**Last updated:** 2026-06-19
**Date:** 2026-05-15 → 2026-05-18
**Type:** Stakeholder correspondence / email thread (UvA student ↔ KickstartAI main contact)
**Status:** ingested

## Summary
A two-message email thread between **Laurenz Ruckensteiner** (UvA team) and **Sanne Wielinga** (KickstartAI main contact), following up on the **first MVP demo** of 2026-05-14 (see [[team-meeting-2026-05-14]]). Source: `2026-05-15-Laurenz-Sanne-email-content.md`. This is a **high-substance source**: it **resolves the long-open LLM/tech-stack question** (Claude Code + Anthropic API), **captures the GitHub repo URL**, substantively advances the **data-privacy / permission-layer** thread, and **delivers two new artifacts** — a purpose-built fictional test corpus (`llm-wiki-student-materials`, containing the **Bakkie** sub-corpus) and a KickstartAI **Project Management Ops folder** structure.

## Participants
- **Laurenz Ruckensteiner** (laurenz.ruckensteiner@gmail.com) — sent the follow-up; holds/owns the GitHub repo. See [[project-team]].
- **Sanne Wielinga** (sanne.wielinga@kickstart.ai / sanne.wielinga@kickstartai.org — domain variant, see Conflicts) — Senior ML Engineer, KickstartAI; main project contact. See [[kickstartai-team]], [[project-team]].
- **CC:** Quinten van den Heuvel (quintenvdheuvel12@gmail.com), Carac M. Cheng (carac.m.cheng@gmail.com = Meng Cheng), Xiaojing Li (lee89953@gmail.com).

## Key points

### Tech stack — RESOLVES the LLM/feasibility question
- The GitHub repo is **directly linked to Claude Code** (Anthropic's terminal-based agent), which **performs all operations and generates the wiki pages**.
- Any documents ingested are **passed to Anthropic's LLM via their API**.
- This answers the 2026-05-14 open question ("what LLM do they use and is this possible?"): the engine runs on **Anthropic (Claude) via Claude Code**, and it is working. See [[wiki-generation-engine]], [[_gaps]].

### GitHub repo — URL captured
- `https://github.com/Lruckens/kickstartai-living-wiki` — the repo flagged for future ingest on 2026-05-14. The URL is now recorded; the repo **body/schema is still not ingested**. See [[wiki-generation-engine]], [[_gaps]].

### Data privacy / permission layer — substantively advanced
- **Concern (Laurenz):** external data flow to Anthropic is fine for the team's own project docs, but problematic for a **deployable artifact** handling **sensitive partner data / NDA-covered materials**.
- **Directions (Sanne):**
  - (a) **Anthropic enterprise/API zero-data-retention (ZDR)** tier differs from consumer products; check what tier Claude Code falls under and whether ZDR is feasible.
  - (b) A **configurable backend** to swap in a **self-hosted or VPC-deployed model** when needed, keeping the rest of the architecture intact — explicitly **connects to the permission layer**.
  - (c) For the thesis, **documenting which operations send data externally vs. stay local** is itself a useful artifact even if the full solution is out of scope.
- See [[permission-layer]], [[permission-model]], [[_gaps]].

### New test corpus delivered (`llm-wiki-student-materials.zip`, ~65K)
- A **fictional but realistic** ~**seven-month** project corpus, **purpose-built for this project** to test ingestion against — "the kind of messy material a real project would generate."
- **Heavier on PM/business artifacts** than engineering (no PR threads, code-review discussions); team advised to **supplement with material from their own repo**.
- ⚠️ **The README in the folder must NOT be fed to the wiki** — it summarises things the tool is meant to discover on its own.
- Contains the **"Bakkie" corpus** with example **meeting notes**. See [[student-materials-corpus]].

### PM Ops folder delivered (`New Templates 2026 [Apr - June]...zip`, ~15.8MB)
- An example of how KickstartAI structures its **Project Management Ops folder** per project — intended to answer the team's "ways of working" questions and inform the **wiki schema**. Contents not ingested as text. See [[kickstartai-pm-ops]].

### Ways of working — partial answer
- Laurenz asked how KickstartAI projects kick off (first partner meeting, problem definition, goal-setting, solution approach, day-to-day collaboration).
- The PM Ops folder answers most; **day-to-day collaboration** to be discussed **on Thursday or earlier on a call** — outcome pending. See [[_gaps]].

### Other action items / notes
- Sanne to share a **Google Drive structure** (pending). See [[_gaps]].
- The team's meetings **were not auto-transcribed**; the team to self-write summaries — corroborating that [[team-meeting-2026-05-14]] and the kickoff notes are self-generated.

## Conflicts / ambiguities
- **LLM-choice gap — RESOLVED, not contradicted.** The wiki listed "LLM choice / feasibility" as an active open question; this source closes it (Claude Code + Anthropic API). An update, not a contradiction. See [[_gaps]].
- **Laurenz = Member 1 — soft signal strengthened, still not asserted.** Laurenz again owns/holds the GitHub repo and is its contact — consistent with Laurenz = Member 1 (Ingestion + Wiki Engine), but the owner-by-person mapping remains formally open. See [[project-team]], [[_gaps]].
- **Two corpora, not one — recorded precisely.** The "document itself first" framing assumed the cold-start corpus = the team's own project docs. The delivered **fictional Bakkie corpus** is a *separate* representative test corpus, not the team's own documents. Not a contradiction — a second corpus. See [[student-materials-corpus]], [[ingestion-pipeline]].
- **Sanne email-domain inconsistency** — appears as both `@kickstart.ai` and `@kickstartai.org`; canonical form unconfirmed. See [[_gaps]].
- **Bakkie is fictional** — must not be merged into the real [[kickstartai-projects]] portfolio.

## Related
- [[team-meeting-2026-05-14]]
- [[student-materials-corpus]]
- [[kickstartai-pm-ops]]
- [[wiki-generation-engine]]
- [[permission-layer]]
- [[permission-model]]
- [[ingestion-pipeline]]
- [[project-team]]
- [[_overview]]

## Sources
- 2026-05-15-Laurenz-Sanne-email-content.md (KickstartAI x UvA demo follow-up email thread, 2026-05-15 → 2026-05-18)
