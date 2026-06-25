# Functional Spec: Inventory & Stock Query

## Overview
Provide real-time stock availability and pricing for specific product variants.

## User Stories
- **Stock Check:** "As a user, I want to know if model 'WFC-3F5' is currently available for purchase."
- **Variant Price:** "As a user, I want to know the current price of the black color variant of this fridge."

## Requirements
- **Source of Truth:** Query the `variants` array within the product document for immediate data.
- **Deep Inventory Check:** For order-ready queries, verify against the `inventory` collection (if separate) or the `inventory` field in the product.
- **Data Points:**
  - `quantity`: Total units available.
  - `isAvailable`: Boolean status.
  - `mrpPrice`: Current list price.

## Logic Flow
1. Receive `uid`.
2. Fetch document from MongoDB.
3. Iterate through `variants`.
4. Sum `quantity` and determine overall `isAvailable` status.
5. Return structured status (e.g., "In Stock", "Out of Stock", "Limited Stock").

## Acceptance Criteria
- Real-time accuracy (no cached stock for this specific tool).
- Clearly distinguish between "Out of Stock" and "Discontinued" (`isActive`).
