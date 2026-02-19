import { cva } from "class-variance-authority";

export const tabsVariants = cva("flex gap-2", {
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "flex-row",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const tabsListVariants = cva("inline-flex w-fit gap-1", {
  variants: {
    containerSize: {
      default: "",
      fullWidth: "",
    },
    variant: {
      default: "",
      brand: "",
      gray: "",
      border:
        "rounded-lg border border-neutral-stroke-alpha-1-rest bg-neutral-background-2-rest p-1",
      underline: "",
    },
    size: {
      small: "",
      medium: "",
    },
    orientation: {
      horizontal: "flex-row gap-1",
      vertical: "flex-col",
    },
  },
  compoundVariants: [
    {
      containerSize: "fullWidth",
      orientation: "horizontal",
      class: "w-full",
    },
    {
      variant: "underline",
      orientation: "horizontal",
    },
  ],
  defaultVariants: {
    containerSize: "default",
    orientation: "horizontal",
  },
});

export const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md border-transparent px-2 py-1 font-semibold text-neutral-foreground-2-rest text-sm transition-[color,box-shadow,background] hover:text-neutral-foreground-2-hover data-[state=active]:shadow-sm",
    "data-[state=active]:bg-background data-[state=active]:text-(--neutral-foreground-1-rest)",
    "dark:data-[state=active]:text-foreground",
    "focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    '[&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        default: "",
        brand:
          "data-[state=active]:bg-brand-background-2-rest data-[state=active]:text-neutral-foreground-1-rest",
        gray: [
          "hover:bg-neutral-background-subtle-hover",
          "data-[state=active]:bg-neutral-background-1-rest data-[state=active]:text-neutral-foreground-1-rest",
          "data-[state=active]:[&_svg]:text-brand-foreground-compound-rest",
        ],
        border: "data-[state=active]:shadow-(--shadow-2)",
        underline: [
          "relative rounded-none py-2.5",
          'after:absolute after:z-10 after:bg-neutral-stroke-2-rest after:content-[""] hover:after:bg-brand-stroke-compound-hover',
          "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary",
        ],
      },
      size: {
        small: "p-1.5",
        medium: "px-1.5 py-2.5",
      },
      orientation: {
        horizontal: "",
        vertical: "",
      },
      containerSize: {
        default: "",
        fullWidth: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "small",
    },
    compoundVariants: [
      {
        containerSize: "fullWidth",
        orientation: "horizontal",
        class: "flex-1",
      },
      {
        orientation: "vertical",
        class: "justify-start",
      },
      {
        variant: "underline",
        size: "small",
        orientation: "horizontal",
        class: "px-1 pt-0 pb-3",
      },
      {
        variant: "underline",
        size: "medium",
        orientation: "horizontal",
        class: "px-1 pt-2 pb-3",
      },
      {
        variant: "underline",
        orientation: "horizontal",
        class: [
          "after:inset-x-0 after:bottom-0 after:h-0.25 data-[state=active]:after:h-0.5",
          "data-[state=inactive]:after:-ml-1 data-[state=inactive]:after:w-[calc(120%)] data-[state=inactive]:after:last:ml-0 data-[state=inactive]:after:first:ml-0",
        ],
      },
      {
        variant: "underline",
        orientation: "vertical",
        class:
          "after:-translate-y-1/2 after:inset-0 after:top-1/2 after:left-0 after:h-[calc(100%-12px)] after:w-0.25 after:rounded data-[state=active]:after:w-0.5",
      },
    ],
  }
);

export type TabsVariantProps = Parameters<typeof tabsVariants>[0];
export type TabsListVariantProps = Parameters<typeof tabsListVariants>[0];
export type TabsTriggerVariantProps = Parameters<typeof tabsTriggerVariants>[0];

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { VariantProps } from "class-variance-authority";
import {
  Children,
  type ComponentProps,
  cloneElement,
  isValidElement,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";

type TabsProps = ComponentProps<typeof TabsPrimitive.Root> &
  VariantProps<typeof tabsVariants>;

function Tabs({ className, orientation, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      className={cn(tabsVariants({ className, orientation }))}
      data-slot="tabs"
      {...props}
    />
  );
}

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>;

function TabsList({
  className,
  containerSize,
  variant,
  size,
  orientation = "horizontal",
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        tabsListVariants({ containerSize, orientation, variant, size }),
        className
      )}
      data-slot="tabs-list"
      {...props}
    >
      {Children.map(props.children, (child) => {
        if (isValidElement(child)) {
          const element = child as ReactElement<
            ComponentProps<typeof TabsTrigger> &
              VariantProps<typeof tabsTriggerVariants>
          >;
          return cloneElement(element, {
            variant: element.props.variant ?? variant,
            size: element.props.size ?? size,
            orientation: element.props.orientation ?? orientation,
            containerSize: element.props.containerSize || containerSize,
          });
        }
        return child;
      })}
    </TabsPrimitive.List>
  );
}

export type TabTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants> & {};

function TabsTrigger({
  className,
  variant,
  size,
  orientation,
  containerSize,
  ...props
}: TabTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        tabsTriggerVariants({ variant, size, orientation, containerSize }),
        className
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn("flex-1 outline-none", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
