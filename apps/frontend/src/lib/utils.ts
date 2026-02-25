import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-100",
        "text-200",
        "text-300",
        "text-400",
        "text-500",
        "text-600",
        "text-700",
        "text-800",
        "text-900",
        "text-1000",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
