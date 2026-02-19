import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap font-semibold",
    "[&>svg]:pointer-events-none",
    "cursor-pointer overflow-hidden border transition-colors disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
  ],
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        tertiary: "",
      },
      color: {
        confirm: "",
        default: "",
        danger: "",
      },
      size: {
        sm: "gap-1 px-2 py-0.5 text-200 [&>svg]:size-4",
        md: "gap-1.5 px-3 py-1.5 text-300 [&>svg]:size-5",
        lg: "gap-1.5 px-4 py-2 text-400 [&>svg]:size-6",
      },
      iconOnly: {
        true: "",
      },
      shape: {
        circular: "rounded-full",
        rounded: "rounded-md",
        square: "rounded-none",
      },
    },
    compoundVariants: [
      // Confirm Primary
      {
        variant: "primary",
        color: "confirm",
        className: [
          "border-brand-stroke-1-rest bg-brand-background-1-rest text-brand-foreground-1-rest",
          "hover:border-brand-stroke-1-hover hover:bg-brand-background-1-hover hover:text-brand-foreground-1-hover",
          "active:border-brand-stroke-1-pressed active:bg-brand-background-1-pressed active:text-brand-foreground-1-pressed",
          "disabled:border-neutral-stroke-disabled-rest disabled:bg-neutral-background-disabled-rest disabled:text-neutral-foreground-disabled-rest",
        ],
      },
      {
        variant: "secondary",
        color: "confirm",
        className: [
          "border-brand-stroke-2-rest bg-brand-background-2-rest text-brand-foreground-2-rest",
          "hover:border-brand-stroke-2-hover hover:bg-brand-background-2-hover hover:text-brand-foreground-2-hover",
          "active:border-brand-stroke-2-pressed active:bg-brand-background-2-pressed active:text-brand-foreground-2-pressed",
          "disabled:border-neutral-stroke-disabled-rest disabled:bg-neutral-background-disabled-rest disabled:text-neutral-foreground-disabled-rest",
        ],
      },
      // Default Primary
      {
        variant: "primary",
        color: "default",
        className: [
          "border-neutral-stroke-transparent-rest bg-neutral-background-3-rest text-neutral-foreground-3-rest",
          "hover:border-neutral-stroke-transparent-hover hover:bg-neutral-background-3-hover hover:text-neutral-foreground-3-hover",
          "active:border-neutral-stroke-transparent-pressed active:bg-neutral-background-3-pressed active:text-neutral-foreground-3-pressed",
          "disabled:border-neutral-stroke-disabled-rest disabled:bg-neutral-background-disabled-rest disabled:text-neutral-foreground-disabled-rest",
        ],
      },
      {
        variant: "secondary",
        color: "default",
        className: [
          "border-neutral-stroke-alpha-1-rest bg-neutral-background-transparent-rest text-neutral-foreground-1-rest",
          "hover:border-neutral-stroke-alpha-1-hover hover:bg-neutral-background-1-hover hover:text-neutral-foreground-1-hover",
          "active:border-neutral-stroke-alpha-1-pressed active:bg-neutral-background-1-pressed active:text-neutral-foreground-1-pressed",
          "disabled:border-neutral-stroke-disabled-rest disabled:bg-neutral-background-disabled-rest disabled:text-neutral-foreground-disabled-rest",
        ],
      },
      {
        variant: "tertiary",
        color: "default",
        className: [
          "border-neutral-stroke-transparent-rest bg-neutral-background-transparent-rest text-neutral-foreground-1-rest",
          "hover:border-neutral-stroke-transparent-hover hover:bg-neutral-background-subtle-lightAlpha-hover hover:text-neutral-foreground-1-hover",
          "active:border-neutral-stroke-transparent-pressed active:bg-neutral-background-subtle-lightAlpha-pressed active:text-neutral-foreground-1-pressed",
          "disabled:border-neutral-stroke-disabled-rest disabled:bg-neutral-background-disabled-rest disabled:text-neutral-foreground-disabled-rest",
        ],
      },
      // Danger Primary
      {
        variant: "primary",
        color: "danger",
        className: [
          "border-status-danger-stroke-2-rest bg-status-danger-background-2-rest text-status-danger-foreground-2-rest",
          "hover:border-status-danger-stroke-2-hover hover:bg-status-danger-background-2-hover hover:text-status-danger-foreground-2-hover",
          "active:border-status-danger-stroke-2-pressed active:bg-status-danger-background-2-pressed active:text-status-danger-foreground-2-pressed",
          "disabled:border-neutral-stroke-disabled-rest disabled:bg-neutral-background-disabled-rest disabled:text-neutral-foreground-disabled-rest",
        ],
      },
      // Icon-only size adjustments
      {
        iconOnly: true,
        size: "sm",
        className: "p-0.5",
      },
      {
        iconOnly: true,
        size: "md",
        className: "p-1.5",
      },
      {
        iconOnly: true,
        size: "lg",
        className: "p-2",
      },
    ],
    defaultVariants: {
      shape: "rounded",
      variant: "primary",
      color: "default",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant = "primary",
  color = "default",
  size,
  shape,
  iconOnly,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, shape, iconOnly, color }),
        className,
      )}
      {...props}
    />
  );
}

export { Button };
