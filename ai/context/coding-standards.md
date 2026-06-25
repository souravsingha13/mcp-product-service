# Coding Standards

To ensure consistency and safety, all code in this repository must adhere to the following standards.

## 1. Language & Runtime
- **Language:** TypeScript 5.x
- **Runtime:** Node.js 20.x (LTS)
- **Package Manager:** npm

## 2. Type Safety
- **Strict Mode:** `strict: true` must be enabled in `tsconfig.json`.
- **No `any`:** Avoid the `any` type. Use `unknown` or define explicit interfaces for MongoDB documents.
- **Discriminated Unions:** Use for tool inputs and output handling.

## 3. Project Structure
- `src/tools/`: Functional logic for each MCP tool.
- `src/services/`: Reusable classes for MongoDB, OpenAI, and Logging.
- `src/index.ts`: Server setup and tool registration.

## 4. Error Handling
- Use `try/catch` blocks around all external I/O (Database, API).
- Return user-friendly error messages through the MCP `isError` flag.
- Log full stack traces to `stderr` for debugging, but do not expose them to the LLM.

## 5. Documentation
- Use JSDoc for all public-facing methods.
- Document all environment variables in `.env.example`.
