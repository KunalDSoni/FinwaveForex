import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { leadership, leadershipMessage } from "@/content/team";
import { siteConfig } from "@/content/site";
import { asset } from "@/lib/base-path";

/**
 * Compact homepage placement of the About page's leadership content: the
 * founder's portrait plus the company-voice quote, both already published on
 * /about via LeadershipCard. Kept short — full bios stay on /about.
 */
export function LeadershipTeaser() {
  const founder = leadership[0];

  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
        <Reveal>
          <Image
            src={asset(founder.photo)}
            alt={`${founder.name}, ${founder.role} at Finwave Forex`}
            width={420}
            height={420}
            className="size-24 rounded-full object-cover ring-2 ring-white shadow-soft lg:size-32"
          />
          <p className="mt-4 text-sm text-ink-soft">
            <span className="font-semibold text-ink">{founder.name}</span>
            {" · "}
            {founder.role}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow>Leadership</Eyebrow>
          <blockquote className="display-sm mt-4 max-w-2xl text-balance">
            &ldquo;{leadershipMessage.quote}&rdquo;
          </blockquote>
          <p className="mt-5 text-sm text-ink-soft">
            {leadershipMessage.attribution} · {siteConfig.legalName}
          </p>
          <Link
            href="/about"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-deep transition-colors hover:text-ink focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
          >
            Meet the full team
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
