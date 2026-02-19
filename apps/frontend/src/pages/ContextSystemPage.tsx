import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageBar } from "@/components/ui/message-bar";
import {
  FilePlus2,
  List,
  BookOpen,
  RefreshCw,
  FolderTree,
  FileText,
  Lightbulb,
  Terminal,
} from "lucide-react";

const skills = [
  {
    name: "/context-create",
    icon: FilePlus2,
    args: "<type> <title>",
    description:
      "Create a new context document with proper naming conventions and templates.",
    types: ["decision", "research", "plan", "feedback", "architecture"],
    example: '/context-create decision choosing-chart-library',
  },
  {
    name: "/context-list",
    icon: List,
    args: "",
    description:
      "List all project context documents organized by category, with dates and statuses.",
    types: [],
    example: "/context-list",
  },
  {
    name: "/context-briefing",
    icon: BookOpen,
    args: "",
    description:
      "Generate a comprehensive briefing of the current project state by reading all context documents. Great for session starts or onboarding.",
    types: [],
    example: "/context-briefing",
  },
  {
    name: "/context-update",
    icon: RefreshCw,
    args: "<document-name>",
    description:
      "Update a living document with new information. Use after implementing new patterns, making scope changes, or when documents need to reflect current state.",
    types: [],
    example: "/context-update UI-PATTERNS",
  },
];

const documentTypes = [
  {
    type: "Living Documents",
    badge: { color: "brand" as const, label: "Edited in-place" },
    description:
      "Core project documents that evolve over time. Git history tracks changes — no dated copies needed.",
    items: [
      {
        name: "CLAUDE.md",
        location: "Root",
        purpose: "Development guide, tech stack, conventions, and commands",
      },
      {
        name: "project-goal.md",
        location: "Root",
        purpose: "Project vision, scope, and target users",
      },
      {
        name: "UI-PATTERNS.md",
        location: "Root",
        purpose: "Force UI usage patterns, tokens, and component guidelines",
      },
      {
        name: "Architecture docs",
        location: "docs/architecture/",
        purpose: "System design docs that evolve with the project",
      },
      {
        name: "docs/README.md",
        location: "docs/",
        purpose: "Index of all context documents",
      },
    ],
  },
  {
    type: "Point-in-Time Documents",
    badge: { color: "blue" as const, label: "Date-prefixed, append-only" },
    description:
      'Timestamped records that capture a moment. Named with a YYYY-MM-DD prefix (e.g., "2026-02-19-choosing-chart-library.md").',
    items: [
      {
        name: "Decision records",
        location: "docs/decisions/",
        purpose:
          "Significant technical choices — context, options considered, and consequences",
      },
      {
        name: "Research notes",
        location: "docs/research/",
        purpose:
          "Investigation findings — what was explored, what was learned",
      },
      {
        name: "Implementation plans",
        location: "docs/plans/",
        purpose: "Step-by-step plans with goals, dependencies, and success criteria",
      },
      {
        name: "Feedback notes",
        location: "docs/feedback/",
        purpose: "Review sessions — participants, feedback, and action items",
      },
    ],
  },
];

export default function ContextSystemPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-700 font-semibold text-neutral-foreground-1-rest">
          Context System
        </h1>
        <p className="mt-1 text-300 text-neutral-foreground-2-rest">
          This starter includes a structured context management system for
          project documentation. It keeps Claude Code aligned across sessions
          using living documents and point-in-time records.
        </p>
      </div>

      <Separator className="mb-6" />

      {/* How It Works */}
      <section className="mb-8">
        <h2 className="text-500 mb-3 font-semibold text-neutral-foreground-1-rest">
          How It Works
        </h2>
        <p className="text-300 mb-4 text-neutral-foreground-2-rest">
          The context system uses a two-tier model to organize project knowledge:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="py-4">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-brand-background-2-rest">
                  <FileText className="size-5 text-brand-foreground-2-rest" />
                </div>
                <Badge variant="tint" color="brand" size="sm" shape="circular">
                  Living
                </Badge>
              </div>
              <CardTitle>Living Documents</CardTitle>
              <CardDescription>
                Edited in-place as the project evolves. No date prefix — git
                history tracks changes over time.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="py-4">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-brand-background-2-rest">
                  <FolderTree className="size-5 text-brand-foreground-2-rest" />
                </div>
                <Badge variant="tint" color="blue" size="sm" shape="circular">
                  Point-in-Time
                </Badge>
              </div>
              <CardTitle>Point-in-Time Documents</CardTitle>
              <CardDescription>
                Date-prefixed snapshots that capture a moment. Append follow-up
                notes rather than rewriting content.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Document Types */}
      {documentTypes.map((category) => (
        <section key={category.type} className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-500 font-semibold text-neutral-foreground-1-rest">
              {category.type}
            </h2>
            <Badge
              variant="tint"
              color={category.badge.color}
              size="sm"
              shape="circular"
            >
              {category.badge.label}
            </Badge>
          </div>
          <p className="text-300 mb-4 text-neutral-foreground-2-rest">
            {category.description}
          </p>
          <Card className="py-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Purpose</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.items.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <code className="rounded bg-neutral-background-3-rest px-1.5 py-0.5 text-200 text-neutral-foreground-2-rest">
                        {item.location}
                      </code>
                    </TableCell>
                    <TableCell className="text-neutral-foreground-2-rest">
                      {item.purpose}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
      ))}

      <Separator className="mb-6" />

      {/* Skills / Commands */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Terminal className="size-5 text-neutral-foreground-2-rest" />
          <h2 className="text-500 font-semibold text-neutral-foreground-1-rest">
            Slash Commands
          </h2>
        </div>
        <p className="text-300 mb-4 text-neutral-foreground-2-rest">
          These slash commands are available in Claude Code sessions. Type them
          directly in the chat to invoke the corresponding skill.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <Card key={skill.name} className="py-4">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-brand-background-2-rest">
                      <Icon className="size-5 text-brand-foreground-2-rest" />
                    </div>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <code className="text-400">{skill.name}</code>
                    {skill.args && (
                      <span className="text-200 font-normal text-neutral-foreground-3-rest">
                        {skill.args}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{skill.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="rounded-md bg-neutral-background-3-rest px-3 py-2">
                    <code className="text-200 text-neutral-foreground-2-rest">
                      {skill.example}
                    </code>
                  </div>
                  {skill.types.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {skill.types.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          color="gray"
                          size="sm"
                          shape="circular"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator className="mb-6" />

      {/* File Structure */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <FolderTree className="size-5 text-neutral-foreground-2-rest" />
          <h2 className="text-500 font-semibold text-neutral-foreground-1-rest">
            Directory Structure
          </h2>
        </div>
        <Card className="py-0">
          <CardContent className="p-4">
            <pre className="text-200 leading-relaxed text-neutral-foreground-2-rest">
{`your-project/
├── CLAUDE.md                 # Dev guide (living)
├── project-goal.md           # Vision & scope (living)
├── UI-PATTERNS.md            # UI patterns (living)
│
├── docs/
│   ├── README.md             # Document index (living)
│   ├── architecture/         # System design (living)
│   │   └── data-model.md
│   ├── decisions/            # Technical choices (point-in-time)
│   │   └── 2026-02-19-choosing-chart-library.md
│   ├── research/             # Investigations (point-in-time)
│   ├── plans/                # Implementation plans (point-in-time)
│   └── feedback/             # Review notes (point-in-time)
│
└── .claude/
    ├── rules/
    │   └── context-system.md # Auto-loaded rules
    └── skills/
        ├── context-create/
        ├── context-list/
        ├── context-briefing/
        └── context-update/`}
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Tips */}
      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="size-5 text-neutral-foreground-2-rest" />
          <h2 className="text-500 font-semibold text-neutral-foreground-1-rest">
            Tips
          </h2>
        </div>
        <div className="max-w-2xl space-y-3">
          <MessageBar variant="info">
            <MessageBar.Title>Start each session right</MessageBar.Title>
            <MessageBar.Description>
              Run <code className="font-semibold">/context-briefing</code> at
              the start of a session to get up to speed on the project state.
            </MessageBar.Description>
          </MessageBar>
          <MessageBar variant="info">
            <MessageBar.Title>Keep the index updated</MessageBar.Title>
            <MessageBar.Description>
              After creating any document in <code>docs/</code>, always update{" "}
              <code>docs/README.md</code>. The{" "}
              <code className="font-semibold">/context-create</code> skill does
              this automatically.
            </MessageBar.Description>
          </MessageBar>
          <MessageBar variant="warning">
            <MessageBar.Title>Don't rewrite point-in-time docs</MessageBar.Title>
            <MessageBar.Description>
              Point-in-time documents are append-only. If a decision is
              superseded, update its status and link to the new document instead
              of editing the original content.
            </MessageBar.Description>
          </MessageBar>
        </div>
      </section>
    </div>
  );
}
