# Repository Rules & Guardrails

This rule document governs all active agent conversations and workspace tool operations.

## Safety & Permission Guardrails
1.  **No Database Writes Without Permission**: AI agents must not write to or modify the database (D1) without explicit, manual permission from the user. Parameterized queries (`?`) are mandatory for all read operations.
2.  **No Git Write Operations Without Permission**: Agents must not execute `git commit`, `git push`, or generate Pull Requests (PRs) without explicit, manual user authorization. Non-destructive commands (`git diff`, `git status`, `git log`) are permitted.
3.  **Secrets Mitigation**: Never hardcode API keys, passwords, credentials, database secrets, or private tokens into the codebase. Use Cloudflare Pages Environment/Secret bindings for production and local `.env` files for development.

## Architecture & Code Quality
1.  **Component Reuse**: Do not duplicate existing frontend elements. Reuse elements in `frontend/src/components/` and utility hooks.
2.  **Visual Consistency**: Follow a Vanilla CSS visual style including Outfit/Inter typography, clean glassmorphism, responsive elements, and cohesive dark-mode styling. Do not use TailwindCSS unless explicitly asked.
3.  **Linter & Build Validation**: Always run `npm run lint` and `npm run build` from the `frontend` folder before completing changes. Proposed files must compile cleanly with zero TypeScript or linter errors.
4.  **Robust Error Handling**: Implement error catch blocks in all serverless routes (`functions/api/`). Log errors internally and show user-friendly messages to the frontend.
