import type { ReactNode } from "react";

/** Serif-italic accent word inside display headlines. */
export function Em({ children }: { children: ReactNode }) {
  return <em className="font-accent pr-1 font-normal tracking-normal italic">{children}</em>;
}
