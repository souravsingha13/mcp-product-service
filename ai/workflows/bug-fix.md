# Workflow: Bug Fix

## Phase 1: Reproduction
- **Action:** Use the specific English or Bangla query that failed.
- **Action:** Verify the raw MongoDB output using a script or Compass.

## Phase 2: Diagnosis
- **Check 1:** Is it a Lucene analyzer mismatch?
- **Check 2:** Is the RRF scoring burying the correct result?
- **Check 3:** Is the HTML cleaning logic corrupting the JSON?

## Phase 3: Implementation & Test
- **Action:** Apply the fix.
- **Action:** Add a regression test case to the relevant test suite.

## Phase 4: Validation
- **Action:** Verify the fix doesn't degrade performance (>500ms).
- **Action:** Confirm the tool response is still valid JSON for the LLM.
