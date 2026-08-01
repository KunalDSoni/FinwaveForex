import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Location trail for interior pages. The header shows which top-level section is
 * active; this states the page itself, so a visitor arriving from search always
 * knows where they landed.
 *
 * The last crumb is the current page and is never a link.
 */
export function Breadcrumb({ trail, className }: { trail: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-7", className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-semibold tracking-[0.1em] uppercase">
        <li>
          <Link href="/" className="inline-block py-1 text-ink-soft transition-colors hover:text-brand-deep">
            Home
          </Link>
        </li>
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3 shrink-0 text-ink-soft/50" aria-hidden />
              {last || !crumb.href ? (
                <span className="text-brand-deep" aria-current={last ? "page" : undefined}>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="inline-block py-1 text-ink-soft transition-colors hover:text-brand-deep"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
