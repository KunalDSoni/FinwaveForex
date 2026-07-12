"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cachedInrWithPrev } from "@/lib/fx";
import { cn } from "@/lib/utils";

// Currencies a beneficiary can receive. `flag` is the emoji; `rate` is an
// illustrative INR→X (units of X per 1 INR) fallback used until the live feed
// resolves — the live values overwrite these.
const CURRENCIES = [
  { code: "USD", flag: "🇺🇸", rate: 1 / 88.9123 },
  { code: "GBP", flag: "🇬🇧", rate: 1 / 112.5041 },
  { code: "EUR", flag: "🇪🇺", rate: 1 / 96.4287 },
  { code: "AED", flag: "🇦🇪", rate: 1 / 24.2098 },
  { code: "AUD", flag: "🇦🇺", rate: 1 / 57.6413 },
  { code: "CAD", flag: "🇨🇦", rate: 1 / 62.1338 },
  { code: "SGD", flag: "🇸🇬", rate: 1 / 66.2075 },
  { code: "SAR", flag: "🇸🇦", rate: 1 / 23.7052 },
] as const;

const fmt = (n: number, dp: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });

export function QuoteCard() {
  const reduce = useReducedMotion();
  const [send, setSend] = useState(1000);
  const [code, setCode] = useState<string>("USD");
  const [rates, setRates] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await cachedInrWithPrev();
      if (active && res) setRates(res.today.inr);
    })();
    return () => {
      active = false;
    };
  }, []);

  const selected = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
  const live = rates?.[code.toLowerCase()];
  const rate = live ?? selected.rate;
  const received = send * rate;

  return (
    <motion.div
      animate={reduce ? undefined : { y: [-6, 6] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      className="shadow-rich-lg mx-auto w-full max-w-md rounded-[28px] border border-hairline bg-white p-4 sm:p-5"
    >
      {/* You send */}
      <div className="rounded-2xl border border-hairline bg-white p-5 shadow-soft sm:p-6">
        <label htmlFor="quote-send" className="text-sm text-ink-soft">
          You send
        </label>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline bg-white px-3.5 py-2 text-base font-semibold">
            <span aria-hidden>🇮🇳</span> INR
          </span>
          <input
            id="quote-send"
            inputMode="numeric"
            aria-label="Amount to send in Indian rupees"
            value={send ? send.toLocaleString("en-US") : ""}
            onChange={(e) => {
              const digits = e.target.value.replace(/[^\d]/g, "").slice(0, 12);
              setSend(digits ? Number(digits) : 0);
            }}
            placeholder="0"
            className="w-full min-w-0 bg-transparent text-right text-4xl font-bold tracking-tight tabular-nums outline-none placeholder:text-ink-soft/40"
          />
        </div>
      </div>

      {/* Connector */}
      <div className="flex h-6 items-center pl-9" aria-hidden>
        <span className="h-full w-[3px] rounded-full bg-brand-deep/80" />
      </div>

      {/* Beneficiary receives */}
      <div className="rounded-2xl border border-hairline bg-white p-5 shadow-soft sm:p-6">
        <p className="text-sm text-ink-soft">Beneficiary receives</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="relative inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline bg-white px-3.5 py-2 text-base font-semibold transition-colors hover:border-brand/50">
            <span aria-hidden>{selected.flag}</span> {selected.code}
            <ChevronDown className="size-4 text-ink-soft" aria-hidden />
            <select
              aria-label="Currency the beneficiary receives"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </span>
          <span
            className={cn(
              "text-right text-4xl font-bold tracking-tight tabular-nums transition-opacity",
              !rates && "opacity-70",
            )}
          >
            {fmt(received, received >= 1000 ? 0 : 2)}
          </span>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/contact"
        className="group mt-4 flex items-center justify-between rounded-full border border-brand-deep/40 px-6 py-4 text-base font-semibold text-brand-deep transition-colors hover:bg-brand-deep hover:text-white"
      >
        Talk to the desk
        <ArrowRight
          className="size-5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </Link>

      <p className="mt-3 text-center text-[11px] text-ink-soft">
        {`${live ? "Live indicative rate" : "Indicative rate"} · we'll work to better any quote.`}
      </p>
    </motion.div>
  );
}
