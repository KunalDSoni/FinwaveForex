import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  variant?: "paper" | "sand" | "dark";
  bordered?: boolean;
  width?: "default" | "narrow";
  /**
   * Vertical rhythm. Every section on the site draws from these steps instead
   * of hand-tuned pt/pb pairs.
   *
   * Sizes are half the intended break, because two stacked sections each
   * contribute their padding. Measured across the built site, the old
   * `default` put 256px between homepage sections while every interior page
   * ran on 160px — the homepage read as a different, airier website. One step
   * now serves both: 160px desktop, 128px mobile.
   */
  space?: "default" | "tight" | "flushTop" | "flushBottom";
  className?: string;
  innerClassName?: string;
  as?: ElementType;
  id?: string;
  "aria-label"?: string;
};

const spacing = {
  default: "py-16 lg:py-20",
  tight: "py-12 lg:py-14",
  flushTop: "pt-0 pb-16 lg:pb-20",
  flushBottom: "pt-16 pb-0 lg:pt-20",
} as const;

const variants = {
  paper: "",
  sand: "bg-sand/60",
  dark: "bg-ink-surface text-white",
} as const;

export function Section({
  children,
  variant = "paper",
  bordered = false,
  width = "default",
  space = "default",
  className,
  innerClassName,
  as: Tag = "section",
  id,
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn(variants[variant], bordered && "border-y border-hairline", className)}
    >
      <div
        className={cn(
          "gutter mx-auto",
          spacing[space],
          width === "narrow" ? "max-w-4xl" : "max-w-page",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
