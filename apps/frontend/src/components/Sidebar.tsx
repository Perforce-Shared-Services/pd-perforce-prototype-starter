import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  LayoutDashboard,
  Table2,
  FileText,
  Eye,
  Puzzle,
  Info,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/data-table", icon: Table2, label: "Data Table" },
  { to: "/form", icon: FileText, label: "Form" },
  { to: "/detail", icon: Eye, label: "Detail View" },
  { to: "/components", icon: Puzzle, label: "Components" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex w-56 shrink-0 flex-col bg-neutral-background-3-rest text-neutral-foreground-1-rest">
      <nav className="space-y-0.5 p-2">
        <span className="mb-1 block px-3 pt-1 text-100 font-medium tracking-wider text-neutral-foreground-3-rest uppercase">
          Examples
        </span>
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);

          return (
            <Link
              key={to}
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
          );
        })}
      </nav>

      <div className="mt-auto">
        <Separator />
        <div className="p-3">
          <div className="rounded-lg border border-brand-stroke-2-rest bg-brand-background-2-rest p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <Info className="size-3.5 text-brand-foreground-2-rest" />
              <span className="text-200 font-medium text-brand-foreground-2-rest">
                Getting started
              </span>
            </div>
            <p className="text-100 text-brand-foreground-2-rest opacity-80">
              Edit pages in src/pages/ and add Force UI components via the shadcn
              CLI.
            </p>
          </div>
        </div>
        <div className="px-4 pb-3">
          <span className="text-100 text-neutral-foreground-4-rest">
            v0.1.0
          </span>
        </div>
      </div>
    </aside>
  );
}
