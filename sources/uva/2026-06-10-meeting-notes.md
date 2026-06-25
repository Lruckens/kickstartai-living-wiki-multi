# Check-in UvA | Knowledge Management

Invited quintenvdheuvel12@gmail.com Sanne Wielinga lee89953@gmail.com 

carac.m.cheng@gmail.com laurenz.ruckensteiner@gmail.com 

Attachments Check-in UvA | Knowledge Management 

Meeting records Transcript 

## Summary

The team reviewed four diverse system prototypes and fi nalized the deployment platform and evaluation metric strategy. 

## Prototype review and deployment

Access control systems and backend generators demonstrated early development progress. Selection of Vercel as the deployment platform fi nalized the hosting strategy for the project. 

## Interface and gap analysis

Integrated wiki interfaces and gap detection tools showcased potential for improved user experience. Complex dashboards require simplifi cation for non-technical staff to ensure high usability. 

## Evaluation framework strategy

Research into 3 distinct metrics provides a superior approach compared to displaying raw data. Evaluation remains the most diffi cult portion of the project. 

## Decisions

## Aligned

Dummy accounts selected for authentication The prototype authentication strategy will utilize dummy account credentials rather than real user credentials for demonstration purposes. 

● Vercel selected for app deployment The application will be deployed using Vercel to simplify hosting instead of utilizing complex enterprise cloud providers. 

Migration to Claude 3.5 Sonnet The project will migrate to using Anthropic's Claude 3.5 Sonnet model for generation tasks. 

We've updated the Decisions section using your feedback. 

Let us know what you think: Helpful or Not Helpful 

## Next steps

[Xiaojing Li] Optimize Interface: Refi ne the user interface to ensure it is intuitive for non-technical staff. Perform a perspective check to identify confusing elements. 

[Xiaojing Li] Create Dummy Accounts: Generate dummy user accounts with fi rst and last names in the email address. Assign fake passwords to facilitate testing. 

[Quinten van den Heuvel] Check Extensions: Verify whether the fi le extension should be changed from TypeScript XML to TypeScript. Ensure the project structure adheres to correct standards. 

[Quinten van den Heuvel] Deploy Backend: Research and deploy the backend application to a hosting provider such as Vercel. Transition from a local laptop environment to a central hosted platform. 

[Quinten van den Heuvel] Research Metrics: Identify 3 relevant metrics to measure the performance of the self-updating wiki. Apply these metrics to current artifacts to evaluate effectiveness. 

[Laurenz Ruckensteiner] Ingest Meeting Notes: Add the current transcript notes into the wiki database. Verify the visibility of the content within the system. 

[Sanne Wielinga] Schedule Follow-up: Create a calendar invite for the next project meeting scheduled for Thursday at 11:00. 

## Details

Did the screenshots in this section make your notes better or worse? 

Meeting Opening and Presentation Order: The team gathered for a meeting to review prototypes, beginning with Xiaojing Li’s presentation, followed by Quinten van den Heuvel, Laurenz Ruckensteiner, and Cara (00:00:00). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/912ff2b6-051e-4900-be03-8454504fdf6e/3205ab1ad34c7b048c370c419f17be214d7dacea0fdfc3cdefac1d6370f00348.jpg)


Xiaojing Li’s Prototype - Ingestion and Access Control: Xiaojing Li demonstrated a prototype that integrates ingestion and content generation, where users log in to have their user ID automatically identifi ed. Users are required to upload documents and assign labels such as public, internal, or restricted; restricted documents require the selection of a project name from a dropdown menu, ensuring users only access projects they are actively working on (00:01:37). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/912ff2b6-051e-4900-be03-8454504fdf6e/50b336726857741ea54276ddda9e537252a1c63e2c1c6e52326553d9a10b5c7a.jpg)


Access Control Demonstration: Xiaojing Li showcased that the system restricts document generation based on project permissions, preventing users from selecting restricted projects they are not assigned to (00:02:49). Sanne Wielinga praised the design and encouraged the team to consider the user interface from the perspective of non-technical staff to ensure usability, noting that current confi gurations might appear overly technical to non-specialized users (00:04:00). 

![image](https://cdn-mineru.openxlab.org.cn/result/2026-06-17/912ff2b6-051e-4900-be03-8454504fdf6e/3cfacaeea35fcc69f15b3f88191c00dee42ba9cb34cde614fab6d0e7bf5da8c5.jpg)


Authentication and Dummy Data: Regarding login security, the team discussed that for current development purposes, they should use dummy versions of accounts, including fake names and passwords, rather than real credentials, as full account access is not currently feasible (00:05:15). Sanne Wielinga advised that these dummy accounts should be integrated into the system for testing (00:06:18). 

Quinten van den Heuvel’s Prototype - Generator and Backend: Quinten van den Heuvel presented an update involving a new "generate" operation with predefi ned instructions stored in a fi le, which allows the model to perform operations correctly without constant re-prompting (00:08:16). Quinten van den Heuvel also demonstrated a "save to wiki" functionality, which allows users to manually save generated content directly to the wiki for team access (00:09:02). 

Technical Infrastructure and API Integration: Quinten van den Heuvel explained that they connected the prototype to the API using an API key stored in an environment variable, ensuring the key is not committed to the GitHub repository (00:09:02). They also identifi ed a potential issue regarding fi le extensions, specifi cally questioning the use of TSX fi les versus TS fi les in the user interface code (00:10:49). 

Backend Development and Workfl ow: The backend architecture uses Python and FastAPI, running locally on a laptop, which the group identifi ed as a limitation. Quinten van den Heuvel detailed the data fl ow: the UI sends a request to the backend, which processes the prompt—including generation instructions, relevant wiki context from a wiki reader script, and output confi guration—before sending it to the Anthropic API to generate content (00:11:49). 

Deployment Considerations: Quinten van den Heuvel and Sanne Wielinga discussed the need to move beyond a local server deployment to allow wider team access (00:13:52). Sanne Wielinga advised against using large-scale cloud environments like AWS, suggesting Vercel as a more appropriate and manageable platform for hosting small applications (00:15:07). 

Model Selection: Sanne Wielinga informed the team that Anthropic released a new model (referred to as "fable fi ve"), which they have access to via the shared API key. Although the model consumes twice the number of tokens as the previous version, Sanne Wielinga suggested trying it for its superior performance, while the group noted they would consider the token costs (00:20:18). 

Laurenz Ruckensteiner’s Integrated Wiki UI: Laurenz Ruckensteiner demonstrated an integrated Wiki UI built on top of the existing generator interface, allowing users to view wiki pages, concepts, decisions, and deliverables (00:21:03). This interface includes a "lens" feature that performs a health check across pages to identify potential contradictions, aiming to reduce reliance on the cloud terminal and improve user-friendliness (00:22:08). 

Infrastructure and Deployment Strategy: The group explored various deployment methods for the integrated system, including Vercel, Docker containers, and potential Google Drive integration (00:24:18). They agreed that while deployment is outside the core scope of their thesis, it represents a valuable learning opportunity and a desirable feature for the project (00:25:15). 

Cara’s Gap Detector Prototype: Cara presented a gap detector prototype that utilizes an API to analyze documents for risks, providing both high-level rankings and granular details on risk levels and gaps (00:25:15). The design includes an advanced dashboard for historical data and gap distribution, allowing users to manually adjust weighting for different business impacts (00:26:22). 

Feedback on Gap Detector Interface: Sanne Wielinga complimented Cara’s work on the advanced report and suggested that they maintain a focus on how a non-technical user would perceive and utilize the interface (00:29:06). Cara noted that future plans include integrating the gap detector with the rest of the group’s project components (00:27:51). 

Evaluation Framework Planning: Quinten van den Heuvel raised questions regarding the evaluation framework, specifi cally whether to display metrics to users or use them solely for iterative background improvements (00:30:12). Sanne Wielinga advised that they should research three specifi c metrics to apply to their existing artifacts, rather than showing raw metrics to end-users, and noted that evaluation remains the most diffi cult part of the project (00:31:29). 

Future Meeting and Next Steps: Laurenz Ruckensteiner committed to ingesting the current meeting notes into the wiki, and the group agreed to hold a follow-up meeting next Thursday at 11:00 to further discuss integration and the evaluation framework (00:32:37). 

You should review Gemini's notes to make sure they're accurate. Get tips and learn how Gemini takes notes 

How is the quality of these specifi c notes? Take a short survey to let us know your feedback, including how helpful the notes were for your needs. 