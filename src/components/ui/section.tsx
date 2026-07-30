import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  variant?: "paper" | "sand" | "dark";
  bordered?: boolean;
  width?: "default" | "narrow";
  className?: string;
  innerClassName?: string;
  as?: ElementType;
  id?: string;
  "aria-label"?: string;
};

const variants = {
  paper: "",
  sand: "bg-sand/60",
  dark: "bg-ink text-white",
} as const;

export function Section({
  children,
  variant = "paper",
  bordered = false,
  width = "default",
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
          "mx-auto px-5 py-24 sm:px-6 lg:px-8 lg:py-36",
          width === "narrow" ? "max-w-4xl" : "max-w-page",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
