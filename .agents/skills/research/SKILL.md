---
name: research
description: >-
  Use this skill when you need to gather requirements, analyze existing configurations,
  inspect the database schema, identify existing UI components, or explore dependencies
  before starting any feature development or bug-fix task.
---

# Research & Context Gathering Runbook

This runbook guides agents through the initial exploration and context-gathering phase. Thorough research prevents code duplication, ensures architectural alignment, and informs successful planning.

## Trigger Conditions
*   Initiating a new feature design or implementation task.
*   Beginning a bug investigation or system audit.
*   Determining project dependencies or infrastructure configurations.

## Steps

### 1. Codebase & Structure Scan
*   Verify the directory structure and locate main modules.
*   Examine configuration files:
    *   **Backend/Infrastructure**: `wrangler.toml` at the root and in the frontend subfolder to check bindings (D1 databases, KV namespaces).
    *   **Frontend/Build**: `package.json`, `tsconfig.json`, and `vite.config.ts` in `frontend/` to check package versions, tsconfigs, and dev server configurations.
    *   **Database**: `frontend/schema.sql` to review database schemas and initial migrations.

### 2. UI Component Audit (Avoid Duplication)
*   Scan `frontend/src/components/` and `frontend/src/context/` to identify reusable UI components and shared application state managers.
*   Examine `frontend/src/index.css` to locate defined CSS variables, themes, styling tokens, utility classes, and custom glassmorphism styles.
*   Verify that any UI changes will utilize existing typography styles (Outfit/Inter) and color schemas.

### 3. API & Data Flow Mapping
*   Map routes under `frontend/functions/api/` to understand endpoints and active query behaviors.
*   Look for common utils (e.g., in `frontend/functions/api/utils/`) for standardized responses, middleware handlers, or authentication validations.

### 4. Search Similar Implementations
*   Check if similar features or solutions are already implemented.
*   For multi-language solutions, check existing problem folders (e.g., `00-Foundations-and-Complexity/`) to observe structural, naming, and test-driver conventions.

### 5. Document Research Findings
*   Organize findings into the implementation plan or a research note.
*   Specify:
    *   Existing files to build upon or reuse.
    *   Necessary package dependencies (if any).
    *   Database schema adjustments required.
    *   Potential architectural hurdles.
