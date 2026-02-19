import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

export const inputVariants = cva(
  [
    "flex w-full min-w-0 items-center font-normal",
    "outline-none transition-colors",
    "text-neutral-foreground-1-rest",
    "placeholder-neutral-foreground-4-rest",
    "hover:bg-neutral-background-1-hover",
    "focus:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "selection:bg-brand-background-1-rest selection:text-brand-foreground-1-rest",
  ],
  {
    variants: {
      variant: {
        outline: [
          "rounded-lg border border-neutral-stroke-1-rest bg-neutral-background-1-rest",
          "focus:border-brand-stroke-1-rest focus:ring-2 focus:ring-brand-stroke-1-rest/50",
          "hover:border-neutral-stroke-1-hover",
          "disabled:border-neutral-stroke-disabled-rest disabled:bg-neutral-background-disabled-rest",
          "aria-[invalid=true]:border-status-danger-stroke-1-rest",
        ],
        filledDarker: [
          "rounded-lg border border-neutral-stroke-1-rest bg-neutral-background-3-rest",
          "focus:border-brand-stroke-1-rest focus:ring-2 focus:ring-brand-stroke-1-rest/50",
          "hover:border-neutral-stroke-1-hover",
          "disabled:border-neutral-stroke-disabled-rest disabled:bg-neutral-background-disabled-rest",
          "aria-[invalid=true]:border-status-danger-stroke-1-rest",
        ],
        filledLighter: [
          "rounded-lg border border-neutral-stroke-1-rest bg-neutral-background-1-rest",
          "focus:border-brand-stroke-1-rest focus:ring-2 focus:ring-brand-stroke-1-rest/50",
          "hover:border-neutral-stroke-1-hover",
          "disabled:border-neutral-stroke-disabled-rest disabled:bg-neutral-background-disabled-rest",
          "aria-[invalid=true]:border-status-danger-stroke-1-rest",
        ],
      },
      size: {
        small: "h-8 px-2 py-1 text-[14px] leading-[20px]",
        medium: "h-10 px-2.5 py-1.5 text-[14px] leading-[20px]",
        large: "h-12 px-3 py-2 text-[16px] leading-[24px]",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "medium",
    },
  },
);

export type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
    isInvalid?: boolean;
  };

function Input({
  className,
  variant,
  size,
  iconStart,
  iconEnd,
  isInvalid,
  ...props
}: InputProps) {
  return (
    <div className="relative flex w-full items-center">
      {iconStart && (
        <span className="absolute flex items-center pl-2 text-neutral-foreground-4-rest">
          {iconStart}
        </span>
      )}
      <input
        aria-invalid={isInvalid}
        className={cn(
          inputVariants({ variant, size }),
          iconStart ? "pl-8" : "",
          iconEnd ? "pr-8" : "",
          className,
        )}
        data-slot="input"
        disabled={props.disabled}
        {...props}
      />
      {iconEnd && (
        <span className="absolute right-2 flex items-center text-neutral-foreground-4-rest">
          {iconEnd}
        </span>
      )}
    </div>
  );
}

export { Input };
