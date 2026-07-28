import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Italic accent phrase inside display headlines, carrying the brand gold.
 * Only ever used inside large headings, where `brand-deep` on paper clears the
 * 3:1 AA large-text threshold; `tone="dark"` switches to the brighter gold for
 * ink-coloured sections.
 */
export function Em({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <em
      className={cn(
        "font-accent pr-1 font-normal tracking-normal italic",
        tone === "dark" ? "text-brand" : "text-brand-deep",
      )}
    >
      {children}
    </em>
  );
}
