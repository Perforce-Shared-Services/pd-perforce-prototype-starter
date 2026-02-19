import { cva } from "class-variance-authority";

export const tooltipVariants = cva(
  "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit max-w-[240px] origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md px-3 py-1.5 text-200 text-xs shadow data-[state=closed]:animate-out",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-background-inverted-rest text-neutral-foreground-static-inverted-rest",
        inverted: "bg-neutral-background-1-rest text-neutral-foreground-1-rest",
        brand: "bg-brand-background-1-rest text-brand-foreground-1-rest",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const tooltipArrowVariants = cva(
  "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-background-inverted-rest fill-neutral-background-inverted-rest",
        inverted: "bg-neutral-background-1-rest fill-neutral-background-1-rest",
        brand: "bg-brand-background-1-rest fill-brand-background-1-rest",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type TooltipVariantProps = Parameters<typeof tooltipVariants>[0];
export type TooltipArrowVariantProps = Parameters<
  typeof tooltipArrowVariants
>[0];

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
> &
  VariantProps<typeof tooltipVariants>;

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  variant = "default",
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className={cn(tooltipVariants({ variant }), className)}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={tooltipArrowVariants({ variant })} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
