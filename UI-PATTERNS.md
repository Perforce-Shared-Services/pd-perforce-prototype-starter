# Force UI Patterns & Guidelines

> **Living document** — add new patterns as they are established. See the [Pattern Template](#appendix-pattern-template) at the end for how to add new entries.

## Table of Contents

1. [Design Token Reference](#1-design-token-reference)
2. [Component Usage](#2-component-usage)
3. [Layout Patterns](#3-layout-patterns)
4. [Page Patterns](#4-page-patterns) *(stubs)*
5. [Interaction Patterns](#5-interaction-patterns) *(stubs)*
6. [Utilities & Conventions](#6-utilities--conventions)
7. [Appendix: Pattern Template](#appendix-pattern-template)

---

## 1. Design Token Reference

All colors come from Force UI semantic tokens. Default Tailwind colors are **reset** (`--color-*: initial`) — only Force UI tokens are available.

### Token Naming Convention

Format: `{category}-{role}-{level}-{state}`

| Segment    | Values |
|------------|--------|
| **Category** | `neutral`, `brand`, `status-danger`, `status-success`, `status-warning`, `status-informational`, `status-generic-{color}` |
| **Role**     | `background`, `foreground`, `stroke` |
| **Level**    | `1` (strongest) → `4`+ (weakest). Special modifiers: `inverted`, `disabled`, `transparent`, `subtle`, `alpha`, `link`, `onBrand`, `compound`, `stencil`, `overlay` |
| **State**    | `rest`, `hover`, `pressed`, `selected`, `disabled` |

Example: `bg-neutral-background-3-rest` → neutral category, background role, level 3, rest state.

### Commonly Used Tokens

#### Backgrounds

| Purpose | Tailwind Class |
|---------|---------------|
| Primary content surface | `bg-neutral-background-1-rest` |
| Secondary surface | `bg-neutral-background-2-rest` |
| Chrome / shell (header, sidebar) | `bg-neutral-background-3-rest` |
| Disabled element | `bg-neutral-background-disabled-rest` |
| Overlay / backdrop | `bg-neutral-background-overlay-rest` |
| Brand primary fill | `bg-brand-background-1-rest` |
| Brand secondary fill | `bg-brand-background-2-rest` |

#### Foregrounds (text & icons)

| Purpose | Tailwind Class |
|---------|---------------|
| Primary text | `text-neutral-foreground-1-rest` |
| Secondary text | `text-neutral-foreground-2-rest` |
| Tertiary / muted text | `text-neutral-foreground-3-rest` |
| Placeholder / hint text | `text-neutral-foreground-4-rest` |
| Disabled text | `text-neutral-foreground-disabled-rest` |
| Brand text (on neutral bg) | `text-brand-foreground-2-rest` |
| Brand text (on brand bg) | `text-brand-foreground-1-rest` |
| Link text | `text-neutral-foreground-link-rest` |

#### Strokes (borders)

| Purpose | Tailwind Class |
|---------|---------------|
| Default border | `border-neutral-stroke-1-rest` |
| Subtle border | `border-neutral-stroke-2-rest` |
| Transparent (invisible) | `border-neutral-stroke-transparent-rest` |
| Disabled border | `border-neutral-stroke-disabled-rest` |
| Brand border | `border-brand-stroke-1-rest` |

#### Status Colors

Each status has `background-1`, `background-2`, `foreground-1`, `foreground-2`, `stroke-1`, and `stroke-2` variants:

| Status | Example bg | Example text |
|--------|-----------|-------------|
| Danger | `bg-status-danger-background-1-rest` | `text-status-danger-foreground-1-rest` |
| Success | `bg-status-success-background-1-rest` | `text-status-success-foreground-1-rest` |
| Warning | `bg-status-warning-background-1-rest` | `text-status-warning-foreground-1-rest` |
| Informational | `bg-status-informational-background-1-rest` | `text-status-informational-foreground-1-rest` |

Level 1 = tinted background with strong foreground. Level 2 = stronger/filled variant.

#### Generic Status Colors

For color-coded categories (tags, labels, charts), use `status-generic-{color}` tokens. Each provides `background-2`, `foreground-2`, and `stroke-active` variants.

Available colors: `darkRed`, `cranberry`, `red`, `pumpkin`, `peach`, `marigold`, `gold`, `brass`, `brown`, `forest`, `seafoam`, `darkGreen`, `lightTeal`, `teal`, `steel`, `blue`, `royalBlue`, `cornflower`, `navy`, `lavender`, `purple`, `grape`, `lilac`, `pink`, `magenta`, `plum`, `beige`, `mink`, `platinum`, `anchor`

```tsx
// Example: color-coded category badge
<span className="bg-status-generic-teal-background-2-rest text-status-generic-teal-foreground-2-rest">
  Category
</span>
```

### Interactive State Pattern

When building custom interactive elements, apply all four states consistently:

```tsx
className={cn(
  // rest state
  "bg-neutral-background-1-rest text-neutral-foreground-1-rest border-neutral-stroke-1-rest",
  // hover
  "hover:bg-neutral-background-1-hover hover:text-neutral-foreground-1-hover",
  // pressed
  "active:bg-neutral-background-1-pressed active:text-neutral-foreground-1-pressed",
  // disabled
  "disabled:bg-neutral-background-disabled-rest disabled:text-neutral-foreground-disabled-rest disabled:border-neutral-stroke-disabled-rest",
)}
```

### Typography Scale

| Class | Usage |
|-------|-------|
| `text-100` | Captions, labels, version numbers |
| `text-200` | Small UI text, badge text, secondary labels |
| `text-300` | Body text (default) |
| `text-400` | Emphasized body, sub-headings |
| `text-500` | Section headings |
| `text-600` | Page sub-titles |
| `text-700` | Page titles |
| `text-800`–`text-1000` | Hero / display text |

Font weights: `font-light`, `font-semilight`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`

Font families: `font-sans` (Noto Sans — default), `font-mono` (monospace), `font-numeric` (tabular numbers)

### Shadows

| Class | Usage |
|-------|-------|
| `shadow-2xs` | Subtle elevation (cards on same-level surfaces) |
| `shadow-xs` | Light card elevation |
| `shadow-sm` | Default card shadow |
| `shadow` | Elevated panels |
| `shadow-md` | Popovers, dropdowns |
| `shadow-lg` | Modals, dialogs |
| `shadow-xl`–`shadow-2xl` | Large overlays |

### Rules

- **NEVER** use hardcoded hex/rgb color values
- **NEVER** use default Tailwind color names (`red-500`, `blue-600`, etc.) — they are reset to `initial`
- **NEVER** use arbitrary color values in brackets (`bg-[#ff0000]`)
- **ALWAYS** use Force UI semantic tokens for all colors
- **ALWAYS** apply interactive states (`hover:`, `active:`, `disabled:`) when an element is clickable

---

## 2. Component Usage

### Icons

Use Material Symbols with the `?react` suffix for SVG-as-component imports:

```tsx
import CheckIcon from "@material-symbols/svg-400/rounded/check.svg?react";
import SearchIcon from "@material-symbols/svg-400/rounded/search.svg?react";

// Usage — icons inherit color via fill: currentColor
<CheckIcon className="size-5" />
```

Icon sizing should match the component context:

| Context | Class |
|---------|-------|
| Small buttons / UI (sm) | `size-4` |
| Default UI (md) | `size-5` |
| Large buttons / headings (lg) | `size-6` |

> **Note**: Lucide React icons (`lucide-react`) are also available and used in some starter components. Either library is acceptable — be consistent within a feature.

### Button

**Source**: `src/components/ui/button.tsx`

```tsx
import { Button } from "@/components/ui/button";
```

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `primary`, `secondary`, `tertiary` | `primary` |
| `color` | `default`, `confirm`, `danger` | `default` |
| `size` | `sm`, `md`, `lg` | `md` |
| `shape` | `rounded`, `circular`, `square` | `rounded` |
| `iconOnly` | `true`, `false` | — |
| `asChild` | `true`, `false` | `false` |

**When to use each variant**:

- **`primary`** — Main call-to-action on a page/section. Use sparingly (one per visual group).
- **`secondary`** — Supporting actions alongside a primary button, or standalone medium-emphasis actions.
- **`tertiary`** — Low-emphasis actions: cancel, close, navigation, toolbar items.

**When to use each color**:

- **`default`** — Most actions (neutral appearance).
- **`confirm`** — Affirmative actions: save, submit, create (brand-colored).
- **`danger`** — Destructive actions: delete, remove, disconnect.

```tsx
// Primary confirm CTA
<Button variant="primary" color="confirm">Save Changes</Button>

// Secondary default action
<Button variant="secondary" color="default">Cancel</Button>

// Danger action
<Button variant="primary" color="danger">Delete</Button>

// Icon-only button
<Button variant="tertiary" color="default" iconOnly size="sm">
  <Settings className="size-4" />
</Button>

// Button as a link (renders as <a>)
<Button asChild variant="tertiary">
  <Link to="/settings">Settings</Link>
</Button>
```

**Do**:
- Use `<Button>` for all user-clickable actions
- Pair `variant="primary" color="confirm"` for the main CTA
- Use `iconOnly` prop for icon-only buttons (adjusts padding correctly)

**Don't**:
- Don't use `<button>` elements directly — use `<Button>` for consistent styling
- Don't combine `primary` + `confirm` more than once per visual group
- Don't use `danger` color for non-destructive actions

### Input

**Source**: `src/components/ui/input.tsx`

```tsx
import { Input } from "@/components/ui/input";
```

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `outline`, `filledDarker`, `filledLighter` | `outline` |
| `size` | `small`, `medium`, `large` | `medium` |
| `iconStart` | `ReactNode` | — |
| `iconEnd` | `ReactNode` | — |
| `isInvalid` | `boolean` | — |

```tsx
// Default outline input
<Input placeholder="Enter name..." />

// With search icon
<Input
  variant="outline"
  size="medium"
  iconStart={<Search className="size-4" />}
  placeholder="Search..."
/>

// Invalid state
<Input isInvalid placeholder="Required field" />

// Filled darker (for use on light backgrounds)
<Input variant="filledDarker" placeholder="Darker fill" />
```

**Do**:
- Use `outline` (default) for most form contexts
- Use `filledDarker` when the input sits on a `neutral-background-1` surface and needs contrast
- Provide `iconStart` for search/filter inputs

**Don't**:
- Don't use raw `<input>` elements — use `<Input>` for consistent styling
- Don't set icon sizes manually — wrap icons in the `iconStart`/`iconEnd` slots

### Card

**Source**: `src/components/ui/card.tsx`

Compound component — compose from sub-components:

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>
    <CardDescription>Brief description of this section.</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    <Button variant="primary" color="confirm">Save</Button>
  </CardFooter>
</Card>
```

- Cards use `bg-neutral-background-1-rest` with `border-neutral-stroke-1-rest`
- Sub-components are optional — use only what you need
- Override padding via `className` on individual sub-components

### Badge

**Source**: `src/components/ui/badge.tsx`

```tsx
import { Badge } from "@/components/ui/badge";
```

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `success`, `warning`, `danger`, `info`, `neutral` | `neutral` |
| `size` | `sm`, `md` | `md` |
| `dot` | `boolean` | — |

Map badge variants to semantic meaning:

| Variant | Use for |
|---------|---------|
| `success` | Completed, active, healthy, connected |
| `warning` | Pending, degraded, needs attention |
| `danger` | Failed, error, disconnected, critical |
| `info` | Informational labels, new, beta |
| `neutral` | Default labels, categories, metadata |

```tsx
<Badge variant="success" dot>Active</Badge>
<Badge variant="danger" size="sm">Failed</Badge>
<Badge variant="neutral">v2.1.0</Badge>
```

### Separator

**Source**: `src/components/ui/separator.tsx`

```tsx
import { Separator } from "@/components/ui/separator";

// Horizontal (default) — full-width divider
<Separator />

// Vertical — inline divider
<Separator orientation="vertical" className="h-6" />
```

Uses `bg-neutral-stroke-2-rest` for the line color.

### Adding New Components

Force UI components are installed from the local registry. The Force UI docs server must be running:

```bash
# 1. Start the Force UI docs server (separate terminal)
cd c:/dev/Perforce/force-ui/docs && pnpm dev

# 2. Install a component
npx shadcn@latest add http://localhost:4321/react/r/components/<component-name>.json
```

After installing, update this document with the new component's usage guide.

---

## 3. Layout Patterns

### App Shell

**Used in**: frontend
**Source**: `src/components/Layout.tsx`

The standard app layout is a full-viewport flex container with three zones:

```
┌──────────────────────────────────────────────┐
│  Header (h-12, bg-neutral-background-3-rest) │
├────────────┬─────────────────────────────────┤
│            │                                 │
│  Sidebar   │  Main Content                   │
│  (w-56)    │  (flex-1, rounded card)         │
│            │                                 │
│            │                                 │
└────────────┴─────────────────────────────────┘
```

Key token assignments:

| Zone | Background | Border |
|------|-----------|--------|
| Header | `bg-neutral-background-3-rest` | — |
| Sidebar | `bg-neutral-background-3-rest` | — |
| Main content wrapper | `bg-neutral-background-3-rest` (gap color) | — |
| Main content card | `bg-neutral-background-1-rest` | `border-neutral-stroke-2-rest` |

```tsx
// Layout.tsx structure
<div className="flex h-screen flex-col bg-neutral-background-3-rest">
  <Header />
  <div className="flex min-h-0 flex-1">
    <Sidebar />
    <main className="flex min-h-0 flex-1 flex-col pb-2 pr-2">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-neutral-stroke-2-rest bg-neutral-background-1-rest">
        <Outlet />
      </div>
    </main>
  </div>
</div>
```

**Do**:
- Keep the shell chrome on `neutral-background-3-rest`
- Render page content inside the rounded `neutral-background-1-rest` card
- Use `min-h-0` on flex children to allow content scrolling without layout overflow

**Don't**:
- Don't set `overflow-auto` on the outer shell — only on the inner content card
- Don't change the shell background tokens without updating all three zones together

### Header Bar

**Used in**: frontend
**Source**: `src/components/Header.tsx`

Fixed `h-12` bar with product branding on the left and action buttons on the right.

```tsx
// Header icon buttons — tertiary-style with hover
<button
  className="rounded-md p-1.5 text-neutral-foreground-2-rest transition-colors hover:bg-neutral-background-3-hover"
  aria-label="Settings"
>
  <Settings className="size-4" />
</button>
```

Pattern for header icon buttons:
- Base: `text-neutral-foreground-2-rest`
- Hover: `hover:bg-neutral-background-3-hover`
- Size: `p-1.5` padding, `size-4` icons
- Always include `aria-label`

### Sidebar Navigation

**Used in**: frontend
**Source**: `src/components/Sidebar.tsx`

Navigation items are defined as a data array and rendered as `<Link>` elements with active state detection:

```tsx
const navItems = [
  { to: "/", icon: Home, label: "Overview" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

// Active state detection
const isActive =
  to === "/"
    ? location.pathname === "/"
    : location.pathname.startsWith(to);
```

Active/inactive token mapping:

| State | Background | Text |
|-------|-----------|------|
| Active | `bg-neutral-background-1-selected` | `text-neutral-foreground-1-rest` + `font-medium` |
| Inactive | (none) | `text-neutral-foreground-2-rest` |
| Inactive hover | `bg-neutral-background-1-hover` | (inherits) |

```tsx
<Link
  to={to}
  className={cn(
    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
    isActive
      ? "bg-neutral-background-1-selected font-medium text-neutral-foreground-1-rest"
      : "text-neutral-foreground-2-rest hover:bg-neutral-background-1-hover",
  )}
>
  <Icon className="size-4" />
  {label}
</Link>
```

**Do**:
- Use `location.pathname.startsWith(to)` for parent route matching
- Use exact match (`===`) for the root `/` route
- Keep nav items as a data array for easy extension

---

## 4. Page Patterns

> These are stub sections. Document each pattern fully when it is first implemented in the project. Use the [Pattern Template](#appendix-pattern-template) format.

### Standard Page Layout

*Document when first implemented.*

A page rendered inside the app shell content area with a consistent header (title, description, actions) and scrollable body.

Token hints: `text-700` for page title, `text-neutral-foreground-2-rest` for description, `p-6` for page padding.

### Master / Detail

*Document when first implemented.*

A collection view (grid or list of cards) where clicking an item navigates to a detail route (`/resource/:id`). The detail page has a back button, title, and content area.

Token hints: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` for gallery grid.

### List / Detail Split Pane

*Document when first implemented.*

A two-panel layout where a scrollable list on the left selects an item shown in a detail pane on the right. Consider the Force UI `resizable` component for adjustable split.

### Empty States

*Document when first implemented.*

Centered flex container with icon, heading, description, and optional CTA button. Shown when a collection has no items.

Token hints: `text-neutral-foreground-2-rest` for description, `text-neutral-foreground-3-rest` for icon color.

### Loading States

*Document when first implemented.*

Two patterns to document:
1. **Spinner + label**: animated spinner icon with "Loading..." text
2. **Skeleton**: use the `.skeleton-wave` utility class from `force-ui.css` for placeholder shapes

Token hints: `text-neutral-foreground-3-rest` for loading text. Skeleton uses `neutral-background-stencil-1-rest` / `stencil-2-rest` automatically.

### Error States

*Document when first implemented.*

Inline banner for page-level errors with dismiss action.

Token hints: `bg-status-danger-background-1-rest`, `text-status-danger-foreground-1-rest` for the banner. Dismiss button as tertiary text link.

---

## 5. Interaction Patterns

> These are stub sections. Document each pattern fully when it is first implemented in the project. Use the [Pattern Template](#appendix-pattern-template) format.

### Modals / Dialogs

*Document when first implemented.*

Install the `dialog` component from the Force UI registry. Use for confirmation prompts (destructive actions) and short form flows.

### Toast Notifications

*Document when first implemented.*

Install the `sonner` / `toast` component from the Force UI registry. Use for transient feedback after actions (save success, delete confirmation, error alerts).

### Forms

*Document when first implemented.*

Document the standard form structure: label + input + error message, submission handling, disabled states during async operations, and keyboard interaction (Enter to submit, Shift+Enter for newline in textareas).

---

## 6. Utilities & Conventions

### cn() Utility

Always use `cn()` from `@/lib/utils` for composing Tailwind classes. It merges `clsx` (conditionals) with `tailwind-merge` (deduplication):

```tsx
import { cn } from "@/lib/utils";

className={cn(
  "base-classes px-3 py-2 rounded-md",
  isActive && "bg-neutral-background-1-selected",
  isDisabled && "opacity-50 cursor-not-allowed",
  className, // always spread incoming className last
)}
```

**Do**:
- Always pass the component's `className` prop last so consumers can override
- Use boolean expressions (`condition && "class"`) not ternaries for simple on/off

**Don't**:
- Don't concatenate class strings manually — always use `cn()`
- Don't use `style=\{\{...\}\}` for anything achievable with Tailwind classes

### Dark Mode

Dark mode is handled **automatically** by the Force UI token system. When the `.dark` class is present on `<html>`, all CSS variables swap to their dark-mode values.

- **No `dark:` prefixes needed** in component code — tokens adapt automatically
- Theme is toggled via `useThemeStore` from `@/stores/themeStore`
- Theme preference is persisted to `localStorage` under the key `starter-theme`

```tsx
import { useThemeStore } from "@/stores/themeStore";

const { theme, toggleTheme, setTheme } = useThemeStore();
```

### Spacing Conventions

Standard spacing values used across the starter:

| Context | Value |
|---------|-------|
| Page padding | `p-6` |
| Card internal padding (CardContent, etc.) | `px-6` |
| Section gap (between cards/sections) | `gap-4` or `gap-6` |
| Sidebar nav item padding | `px-3 py-2` |
| Button icon gap | `gap-1` (sm), `gap-1.5` (md/lg) |
| Header height | `h-12` |
| Sidebar width | `w-56` |

### Responsive Breakpoints

Use Tailwind's mobile-first breakpoints:

| Breakpoint | Min width | Usage |
|------------|-----------|-------|
| (default) | — | Mobile / single column |
| `md:` | 768px | Two-column layouts |
| `lg:` | 1024px | Three-column grids, full desktop layout |

---

## Appendix: Pattern Template

Use this template when adding a new fully-documented pattern:

````markdown
### Pattern Name

**Used in**: frontend | backend | all apps

Brief description of when and why to use this pattern.

**When to use**:
- Scenario 1
- Scenario 2

**Example**:

```tsx
// Code example showing the pattern
```

**Tokens used**:
- `bg-...` — purpose
- `text-...` — purpose

**Do**:
- Guideline 1
- Guideline 2

**Don't**:
- Anti-pattern 1
- Anti-pattern 2
````

Use this template when adding a stub for a pattern not yet implemented:

````markdown
### Pattern Name

*Document when first implemented.*

One-line description of the pattern's purpose.

Token hints: relevant tokens to use when implementing.
````
