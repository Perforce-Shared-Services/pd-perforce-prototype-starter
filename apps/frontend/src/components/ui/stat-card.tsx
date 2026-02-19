import type * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "flat";
  className?: string;
}

const trendConfig = {
  up: {
    icon: TrendingUp,
    className: "text-status-success-foreground-1-rest",
  },
  down: {
    icon: TrendingDown,
    className: "text-status-danger-foreground-1-rest",
  },
  flat: { icon: Minus, className: "text-neutral-foreground-3-rest" },
} as const;

function StatCard({
  icon,
  label,
  value,
  subtitle,
  trend,
  className,
}: StatCardProps) {
  const TrendIcon = trend ? trendConfig[trend].icon : null;
  const trendClassName = trend ? trendConfig[trend].className : undefined;

  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-stroke-1-rest bg-neutral-background-2-rest p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-200 text-neutral-foreground-2-rest">{label}</span>
        <span className="text-neutral-foreground-3-rest">{icon}</span>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-600 font-semibold text-neutral-foreground-1-rest">
          {value}
        </span>
        {TrendIcon && (
          <TrendIcon className={cn("mb-0.5 size-4", trendClassName)} />
        )}
      </div>
      {subtitle && (
        <p className="mt-1 text-200 text-neutral-foreground-3-rest">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { StatCard };
export type { StatCardProps };
