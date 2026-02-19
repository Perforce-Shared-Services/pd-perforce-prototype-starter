import { cva } from "class-variance-authority";

export const toastVariants = cva(
  [
    "relative inline-flex w-[312px] flex-col overflow-hidden rounded-md bg-neutral-background-1-rest p-3 shadow",
    "[&_#icon]:size-4",
  ],
  {
    variants: {
      bordered: {
        true: 'after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:content-[""]',
        false: "",
      },
      variant: {
        brand:
          "after:bg-brand-background-1-rest [&_#icon]:text-brand-foreground-2-rest",
        success:
          "after:bg-status-success-background-2-rest [&_#icon]:text-status-success-foreground-1-rest",
        info: "after:bg-status-informational-background-2-rest [&_#icon]:text-status-informational-foreground-1-rest",
        warning:
          "after:bg-status-warning-background-2-rest [&_#icon]:text-status-warning-foreground-1-rest",
        error:
          "after:bg-status-danger-background-2-rest [&_#icon]:text-status-danger-foreground-1-rest",
      },
    },
    defaultVariants: {
      variant: "brand",
      bordered: false,
    },
  }
);

export type ToastVariantProps = Parameters<typeof toastVariants>[0];

import CheckIcon from "@material-symbols/svg-400/rounded/check_circle-fill.svg?react";
import CloseIcon from "@material-symbols/svg-400/rounded/close.svg?react";
import InformationIcon from "@material-symbols/svg-400/rounded/error-fill.svg?react";
import AlertIcon from "@material-symbols/svg-400/rounded/warning-fill.svg?react";
import type { VariantProps } from "class-variance-authority";
import { format } from "date-fns";
import React, { useMemo } from "react";
import {
  Toaster as Sonner,
  toast as sonnerToast,
  type ToasterProps,
} from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const DEFAULT_TOAST_DURATION = 5000;

type Timestamp = {
  value: string;
  format?: string;
  options?: Parameters<typeof format>[2];
};

type ToastVariant = NonNullable<VariantProps<typeof toastVariants>["variant"]>;

type ToastProps = {
  id: string | number;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  bordered?: boolean;
  timestamp?: boolean | string | Timestamp;
  replaceCloseButton?: "timestamp" | "cta";
  ctaButton?:
    | React.ReactNode
    | {
        label?: string;
        onClick: () => void;
      };
  variant?: ToastVariant;
} & VariantProps<typeof toastVariants>;

type ToasterOptionsArg = Omit<ToastProps, "title" | "variant" | "id"> & {
  id?: string | number;
};

type ShowCustomToastOptions = ToasterOptionsArg & {
  duration?: number;
  variant?: ToastVariant;
  id?: string | number;
};

const iconMap: Record<ToastVariant, React.ReactNode> = {
  brand: <InformationIcon />,
  success: <CheckIcon />,
  info: <InformationIcon />,
  warning: <InformationIcon />,
  error: <AlertIcon />,
};

function Toast({
  id,
  title,
  subtitle,
  description,
  variant = "brand",
  bordered = false,
  ctaButton,
  timestamp,
}: ToastProps) {
  // Memoize timestamp text
  const timestampText = useMemo(() => {
    if (typeof timestamp === "object") {
      return format(
        new Date(timestamp.value),
        timestamp.format ?? "h:mm a",
        timestamp.options
      );
    }
    if (timestamp) {
      const date =
        typeof timestamp === "string" ? new Date(timestamp) : new Date();
      return format(date, "h:mm a");
    }
    return;
  }, [timestamp]);

  const headerRightContent = useMemo(() => {
    if (timestampText) {
      return (
        <div className="text-200 text-neutral-foreground-2-rest">
          {timestampText}
        </div>
      );
    }
    if (ctaButton) {
      if (
        typeof ctaButton === "object" &&
        !React.isValidElement(ctaButton) &&
        "onClick" in ctaButton
      ) {
        return (
          <Button
            color="default"
            onClick={ctaButton.onClick}
            size="sm"
            variant="tertiary"
          >
            {ctaButton.label ?? "Undo"}
          </Button>
        );
      }
      return ctaButton;
    }
    return (
      <Button
        color="default"
        iconOnly
        onClick={() => sonnerToast.dismiss(id)}
        size="sm"
        variant="tertiary"
      >
        <CloseIcon className="!size-4" />
      </Button>
    );
  }, [timestampText, id, ctaButton]);

  return (
    <div
      className={cn(toastVariants({ variant, bordered }))}
      id={id.toString()}
    >
      <div className="inline-flex w-full items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-1">
          <div className="m-0.5 flex items-center" id="icon">
            {iconMap[variant]}
          </div>
          <div className="font-semibold text-300 text-neutral-foreground-1-rest">
            {title}
          </div>
        </div>
        <div className="flex h-5 items-center justify-end gap-2 rounded-sm">
          {headerRightContent}
        </div>
      </div>
      <div className="flex flex-col gap-1 px-6">
        {subtitle && (
          <div className="text-200 text-neutral-foreground-2-rest">
            {subtitle}
          </div>
        )}
        <div className="flex w-full flex-col gap-1 font-normal text-300 text-neutral-foreground-2-rest">
          {description}
        </div>
      </div>
    </div>
  );
}

function showCustomToast(
  title: React.ReactNode,
  opts?: ShowCustomToastOptions
) {
  const { duration, variant = "brand", id, ...rest } = opts || {};
  return sonnerToast.custom(
    (toastId: string | number) => (
      <Toast {...rest} id={toastId} title={title} variant={variant} />
    ),
    { duration, ...(id ? { id } : {}) }
  );
}

function toast(
  title: React.ReactNode,
  toastOptions?: Omit<ToastProps, "id" | "title"> & { duration?: number }
) {
  return showCustomToast(title, toastOptions);
}

type ToastMethod = (
  title: React.ReactNode,
  toastOptions?: ToasterOptionsArg & { duration?: number }
) => string | number;

toast.success = ((
  title: React.ReactNode,
  toastOptions?: ToasterOptionsArg & { duration?: number }
) =>
  showCustomToast(title, {
    ...toastOptions,
    variant: "success",
  })) satisfies ToastMethod;

toast.error = ((
  title: React.ReactNode,
  toastOptions?: ToasterOptionsArg & { duration?: number }
) =>
  showCustomToast(title, {
    ...toastOptions,
    variant: "error",
  })) satisfies ToastMethod;

toast.info = ((
  title: React.ReactNode,
  toastOptions?: ToasterOptionsArg & { duration?: number }
) =>
  showCustomToast(title, {
    ...toastOptions,
    variant: "info",
  })) satisfies ToastMethod;

toast.warning = ((
  title: React.ReactNode,
  toastOptions?: ToasterOptionsArg & { duration?: number }
) =>
  showCustomToast(title, {
    ...toastOptions,
    variant: "warning",
  })) satisfies ToastMethod;

toast.update = (
  id: string | number,
  { title, variant, ...props }: Partial<ToastProps> & { duration?: number }
) => showCustomToast(title ?? "", { ...props, id, variant });

toast.promise = <T,>(
  promise: Promise<T>,
  {
    loading,
    success,
    error,
  }: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: unknown) => string);
  },
  options?: ToasterOptionsArg & { duration?: number }
) => {
  const { duration, ...restOptions } = options || {};
  const toastId = showCustomToast(loading, { ...restOptions, variant: "info" });

  promise
    .then((data) => {
      const successMessage =
        typeof success === "function" ? success(data) : success;
      showCustomToast(successMessage, {
        ...restOptions,
        id: toastId,
        duration: duration ?? DEFAULT_TOAST_DURATION,
        variant: "success",
      });
      return data;
    })
    .catch((err) => {
      const errorMessage = typeof error === "function" ? error(err) : error;
      showCustomToast(errorMessage, {
        ...restOptions,
        id: toastId,
        duration: duration ?? DEFAULT_TOAST_DURATION,
        variant: "error",
      });
      return err;
    });

  return promise;
};

toast.loading = (
  title: string,
  options?: ToasterOptionsArg & {
    duration?: number;
    promise?: Promise<unknown>;
    onSuccess?: string | ((data: unknown) => string);
    onError?: string | ((error: unknown) => string);
  }
) => {
  const { duration, promise, onSuccess, onError, ...restOptions } =
    options || {};
  const toastId = showCustomToast(title, {
    ...restOptions,
    variant: "info",
    duration,
  });

  if (promise && (onSuccess || onError)) {
    promise
      .then((data) => {
        if (onSuccess) {
          const successMessage =
            typeof onSuccess === "function" ? onSuccess(data) : onSuccess;
          showCustomToast(successMessage, {
            ...restOptions,
            id: toastId,
            duration: 5000,
            variant: "success",
          });
        } else {
          sonnerToast.dismiss(toastId);
        }
        return data;
      })
      .catch((err) => {
        if (onError) {
          const errorMessage =
            typeof onError === "function" ? onError(err) : onError;
          showCustomToast(errorMessage, {
            ...restOptions,
            id: toastId,
            duration: 5000,
            variant: "error",
          });
        } else {
          sonnerToast.dismiss(toastId);
        }
        return err;
      });
  }

  return toastId;
};

toast.dismiss = sonnerToast.dismiss;

const Toaster = (props: ToasterProps) => (
  <Sonner
    className="toaster group"
    style={
      {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--neutral-foreground-2-rest)",
        "--normal-border": "var(--border)",
      } as React.CSSProperties
    }
    theme={"system" as ToasterProps["theme"]}
    {...props}
  />
);

export { Toaster, toast };
export type { ToastProps, Timestamp, ShowCustomToastOptions };
export type { ToasterProps } from "sonner";
