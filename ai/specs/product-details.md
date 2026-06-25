# Functional Spec: Product Details Retrieval

## Overview
Retrieve and format the complete technical specifications and metadata for a specific product.

## User Stories
- **Spec Lookup:** "As a user, I want to see the capacity, compressor type, and warranty of the Walton 380L fridge."
- **Bangla Details:** "As a user, I want to read the technical features in Bangla."

## Requirements
- **Identifier:** Supports retrieval via `uid` or `slug`.
- **Field Mapping:**
  - **Basic Info:** `enName`, `bnName`, `category`.
  - **Dynamic Specs:** Map `productAttributes` to a readable key-value format.
  - **Descriptions:** `detailedDescriptions` and `searchMeta.description`.
  - **Policy:** `displayReturnPolicy` and `displayWarrantyPolicy`.
- **HTML Cleaning:** Many spec fields contain HTML tags (e.g., `<p>RSCR</p>`). The tool must strip HTML to provide clean text to the LLM.

## Acceptance Criteria
- Returns a clean, structured JSON object.
- All technical attributes (`productAttributes`) are included.
- Handles missing fields gracefully (omit or return "N/A").
