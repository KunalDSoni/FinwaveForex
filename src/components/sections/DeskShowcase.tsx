import { Fragment } from "react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Em } from "@/components/sections/Em";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Section } from "@/components/ui/section";

const txns = [
  { who: "Education · GBP", sub: "Wire transfer", amt: "£12,500", st: "Settled" },
  { who: "Travel · USD notes", sub: "Home delivery", amt: "$3,200", st: "Delivered" },
  { who: "Corporate · EUR", sub: "Bulk exchange", amt: "€48,000", st: "In progress" },
];

export function DeskShowcase() {
  return (
    <Section variant="dark" className="relative overflow-hidden">
      <div
        aria-hidden
        className="animate-orb pointer-events-none absolute -top-1/4 right-0 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(234_163_0_/_0.16),transparent_60%)]"
      />
      <div className="relative">
        <SectionHeading
          layout="split"
          tone="dark"
          eyebrow="The Finwave desk"
          lines={[
            <Fragment key="l1">A real forex desk,</Fragment>,
            <Fragment key="l2">
              not a <Em tone="dark">black box.</Em>
            </Fragment>,
          ]}
          sub="Quote by phone, confirm a live rate, and receive currency at home or branch. Every transaction is RBI-compliant and fully documented."
        />

        <Reveal delay={0.15}>
          <div className="relative mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_60px_120px_-40px_rgb(0_0_0_/_0.6)] sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
              {/* Transactions */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white/85">Recent desk activity</h3>
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] tracking-widest text-white/45 uppercase">
                    Illustrative
                  </span>
                </div>
                <ul className="mt-5">
                  {txns.map((t) => (
                    <li
                      key={t.who}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-t border-white/[0.07] py-3.5 first:border-t-0 first:pt-0"
                    >
                      <div>
                        <p className="text-[13px] font-medium text-white/90">{t.who}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-white/45">{t.sub}</p>
                      </div>
                      <span className="tnum font-mono text-[13px] text-white/85">{t.amt}</span>
                      <span className="rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] text-white/70">
                        {t.st}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sparkline */}
              <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-sm font-semibold text-white/85">USD / INR</h4>
                  <span className="font-mono text-xs text-brand">30-day</span>
                </div>
                <svg viewBox="0 0 200 80" className="mt-5 h-24 w-full" aria-hidden>
                  <defs>
                    <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(234 163 0 / 0.35)" />
                      <stop offset="100%" stopColor="rgb(234 163 0 / 0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 60 L20 54 L40 58 L60 44 L80 48 L100 34 L120 40 L140 26 L160 30 L180 18 L200 22"
                    fill="none"
                    stroke="var(--color-brand)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0 60 L20 54 L40 58 L60 44 L80 48 L100 34 L120 40 L140 26 L160 30 L180 18 L200 22 L200 80 L0 80 Z"
                    fill="url(#spark)"
                  />
                </svg>
                <p className="mt-auto pt-4 font-mono text-[11px] text-white/45">
                  Indicative trend · call for a live quote
                </p>
              </div>
            </div>

            {/* Floating annotations */}
            <span className="absolute -top-3 right-8 hidden items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 font-mono text-[11px] font-medium text-ink shadow-[0_8px_24px_rgb(234_163_0_/_0.3)] lg:flex">
              <ShieldCheck className="size-3.5" aria-hidden />
              RBI-approved
            </span>
            <span className="absolute -bottom-3 left-10 hidden items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 font-mono text-[11px] font-medium text-ink shadow-[0_8px_24px_rgb(234_163_0_/_0.3)] lg:flex">
              <ArrowUpRight className="size-3.5" aria-hidden />
              Rate bettered
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
