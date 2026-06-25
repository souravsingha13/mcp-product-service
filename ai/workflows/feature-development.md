# Workflow: Feature Development

## Phase 1: Planning
- **Goal:** Define the tool schema and search logic.
- **Action:** Create/Update `ai/specs` for the new feature.
- **Action:** Consult `ai/context/mcp-tools.md` for schema consistency.

## Phase 2: Implementation
- **Step 1:** Define TypeScript interfaces for the request/response.
- **Step 2:** Implement the MongoDB aggregation or query logic.
- **Step 3:** (If Search) Configure/Update Atlas Search index.
- **Step 4:** Register the tool in `src/index.ts`.

## Phase 3: Validation
- **Step 1:** Run unit tests for the logic layer.
- **Step 2:** Test the MCP tool call using a local MCP inspector or CLI.
- **Step 3:** Verify multilingual results (English and Bangla).

## Phase 4: Delivery
- **Step 1:** Update `README.md` if tool signatures changed.
- **Step 2:** Commit with descriptive messages.
