import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/card";
import type { Leader } from "@/content/team";
import { asset } from "@/lib/base-path";

/**
 * Leadership profile: portrait, name, role, a short positioning paragraph, and
 * areas of expertise as badges rather than the bullet lists the current site
 * uses.
 */
export function LeadershipCard({ leader, index }: { leader: Leader; index: number }) {
  return (
    <Reveal delay={index * 0.12} className="h-full">
      <Card hover glow className="h-full gap-0 p-8 lg:p-10">
        <div className="relative flex items-center gap-5">
          <span className="relative shrink-0">
            <span
              aria-hidden
              className="absolute -inset-1 rounded-full bg-[conic-gradient(from_180deg,var(--color-brand),var(--color-brand-tint),var(--color-brand))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <Image
              src={asset(leader.photo)}
              alt={`${leader.name}, ${leader.role} at Finwave Forex`}
              width={420}
              height={420}
              className="relative size-20 rounded-full object-cover ring-2 ring-white sm:size-24"
            />
          </span>
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-balance">
              {leader.name}
            </h3>
            <p className="mt-1.5 text-sm font-semibold text-brand-deep">{leader.role}</p>
          </div>
        </div>

        {/* flex-1 / mt-auto: the two bios differ by a line, which left the
            expertise rules at different heights on cards sitting side by side. */}
        <p className="relative mt-7 flex-1 text-base leading-7 text-ink-soft">{leader.bio}</p>

        <div className="relative mt-7 border-t border-hairline pt-6">
          <p className="label-micro text-ink-soft">
            Areas of expertise
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {leader.expertise.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-sand/60 px-3.5 py-1.5 text-xs font-medium ring-1 ring-hairline transition-colors duration-300 hover:bg-brand-tint hover:text-brand-deep hover:ring-brand/30"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Reveal>
  );
}
