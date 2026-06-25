# API Contracts

This file defines the technical handshake between the MCP Server and the underlying data services.

## 1. MCP Protocol
- **Version:** MCP 1.0
- **Transport:** Standard Input/Output (stdio) for local agents, SSE (Server-Sent Events) for remote clients.

## 2. MongoDB Connection
- **Protocol:** `mongodb+srv://`
- **Authentication:** Scoped IAM roles or Database Users with `read` access only to the `product` database.

## 3. Embedding Service (OpenAI)
- **Endpoint:** `POST https://api.openai.com/v1/embeddings`
- **Model:** `text-embedding-3-small`
- **Output:** 1536-dimensional float vector.

## 4. Response Envelopes
Tools must return a standardized JSON object:
```json
{
  "content": [
    {
      "type": "text",
      "text": "JSON_STRINGIFIED_RESULT_HERE"
    }
  ],
  "isError": false
}
```

## 5. Stock Auth (AuthZ)
Real-time stock queries must bypass internal cache and hit the `inventory` collection directly to ensure accuracy.
