---
name: testing
description: >-
  Use this skill when you need to validate completed work, check UI layouts,
  verify code compilation/linting, inspect SQL database queries, or verify overall functionality.
---

# Testing & Quality Verification Runbook

This runbook guides agents through the validation process to ensure code correctness, security compliance, visual fidelity, and clean compile-time metrics.

## Trigger Conditions
*   Feature development development phase is finished.
*   A bug fix has been applied.
*   Prior to requesting user review for a release.

## Steps

### 1. Acceptance Criteria Verification
*   Cross-reference changes with user-requested functionality.
*   Check that all components are fully functional under interactive states (e.g., button clicks, form inputs, route changes).

### 2. Compilation, Type Safety & Linting
*   Run the typescript compiler from `frontend/` to verify type safety:
    *   `npm run build`
*   Run static analysis to sweep for syntax and style issues:
    *   `npm run lint`
*   Ensure zero compilation errors, type mismatches, or linter complaints are present in the modified modules.

### 3. UI/UX & Browser Validation
*   Utilize a **browser sub-agent** to interact with the running local server.
*   Verify visual layout against the platform's visual guidelines (Outfit/Inter font, glassmorphism, responsive alignment).
*   Test input forms for client-side validations, error state displays, and loading indicators.
*   Capture UI screenshots or WebP recordings to document successful client-side behaviors.

### 4. Database Query Auditing
*   Examine D1 database interactions in serverless handlers.
*   Verify that:
    *   All queries use parameter binding (`?` placeholders).
    *   No dynamic query strings expose SQL injection vulnerabilities.
    *   Performance: indices are used where appropriate for search/filtering.

### 5. Git Status & Security Leak Sweeps
*   Run `git status` to verify that only expected files are staged.
*   Check for unstaged changes or temporary dev scratch scripts that shouldn't be part of the workspace.
*   Run a string search on changed files to guarantee no secrets (API keys, test tokens, DB strings) are accidentally included.

## Handoff & Failure Paths
*   **Success**: Hand off to **Audit Engineer** and compile the `walkthrough.md` report for the user.
*   **Failure**: Document the issue, file name, and exact error output. Hand control back to the responsible engineer (Frontend, API, or Backend) to resolve.
