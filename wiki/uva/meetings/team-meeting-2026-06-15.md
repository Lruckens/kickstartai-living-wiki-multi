# Meeting: UvA Team Working Meeting (2026-06-15)

**Last updated:** 2026-06-19
**Date:** 2026-06-15
**Type:** Internal UvA team working meeting (development → evaluation phase transition)
**Status:** ingested

## Summary
The **fourth ingested development-phase team meeting** (Phase 2 → Phase 3 transition — see [[project-timeline]]), ~3 days after the 2026-06-12 mock-up artifact ([[mockup-artifact-2026-06-12]]) and ~4 days after [[team-meeting-2026-06-11]]. An internal working meeting of the four UvA AI4Business Lab students (no KickstartAI contact or supervisor present in the notes), self-written (consistent with the "meetings not auto-transcribed" note from [[laurenz-sanne-email-2026-05-15]]). Source: `2026-06-15-meeting-notes.md`. It is **high-substance**: Laurenz demoed a **fully integrated wiki**, the team adopted a **git-branch-per-member collaboration workflow**, the Gap Detector + Permission Layer are now wired into the integrated UI, and the team set a concrete **demo/evaluation run-up schedule** culminating in a **22.06 final demo + individual thesis defence** — plus the **first concrete evaluation-metrics shortlist**.

## Integrated demo (fully integrated artifact)
- **Laurenz demoed the fully integrated wiki** to the group — the integration effort tracked across [[team-meeting-2026-06-11]] and [[mockup-artifact-2026-06-12]] is now realized in one demoed artifact. See [[wiki-generation-engine]].
- **Gap Detector** is now added as an **additional page with a dashboard + report feature**. The **"Team confirmed" label is unclear** (minor UX issue flagged). See [[gap-detector]], [[_gaps]].
- **Permission layer** is added as a **login landing page** — users must **log in before entering the wiki**. **Dummy accounts** are used for the demo; suggestion to also add **group members + Sanne** as real users. The wiki currently holds **only public + internal pages** — **restricted pages still need to be added** to test the full leakage-prevention functionality. See [[permission-layer]], [[_gaps]].
- **Quinten** will run a **prompt-engineering test**, after which the backend may be updated. See [[generator-module]].

## Collaboration workflow (NEW)
- The UI can be run on **any group member's laptop** by creating a **separate branch** of the GitHub repo and downloading the repo documents locally.
- Members must **work on their own branches** when changing the UI/backend.
- **Always ask Laurenz first** before making a pull request that needs merging to `main` — formalizing Laurenz as the **integration / merge gatekeeper**.
- This **partially mitigates** the laptop-local deployment durability risk (any member can run the integrated UI locally) but is **not** the central/URL deployment that Vercel would provide — see [[wiki-generation-engine]], [[_gaps]].

## Demo run-up & evaluation plan (NEW — concrete schedule)
The plan is to test the final app artifact by **re-ingesting all source documents from scratch** into an empty wiki, then run an **experiment with a fake KickstartAI project** to test the wiki on a new project.

- ⚠️ **Anthropic API budget caution (from Sanne):** be careful not to **use up the Anthropic API quota** before the new-project test ingestions. **Pre-parse / convert all source documents into a lighter format** first — **PDFs (and similar formats) especially** waste tokens, because the model processes both the text **and converts it into an image**. See [[ingestion-pipeline]], [[_gaps]].
- **Wed 17.06:** Quinten + Laurenz discuss the **evaluation framework** and design an experiment to evaluate the artifact **during wiki ingestion**. The **gap detector and permission layer are evaluated at component level**, so their owners need not join this meeting.
- **Thu 18.06:** **Demo to Sanne** + gather last feedback; afterwards **re-ingest the project documents into an empty wiki** to see how it looks.
- **Fri 19.06:** **Ingest a fake KickstartAI project** as a use-case.
- **Mon 22.06:** **Final demo of the artifact + individual thesis defence.**

See [[evaluation-framework]], [[evaluation-deliverable]], [[project-timeline]].

## Evaluation metrics research (NEW — first concrete shortlist)
The team is researching concrete evaluation metrics (aligns with Sanne's "~3 metrics" advice from [[mockup-artifact-2026-06-12]]):
- **Self-BLEU** — measures **diversity** between generations by computing BLEU scores between generated texts (rather than against references). **Lower scores indicate higher diversity.**
- **BERTScore** — a metric based on pre-trained BERT; computes the similarity of two sentences as a sum of cosine similarities between their tokens' embeddings. Unlike n-gram metrics, it captures **semantic information**.
- **LLM-as-Judge** — an LLM scores outputs (instead of humans) on three sub-metrics:
  - **Coherence** — is the output logically structured and does it flow well; are ideas connected and organized sensibly?
  - **Faithfulness** — to what extent are claims **supported / grounded** by the input documents? Notably **detects unsupported claims** (unlike BERTScore, which only measures semantic alignment between context and output).
  - **Stakeholder-appropriateness** — is the tone, level of detail, and framing suitable for the intended audience (e.g. a LinkedIn draft uses accessible public language; a business progress report avoids unnecessary jargon; an onboarding summary gives enough context for a newcomer)?

See [[evaluation-framework]], [[evaluation-deliverable]], [[_gaps]].

## Person↔component soft signals (reinforced, not asserted)
Build/integration activity continues to align members with components — **Quinten** running the **generator prompt-engineering test** (consistent with **Member 2 / Generator**); **Laurenz** as integration/merge gatekeeper (consistent with **Member 1 / Ingestion + Wiki Engine**). **Member 3 = Cara/Meng Cheng** and **Member 4 = Xiaojing** are already confirmed (see [[project-team]], [[mockup-artifact-2026-06-12]], [[xiaojing-sanne-permission-email-2026-06-07]]).

## Conflicts / ambiguities
- ⚠️ **Laptop-local deployment risk — partially mitigated, not resolved.** [[_gaps]], [[wiki-generation-engine]], [[generator-module]] frame the laptop-local backend as a durability risk pending **Vercel**. The branch-per-member + local-repo workflow lets *any* member run the integrated UI locally (mitigating the single-owner risk), but is **not** central/URL deployment. Recorded as an **update/mitigation**, not a contradiction; the Vercel/central-deployment gap remains open.
- ⚠️ **Evaluation-metric selection — substantially advanced (not contradicted).** [[evaluation-deliverable]], [[evaluation-framework]], [[_gaps]] record the specific metrics as **not yet chosen**. This note supplies a **concrete candidate shortlist** (Self-BLEU, BERTScore, LLM-as-Judge). Treated as **gap advancement** — candidates under research, not yet finalized/applied.
- ⚠️ **"Two evaluation families" refined.** [[team-meeting-2026-06-11]] / [[evaluation-deliverable]] record Laurenz+Quinten (text-gen, comparable frameworks) vs. Cara+Xiaojing (different frameworks). This note operationalizes it: the **17.06 framework meeting is the text-generation evaluation (Quinten + Laurenz)**, while **gap detector + permission layer are evaluated at component level** (their owners excluded). Consistent refinement.
- ⚠️ **Onboarding-summary staleness reinforced again.** The stale [[2026-06-19-project-onboarding-summary]] ("Phase: scoping", "tech stack/team/timeline not documented") is now even further from reality. Already a tracked gap.
- **No hard factual contradictions** — all deltas are forward-progress status updates.

## Related
- [[team-meeting-2026-06-11]]
- [[mockup-artifact-2026-06-12]]
- [[xiaojing-sanne-permission-email-2026-06-07]]
- [[laurenz-sanne-email-2026-05-15]]
- [[wiki-generation-engine]]
- [[generator-module]]
- [[permission-layer]]
- [[gap-detector]]
- [[evaluation-framework]]
- [[evaluation-deliverable]]
- [[ingestion-pipeline]]
- [[project-timeline]]
- [[project-team]]
- [[_overview]]

## Sources
- 2026-06-15-meeting-notes.md (internal UvA team working meeting notes, development → evaluation phase transition)
