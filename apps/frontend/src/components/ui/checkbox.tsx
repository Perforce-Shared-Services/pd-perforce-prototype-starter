import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary",
        "peer aspect-square size-4 shrink-0 rounded-[4px] border border-neutral-stroke-accessible-rest text-primary outline-none ring-offset-1 transition-[color,box-shadow]",
        'has-[&[data-state="checked"]]:bg-primary',
        "hover:border-neutral-stroke-accessible-hover hover:bg-neutral-background-1-hover",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:ring-2 aria-invalid:ring-status-danger-stroke-2-rest",
        "disabled:cursor-not-allowed disabled:border-neutral-stroke-transparent-disabled-rest disabled:bg-neutral-background-disabled-rest disabled:opacity-50",
        className
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-current transition-none"
        data-slot="checkbox-indicator"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
