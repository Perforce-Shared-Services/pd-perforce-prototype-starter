import { cva } from "class-variance-authority";

export const spinnerVariants = cva("inline-flex items-center gap-2", {
  variants: {
    variant: {
      default: "bg-transparent [&>svg]:text-primary",
      subtle: "text-base-white",
    },
    size: {
      tiny: "text-300 [&>svg]:size-5",
      xs: "text-300 [&>svg]:size-6",
      sm: "text-300 [&>svg]:size-7",
      md: "font-semibold text-400 [&>svg]:size-8",
      lg: "font-semibold text-400 [&>svg]:size-9",
      xl: "font-semibold text-400 [&>svg]:size-10",
      huge: "font-semibold text-500 [&>svg]:size-11",
    },
    labelPos: {
      before: "flex flex-row-reverse items-center gap-2",
      after: "flex items-center gap-2",
      top: "flex flex-col-reverse items-center gap-2",
      bottom: "flex flex-col items-center gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    labelPos: "after",
  },
});

export type SpinnerVariantProps = Parameters<typeof spinnerVariants>[0];

import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export function Spinner({
  className,
  variant,
  size,
  labelPos,
  label = "Loading ...",
  ...props
}: SpinnerProps) {
  return (
    <div
      className={cn(spinnerVariants({ variant, size, labelPos }), className)}
      {...props}
    >
      <svg
        className="animate-spin"
        fill="none"
        height="28"
        viewBox="0 0 28 28"
        width="28"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Loading Spinner</title>
        <g clipPath="url(#clip0_4536_76354)">
          <path
            d="M14 1.05C14 0.4701 13.5292 -0.00409508 12.951 0.0393562C11.4717 0.150515 10.0171 0.496277 8.64243 1.06569C6.94387 1.76925 5.40053 2.80048 4.10051 4.1005C2.80049 5.40052 1.76925 6.94387 1.06569 8.64243C0.496279 10.0171 0.150515 11.4717 0.0393562 12.951C-0.00409508 13.5292 0.4701 14 1.05 14C1.6299 14 2.09519 13.529 2.14629 12.9514C2.25274 11.7481 2.54199 10.5659 3.00583 9.44607C3.60386 8.00229 4.48041 6.69045 5.58543 5.58543C6.69045 4.48041 8.00229 3.60386 9.44607 3.00583C10.5659 2.54199 11.7481 2.25274 12.9514 2.14629C13.529 2.09519 14 1.6299 14 1.05Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_4536_76354">
            <rect fill="currentColor" height="28" width="28" />
          </clipPath>
        </defs>
      </svg>

      {label && <span>{label}</span>}
    </div>
  );
}
