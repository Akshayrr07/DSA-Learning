# Testing & Quality Verification Skill Reference

This file points to the Antigravity configuration directory for QA and testing verification workflows.

**Configuration Path**: [SKILL.md](../.agents/skills/testing/SKILL.md)

---

## Behavior & Steps

1.  **Acceptance Criteria Check**: Verify that all user-requested capabilities are met and functional.
2.  **Type Safety & Lint Validation**: Run `npm run build` and `npm run lint` on the `frontend` folder to guarantee clean builds.
3.  **UI/UX Browser Verification**: Navigate pages, inspect visual layouts, and capture browser output/recordings.
4.  **Database Query Audit**: Ensure all SQL statements use query binding and parameters.
5.  **Security Sweep**: Audit changed files to verify no secrets are checked into VCS.
