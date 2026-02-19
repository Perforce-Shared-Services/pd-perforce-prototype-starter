import { cva } from "class-variance-authority";

export const skeletonVariants = cva(
  "rounded-md bg-neutral-background-stencil-1-rest",
  {
    variants: {
      animation: {
        wave: "skeleton-wave",
        pulse: "animate-pulse",
      },
    },
    defaultVariants: {
      animation: "wave",
    },
  }
);

export type SkeletonVariantProps = Parameters<typeof skeletonVariants>[0];

import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

export type SkeletonProps = React.ComponentProps<"div"> &
  VariantProps<typeof skeletonVariants>;

function Skeleton({ className, animation, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ animation }), className)}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };
