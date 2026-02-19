---
name: context-update
description: Update a living document (UI-PATTERNS.md, project-goal.md, architecture docs, or docs/README.md) with new information. Use after implementing new patterns, making scope changes, or when documents need to reflect current state.
argument-hint: <document-name> (e.g., UI-PATTERNS, project-goal, README, or architecture doc name)
allowed-tools: Read, Write, Edit, Glob
---

Update a living document with new content.

**Arguments:** `$ARGUMENTS`
- First word: document identifier (case-insensitive)

## Procedure

1. **Resolve the target document** from the argument:
   - `UI-PATTERNS` or `ui-patterns` → `UI-PATTERNS.md`
   - `project-goal` → `project-goal.md`
   - `README` or `index` → `docs/README.md`
   - `CLAUDE` → `CLAUDE.md`
   - Any other name → search `docs/architecture/` for a matching file

2. **Read the current content** of the target document.

3. **Ask the user what needs updating** — unless the conversation already provides sufficient context about what changed.

4. **Make the update** following these rules:
   - For `UI-PATTERNS.md`: follow the existing pattern template format (see the Appendix section of that file)
   - For `project-goal.md`: preserve the existing section structure
   - For `docs/README.md`: add or update entries in the appropriate category table
   - For `CLAUDE.md`: preserve the existing section structure and keep it concise
   - For architecture docs: preserve the document structure, update relevant sections

5. **Confirm what changed** — provide a brief summary of the update made.

6. **Only update living documents.** If the user tries to update a point-in-time document (date-prefixed), explain that point-in-time documents are append-only. Offer to add a follow-up note at the bottom instead, or create a new document that supersedes it.
