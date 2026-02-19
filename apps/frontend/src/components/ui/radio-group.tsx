import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "peer aspect-square size-4 shrink-0 rounded-full border border-neutral-stroke-accessible-rest text-primary outline-none ring-offset-1 transition-[color,box-shadow]",
        'has-[&[data-state="checked"]]:bg-primary',
        "hover:border-neutral-stroke-accessible-hover hover:bg-neutral-background-1-hover",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:ring-2 aria-invalid:ring-status-danger-stroke-2-rest",
        "disabled:cursor-not-allowed disabled:border-neutral-stroke-transparent-disabled-rest disabled:bg-neutral-background-disabled-rest disabled:opacity-50",
        className
      )}
      data-slot="radio-group-item"
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className="relative flex items-center justify-center"
        data-slot="radio-group-indicator"
      >
        <CircleIcon className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-2 fill-neutral-foreground-static-inverted-rest" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
