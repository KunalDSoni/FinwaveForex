"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, BadgeCheck } from "lucide-react";
import { changePct, fetchInrWithPrev, formatPrice, priceFromInr } from "@/lib/fx";
import { tickerQuotes } from "@/content/ticker";
import { cn } from "@/lib/utils";

const FALLBACK = tickerQuotes.find((q) => q.pair === "USD/INR") ?? {
  pair: "USD/INR",
  price: 88.9,
  changePct: 0,
};

type Live = { price: number; changePct: number; live: boolean };

export function QuoteCard() {
  const reduce = useReducedMotion();
  const [quote, setQuote] = useState<Live>({ ...FALLBACK, live: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetchInrWithPrev();
      if (!active) return;
      const inr = res?.today.inr["usd"];
      if (res && inr) {
        setQuote({
          price: priceFromInr(inr),
          changePct: changePct(inr, res.prev?.inr["usd"], FALLBACK.changePct),
          live: true,
        });
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const up = quote.changePct >= 0;

  return (
    <motion.div
      animate={reduce ? undefined : { y: [-6, 6] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      className="shadow-rich-lg mx-auto w-full max-w-sm rounded-2xl border border-hairline bg-white p-6"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-widest text-ink-soft uppercase">
          Exchange quote
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-brand-deep">
          <span className="relative flex size-2">
            {!reduce && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70" />
            )}
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          {quote.live ? "Live indicative" : "Indicative"}
        </span>
      </div>

      <div className="mt-5 rounded-xl border border-hairline bg-sand/50 p-4">
        <p className="text-xs text-ink-soft">You send</p>
        <p className="mt-1 text-2xl tracking-tight">
          <span className="font-mono">USD</span>{" "}
          <span className="text-ink-soft">· US Dollar</span>
        </p>
      </div>

      <div className="relative z-10 mx-auto -my-3 flex size-8 items-center justify-center rounded-full border border-hairline bg-white">
        <ArrowDown className="size-4 text-brand" aria-hidden />
      </div>

      <div className="rounded-xl border border-hairline bg-sand/50 p-4">
        <p className="text-xs text-ink-soft">You receive</p>
        <p className="mt-1 text-2xl tracking-tight">
          <span className="font-mono">INR</span>{" "}
          <span className="text-ink-soft">· Indian Rupee</span>
        </p>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-xs text-ink-soft">1 USD ≈</span>
          <span className="flex items-baseline gap-2">
            <span
              className={cn(
                "font-mono text-lg tabular-nums transition-opacity",
                loading && "animate-pulse opacity-60",
              )}
            >
              ₹{formatPrice(quote.price)}
            </span>
            <span className={cn("font-mono text-xs tabular-nums", up ? "text-pos" : "text-neg")}>
              {up ? "▲" : "▼"}
              {Math.abs(quote.changePct).toFixed(2)}%
            </span>
          </span>
        </div>
      </div>

      <p className="mt-3 font-mono text-[11px] text-ink-soft">
        {quote.live
          ? "Rate refreshed today · indicative only"
          : "Illustrative · ask us for today's rate"}
      </p>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-ink px-4 py-3">
        <p className="text-sm text-white/80">Ask us for today&apos;s rate</p>
        <span className="flex items-center gap-1.5 text-xs font-medium text-white">
          <BadgeCheck className="size-4 text-brand-tint" aria-hidden />
          RBI-approved
        </span>
      </div>
    </motion.div>
  );
}
