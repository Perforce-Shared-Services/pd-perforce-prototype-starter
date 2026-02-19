import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Table2,
  FileText,
  Eye,
  Puzzle,
  ArrowRight,
} from "lucide-react";

const examplePages = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
    description:
      "Stat cards, filter tabs, and responsive card grids for overview pages.",
  },
  {
    to: "/data-table",
    icon: Table2,
    title: "Data Table",
    description:
      "Tabular data with search filtering, row actions, and status indicators.",
  },
  {
    to: "/form",
    icon: FileText,
    title: "Form",
    description:
      "Form layouts with inputs, selects, switches, checkboxes, and validation patterns.",
  },
  {
    to: "/detail",
    icon: Eye,
    title: "Detail View",
    description:
      "Breadcrumbs, tabbed content, metadata sidebar, and loading state patterns.",
  },
  {
    to: "/components",
    icon: Puzzle,
    title: "Component Showcase",
    description:
      "Browse all installed Force UI components with interactive examples.",
  },
];

export default function HomePage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-700 font-semibold text-neutral-foreground-1-rest">
          Prototype Starter
        </h1>
        <p className="mt-1 text-300 text-neutral-foreground-2-rest">
          A fully configured starting point for Perforce prototypes with the
          Force UI design system. Explore the example pages below for layout
          patterns you can copy and adapt.
        </p>
      </div>

      <Separator className="mb-6" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {examplePages.map(({ to, icon: Icon, title, description }) => (
          <Link key={to} to={to} className="group">
            <Card className="h-full py-4 transition-colors hover:border-brand-stroke-1-rest">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-brand-background-2-rest">
                    <Icon className="size-5 text-brand-foreground-2-rest" />
                  </div>
                  <ArrowRight className="size-4 text-neutral-foreground-3-rest opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
