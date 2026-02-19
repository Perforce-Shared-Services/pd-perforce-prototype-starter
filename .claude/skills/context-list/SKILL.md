---
name: context-list
description: List all project context documents organized by category. Shows living documents and point-in-time documents with their dates and statuses. Use when you need to find existing context or understand what documentation exists.
allowed-tools: Read, Glob, Grep
---

List all project context documents, organized by category.

## Procedure

1. **Read `docs/README.md`** if it exists, for the curated index.

2. **Scan the filesystem** for completeness:
   - Root-level markdown: `CLAUDE.md`, `project-goal.md`, `UI-PATTERNS.md`, and any other `*.md` at root (excluding `node_modules/`)
   - `docs/architecture/*.md`
   - `docs/decisions/*.md`
   - `docs/research/*.md`
   - `docs/plans/*.md`
   - `docs/feedback/*.md`

3. **For each point-in-time document**, extract the date from the filename and the Status from the metadata block at the top of the file.

4. **Present a formatted summary:**

   ```
   Living Documents:
   - CLAUDE.md — Development guide
   - project-goal.md — Vision & scope
   - UI-PATTERNS.md — Force UI patterns
   - [any docs/architecture/ files]

   Decisions (docs/decisions/):
   - [date] [title] — [status]

   Research (docs/research/):
   - [date] [title] — [status]

   Plans (docs/plans/):
   - [date] [title] — [status]

   Feedback (docs/feedback/):
   - [date] [title] — [status]
   ```

5. **Flag discrepancies** — note any documents found on disk that are missing from `docs/README.md`, or entries in `docs/README.md` that point to files that no longer exist.
