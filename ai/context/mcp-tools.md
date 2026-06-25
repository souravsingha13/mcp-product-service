# MCP Tool Definitions

The MCP server exposes the following tools to the LLM.

## 1. `search_products`
Searches for products using hybrid (vector + keyword) search.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "query": { "type": "string", "description": "Natural language or keyword query (English or Bangla)" },
    "categoryUid": { "type": "string" },
    "minPrice": { "type": "number" },
    "maxPrice": { "type": "number" },
    "limit": { "type": "integer", "default": 5 }
  },
  "required": ["query"]
}
```

## 2. `get_product_details`
Retrieves the full specification of a single product.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "uid": { "type": "string", "description": "The product UID" }
  },
  "required": ["uid"]
}
```

## 3. `check_stock_and_price`
Real-time check for specific model availability across variants.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "uid": { "type": "string" }
  },
  "required": ["uid"]
}
```

## 4. `compare_products`
Compares key specifications for up to 3 products.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "uids": { "type": "array", "items": { "type": "string" }, "minItems": 2, "maxItems": 3 }
  },
  "required": ["uids"]
}
```
