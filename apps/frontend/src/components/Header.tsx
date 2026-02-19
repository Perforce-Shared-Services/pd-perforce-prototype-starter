import { Sun, Moon, Settings, HelpCircle } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";

export default function Header() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="flex h-12 shrink-0 items-center justify-between bg-neutral-background-3-rest px-4">
      {/* Left: Product name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-background-1-rest">
            <span className="text-100 font-bold text-brand-foreground-1-rest">
              P
            </span>
          </div>
          <span className="text-300 font-semibold text-neutral-foreground-1-rest">
            Prototype Starter
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={toggleTheme}
          className="rounded-md p-1.5 text-neutral-foreground-2-rest transition-colors hover:bg-neutral-background-3-hover"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </button>
        <button
          className="rounded-md p-1.5 text-neutral-foreground-2-rest transition-colors hover:bg-neutral-background-3-hover"
          aria-label="Help"
        >
          <HelpCircle className="size-4" />
        </button>
        <button
          className="rounded-md p-1.5 text-neutral-foreground-2-rest transition-colors hover:bg-neutral-background-3-hover"
          aria-label="Settings"
        >
          <Settings className="size-4" />
        </button>
        <div className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-background-1-rest">
          <span className="text-100 font-medium text-brand-foreground-1-rest">
            U
          </span>
        </div>
      </div>
    </header>
  );
}
