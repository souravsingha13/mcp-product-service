# Functional Spec: Semantic & Natural Language Search

## Overview
Handle complex, non-keyword queries by mapping user intent to product features using vector embeddings.

## User Stories
- **Intent-Based:** "Show me refrigerators suitable for a family of 5."
- **Benefit-Based:** "I need an AC that saves the most electricity."
- **Ambiguous Queries:** "Suggest a modern looking fridge for my kitchen."

## Requirements
- **Embedding Generation:** Use OpenAI `text-embedding-3-small`.
- **Vector Index:** Must query the `vector_index` in MongoDB Atlas.
- **Contextual Data:** The search must consider `searchMeta.description`, `productAttributes`, and `searchSynonym`.
- **Top-K Retrieval:** Fetch top 5-10 most similar documents.

## Logic Flow
1. Receive natural language string.
2. Generate vector embedding for the string.
3. Perform vector search in MongoDB.
4. (Optional) Re-rank results using keyword matches on categories.
5. Return top results with a "Similarity Score".

## Acceptance Criteria
- Returns relevant products even if exact keywords aren't present in the query.
- Correctly identifies categories from natural language (e.g., "cooling machine" -> Refrigerator).
