# Functional Spec: Product Search

## Overview
Enable users to find products using a combination of keywords, models, categories, and natural language.

## User Stories
- **Keyword Search:** "As a user, I want to search for 'refrigerator' and see relevant results in both English and Bangla."
- **Model Search:** "As a user, I want to type 'WFC-3F5' and get an exact match for that specific model."
- **Category Filter:** "As a user, I want to find 'Walton AC' within the Air Conditioner category."
- **Price Filtering:** "As a user, I want to find refrigerators under 50,000 BDT."

## Requirements
- **Hybrid Support:** Must query both Lucene keyword index and Vector embedding index.
- **Multilingual:** Handle English, Bangla, and mixed-language queries.
- **Typo Tolerance:** Support `maxEdits: 1` for model numbers and `maxEdits: 2` for general text.
- **Response Format:** Return a list of products with `uid`, `enName`, `bnName`, `mrpPrice`, and `isAvailable`.

## Acceptance Criteria
- Search latency < 500ms.
- Exact model matches must appear as the first result.
- Synonyms (e.g., "fridge" -> "refrigerator") must return results.
- Inactive products (`isActive: false`) must be excluded by default.
