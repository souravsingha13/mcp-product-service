# Workflow: Refactor

## Phase 1: Analysis
- **Goal:** Improve code quality without changing MCP tool behavior.
- **Constraint:** Tool `inputSchema` must remain backward compatible.

## Phase 2: Execution
- **Step 1:** Move logic to shared services (e.g., `src/services/mongodb.ts`).
- **Step 2:** Improve type definitions to eliminate `any` or `unknown`.
- **Step 3:** Centralize error handling for Atlas Search.

## Phase 3: Verification
- **Step 1:** Run the full test suite.
- **Step 2:** Compare tool outputs before and after the refactor to ensure parity.
