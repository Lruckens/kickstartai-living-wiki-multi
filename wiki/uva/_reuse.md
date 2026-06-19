# Reuse — Living Wiki (UvA)

Patterns and learnings reusable across KickstartAI projects.

## Cross-project reuse intent
The Living Wiki architecture is explicitly designed for reuse across all KickstartAI projects after the initial (self-documenting) use case. A key design principle: the [[permission-model]] should be configurable so that deploying to a sensitive project requires *configuration, not a rewrite*. (Source: founding brief, 2026-04-02.)

The kickoff slide deck (see [[kickoff-deck-2026-04-13]]) articulates the cross-project reuse motivation at source level: one of the three stated problems is that **"learnings from one project rarely reach the next one."** The Living Wiki is the mechanism for carrying learnings forward across projects.

## Breadth of target projects
KickstartAI's public project portfolio (see [[kickstartai-projects]]) illustrates the breadth and heterogeneity of projects the Living Wiki is intended to be reused across — spanning law enforcement (Politie Nederland), finance (ING), healthcare (LUMC), retail/food-waste (Ahold Delhaize/Albert Heijn, KLM), logistics (Ampère, bol), public health (sewage-water virus prediction, Philips), and societal impact (Voedselbanken). This diversity of domains, partners, and sensitivity levels underscores the configuration-not-rewrite design principle: each project carries different document types, permission needs, and stakeholders. (Source: KickstartAI projects index, 2026-05-07.)
