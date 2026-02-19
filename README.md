# Perforce Prototype Starter

A ready-to-go starter template for building Perforce coded prototypes. Clone, install, and start building — Force UI design system and all tooling pre-configured.

## Quickstart

```bash
# 1. Clone the repo (or use it as a template)
git clone <repo-url> my-prototype
cd my-prototype

# 2. Install dependencies
pnpm install

# 3. Start developing
pnpm dev
```

Open http://localhost:5173 — you should see a working app with Force UI components.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20.0.0
- [pnpm](https://pnpm.io/) >= 8.0.0

## What's Included

| Category | What You Get |
|----------|-------------|
| **Frontend** | React 19, TypeScript, Vite with hot reload |
| **Design System** | Force UI (Tailwind CSS v4, semantic tokens, light/dark themes) |
| **Components** | Button, Input, Card, Badge, Separator pre-installed via shadcn registry |
| **State Management** | Zustand store with theme toggle example |
| **Routing** | React Router v6 with file-based page convention |
| **Code Quality** | Biome (formatting + linting), TypeScript strict mode |
| **AI Tooling** | Claude Code skills, rules, and context management system |

## Starting a New Prototype

### 1. Fork or Clone

Use this repo as a GitHub template or clone it directly. Then update these files for your project:

- **`project-goal.md`** — Replace with your prototype's vision, scope, and success criteria
- **`package.json`** — Update the `name` and `description` fields
- **`.env.example`** — Add any API keys or service URLs your prototype needs

### 2. Add Force UI Components

The Force UI docs site must be running locally to install components from the registry:

```bash
# Terminal 1: Start the Force UI docs server
cd c:/dev/Perforce/force-ui/docs && pnpm dev

# Terminal 2: In your prototype, install components
npx shadcn@latest add http://localhost:4321/react/r/components/dialog.json
npx shadcn@latest add http://localhost:4321/react/r/components/table.json
```

Components are installed to `apps/frontend/src/components/ui/` and are fully customizable.

### 3. Add Pages

Create new pages in `apps/frontend/src/pages/` and wire them up in `App.tsx`:

```tsx
// apps/frontend/src/pages/DashboardPage.tsx
export function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-800 font-semibold text-foreground">Dashboard</h1>
    </div>
  );
}
```

```tsx
// In App.tsx, add the route
<Route path="/dashboard" element={<DashboardPage />} />
```

### 4. Add State

Create Zustand stores in `apps/frontend/src/stores/`:

```tsx
// apps/frontend/src/stores/counterStore.ts
import { create } from "zustand";

interface CounterStore {
  count: number;
  increment: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (http://localhost:5173) |
| `pnpm build` | Build for production |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Run Biome linting |
| `pnpm test` | Run tests |

## Project Structure

```
├── apps/frontend/          # React + Vite SPA
│   └── src/
│       ├── components/ui/  # Force UI components (shadcn registry)
│       ├── pages/          # Route-level page components
│       ├── stores/         # Zustand state stores
│       ├── lib/            # Shared utilities (cn, etc.)
│       └── styles/         # Force UI theme CSS files
│
├── docs/                   # Project context documents
│   ├── README.md           # Document index
│   ├── architecture/       # System design docs
│   ├── decisions/          # Architecture decision records
│   ├── research/           # Investigation notes
│   ├── plans/              # Implementation plans
│   └── feedback/           # Review session notes
│
├── .claude/                # Claude Code configuration
│   ├── rules/              # Auto-loaded context rules
│   └── skills/             # Slash commands
│
├── CLAUDE.md               # Development guide (for AI and humans)
├── UI-PATTERNS.md          # Force UI usage patterns
├── project-goal.md         # Project vision & scope
└── README.md               # This file
```

## AI-Assisted Development

This starter includes a context management system designed for working with Claude Code.

### Context Commands

| Command | Description |
|---------|-------------|
| `/context-create <type> <title>` | Create a new context document (decision, research, plan, feedback, architecture) |
| `/context-list` | List all context documents by category |
| `/context-briefing` | Get a summary of current project state |
| `/context-update <doc>` | Update a living document |

### Documentation Files

- **`CLAUDE.md`** — Technical reference: stack, commands, conventions, patterns
- **`project-goal.md`** — What you're building and why
- **`UI-PATTERNS.md`** — How to use Force UI tokens, components, and layout patterns
- **`docs/`** — Accumulated context: decisions, research, plans, feedback

See the [Project Context System](CLAUDE.md#project-context-system) section in CLAUDE.md for full details.

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React 19 | Force UI is React-first |
| Build | Vite | Fast HMR, native ESM |
| Styling | Tailwind CSS v4 | Force UI is built on it |
| Components | Force UI (shadcn pattern) | Perforce design system, fully customizable |
| State | Zustand | Minimal boilerplate, TypeScript-friendly |
| Routing | React Router v6 | Standard, flexible |
| Quality | Biome | Fast all-in-one formatter + linter |
| Package Mgr | pnpm | Fast, strict, workspace support |

## Related

- [Force UI](https://github.com/nicholasgriffintn/force-ui)
