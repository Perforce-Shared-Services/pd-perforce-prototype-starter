---
paths:
  - "docs/**/*"
  - "*.md"
  - "CLAUDE.md"
  - "project-goal.md"
  - "UI-PATTERNS.md"
---

# Context Management System

This project uses a structured context management system. Follow these conventions when working with project documentation.

## Document Locations

- **Root-level living docs**: `CLAUDE.md`, `project-goal.md`, `UI-PATTERNS.md`
- **Architecture docs** (living): `docs/architecture/*.md`
- **Decision records** (point-in-time): `docs/decisions/YYYY-MM-DD-*.md`
- **Research notes** (point-in-time): `docs/research/YYYY-MM-DD-*.md`
- **Implementation plans** (point-in-time): `docs/plans/YYYY-MM-DD-*.md`
- **Feedback notes** (point-in-time): `docs/feedback/YYYY-MM-DD-*.md`
- **Document index**: `docs/README.md`

## Naming Conventions

- **Living documents**: descriptive name, no date prefix (e.g., `data-model.md`)
- **Point-in-time documents**: `YYYY-MM-DD-descriptive-title.md` (e.g., `2026-02-19-choosing-chart-library.md`)
- Root-level living docs use `UPPER-KEBAB-CASE.md`; docs/architecture/ uses `lower-kebab-case.md`

## When to Create Documents

- **Making a significant technical choice?** Create a decision record: `/context-create decision <title>`
- **Investigating a technology or approach?** Create a research note: `/context-create research <title>`
- **Planning implementation work?** Create a plan: `/context-create plan <title>`
- **Documenting review feedback?** Create a feedback note: `/context-create feedback <title>`
- **Documenting system design that will evolve?** Create an architecture doc: `/context-create architecture <title>`

## After Creating or Updating Documents

- ALWAYS update `docs/README.md` to reflect new or changed documents
- The `/context-create` skill does this automatically — if creating manually, update the index yourself

## Living Document Rules

- Living documents include a `> Living document` marker near the top
- Edit in-place; git history tracks changes over time
- Do NOT create dated copies of living documents

## Point-in-Time Document Rules

- Always include the metadata block at the top: Type, Date, Status
- Valid statuses: `draft`, `active`, `superseded`, `archived`
- When a decision is superseded, update the old document's Status to `superseded` and add a `Superseded by` link
- Append follow-up notes at the bottom rather than rewriting content
