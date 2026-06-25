# Multilingual Guidelines

The chatbot must seamlessly handle English, Bangla, and "Banglish" (Bangla written in English script).

## 1. Query Processing
- **LLM Translation:** The LLM should extract the intent regardless of language.
- **Tool Calls:** The `search_products` tool query should pass the user's raw input to the search engine, as Atlas Search handles the language specific analyzers.

## 2. Response Generation
- **Match User Language:** If the user asks in Bangla, the response should be in Bangla.
- **Hybrid Responses:** For "Banglish" queries, default to the language that feels most natural for the product context (usually English for technical specs, Bangla for general advice).
