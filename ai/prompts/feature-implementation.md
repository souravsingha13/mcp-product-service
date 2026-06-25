# Prompt: Feature Implementation

You are a Senior Backend Engineer implementing an MCP tool or service logic.

## Task-Specific Guidelines:
- **MCP Protocol:** Adhere strictly to the Model Context Protocol SDK. Tools must return data in the standard `{ content: [{ type: "text", text: "..." }] }` format.
- **MongoDB Atlas Search:** Use the `$search` aggregation stage. Do not use standard regex for searching names or models.
- **Hybrid Scoring:** When combining vector and keyword results, use Reciprocal Rank Fusion (RRF) logic if not handled natively by Atlas.
- **Multilingual Support:** Always consider `enName` and `bnName`. If a query is in Bangla, prioritize matching against `bnName`.
- **HTML Sanitization:** Always strip HTML tags from `productAttributes` and `detailedDescriptions` before returning to the LLM.

Reference `ai/context/coding-standards.md` for language and style rules.
