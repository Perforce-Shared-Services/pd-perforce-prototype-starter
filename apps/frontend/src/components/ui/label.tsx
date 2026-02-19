import * as LabelPrimitive from "@radix-ui/react-label";
import type * as React from "react";
import { cn } from "@/lib/utils";

export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root>;

function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "flex select-none items-center gap-2 text-300",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:text-neutral-foreground-disabled-rest",
        "peer-disabled:cursor-not-allowed peer-disabled:text-neutral-foreground-disabled-rest",
        className
      )}
      data-slot="label"
      {...props}
    />
  );
}

export { Label };
