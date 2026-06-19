## Following up after our first demo — 15 May

2 

Laurenz Ruckensteiner <laurenz.ruckensteiner@gmail.com> 

sanne.wielinga@kickstartai.org 

quintenvdheuvel12@gmail.com, carac.m.cheng@gmail.com, lee89953@gmail.com 

2026 5 16 18:51 

Hi Sanne, 

Thank you again for your time during the demo — it was great to get your first impressions of the wiki! 

As promised, here is the GitHub repository link so you can explore the current schema: https://github.com/Lruckens/ kickstartai-living-wiki 

Looking forward to receiving the Google Drive structure whenever it is convenient — that will be really helpful for us. It would also be great if you could share the transcribed notes from our meeting. 

We have two follow-up topics we would love your input on. 

**Data privacy** 

One topic we want to flag early. The GitHub repository is directly linked to Claude Code — Anthropic's terminal-based agent — which is what we use to perform all operations and generate the wiki pages. This means that any documents ingested into the system are passed to Anthropic's LLM via their API. For our own project documents this is not an issue, but if the goal is to deliver a fully deployable artifact that KickstartAI can use across all its projects, this could become a concern — particularly when dealing with sensitive partner data or NDA-covered materials. Do you know of a way to work around this? 

**Ways of working** 

To make sure the wiki schema reflects how KickstartAI actually runs projects, we would love to understand your typical project flow a bit better. Concretely: how does a project usually kick off — what does the first meeting with a partner look like, and how is the problem definition established? How are goals and expected results agreed upon, and how does the team typically approach finding a solution? Any insight into how the team works together day-to-day would also be really valuable. 

If you have any meeting notes from past or current projects you are able to share, those would be incredibly useful as well — both as example sources to ingest into the wiki and to better understand how your team documents its work in practice. 

Thanks so much for your ongoing support on this! 

Best, 

Laurenz Ruckensteiner 

Sanne Wielinga <sanne.wielinga@kickstart.ai> 

Laurenz Ruckensteiner <laurenz.ruckensteiner@gmail.com> 

quintenvdheuvel12@gmail.com, carac.m.cheng@gmail.com, lee89953@gmail.com 

2026 5 18 12:10 

Hi Laurenz, 

Thanks for sharing the GitHub link, and great questions! A few follow-ups in response to your questions: 

- I'm attaching a folder called 'llm-wiki-student-materials', which was put together specifically for your project. It's a fictional but realistic project corpus, designed to give you a representative file dump to test ingestion against. It spans about seven months and includes the kind of messy material a real project would generate. Important: don't feed the README in the folder to the wiki. It summarises things the tool is supposed to discover on its own. The corpus is also heavier on PM and business artifacts than on engineering material (no PR threads, code review discussions, etc), so you may want to supplement with material from your own repo. 

- I've also added an example of how our Project Management Ops folder is structured for each project. This should answer most of your questions regarding our way of working. Day-to-day team collaboration is harder to capture in a document - we could potentially discuss that on Thursday or earlier during a call. 

- The Bakkie corpus already includes example meeting notes, so you have material to work with on that front. 

Unfortunately the meetings we had together were not automatically transcribed, but I'm sure you could try to make a separate write-up/summary yourself of our sessions so far! 

Regarding data privacy & Claude Code, some directions worth thinking about on your end: 

- Anthropic's enterprise/API offerings have different data-handling terms than the consumer products (e.g. zero data retention is available on the API). You could check what tier Claude Code falls under and whether enabling ZDR is feasible. 

- The deployment story for sensitive projects might involve a configurable backend, so that we can swap in a selfhosted or VPC-deployed model when needed, while keeping the rest of the architecture intact. This connects directly to the permission layer in your scope. 

- For the thesis itself, documenting which operations send data externally vs. stay local would already be a useful artifact, even if the full solution is out of scope. 

Let me know if anything else comes up. 

Best, 

## KickstartAl

## Sanne Wielinga

Senior Machine Learning Engineer 

?? kickstart.ai 

## Join Us On

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/dd98d592-f388-42fe-94e0-dac2e5025883/a83b7f635855068846c038e237daa649540229e97ca2a8d4d0e1a42e5c6072c8.jpg)


Disclaimer: The contents of this email and any attachments are confidential. They are intended for the addressee only. If you have received this email by mistake, please notify the sender immediately and do not disclose the contents to anyone or make copies thereof. 

[ ] 

2 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/dd98d592-f388-42fe-94e0-dac2e5025883/ecddc66ca5a1a0e4bd3e5b9bfa20f71252dd52702649ac90c8b874f2b0a6063a.jpg)


llm-wiki-student-materials.zip 65K 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/dd98d592-f388-42fe-94e0-dac2e5025883/d426a0951259e2264a5224f7d5deb1531db19ddd09a44a31f53b0917053f55b4.jpg)


New Templates 2026 [Apr - June]-20260518T085135Z-3-001.zip 15844K 