import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap font-semibold",
    "gap-1 [&>svg]:pointer-events-none",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "overflow-hidden transition-[color,box-shadow]",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "[&>button]:p-0",
  ],
  {
    variants: {
      variant: {
        filled: "",
        tint: "border",
        outline: "border",
        subtle: "border-none",
      },
      color: {
        brand: "",
        danger: "",
        success: "",
        warning: "",
        dark: "",
        blue: "",
        gray: "",
      },
      size: {
        sm: "min-h-4 px-1 text-100 [&>svg]:size-3",
        md: "min-h-5 px-1 text-100 [&>svg]:size-4",
        lg: "min-h-6 px-1.5 text-200 [&>svg]:size-4",
        xl: "min-h-8 p-2 text-200 [&>svg]:size-5",
      },
      shape: {
        circular: "rounded-full",
        rounded: "rounded-md",
        square: "rounded-none",
      },
    },
    compoundVariants: [
      // Brand
      {
        variant: "filled",
        color: "brand",
        className: "bg-brand-background-1-rest text-brand-foreground-1-rest",
      },
      {
        variant: "tint",
        color: "brand",
        className:
          "border border-brand-stroke-2-contrast-rest bg-brand-background-2-rest text-brand-foreground-2-rest",
      },
      {
        variant: "outline",
        color: "brand",
        className: "border-brand-stroke-1-rest text-brand-foreground-2-rest",
      },
      {
        variant: "subtle",
        color: "brand",
        className: "text-brand-foreground-2-rest",
      },
      // Danger
      {
        variant: "filled",
        color: "danger",
        className:
          "bg-status-danger-background-2-rest text-status-danger-foreground-2-rest",
      },
      {
        variant: "tint",
        color: "danger",
        className:
          "border-status-danger-stroke-2-rest bg-status-danger-background-1-rest text-status-danger-foreground-1-rest",
      },
      {
        variant: "outline",
        color: "danger",
        className:
          "border-status-danger-stroke-1-rest text-status-danger-foreground-1-rest",
      },
      {
        variant: "subtle",
        color: "danger",
        className: "text-status-danger-foreground-1-rest",
      },
      // Success
      {
        variant: "filled",
        color: "success",
        className:
          "bg-status-success-background-2-rest text-status-success-foreground-2-rest",
      },
      {
        variant: "tint",
        color: "success",
        className:
          "border-status-success-stroke-2-rest bg-status-success-background-1-rest text-status-success-foreground-1-rest",
      },
      {
        variant: "outline",
        color: "success",
        className:
          "border-status-success-stroke-1-rest text-status-success-foreground-1-rest",
      },
      {
        variant: "subtle",
        color: "success",
        className: "text-status-success-foreground-1-rest",
      },
      // Warning
      {
        variant: "filled",
        color: "warning",
        className:
          "bg-status-warning-background-2-rest text-status-warning-foreground-2-rest",
      },
      {
        variant: "tint",
        color: "warning",
        className:
          "border-status-warning-stroke-1-rest bg-status-warning-background-1-rest text-status-warning-foreground-1-rest",
      },
      {
        variant: "outline",
        color: "warning",
        className:
          "border-status-warning-stroke-2-rest text-status-warning-foreground-1-rest",
      },
      {
        variant: "subtle",
        color: "warning",
        className: "text-status-warning-foreground-1-rest",
      },
      // Dark
      {
        variant: "filled",
        color: "dark",
        className:
          "bg-neutral-foreground-1-rest text-neutral-background-1-rest",
      },
      {
        variant: "tint",
        color: "dark",
        className:
          "border-neutral-stroke-accessible-rest bg-neutral-foreground-2-rest text-neutral-background-2-rest",
      },
      {
        variant: "outline",
        color: "dark",
        className:
          "border-neutral-stroke-accessible-rest text-neutral-foreground-3-rest",
      },
      {
        variant: "subtle",
        color: "dark",
        className: "text-neutral-foreground-3-rest",
      },
      // Blue
      {
        variant: "filled",
        color: "blue",
        className:
          "bg-status-informational-background-2-rest text-status-informational-foreground-1-rest",
      },
      {
        variant: "tint",
        color: "blue",
        className:
          "border-status-informational-stroke-1-rest bg-status-informational-background-1-rest text-status-informational-foreground-1-rest",
      },
      {
        variant: "outline",
        color: "blue",
        className:
          "border-status-informational-stroke-1-rest text-status-informational-foreground-1-rest",
      },
      {
        variant: "subtle",
        color: "blue",
        className: "text-status-informational-foreground-1-rest",
      },
      // Gray
      {
        variant: "filled",
        color: "gray",
        className:
          "bg-neutral-background-5-rest text-neutral-foreground-1-rest",
      },
      {
        variant: "tint",
        color: "gray",
        className:
          "border-neutral-stroke-2-rest bg-neutral-background-2-rest text-neutral-foreground-3-rest",
      },
      {
        variant: "outline",
        color: "gray",
        className:
          "border-neutral-stroke-1-rest text-neutral-foreground-3-rest",
      },
      {
        variant: "subtle",
        color: "gray",
        className: "text-neutral-foreground-3-rest",
      },
    ],
    defaultVariants: {
      variant: "filled",
      color: "brand",
      size: "md",
      shape: "rounded",
    },
  }
);

export type BadgeVariantProps = Parameters<typeof badgeVariants>[0];

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

function Badge({
  className,
  variant,
  color,
  size,
  shape,
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      className={cn(badgeVariants({ color, size, shape, variant }), className)}
      data-slot="badge"
      {...props}
    />
  );
}

export { Badge };
