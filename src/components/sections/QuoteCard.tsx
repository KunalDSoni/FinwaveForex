"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, BadgeCheck } from "lucide-react";

export function QuoteCard() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      animate={reduce ? undefined : { y: [-6, 6] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      className="mx-auto w-full max-w-sm rounded-2xl border border-hairline bg-white p-6 shadow-[0_24px_60px_-24px_rgb(47_44_37_/_0.16)]"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-widest text-ink-soft uppercase">
          Exchange quote
        </span>
        <span className="rounded-full bg-brand-tint px-2.5 py-1 text-xs font-medium text-brand-deep">
          Illustrative
        </span>
      </div>

      <div className="mt-5 rounded-xl border border-hairline bg-sand/50 p-4">
        <p className="text-xs text-ink-soft">You send</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">
          USD <span className="text-ink-soft">· US Dollar</span>
        </p>
      </div>

      <div className="relative z-10 mx-auto -my-3 flex size-8 items-center justify-center rounded-full border border-hairline bg-white">
        <ArrowDown className="size-4 text-brand" aria-hidden />
      </div>

      <div className="rounded-xl border border-hairline bg-sand/50 p-4">
        <p className="text-xs text-ink-soft">You receive</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">
          INR <span className="text-ink-soft">· Indian Rupee</span>
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-ink px-4 py-3">
        <p className="text-sm text-white/80">Ask us for today&apos;s rate</p>
        <span className="flex items-center gap-1.5 text-xs font-medium text-white">
          <BadgeCheck className="size-4 text-brand-tint" aria-hidden />
          RBI-approved
        </span>
      </div>
    </motion.div>
  );
}
