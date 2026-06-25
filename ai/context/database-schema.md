# Database Schema Mapping

The system operates on a highly structured MongoDB product collection. Below is the mapping for AI agents.

## Core Collection: `products`

### Identifiers
- `uid`: Global unique identifier (e.g., "P-PLSAN4"). **Primary key for lookups.**
- `slug`: URL-friendly identifier.

### Multilingual Fields
All display names are stored as:
- `enName`: English name.
- `bnName`: Bangla name.

### Hierarchical Data
- `category`: Object containing `uid`, `enName`, and `bnName`.
- `parentCategories`: Array of category objects.

### Dynamic Specifications (`productAttributes`)
Attributes are stored in an array of objects.
- Filter logic: Find object where `enLabel` or `bnLabel` matches the target spec (e.g., "Inverter").
- Values: `values[0].enName` or `values[0].bnName`.

### Pricing and Availability (`variants`)
- Products contain a `variants` array.
- **Price:** Use `variants[i].mrpPrice`.
- **Stock:** Use `variants[i].quantity`.
- **Availability:** Use `variants[i].isAvailable`.

### Search Metadata
- `searchMeta.keyword`: Comma-separated SEO keywords.
- `searchMeta.description`: Technical summary of the product.
- `searchSynonym`: Maps English synonyms (e.g., "fridge") to Bangla ones ("ফ্রিজ").
