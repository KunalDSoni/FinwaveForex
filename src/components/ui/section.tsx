import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  variant?: "paper" | "sand" | "dark";
  bordered?: boolean;
  width?: "default" | "narrow";
  /**
   * Vertical rhythm. Every section on the site now draws from these three
   * steps instead of hand-tuned pt/pb pairs — an audit found eight different
   * padding combinations in use, which is why the pages read as a stack of
   * separate blocks rather than one document.
   */
  space?: "default" | "tight" | "flushTop" | "flushBottom";
  className?: string;
  innerClassName?: string;
  as?: ElementType;
  id?: string;
  "aria-label"?: string;
};

const spacing = {
  default: "py-24 lg:py-32",
  tight: "py-16 lg:py-20",
  flushTop: "pt-0 pb-24 lg:pb-32",
  flushBottom: "pt-24 pb-0 lg:pt-32",
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
          "mx-auto px-5 sm:px-6 lg:px-8",
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
