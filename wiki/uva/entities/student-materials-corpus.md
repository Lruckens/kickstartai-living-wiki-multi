# Entity: Student-Materials Corpus (`llm-wiki-student-materials`)

**Last updated:** 2026-06-19
**Status:** received (delivered 2026-05-18); documents not yet ingested; **"Bakkie" also used as a project id in the multi-project app (2026-06-17) — identity ambiguity flagged**

## Summary
A **purpose-built test corpus** delivered by Sanne Wielinga to the UvA team on 2026-05-18 (see [[laurenz-sanne-email-2026-05-15]]) as `llm-wiki-student-materials.zip` (~65K). It is a **fictional but realistic** ~**seven-month** project corpus, designed to give the team a representative file dump to **test ingestion** against — "the kind of messy material a real project would generate." It contains the **"Bakkie"** sub-corpus, including example **meeting notes**.

## Details
- **What:** A fictional-but-realistic, ~7-month project document corpus, assembled specifically for the Living Wiki project as an ingestion test set.
- **Composition:** **Heavier on PM / business artifacts** than engineering material — **no PR threads, no code-review discussions**. The team is advised to **supplement with material from their own repo** ([[wiki-generation-engine]] / GitHub) to cover engineering content.
- **"Bakkie" sub-corpus:** A fictional project within the corpus that **already includes example meeting notes**, giving the team material to work with for ingestion. **⚠️ Bakkie is FICTIONAL** — it must **never** be merged into the real KickstartAI project portfolio ([[kickstartai-projects]]).
- **⚠️ README exclusion caveat:** The README inside the folder **must NOT be fed to the wiki** — it summarises things the tool is supposed to **discover on its own** (it would contaminate any evaluation of coverage/gap-detection). See [[evaluation-deliverable]], [[gap-detector]].
- **Role / relevance:**
  - Primary **ingestion test dataset** for the pipeline (see [[ingestion-pipeline]]).
  - A candidate **evaluation dataset** — because the README states the answers the tool should self-discover, it enables coverage/accuracy/gap-detection evaluation against a known ground truth (README withheld from ingestion). See [[evaluation-deliverable]].
- **Status:** Received as a zip; the **documents themselves are not yet ingested** — flagged for future ingest. See [[_gaps]].

## "Bakkie" in the multi-project app — identity ambiguity
The 2026-06-17 multi-project app (see [[multi-project-app-2026-06-17]]) registers a `bakkie` project id and describes it as **"a second, real project — proves multi-project isolation."** This creates an ambiguity:
- The most plausible reading: the same **fictional student-materials Bakkie corpus** is being used as the second project subtree in the multi-project app ("real" meaning a real populated subtree, not an empty placeholder), **not** a real KickstartAI client project.
- Alternative reading: "Bakkie" here refers to a different, real KickstartAI project — which would contradict the established treatment of Bakkie as fictional.

⚠️ **This is unresolved.** The fictional-Bakkie guardrail ([[kickstartai-projects]]) remains in force until there is positive evidence of a real KickstartAI project named Bakkie. See [[_gaps]].

## Related
- [[laurenz-sanne-email-2026-05-15]]
- [[ingestion-pipeline]]
- [[evaluation-deliverable]]
- [[gap-detector]]
- [[kickstartai-pm-ops]]
- [[kickstartai-projects]]
- [[multi-project-app-2026-06-17]]
- [[_gaps]]

## Sources
- 2026-05-15-Laurenz-Sanne-email-content.md (KickstartAI x UvA demo follow-up email thread, 2026-05-15 → 2026-05-18)
- 2026-06-17-MULTI-APP.md (multi-project Living Wiki app README / architecture overview, 2026-06-17)
