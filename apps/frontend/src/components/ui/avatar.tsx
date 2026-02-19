import { cva } from "class-variance-authority";

// Shared mask for presence badge cutout (for image and fallback)
// Uses pixel-based positioning from right/bottom edges for accurate alignment across all sizes
export const presenceMaskClass =
  "[mask-image:radial-gradient(circle_at_right_var(--avatar-badge-radius)_bottom_var(--avatar-badge-radius),transparent_calc(var(--avatar-badge-radius)_+_var(--avatar-badge-gap)_-_0.25px),white_calc(var(--avatar-badge-radius)_+_var(--avatar-badge-gap)_+_0.25px))]";

export const avatarVariants = cva(
  [
    "@container relative flex size-10 shrink-0 rounded-full",
    // CSS custom properties for badge positioning and sizing (auto-enabled when presence badge detected)
    "has-[[data-slot='avatar-presence']]:[--avatar-badge-side:right]",
    // Badge gap: scales from 1px (small) to 2px (large)
    // Inspired by Fluent UI: 1px@<48px, 2px@≥48px
    "has-[[data-slot='avatar-presence']]:[--avatar-badge-gap:clamp(1px,calc(var(--avatar-size,40px)/40),2px)]",
    "has-[[data-slot='avatar-presence']]:[--avatar-badge-offset:10%]",
    // Badge radius: 12% of avatar size with constraints for extreme sizes
    // Inspired by Fluent UI's range: 3px (tiny) to 14px (extra-large)
    "has-[[data-slot='avatar-presence']]:[--avatar-badge-radius:clamp(3px,calc(var(--avatar-size,40px)*0.12),14px)]",
  ],
  {
    variants: {
      variant: {
        default: "",
        ring: [
          // Ring width: scales from 2px (small) to 4px (large)
          // Inspired by Fluent UI: 2px@16-48px, 3px@49-64px, 4px@65px+
          "[--avatar-ring-width:clamp(2px,calc(var(--avatar-size,40px)/20),4px)]",
          "[container-type:size]",
          // ::before pseudo-element for the ring
          "before:absolute",
          "before:z-10",
          "before:bottom-0",
          "before:left-0",
          "before:right-0",
          "before:top-0",
          "before:rounded-[inherit]",
          "before:border-solid",
          "before:border-primary",
          "before:content-['']",
          "before:[border-width:var(--avatar-ring-width)]",
          "before:[margin:calc(-2*var(--avatar-ring-width))]",
          // Apply mask to ::before when avatar has a presence badge child
          // Uses pixel-based positioning from right/bottom edges, accounting for ring margin
          // Position is offset by 2*ring-width since ::before extends beyond avatar bounds
          "has-[[data-slot='avatar-presence']]:before:[mask-image:radial-gradient(circle_at_right_calc(var(--avatar-badge-radius)_+_2_*_var(--avatar-ring-width))_bottom_calc(var(--avatar-badge-radius)_+_2_*_var(--avatar-ring-width)),transparent_calc(var(--avatar-badge-radius)_+_var(--avatar-badge-gap)_-_0.25px),white_calc(var(--avatar-badge-radius)_+_var(--avatar-badge-gap)_+_0.25px))]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const avatarPresenceVariants = cva(
  [
    "-right-0 -bottom-0 absolute z-10 overflow-visible rounded-full",
    // Badge size: 2x the radius (diameter) using clamp-based sizing
    "[width:round(up,calc(var(--avatar-badge-radius,12px)*2),1px)]",
    "[height:round(up,calc(var(--avatar-badge-radius,12px)*2),1px)]",
  ],
  {
    variants: {
      variant: {
        online: "bg-status-available-foreground-3-rest",
        offline: "bg-neutral-foreground-3-rest",
        away: "bg-status-away-background-3-rest",
      },
    },
    defaultVariants: {
      variant: "online",
    },
  },
);

export const avatarFallbackVariants = cva(
  [
    "flex size-full items-center justify-center rounded-full bg-muted font-semibold",
    // Font size scales from 10px (tiny) to 28px (huge)
    // Inspired by Fluent UI's typography scaling based on avatar size
    "[font-size:clamp(10px,calc(var(--avatar-size,40px)*0.4),28px)]",
  ],
  {
    variants: {
      variant: {
        neutral: "bg-neutral-background-6-rest text-neutral-foreground-3-rest",
        brand: "bg-primary text-primary-foreground",
        coloured: "bg-brand-background-2-rest text-primary",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export const avatarImageVariants = cva([
  "aspect-square size-full rounded-full object-cover",
]);

export const avatarStackVariants = cva([
  "-space-x-2 flex *:ring-3 *:ring-background",
]);

export type AvatarVariantProps = Parameters<typeof avatarVariants>[0];
export type AvatarPresenceVariantProps = Parameters<
  typeof avatarPresenceVariants
>[0];
export type AvatarFallbackVariantProps = Parameters<
  typeof avatarFallbackVariants
>[0];

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type AvatarStackProps = {
  children: React.ReactNode;
  className?: string;
};
function AvatarStack({ children, className, ...props }: AvatarStackProps) {
  return (
    <div
      {...props}
      className={cn(avatarStackVariants({ className }))}
      data-slot="avatar-stack"
    >
      {children}
    </div>
  );
}

export type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>;

function Avatar({ className, variant, style, ...props }: AvatarProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const size =
            entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
          ref.current?.style.setProperty("--avatar-size", `${size}px`);
        }
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <AvatarPrimitive.Root
      className={cn(avatarVariants({ variant, className }))}
      data-slot="avatar"
      ref={ref}
      style={style}
      {...props}
    >
      {props.children}
    </AvatarPrimitive.Root>
  );
}

export type AvatarPresenceProps = React.ComponentProps<"span"> &
  VariantProps<typeof avatarPresenceVariants>;

function AvatarPresence(params: AvatarPresenceProps) {
  const { className, variant, ...props } = params;
  return (
    <>
      {/* <span className="border-background absolute right-0 bottom-0 z-10 size-[35%] overflow-visible rounded-full border-1 p-1" /> */}
      <span
        className={cn(avatarPresenceVariants({ variant, className }))}
        data-slot="avatar-presence"
        {...props}
      />
    </>
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className={cn(
        avatarImageVariants({ className }),
        presenceMaskClass,
        className
      )}
      data-slot="avatar-image"
      {...props}
    />
  );
}

export type AvatarFallbackProps = React.ComponentProps<
  typeof AvatarPrimitive.Fallback
> &
  VariantProps<typeof avatarFallbackVariants>;

function AvatarFallback({ className, variant, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        avatarFallbackVariants({ variant, className }),
        presenceMaskClass,
        className
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { AvatarStack, Avatar, AvatarImage, AvatarFallback, AvatarPresence };
