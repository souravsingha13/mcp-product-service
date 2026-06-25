# Project Plan: MCP Product Discovery Service

## Objective
Build a production-grade MCP server that enables AI agents to perform complex, multilingual product discovery on a MongoDB Atlas database using Hybrid Search.

---

## Phase 1: Environment & Architecture Setup
- [ ] Initialize Node.js TypeScript project.
- [ ] Configure `@modelcontextprotocol/sdk`.
- [ ] Setup MongoDB Atlas connection with proper IAM/Role scoping.
- [ ] Define shared types based on the product document schema.

## Phase 2: Search Indexing (MongoDB Atlas)
- [ ] **Keyword Index:** Create Atlas Search index with `lucene.english` and `lucene.bengali` analyzers.
- [ ] **Vector Index:** Create Atlas Vector Search index for `searchMeta.description` and name fields.
- [ ] **Synonyms:** Configure synonym collection for English/Bangla product terms.

## Phase 3: MCP Tool Implementation
- [ ] **`search_products`**: Implement Hybrid Search logic (Vector + Keyword + RRF Scoring).
- [ ] **`get_product_details`**: Implement full spec retrieval with HTML cleaning logic.
- [ ] **`check_stock_and_price`**: Implement real-time variant-level stock check.
- [ ] **`compare_products`**: Implement multi-product spec comparison logic.

## Phase 4: Intelligence & Multilingual Support
- [ ] Integrate OpenAI `text-embedding-3-small` for query vectorization.
- [ ] Implement query preprocessing to handle mixed English/Bangla input.
- [ ] Add projection logic to keep LLM context window efficient.

## Phase 5: Testing & Validation
- [ ] **Unit Tests:** Test each tool with mocked MongoDB responses.
- [ ] **Integration Tests:** Test end-to-end search against a development Atlas cluster.
- [ ] **Search Accuracy:** Validate that exact model matches (e.g., "WFC-3F5") rank first.
- [ ] **Performance:** Ensure tool response time < 500ms.

## Phase 6: Deployment
- [ ] Containerize with Docker.
- [ ] Setup CI/CD for automated testing and deployment.
- [ ] Provide environment variable template (`.env.example`).
