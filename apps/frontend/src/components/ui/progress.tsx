import { cva } from "class-variance-authority";

export const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-neutral-background-6-rest",
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        md: "h-0.5",
        lg: "h-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      status: {
        default: "bg-primary",
        success: "bg-status-success-foreground-1-rest",
        warning: "bg-status-warning-foreground-1-rest",
        danger: "bg-status-danger-foreground-1-rest",
      },
      animationStyle: {
        static: "",
        animated: "animate-progress-determinate",
        indeterminate:
          "animate-progress-indeterminate bg-linear-to-r bg-transparent from-transparent to-transparent",
      },
    },
    defaultVariants: {
      status: "default",
      animationStyle: "static",
    },
    compoundVariants: [
      {
        animationStyle: "indeterminate",
        status: "default",
        class: "via-primary",
      },
      {
        animationStyle: "indeterminate",
        status: "success",
        class: "via-status-success-foreground-1-rest",
      },
      {
        animationStyle: "indeterminate",
        status: "warning",
        class: "via-status-warning-foreground-1-rest",
      },
      {
        animationStyle: "indeterminate",
        status: "danger",
        class: "via-status-danger-foreground-1-rest",
      },
    ],
  }
);

export type ProgressVariantProps = Parameters<typeof progressVariants>[0];
export type ProgressIndicatorVariantProps = Parameters<
  typeof progressIndicatorVariants
>[0];

import { Indicator, Root } from "@radix-ui/react-progress";
import type * as React from "react";
import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  variant,
  size,
  ...props
}: ProgressProps) {
  return (
    <Root
      className={cn(progressVariants({ variant, size, className }))}
      data-slot="progress"
      {...props}
    >
      {props.children}
    </Root>
  );
}

type ProgressProps = React.ComponentProps<typeof Root> & ProgressVariantProps;

type ProgressIndicatorProps = {
  value?: number;
} & React.ComponentProps<typeof Indicator> &
  ProgressIndicatorVariantProps;

const PROGRESS_MAX_PERCENTAGE = 100;

function ProgressIndicator({
  className,
  value,
  status,
  animationStyle,
  ...props
}: ProgressIndicatorProps) {
  const isIndeterminate = animationStyle === "indeterminate";
  const displayValue = isIndeterminate ? PROGRESS_MAX_PERCENTAGE : value;

  return (
    <Indicator
      className={cn(
        progressIndicatorVariants({ status, animationStyle, className }),
        className
      )}
      data-slot="progress-indicator"
      style={{
        transform: `translateX(-${PROGRESS_MAX_PERCENTAGE - (displayValue || 0)}%)`,
      }}
      {...props}
    />
  );
}

Progress.Indicator = ProgressIndicator;

export { Progress, ProgressIndicator };
