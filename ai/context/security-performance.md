# Security & Performance

## 1. Security
- **No Direct DB Access:** AI Agents must only interact with the database via defined MCP tools.
- **Injection Protection:** All search queries are passed as parameters to Atlas Search operators.
- **PII Protection:** Product discovery tools do not have access to user data or order history.

## 2. Performance
- **Projection:** Tools must return only necessary fields.
  - `search_products`: Returns `uid`, `enName`, `bnName`, `mrpPrice`, `isAvailable`.
  - `get_product_details`: Returns full doc.
- **Caching:**
  - Cache embeddings for the top 500 search terms.
  - TTL: 24 hours for stock/price data.
- **Latency Targets:**
  - Embedding Generation: < 200ms.
  - Atlas Search: < 150ms.
  - Total MCP Tool Execution: < 500ms.
