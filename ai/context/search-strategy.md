# Search Strategy: Hybrid & Multilingual

To meet the discovery requirements, the system utilizes **MongoDB Atlas Search** with a hybrid approach.

## 1. Search Logic & Priorities
- **Priority 1:** Exact match on `uid` or `model` (highest weight).
- **Priority 2:** Keyword match in `enName` or `bnName` (high weight).
- **Priority 3:** Synonym expansion (e.g., searching "fridge" matches "refrigerator").
- **Priority 4:** Semantic/Vector search (used as a fallback or for natural language queries).

## 2. Keyword Search (Lucene)
- **Analyzers:** 
  - `enName`, `searchMeta.keyword`: `lucene.english` (Stemming, stop-word removal).
  - `bnName`, `searchSuggestion.bnTag`: `lucene.bengali` (Handles Bangla morphology).
- **Fuzzy Matching:** Enabled for model names (e.g., `WFC-3F5` matches `WFC3F5`) with a `maxEdits` of 1 or 2.

## 3. Vector Search (Semantic)
- **Model:** `text-embedding-3-small` (OpenAI).
- **Fields Vectorized:** `searchMeta.description`, `enName`, `bnName`.
- **Use Case:** Natural language queries like "best fridge for a large family" or "energy saving ac".

## 4. Hybrid Scoring (RRF)
- **Boosting:**
  - Exact match on `uid` or model name: **10x Boost**.
  - Match in `enName` or `bnName`: **5x Boost**.
  - Match in `category.enName`: **2x Boost**.

## 5. Synonym Logic
- Uses the `searchSynonym` field in documents.
- Maps English terms to Bangla automatically at search time using Atlas Search Synonym collections.
