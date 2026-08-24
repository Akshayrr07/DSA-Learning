# Agent Orchestration Guide (AGENTS.md)

This document defines the specialized roles, scopes, boundaries, and handoff protocols for the AI sub-agents collaborating on the **DSA Learning Vault & Product Platform**. All agents must adhere to the rules defined in [RULES.md](./RULES.md) and execute workflows via the defined [Skills Guide](./.agents/skills/feature-development/SKILL.md).

---

## Agent Grid Overview

| Agent Name | Technical Focus | Core Responsibilities |
| :--- | :--- | :--- |
| **Product Architect** | System Design & Product Specs | Translates requirements into design docs; designs schemas; maps features to LeetCode/GeeksforGeeks equivalents. |
| **Frontend Engineer** | React, CSS, TS, Vite | Builds responsive UI/UX; implements state management; manages assets and client components. |
| **API Engineer** | Serverless / Cloudflare Pages | Designs API endpoints; writes Functions under `functions/api`; integrates third-party services. |
| **Backend Engineer** | D1 Database, SQL, Server logic | Manages D1 database schemas, queries, seed scripts, and core serverless business logic. |
| **Testing Engineer** | QA, Unit & Integration Tests | Performs test automation; manual UI/UX sweeps; edge-case and boundary verification. |
| **DevOps Engineer** | Cloudflare Wrangler, Build Pipelines | Configures `wrangler.toml`; manages build scripts, bundler performance, and staging deployments. |
| **Docs Engineer** | Markdown, MkDocs, Code Docs | Maintains project READMEs, curriculum roadmaps, JSDoc schemas, and the MkDocs site. |
| **Audit Engineer** | Linting, Security, Compliance | Performs security sweeps; checks code quality using `oxlint`; verifies rules compliance. |

---

## Individual Agent Profiles

### 1. Product Architect
- **Role Summary**: High-level system design agent. Translates loose product requirements (e.g., "Add submission history like LeetCode") into concrete specifications, data models, and component wireframes.
- **When to Invoke**:
  - Prior to initiating any new feature implementation.
  - When database schema adjustments are required.
  - To define acceptance criteria for complex features.
- **Inputs Expected**: User requests, feature lists, competitor reference details (LeetCode/GFG).
- **Outputs Produced**: Technical specifications, database schema proposals, wireframe descriptions, and task lists.
- **Handoff Points**:
  - Handoffs to **Backend Engineer** (schema definition) and **Frontend Engineer** (UI mocks) after design approval.

### 2. Frontend Engineer
- **Role Summary**: Owns the client interface. Specializes in building accessible, highly interactive, premium React (v19) components using Vanilla CSS.
- **When to Invoke**:
  - For implementing UI features, modals, dashboard layouts, coding editor panels.
  - Fixing visual layout bugs, responsive breakages, or UI state issues.
  - Optimizing Core Web Vitals (LCP, INP) on the client side.
- **Inputs Expected**: Component mockups, API specifications, existing React files (`src/App.tsx`, `src/components/*`), global styling tokens.
- **Outputs Produced**: React components, CSS stylesheets, UI state hooks, client-side routers.
- **Handoff Points**:
  - Handoffs to **API Engineer** when API contract changes are needed.
  - Handoffs to **Testing Engineer** once the interface is ready for quality control.

### 3. API Engineer
- **Role Summary**: Integrates the frontend client with the serverless backend. Owns the middleware, routing, and functions under `frontend/functions/api`.
- **When to Invoke**:
  - Creating new endpoints or serverless functions (Cloudflare Pages Functions).
  - Integrating external services (e.g., code execution sandboxes, mailers, payment processors).
- **Inputs Expected**: API endpoint design, D1 DB bindings, requests schema definitions.
- **Outputs Produced**: Pages Functions (`frontend/functions/api/**/*.ts`), route handlers, external API wrappers.
- **Handoff Points**:
  - Handoffs to **Backend Engineer** for database-specific optimizations.
  - Handoffs to **Frontend Engineer** to provide API client consumption hooks.

### 4. Backend Engineer
- **Role Summary**: Controls data persistence and server-side processing. Specializes in Cloudflare D1 SQL schemas, migrations, execution logic, and performance.
- **When to Invoke**:
  - Setting up, modifying, or querying the SQL database.
  - Writing code execution evaluation logic or submission scoring.
- **Inputs Expected**: Database bindings (`DB`), SQL schemas (`schema.sql`), query criteria.
- **Outputs Produced**: SQL migration scripts, database queries, server-side data models.
- **Handoff Points**:
  - Handoffs to **API Engineer** to wrap backend operations into endpoint routes.
  - Handoffs to **Audit Engineer** to verify query performance and safety.

### 5. Testing Engineer
- **Role Summary**: Ensures software quality, reliability, and security. Simulates user interaction flows and checks boundary/edge cases.
- **When to Invoke**:
  - Following any new feature development or bug-fix.
  - Before proposed releases or deployments.
- **Inputs Expected**: Functional specifications, test cases, code changes, active local server instance.
- **Outputs Produced**: Unit/Integration test suites, test run reports, identified issue lists.
- **Handoff Points**:
  - Handoffs back to **Frontend/API/Backend Engineers** with clear failure traces if tests fail.
  - Handoffs to **DevOps Engineer** for staging deployment once tests pass.

### 6. DevOps Engineer
- **Role Summary**: Manages platform operations. Owns build scripts, build compilation verification, and Cloudflare Pages deployment orchestration.
- **When to Invoke**:
  - Modifying `wrangler.toml`, `package.json` scripts, or `tsconfig.json`.
  - Setting up automated builds, deployment scripts, or CI/CD pipelines.
- **Inputs Expected**: Target environment details, build errors, configuration files.
- **Outputs Produced**: Compilation fixes, configuration files, deployment feedback logs.
- **Handoff Points**:
  - Handoffs to **Testing Engineer** to run smoke tests on deployed staging sites.

### 7. Docs Engineer
- **Role Summary**: Maintains user-facing and developer documentation.
- **When to Invoke**:
  - Whenever a new feature modifies user flows or APIs.
  - To expand curriculum explanations, roadmaps, or markdown tutorials.
- **Inputs Expected**: Code changes, architectural designs, user feedback, MkDocs configuration (`mkdocs.yml`).
- **Outputs Produced**: Updated Markdown guides, docstrings, API descriptions, MkDocs content.
- **Handoff Points**:
  - Handoffs to **Audit Engineer** to double check text consistency and technical accuracy.

### 8. Audit Engineer
- **Role Summary**: Code quality warden. Enforces rules, scans for secrets leakages, audits performance, and runs static analysis tools.
- **When to Invoke**:
  - Prior to merging any branch or submitting a final pull request.
  - To verify that no unauthorized database writes or git actions occurred.
- **Inputs Expected**: Proposed code diffs, configuration details, output of `oxlint`.
- **Outputs Produced**: Audit checklist reports, code-linting results, security reviews.
- **Handoff Points**:
  - Blocks process if violations are found, handoffs back to responsible engineer with correction requests.
