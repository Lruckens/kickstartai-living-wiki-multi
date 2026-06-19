## LLM Wiki — Permission Layer Design

3 

Xiaojing Li <lee89953@gmail.com> 

Sanne Wielinga <sanne.wielinga@kickstart.ai> 

2026-6-7 09:49

Hi Sanne, 

Good morning, I hope you're doing well! 

I'm Xiaojing and I'm working on the LLM Wiki thesis project. I wanted to share my design about the permission layer and would really appreciate your feedback! 

## The problem:

When an LLM reads source documents and synthesizes them into wiki pages, traditional file level access control is no longer sufficient. Sensitive content can appear paraphrased inside a page with no restriction label. The permission layer is designed to prevent this. 

I defined two leakage types specific to this context: 

- Vertical: higher-tier content (e.g. restricted) appears in a lower-tier page (e.g. public/ internal) 

- Horizontal: restricted content from one project appears in another project's page at the same tier (e.g. KLM information appears in an NS page) 

## Three permission tiers:

Every source document is labeled at ingestion: public, internal (KickstartAI members only), or restricted (specific project, identified by project_id). Labels are assigned at paragraph level. 

## Layer 1: Pre-filtering

Before the LLM generates a page, the source paragraph pool is filtered to only include paragraphs the target user is authorized to see, based on project_id and user_id. The LLM never sees content it is not permitted to use. If access rights change, for example, a team member joins or leaves a project, no code or prompt changes are required. In a full pipeline implementation, simple sql update queries on the paragraph table are sufficient. In our current Claude Code implementation, Claude handles this by reading the updated configuration from a markdown file. 

## Layer 2: Self-audit

Pre-filtering prevents context-driven leakage, but cannot prevent semantic leakage. A second LLM call is needed to audit the generated page against the allowed paragraphs and flags ungrounded claims by severity levels: 

- High: significant harm if disclosed → regenerate (max 2 times), then escalate to human review 

- Medium: limited harm → human review 

- Low / None: publish 

All outcomes are logged for future reference. 

The self-audit runs in two steps: first a fast regex blacklist check (verbatim patterns from restricted documents); then an LLM judge for semantic leakage the blacklist cannot detect. 

## Evaluation

I evaluated both layers using 20 scenarios across two datasets: Set A (pre-filtering off, forced leakage) and Set B (prefiltering on). Each set has 5 vertical and 5 horizontal scenarios. I compared two audit prompt versions to find the detection rate/false positive rate tradeoff. 

One note: all scenario outputs and the audit judge were run using gpt-5.1 via the UvA API. This means the generator and judge are the same model, which is internally consistent but introduces a potential blind spot. In the production system, both the generator and audit judge would use Claude. I recognize this as a limitation and results may differ when the full system runs on Claude end-to-end. 

I'd love to hear your feedback! 

Thank you in advance and have a wonderful day! 

Kind regards, 

Xiaojing Li 

Xiaojing Li <lee89953@gmail.com> 

Hi Xiaojing, 

Thank you for sharing this! It looks like a strong design that you thought through pretty well, so good job! 

I have some feedback on a few points: 

1. You note that using one model as both generator and judge is a blind spot, and that production will use Claude end to end. But if production uses Claude for both the generator and the audit, the same problem persists, because a model auditing its own output tends to share its blind spots. A more robust design uses a different model family for the audit than for generation, and ideally you'd test same-model vs cross-model detection rates. 

2. "Groundedness" is a reasonable proxy for leakage, but it's not really the same thing. Your audit flags claims not grounded in the allowed paragraphs, but most ungrounded claims are benign hallucinations rather than leaks, which will inflate your false positive rate. The harder leak is the opposite case: inference or aggregation, where the page combines allowed paragraphs to reveal something restricted. That claim is grounded, so it passes the audit. Aggregation is a classic hard problem in access control, and explicitly naming it in your threat model would strengthen your work. 

3. The entire pre-filtering guarantee rests on the paragraph labels being correct at ingestion, so perhaps you could treat that as a first-class assumption. Who assigns the labels, and how? If it's automated, that's its own error source and a single mislabeled restricted paragraph defeats the layer. It's probably the biggest real-world risk in the design. 

4. The project pitches cross-project connections as a feature (learnings from one project informing another), but strict project filtering prevents exactly that. Your tiers implicitly resolve this but I would make that explicit, and note that aggregation can still combine internal facts from two projects into something more sensitive. 

5. The evaluation is well-structured but a little small. With five scenarios per leak type, one miss moves the detection rate by 20%, so I'd frame the results as an illustrative proof of concept rather than a robust performance estimate. I would also try to make explicit how you established ground truth and where the negatives for the false positive rate come from. 

Really good work overall, my feedback is mostly refinements on what you already have. If you have any questions please let me know and I'd be happy to help you further! 

Best, 

## Kickstart Al

Sanne Wielinga 

Senior Machine Learning Engineer 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/179ff72c-c782-44f8-945b-e0a67a1e613f/aab72b99803961613744f207f024cc505ad9f0197038626ced9e312747e87f79.jpg)


kickstart.ai 

Join Us On 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/179ff72c-c782-44f8-945b-e0a67a1e613f/e0113606807e5e312e06ea092cf75c29a7d150ca3400190633eef0729e9c6b33.jpg)


![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/179ff72c-c782-44f8-945b-e0a67a1e613f/9f397481c6f01a8b5450b5aa751491081470090144bc9cb6c83ba768aef4c9e8.jpg)


Disclaimer: The contents of this email and any attachments are confidential. They are intended for the addressee only. If you have received this email by mistake, please notify the sender immediately and do not disclose the contents to anyone or make copies thereof. 

[ ] 

Xiaojing Li <lee89953@gmail.com> 

Sanne Wielinga <sanne.wielinga@kickstart.ai> 

2026 6 8 22:16 

Hi Sanne, 

Thank you so much! Your feedback is super helpful and I really appreciate it. 

Talk to you soon! 

Kind regards, 

Xiaojing 

Sanne Wielinga <sanne.wielinga@kickstart.ai> 2026 6 8 08:53 

[ ] 