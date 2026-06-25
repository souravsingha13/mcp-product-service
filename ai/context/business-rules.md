# Business Rules

## Product Data
- **Uniqueness:** Product `uid` is the globally unique authoritative identifier.
- **Variants:** A single product may have multiple variants (e.g., color, SKU).
- **Status:** Only `isActive: true` products should be visible to users unless specifically requested.

## Inventory & Stock
- **Authority:** The `inventory` collection/source is the absolute authority on stock levels.
- **Sync:** Stock quantities must be fetched in real-time for order-related queries.

## Pricing Logic
- **Variant Authority:** Pricing is defined at the variant level (`variants[i].mrpPrice`).
- **Display Price:** When showing a product summary, display the price of the lowest active variant.
