# Project Rules & Guardrails (RULES.md)

This file contains the **non-negotiable operating rules** for all AI coding agents working on this repository. Violating these rules will result in immediate termination or revert of the proposed code changes.

---

## 🔒 1. Secrets Management & Security (Critical)
*   **Zero Credentials in Source**: Under no circumstances should any API keys, credentials, database passwords, auth tokens, private keys, or salt strings be hardcoded into the source code.
*   **Cloudflare Bindings & Env Variables**: Use environment variables via `.env` files for local development, and access them through Cloudflare Pages Environment/Secret Bindings (`env` object or `context.env`) in production.
*   **Git Safeguards**: Never add, stage, or commit files containing sensitive info (like `.env`, `.wrangler`, or credentials). Check that the root and subfolder `.gitignore` files actively exclude all local credential caches.
*   **Secure API Design**: Do not write debug endpoints that output server environment variables, sensitive database columns, or full user profile details.

---

## 💾 2. Database Operations (Cloudflare D1)
*   **Write Restriction**: AI agents are strictly forbidden from performing database writes (e.g., executing `INSERT`, `UPDATE`, `DELETE`, `DROP`, `ALTER`, or executing custom schema migrations on D1) without explicit, manual permission from the user.
*   **SQL Injection Prevention**: All D1 database queries MUST use parameterized queries (using `?` placeholders) and bound parameters. Never construct SQL statements using raw string concatenation or template literals containing user inputs.
*   **Local vs Production Separation**: Ensure that database migration testing and schema changes are always performed using the local wrangler emulator (`wrangler d1 ... --local`). Never point workspace code at a production database during local runs.

---

## 🎨 3. UI/UX & Component Architecture
*   **Strict Component Reuse**: Do not create one-off or duplicate components. If a UI element (e.g., buttons, code cards, topic cards, modal dialogs) exists in `frontend/src/components/`, it must be imported and reused.
*   **Design System & Styling**:
    *   Use **Vanilla CSS** and standard styling tokens for UI styling.
    *   Do **NOT** introduce or use TailwindCSS unless explicitly instructed by the user.
    *   Maintain the existing premium visual identity: glassmorphism, smooth micro-animations, Outfit/Inter typography, clean dark mode support, and high accessibility standards (WCAG compliance).
*   **Responsive Layouts**: All new visual modules must be designed mobile-first and tested for responsive breakages (supporting mobile, tablet, and desktop breakpoints).

---

## 🛠️ 4. Version Control & Git Commands
*   **Unauthorized Actions**: Do **NOT** execute `git commit`, `git push`, or trigger pull request (PR) creation commands without the user's explicit written consent.
*   **Allowed Actions**: You are free to run non-destructive, read-only commands for git status, git diff, git log, git branch, git show, and git checkout (to check files).
*   **Code Review Verification**: Provide a detailed description of changes when requesting code approval, ensuring the user is fully aware of all modifications.

---

## ⚙️ 5. Code Quality & Performance
*   **Type Safety**: The project uses TypeScript. Any changes must maintain full type safety. Avoid using the `any` type.
*   **Static Analysis (Linter)**: Run `npm run lint` (using `oxlint`) on the frontend folder before marking work as complete. The codebase must have zero lint errors.
*   **Build Verification**: Run `npm run build` (`tsc -b && vite build`) to confirm that changes compile without warnings or errors.
*   **Modern Web APIs**: Refer to [modern-web-guidance](./.agents/skills/research/SKILL.md) for utilizing modern browser APIs (e.g., `<dialog>` elements for modals, `:has()` CSS selectors, and native HTML5 elements) to avoid deprecated library patterns.
*   **Error Handling**: Implement robust try-catch blocks in serverless functions (`functions/api/`). Never swallow exceptions silently. Log technical details on the backend/console and return clean, descriptive error messages to the frontend.
