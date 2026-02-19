# [Your Prototype Name]

[One-line description of what this prototype does.]

## Project Overview

> **Customize this section for your prototype.**

- **What**: [What does this prototype demonstrate?]
- **For whom**: [Who is the target user?]
- **Key workflows**: [What are the main user flows?]

See [project-goal.md](project-goal.md) for full vision and scope.

## Project-Specific Conventions

> Add conventions here as they emerge during development. Examples: API endpoint patterns, data model naming, component composition rules, state management patterns beyond Zustand basics.

## Project Structure

```
your-prototype/
├── apps/
│   └── frontend/         # React + Vite SPA
│       ├── src/
│       │   ├── components/
│       │   │   └── ui/   # Force UI components (via shadcn registry)
│       │   ├── pages/    # Route-level page components
│       │   ├── stores/   # Zustand state stores
│       │   ├── lib/      # Shared utilities (cn, etc.)
│       │   ├── styles/   # Force UI theme CSS files
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── components.json  # shadcn/ui configuration
│       ├── vite.config.ts
│       └── package.json
│
├── docs/                 # Project context documents
│   ├── README.md         # Document index
│   ├── architecture/     # Living architecture docs
│   ├── decisions/        # Date-prefixed decision records
│   ├── research/         # Date-prefixed research notes
│   ├── plans/            # Date-prefixed implementation plans
│   └── feedback/         # Date-prefixed feedback session notes
│
├── .claude/
│   ├── rules/            # Auto-loaded context rules
│   └── skills/           # Slash commands (/context-create, etc.)
│
├── CLAUDE.md             # This file
├── UI-PATTERNS.md        # Force UI usage patterns & guidelines (living doc)
├── project-goal.md       # Project vision & scope
├── pnpm-workspace.yaml
└── package.json          # Root config
```

## Tech Stack

| Layer       | Technology                                           |
|-------------|------------------------------------------------------|
| Frontend    | React 19, TypeScript, Vite                           |
| Styling     | Tailwind CSS v4, Force UI design tokens              |
| Components  | Force UI (shadcn registry pattern, Radix UI primitives) |
| State       | Zustand                                              |
| Routing     | React Router v6                                      |
| Package Mgr | pnpm (workspaces)                                    |
| Build       | Vite                                                 |

## Commands

### Development

```bash
pnpm install              # Install all dependencies
pnpm dev                  # Start frontend dev server (http://localhost:5173)
```

### Build & Quality

```bash
pnpm build                # Build for production
pnpm typecheck            # Run TypeScript type checking
pnpm lint                 # Run linting
pnpm test                 # Run tests
```

## Development URL

- Frontend: http://localhost:5173

## Force UI Integration

This project uses Force UI — Perforce's design system built on Tailwind CSS v4 and the shadcn component registry pattern.

### Adding Components

The Force UI docs site must be running locally to install components:

```bash
# In the force-ui repo (c:/dev/Perforce/force-ui)
cd docs && pnpm dev  # Starts registry at http://localhost:4321

# In this project, install components from the registry
npx shadcn@latest add http://localhost:4321/react/r/components/button.json
npx shadcn@latest add http://localhost:4321/react/r/components/input.json
```

### Theme Files

Force UI theming is loaded via CSS files in `apps/frontend/src/styles/`:

- `globals.css` — Main entry point, imports all theme layers
- `force-ui-primitives.css` — 800+ primitive color tokens
- `force-ui-semantics.css` — Semantic color mappings
- `force-ui-light-theme.css` — Light mode overrides
- `force-ui-dark-theme.css` — Dark mode overrides

### Using Components

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Force UI Button variants: primary, secondary, tertiary
// Colors: default, confirm, danger
// Sizes: sm, md, lg
<Button variant="primary" color="default" size="md">Click me</Button>
```

### Icons

Uses Material Symbols via `@material-symbols/svg-400` with vite-plugin-svgr:

```tsx
import CheckIcon from "@material-symbols/svg-400/rounded/check.svg?react";
```

## Architecture Principles

### Local-First Development

- **Zero external dependencies** — Only Node.js + pnpm required to get started
- **Everything runs locally** — No Docker, no cloud services needed for development

### Frontend Patterns

- **File-based pages** in `src/pages/` mapped to React Router routes
- **Zustand stores** in `src/stores/` for client state (minimal boilerplate)
- **UI components** in `src/components/ui/` from Force UI registry
- **Path aliases**: `@/*` maps to `./src/*`

### Code Style

- TypeScript strict mode enabled
- ESM modules (`"type": "module"`)
- Biome for formatting and linting
- Prefer named exports over default exports
- Use `cn()` utility (from `@/lib/utils`) for conditional Tailwind classes

## UI Patterns & Guidelines

See [UI-PATTERNS.md](UI-PATTERNS.md) for detailed Force UI usage patterns including:

- Design token reference and naming conventions
- Component usage guidelines (Button, Input, Card, Badge, etc.)
- Layout patterns (app shell, sidebar navigation, header)
- Page patterns (master/detail, empty/loading/error states)
- Interaction patterns (modals, toasts, forms)

This is a living document — update it as new patterns are established.

### Keeping UI-PATTERNS.md Current

When working on frontend code, **actively maintain UI-PATTERNS.md**:

- **Promote stubs to full patterns**: When you implement a UI pattern that currently has a stub section (marked with "Document when first implemented"), fill in the full documentation with the actual code, tokens, and do/don't guidance from the implementation.
- **Recognize repeated patterns**: If you notice the same UI composition being used across 2+ pages or components (e.g., a consistent page header structure, a common card layout, a filter bar pattern), document it as a new pattern using the Pattern Template in the appendix.
- **Scope patterns by app**: Patterns may differ between apps. Tag patterns with which app(s) they apply to when relevant (e.g., "Used in: frontend" or "Used in: all apps").
- **Update existing patterns**: If an implementation diverges from a documented pattern with good reason, update the pattern documentation to reflect the new approach rather than leaving it stale.
- **Don't pre-document**: Only document patterns that have been implemented at least once. Stubs are placeholders — don't fill them with speculative guidance.

## Project Context System

This project uses a structured context management system for all project documentation. See `.claude/rules/context-system.md` for full rules (auto-loaded at session start).

### Document Locations

- **Root-level living docs**: `CLAUDE.md`, `project-goal.md`, `UI-PATTERNS.md`
- **Architecture docs** (living): `docs/architecture/`
- **Decision records** (point-in-time): `docs/decisions/YYYY-MM-DD-*.md`
- **Research notes** (point-in-time): `docs/research/YYYY-MM-DD-*.md`
- **Implementation plans** (point-in-time): `docs/plans/YYYY-MM-DD-*.md`
- **Feedback notes** (point-in-time): `docs/feedback/YYYY-MM-DD-*.md`
- **Document index**: `docs/README.md`

### Naming Conventions

- **Living documents**: descriptive name, no date (e.g., `data-model.md`)
- **Point-in-time documents**: `YYYY-MM-DD-descriptive-title.md`

### Context Commands

- `/context-create <type> <title>` — Create a new context document with proper naming and template
- `/context-list` — List all context documents by category
- `/context-briefing` — Get a summary of current project state
- `/context-update <doc>` — Update a living document

### Maintenance Rules

- After creating any document in `docs/`, update `docs/README.md`
- When making a significant technical choice, create a decision record
- When researching a technology or approach, create a research note
- When planning implementation work, create a plan document

## Environment Variables

Copy `.env.example` to `.env` and configure as needed.

Add API keys or service URLs as your prototype requires.

## Related Projects

- **Force UI**: `c:/dev/Perforce/force-ui` — Design system source (Tailwind v4, shadcn registry, Radix UI)
- **Perforce-Intelligence**: `m:/dev/Perforce/Perforce-Intelligence` — Reference prototype using this stack
