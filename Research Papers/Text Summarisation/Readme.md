#V1 - using librarby functions of NLTK
Creating a summary of textual content from the meeting
- Short atleat 50% of the original content
- Essential points
- If possible divided into sub-topics

## Overview: 
In general there are two types of summarization, <b>abstractive</b> and <b>extractive</b> summarization.
- Abstractive methods
  - Select words based on semantic understanding, even those words did not appear in the source documents. It aims at producing important material in a new way.
  - can be correlated to the way human reads a text article or blog post and then summarizes in their own word.
  - Input document → understand context → semantics → create own summary.
- Extractive methods 
  - Attempts to summarize articles by selecting a subset of words that retain the most important points.
  - Input document → sentences similarity → weight sentences → select sentences with higher rank.

<br/>

## Details: 
Cosine similarity 
- It is the measure of similarity between two non-zero vectors of an inner product space that measures the cosine of the angle between them. Since we will be representing our sentences as the bunch of vectors, we can use it to find the similarity among sentences. Its measures cosine of the angle between vectors. Angle will be 0 if sentences are similar.
### Input article → split into sentences → remove stop words → build a similarity matrix → generate rank based on matrix → pick top N sentences for summary.

<br/>

Source: https://towardsdatascience.com/understand-text-summarization-and-create-your-own-summarizer-in-python-b26a9f09fc70

## Papers 
- Text Summarization Techniques: A Brief Survey => https://arxiv.org/abs/1707.02268v3
- Survey of the State of the Art in Natural Language Generation: Core tasks, applications and evaluation => https://arxiv.org/abs/1703.09902v1
