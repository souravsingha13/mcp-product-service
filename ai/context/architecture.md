# System Architecture

The MCP Product Service is a middleware layer that provides an agentic interface to the Walton product database.

## High-Level Diagram
```text
[ User Query ] -> [ LLM ] -> [ MCP Server ] -> [ MongoDB Atlas Search ]
                                  |
                                  -> [ OpenAI Embeddings ]
```

## Key Components

### 1. Intelligence Layer (LLM)
- Responsible for intent extraction and natural language generation.
- Uses the MCP server's tool definitions to formulate search and retrieval plans.

### 2. Connectivity Layer (MCP Server)
- **Runtime:** Node.js/TypeScript.
- **Protocol:** Model Context Protocol (MCP).
- **Function:** Translates LLM tool calls into optimized MongoDB queries and vector searches.

### 3. Data & Search Layer (MongoDB Atlas)
- **Atlas Search:** Lucene-based keyword and fuzzy search.
- **Vector Search:** Semantic search using pre-computed embeddings.
- **Data Source:** Authoritative product and inventory collections.

## Operational Principles
- **Tool-First:** The database is abstracted; the LLM never sees raw MongoDB queries.
- **Context-Aware:** The system utilizes `searchMeta` and `searchSynonym` to bridge the gap between user intent and structured data.
- **Performance-Driven:** Projections and hybrid scoring ensure high-signal results with low latency.
