import type { RefObject } from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

type MultilineDetectionOptions = {
  heightPadding: number;
  widthThreshold: number;
  normalLineHeightMultiplier: number;
};

type UseMultilineDetectionOptions = {
  firstLineContainerRef: RefObject<HTMLDivElement | null>;
  options?: MultilineDetectionOptions;
};

export const MULTILINE_DETECTION_DEFAULT_VALUES: MultilineDetectionOptions = {
  heightPadding: 0,
  widthThreshold: 0.75,
  normalLineHeightMultiplier: 1.2,
};

export function useMultilineDetection({
  firstLineContainerRef,
  options = MULTILINE_DETECTION_DEFAULT_VALUES,
}: UseMultilineDetectionOptions) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isMultiline, setIsMultiline] = useState(false);

  const calculateLineHeight = useCallback(
    (element: HTMLElement): number => {
      const computed = window.getComputedStyle(element);
      const lineHeightValue = computed.lineHeight;

      return lineHeightValue === "normal"
        ? Number.parseFloat(computed.fontSize) *
            options.normalLineHeightMultiplier
        : Number.parseFloat(lineHeightValue || "0");
    },
    [options]
  );

  const getParentWidth = useCallback(
    (element: HTMLElement): number =>
      firstLineContainerRef?.current?.getBoundingClientRect().width ||
      element.parentElement?.getBoundingClientRect().width ||
      0,
    [firstLineContainerRef]
  );

  const checkMultilineStatus = useCallback(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const computed = window.getComputedStyle(element);
    const lineHeight = calculateLineHeight(element);
    const { height: elementHeight, width: elementWidth } =
      element.getBoundingClientRect();
    const parentWidth = getParentWidth(element);

    // Check if text takes more than one line vertically
    const exceedsOneLineHeight =
      elementHeight >= lineHeight + options.heightPadding;

    // Check if element width approaches maximum available width
    const maxWidth = Number.parseFloat(computed.maxWidth) || parentWidth;
    const widthRatio = maxWidth > 0 ? elementWidth / maxWidth : 0;
    const isNearMaxWidth = widthRatio >= options.widthThreshold;

    const newIsMultiline = exceedsOneLineHeight || isNearMaxWidth;

    setIsMultiline((prev) => (prev !== newIsMultiline ? newIsMultiline : prev));
  }, [getParentWidth, options, calculateLineHeight]);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(checkMultilineStatus);
    resizeObserver.observe(element);
    window.addEventListener("resize", checkMultilineStatus);

    // Initial check
    checkMultilineStatus();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkMultilineStatus);
    };
  }, [checkMultilineStatus]);

  return { elementRef, isMultiline };
}
