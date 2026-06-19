## Integrated artifact Demo:

Laurenz showed the fully integrated wiki and demoed it to the rest of the group. 

The UI can be run on any group member’s laptop if they create a separate branch of the GitHub repo and download the repo documents locally. Team members have to make sure that they work on their own branches when making changes to the UI and backend. Always ask Laurenz first when making a pull request and needs to be merged to main. 

Gap Detector is now added as an additional page with a dashboard and report feature. The “Team confirmed” label is a bit unclear. 

The permission layer is added as a starting page where the users first need to log in before they can enter the wiki. Dummy accounts are created for the demo. Consider also adding group members and Sanne as real users in the wiki. The wiki now only involves public and internal pages, restricted pages need to be added to test the full functionality. 

Quinten will run a prompt engineering test, after which the backend may be updated. 

## Demo run-up and Evaluation Plan:

The plan now is to test the final app artifact by ingesting all the source documents from the beginning and then make an experiment with a fake project from KickstartAI to test our wiki on a new project. 

Laurenz talked Sanne about it and she mentioned we need to be careful we don't use up all the anthropic API usage before we make new project ingestions to test the final Living Wiki App. So make sure that all the source documents are parsed and into a different format. Especially PDFs or other formats because those take up a lot of (unnecessary) tokens. Explanation for PDFs the model processes both the text and also converts it into an image 

Wednesday 17.06: Quinten and Laurenz are going to have a discussion on the evaluation framework and think how to make an experiment to evaluate the artifact during the Wiki ingestion. (The evaluation of the gap detector and the permission layer will be done at component level, therefore, no need to join this meeting.) 

Thursday 18.06: Demo to Sanne and gather last feedback, after that re-ingest the project documents in an empty wiki to see how it looks 

Friday 19.06: Ingest a fake project from KickstartAI as a use-case. 

Monday 22.06: Final Demo of the artifact and individual thesis defence. 

## Current research on Evaluation metrics/framework:

k:SELF-BLEU: measures diversity between generations by calculating BLEU scores between generated texts instead of references. Lower scores indicate higher diversity. 

BERTSCORE: metric based on pre-trained BERT. Computes the similarity of two sentences as a sum of cosine similarities between their tokens’ embeddings. Unlike n-gram-based metrics, BertScore captures semantic information, offering a more accurate evaluation. 

LLM-AS-JUDGE: Let an LLM score the outputs instead of humans based on the following metrics: 

Coherence: Is the output logically structured and does it flow well? Are ideas connected and organised in a way that makes sense to the reader? 

Faithfulness: To what extent are claims supported by the input documents? LLM’s can be correct but not grounded by the right information. The faithfulness will focus on the groundedness in provided input. This looks like BERTScore, but that does not detect unsupported claims but only semantic alignment between the context and the output. 

Stakeholder-appropriateness: Is the tone, level of detail, and language framing suitable for the intended audience? For example, does a LinkedIn draft use accessible public language, does a business progress report avoid unnecessary technical jargon, does an onboarding summary provide enough context for someone new? 