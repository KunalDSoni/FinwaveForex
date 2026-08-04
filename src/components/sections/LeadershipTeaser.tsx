import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Figure } from "@/components/sections/Figure";
import { Section } from "@/components/ui/section";
import { leadership, leadershipMessage } from "@/content/team";
import { siteConfig } from "@/content/site";
import { asset } from "@/lib/base-path";

/**
 * Compact homepage placement of the About page's leadership content.
 *
 * Renders through `Figure`, the site's one quotation component, so this quote
 * and the identical one on /about are set the same way. It previously had its
 * own quote typography and its own attribution treatment.
 *
 * The portraits are both leaders, not one. `leadershipMessage` is company
 * voice — "deliberately not attributed to an individual" — and pairing it with
 * a single named founder's headshot and role read as putting the firm's words
 * in one man's mouth.
 */
export function LeadershipTeaser() {
  return (
    <Section>
      <Figure
        as="panel"
        quote={leadershipMessage.quote}
        attribution={`${leadershipMessage.attribution} · ${siteConfig.legalName}`}
        media={
          <div className="flex shrink-0 items-center gap-4 lg:flex-col lg:items-start">
            <ul className="flex -space-x-4">
              {leadership.map((leader) => (
                <li key={leader.slug}>
                  <Image
                    src={asset(leader.photo)}
                    alt={`${leader.name}, ${leader.role} at Finwave Forex`}
                    width={420}
                    height={420}
                    className="shadow-soft size-20 rounded-full object-cover ring-3 ring-canvas lg:size-24"
                  />
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink-soft lg:max-w-[11rem]">
              {leadership.map((leader) => leader.name).join(" & ")}
            </p>
          </div>
        }
        action={
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 py-1 text-sm font-semibold text-brand-deep transition-colors hover:text-ink focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
          >
            Meet the full team
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        }
      />
    </Section>
  );
}
