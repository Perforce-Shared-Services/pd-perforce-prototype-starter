# Project Goal: Perforce Prototype Starter

> Living document — updated as project scope evolves.

## Purpose

Provide a ready-to-go starter template that any Perforce team can clone and immediately begin building coded prototypes — with the Force UI design system and all tooling pre-configured.

## Problem Statement

Starting a new Perforce prototype today requires significant setup time: integrating the Force UI design system, configuring Tailwind CSS v4, wiring up a development environment, and establishing project conventions. This repeated effort slows down innovation and leads to inconsistent project structures across teams.

## Solution

A single `git clone` that gives you:

1. **A working application** — React frontend running with one command
2. **Force UI design system pre-integrated** — Tailwind CSS v4 theme tokens loaded, shadcn component registry configured, example components installed
3. **Development tooling** — TypeScript strict mode, Biome formatting/linting, path aliases, hot reload
4. **Deployable to static hosting** — Build output is a static SPA, deployable to Netlify, Vercel, or any CDN

## Target Users

- Perforce engineers building prototypes for new product features
- UX/design teams who want interactive prototypes using the real design system
- Hackathon teams needing a fast starting point with Perforce conventions

## What Success Looks Like

A developer can:

1. Clone the repo
2. Run `pnpm install && pnpm dev`
3. See a working app with Force UI components at `localhost:5173`
4. Start building their prototype immediately — no configuration needed

## Scope

### In Scope

- **Frontend starter** — React 19, Vite, TypeScript, React Router, Zustand, Tailwind CSS v4
- **Force UI integration** — Theme CSS files (primitives, semantics, light/dark), `components.json` configured, example components (Button, Input, Typography) pre-installed
- **Developer experience** — Hot reload, path aliases (`@/*`), TypeScript strict mode, Biome config
- **Environment setup** — `.env.example`, `.gitignore`, `.nvmrc`
- **Example page** — A landing/home page demonstrating Force UI components and available design tokens
- **Documentation** — `CLAUDE.md` (development guide), this file (project goals), inline code comments where helpful

### Out of Scope

- Backend / API server (add per prototype needs)
- Database or ORM setup (add per prototype needs)
- Authentication / authorization (add per prototype needs)
- Production deployment configuration (Docker, CI/CD)
- Testing framework setup beyond basic config (prototypes may choose their own)
- Specific business logic (this is a blank canvas)

## Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Package manager | pnpm | Fast installs, strict dependency resolution, native workspace support |
| Frontend framework | React 19 | Force UI is React-first, largest ecosystem |
| Build tool | Vite | Fast HMR, native ESM, good TypeScript support |
| Styling | Tailwind CSS v4 | Force UI is built on it, CSS-first config |
| Component system | shadcn registry pattern | Components live in your project, fully customizable |
| State management | Zustand | Minimal boilerplate, TypeScript-friendly, no providers |
| Code quality | Biome | Fast all-in-one formatter + linter |

## Relationship to Force UI

This starter is a **consumer** of Force UI, not a fork. It uses the shadcn registry pattern:

- Force UI components are installed into `src/components/ui/` via the registry CLI
- Theme CSS variables are copied into `src/styles/` and imported in `globals.css`
- The `components.json` file configures paths, aliases, and the registry URL
- Components can be customized after installation — they're your code, not a locked dependency

To add more Force UI components, run the Force UI docs site locally and use `npx shadcn@latest add <registry-url>`.
