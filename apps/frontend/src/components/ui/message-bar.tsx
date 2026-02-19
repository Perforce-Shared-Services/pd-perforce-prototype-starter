import { cva } from "class-variance-authority";

export const messageBarVariants = cva(
  ["relative w-full border", "flex flex-row flex-wrap overflow-hidden", "p-3"],
  {
    variants: {
      variant: {
        info: "border-status-informational-stroke-1-rest bg-status-informational-background-1-rest text-neutral-foreground-1-rest",
        success:
          "border-status-success-stroke-1-rest bg-status-success-background-1-rest text-neutral-foreground-1-rest",
        warning:
          "border-status-warning-stroke-1-rest bg-status-warning-background-1-rest text-neutral-foreground-1-rest",
        danger:
          "border-status-danger-stroke-1-rest bg-status-danger-background-1-rest text-neutral-foreground-1-rest",
      },
      isFullPage: {
        true: "border-r-0 border-l-0",
        false: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export type MessageBarVariantProps = Parameters<typeof messageBarVariants>[0];

import CheckIcon from "@material-symbols/svg-400/rounded/check_circle-fill.svg?react";
import CloseIcon from "@material-symbols/svg-400/rounded/close-fill.svg?react";
import InformationIcon from "@material-symbols/svg-400/rounded/error-fill.svg?react";
import AlertIcon from "@material-symbols/svg-400/rounded/warning-fill.svg?react";
import type { VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import {
  Children,
  type ComponentProps,
  createContext,
  type PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import {
  MULTILINE_DETECTION_DEFAULT_VALUES,
  useMultilineDetection,
} from "@/hooks/use-multiline-detection";
import {
  filterChildrenByType,
  findChildByType,
} from "@/lib/react-children-utils";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Link, type LinkProps } from "@/components/ui/link";

type MessageBarVariant = "info" | "success" | "warning" | "danger";
type BadgeColor = NonNullable<VariantProps<typeof Badge>["color"]>;

const ICON_MAP: Record<MessageBarVariant, React.ReactNode> = {
  success: <CheckIcon />,
  info: <InformationIcon />,
  warning: <InformationIcon />,
  danger: <AlertIcon />,
};

const BADGE_COLOR_MAP: Record<MessageBarVariant, BadgeColor> = {
  info: "blue",
  success: "success",
  warning: "warning",
  danger: "danger",
};

type MessageBarContextValue = {
  onDismiss?: () => void;
};

const MessageBarContext = createContext<MessageBarContextValue>({});

const useMessageBarContext = () => {
  const context = useContext(MessageBarContext);
  if (!context) {
    throw new Error("MessageBar components must be used within MessageBarRoot");
  }
  return context;
};

export interface MessageBarProps
  extends Omit<
      ComponentProps<"div">,
      | "onDrag"
      | "onDragStart"
      | "onDragEnd"
      | "onAnimationStart"
      | "onAnimationEnd"
      | "onAnimationIteration"
    >,
    VariantProps<typeof messageBarVariants> {
  onDismiss?: () => void;
  isOpen?: boolean;
}

interface MessageBarActionProps extends ButtonProps {}

function MessageBarRoot({
  className,
  variant = "info",
  onDismiss,
  isFullPage = false,
  isOpen,
  children,
  ...props
}: PropsWithChildren<MessageBarProps>) {
  const [isVisible, setIsVisible] = useState(true);
  const isControlled = typeof isOpen === "boolean";
  const isCurrentlyVisible = isControlled ? (isOpen as boolean) : isVisible;

  const firstLineContainerRef = useRef<HTMLDivElement>(null);
  const { elementRef: titleRef, isMultiline } = useMultilineDetection({
    firstLineContainerRef,
    options: {
      ...MULTILINE_DETECTION_DEFAULT_VALUES,
      heightPadding: 22,
    },
  });

  // Parse children
  const childrenArray = Children.toArray(children) as React.ReactElement[];
  const actionsChild = findChildByType(childrenArray, MessageBarActions);
  const dismissChild = findChildByType(childrenArray, MessageBarDismiss);
  const titleChildren = filterChildrenByType(childrenArray, [
    MessageBarActions,
    MessageBarDismiss,
  ]);

  // Get variant-specific data
  const icon = ICON_MAP[variant ?? "info"];
  const badgeColor = BADGE_COLOR_MAP[variant ?? "info"];

  const handleDismiss = () => {
    onDismiss?.();
    if (!isControlled) {
      setIsVisible(false);
    }
  };

  return (
    <MessageBarContext.Provider value={{ onDismiss: handleDismiss }}>
      <AnimatePresence initial={false}>
        {isCurrentlyVisible && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              messageBarVariants({ variant, isFullPage }),
              className
            )}
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: -8 }}
            role="status"
            transition={{ duration: 0.2, ease: "easeOut" }}
            {...props}
          >
            <div
              className="flex h-full w-full justify-between"
              ref={firstLineContainerRef}
            >
              <div className="flex h-full">
                <Badge
                  className="mt-0.5 h-full"
                  color={badgeColor}
                  size="lg"
                  variant="subtle"
                >
                  {icon}
                </Badge>
                <div
                  className={cn(
                    "flex h-full",
                    isMultiline ? "items-start" : "items-center"
                  )}
                >
                  <p
                    className="min-w-0 flex-1 whitespace-pre-line px-0"
                    ref={titleRef as React.RefObject<HTMLParagraphElement>}
                  >
                    {titleChildren}
                  </p>
                </div>
              </div>

              <div className="flex h-full items-center gap-2">
                {!isMultiline && actionsChild}
                {dismissChild}
              </div>
            </div>

            {isMultiline && actionsChild && (
              <div className="w-full basis-full px-8 pt-3">{actionsChild}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </MessageBarContext.Provider>
  );
}

function MessageBarTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "break-anywhere inline hyphens-auto break-words pr-1 font-semibold text-200 text-neutral-foreground-1-rest",
        className
      )}
      {...props}
    />
  );
}
MessageBarTitle.displayName = "MessageBarTitle";

function MessageBarDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span className={cn("inline break-words text-200", className)} {...props} />
  );
}
MessageBarDescription.displayName = "MessageBarDescription";

function MessageBarLink({
  className,
  underline = "hover",
  size = "sm",
  ...props
}: LinkProps) {
  return (
    <Link
      className={cn("px-0.5 text-200", className)}
      size={size}
      underline={underline}
      {...props}
    />
  );
}
MessageBarLink.displayName = "MessageBarLink";

function MessageBarActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props} />
  );
}
MessageBarActions.displayName = "MessageBarActions";

function MessageBarAction({
  size = "sm",
  variant = "tertiary",
  ...props
}: MessageBarActionProps) {
  return <Button size={size} variant={variant} {...props} />;
}
MessageBarAction.displayName = "MessageBarAction";

function MessageBarDismiss({
  "aria-label": ariaLabel = "Dismiss message",
  className,
  ...props
}: Omit<ButtonProps, "children">) {
  const { onDismiss } = useMessageBarContext();

  return (
    <Button
      aria-label={ariaLabel}
      className={cn("mt-0.5 h-full", className)}
      iconOnly
      onClick={onDismiss}
      size="sm"
      variant="tertiary"
      {...props}
    >
      <CloseIcon className="size-4" />
    </Button>
  );
}
MessageBarDismiss.displayName = "MessageBarDismiss";

interface MessageBarComponent
  extends React.FC<React.PropsWithChildren<MessageBarProps>> {
  Title: typeof MessageBarTitle;
  Description: typeof MessageBarDescription;
  Link: typeof MessageBarLink;
  Actions: typeof MessageBarActions;
  Action: typeof MessageBarAction;
  Dismiss: typeof MessageBarDismiss;
}

const MessageBar = Object.assign(MessageBarRoot, {
  Title: MessageBarTitle,
  Description: MessageBarDescription,
  Link: MessageBarLink,
  Actions: MessageBarActions,
  Action: MessageBarAction,
  Dismiss: MessageBarDismiss,
}) as MessageBarComponent;

export {
  MessageBar,
  MessageBarTitle,
  MessageBarDescription,
  MessageBarLink,
  MessageBarActions,
  MessageBarAction,
  MessageBarDismiss,
};
