---
name: context-create
description: Create a new project context document with proper naming conventions and templates. Use when creating decision records, research notes, implementation plans, feedback notes, or architecture documents.
argument-hint: <type> <title> (types: decision, research, plan, feedback, architecture)
allowed-tools: Read, Write, Edit, Glob, Bash(date *)
---

Create a new context document following the project's naming conventions.

**Arguments:** `$ARGUMENTS`
- First word: document type — one of: `decision`, `research`, `plan`, `feedback`, `architecture`
- Remaining words: descriptive title

## Procedure

1. **Parse arguments.** Extract the document type from the first word. The remaining words form the title. If no type is provided, ask the user.

2. **Determine target directory:**
   - `decision` → `docs/decisions/`
   - `research` → `docs/research/`
   - `plan` → `docs/plans/`
   - `feedback` → `docs/feedback/`
   - `architecture` → `docs/architecture/`

3. **Determine filename:**
   - For point-in-time types (decision, research, plan, feedback): get today's date and format as `YYYY-MM-DD-title-in-kebab-case.md`
   - For architecture (living document): format as `title-in-kebab-case.md` (no date prefix)

4. **Create the file** using the appropriate template below.

5. **Update `docs/README.md`** — add the new document to the appropriate section table.

6. **Report** the created file path and invite the user to fill in the content.

## Templates

### Decision

```markdown
# [Title]

> **Type**: decision
> **Date**: [YYYY-MM-DD]
> **Status**: draft

## Context

[Why is this decision needed?]

## Options Considered

1. **[Option A]** — [description, pros/cons]
2. **[Option B]** — [description, pros/cons]

## Decision

[What was decided and why]

## Consequences

[What becomes easier or harder as a result]
```

### Research

```markdown
# [Title]

> **Type**: research
> **Date**: [YYYY-MM-DD]
> **Status**: draft

## Question

[What are we trying to learn?]

## Findings

[What was discovered]

## Conclusions

[Summary and recommendations]
```

### Plan

```markdown
# [Title]

> **Type**: plan
> **Date**: [YYYY-MM-DD]
> **Status**: draft

## Goal

[What this plan achieves]

## Steps

1. [Step 1]
2. [Step 2]

## Dependencies

[What needs to be in place]

## Success Criteria

[How we know this is done]
```

### Feedback

```markdown
# [Title]

> **Type**: feedback
> **Date**: [YYYY-MM-DD]
> **Status**: active

## Session Details

- **Participants**: [who was involved]
- **Context**: [what was reviewed or demonstrated]

## Feedback

[Key feedback points]

## Action Items

- [ ] [Action 1]
- [ ] [Action 2]
```

### Architecture

```markdown
# [Title]

> **Type**: architecture
> Living document — updated as the project evolves.

## Overview

[What this document covers]

## Current Design

[Current architecture description]

## Key Decisions

[Important choices and rationale — link to decision records in `docs/decisions/` when applicable]
```
