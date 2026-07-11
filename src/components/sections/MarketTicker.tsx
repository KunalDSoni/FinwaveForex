"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { tickerQuotes, type TickerQuote } from "@/content/ticker";
import {
  cachedInrWithPrev,
  changePct,
  formatPrice,
  priceFromInr,
  type InrResponse,
} from "@/lib/fx";

function buildQuotes(today: InrResponse, prev: InrResponse | null): TickerQuote[] {
  return tickerQuotes.map((quote) => {
    const code = quote.pair.split("/")[0].toLowerCase();
    const todayInr = today.inr[code];
    if (!todayInr) return quote; // unknown code — keep illustrative fallback
    return {
      ...quote,
      price: priceFromInr(todayInr),
      changePct: changePct(todayInr, prev?.inr[code], quote.changePct),
    };
  });
}

function Quote({ quote }: { quote: TickerQuote }) {
  const up = quote.changePct >= 0;
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap">
      <span className="text-ink-soft">{quote.pair}</span>
      <span className="font-mono font-medium tabular-nums text-ink">{formatPrice(quote.price)}</span>
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
          up
            ? "bg-[rgb(22_163_74_/_0.1)] text-[#15803d]"
            : "bg-[rgb(220_38_38_/_0.1)] text-[#b91c1c]",
        )}
      >
        <span aria-hidden>{up ? "▲" : "▼"}</span>
        {Math.abs(quote.changePct).toFixed(2)}%
      </span>
    </span>
  );
}

function TickerRow({ quotes, hidden }: { quotes: TickerQuote[]; hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-9 pr-9 text-[13px]"
    >
      {quotes.map((quote) => (
        <Quote key={quote.pair} quote={quote} />
      ))}
    </div>
  );
}

export function MarketTicker({ className }: { className?: string }) {
  const [quotes, setQuotes] = useState<TickerQuote[]>(tickerQuotes);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await cachedInrWithPrev();
      if (res && active) setQuotes(buildQuotes(res.today, res.prev));
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      aria-label="Indicative exchange rates"
      className={cn(
        "group overflow-hidden border-y border-hairline bg-white/70 py-3 backdrop-blur-sm",
        className,
      )}
    >
      <p className="sr-only">
        Indicative INR exchange rates. Illustrative only — call us for a live quote.
      </p>
      <div className="flex w-max animate-marquee [--marquee-duration:48s] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <TickerRow quotes={quotes} />
        <TickerRow quotes={quotes} hidden />
      </div>
    </section>
  );
}
