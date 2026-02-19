---
name: context-briefing
description: Generate a comprehensive briefing of the current project state by reading all context documents. Use at the start of a session, when resuming work after a break, or when onboarding to a forked project.
context: fork
agent: Explore
allowed-tools: Read, Glob, Grep
---

Generate a comprehensive project context briefing by reading all available documentation.

## Procedure

1. **Read core living documents** in order:
   - `project-goal.md` — project vision and scope
   - `CLAUDE.md` — technical setup and conventions
   - `UI-PATTERNS.md` — skim for what patterns are established (skip full details)
   - `docs/README.md` — document index

2. **Read all architecture documents** in `docs/architecture/`.

3. **Read recent point-in-time documents** — the most recent 3-5 from each category (by date, newest first):
   - `docs/decisions/`
   - `docs/research/`
   - `docs/plans/`
   - `docs/feedback/`

4. **Synthesize a briefing** with these sections:

   **Project Summary** — One paragraph on what the project is and its current state.

   **Key Decisions** — List active decisions that affect current development.

   **Current Plan** — What is being worked on now and what is next.

   **Architecture Notes** — Key architectural patterns and constraints.

   **Open Questions** — Unresolved items from research, feedback, or plans.

   **Recent Activity** — What happened in the last few sessions (from recent point-in-time docs).

5. **Keep it concise.** This is a summary, not a regurgitation. Focus on what a developer needs to know to start working effectively right now. If a category has no documents, skip it rather than noting it's empty.
