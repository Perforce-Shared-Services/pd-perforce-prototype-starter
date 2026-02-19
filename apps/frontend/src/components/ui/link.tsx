import { cva } from "class-variance-authority";

export const linkVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap font-semibold",
    "[&>svg]:pointer-events-none [&>svg]:size-3",
    "overflow-hidden transition-[color,box-shadow]",
    "cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-brand-foreground-link-rest!",
          "hover:text-brand-foreground-link-hover",
          "active:text-brand-foreground-link-pressed",
          "focus:text-brand-foreground-link-selected",
          "disabled:text-neutral-foreground-disabled-rest",
        ],
        subtle: [
          "text-neutral-foreground-2-rest!",
          "hover:text-neutral-foreground-link-hover",
          "active:text-neutral-foreground-link-pressed",
          "focus:text-neutral-foreground-2-rest",
          "disabled:text-neutral-foreground-disabled-rest",
        ],
        onBrand: [
          "text-brand-foreground-link-rest!",
          "hover:text-brand-foreground-link-hover",
          "active:text-brand-foreground-link-pressed",
          "focus:text-brand-foreground-link-selected",
          "disabled:text-neutral-foreground-disabled-rest",
        ],
      },
      size: {
        sm: "text-200",
        md: "text-300",
        lg: "text-400",
      },
      underline: {
        none: "no-underline",
        hover: "no-underline hover:underline",
        always: "underline",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      underline: "hover",
    },
  }
);

export type LinkVariantProps = Parameters<typeof linkVariants>[0];

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

export type LinkProps = React.ComponentProps<"a"> &
  VariantProps<typeof linkVariants> & {
    asChild?: boolean;
  };

function Link({
  className,
  variant,
  size,
  underline,
  asChild = false,
  ...props
}: LinkProps) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      className={cn(
        linkVariants({ variant, size, underline, className }),
        className
      )}
      data-size={size}
      data-slot="link"
      data-variant={variant}
      {...props}
    />
  );
}

export { Link };
