"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { tickerQuotes, type TickerQuote } from "@/content/ticker";

// Free, keyless, CORS-enabled FX data (community-run, ~daily updates).
// Primary: jsDelivr CDN. Fallback: the project's Cloudflare Pages mirror.
// Docs: https://github.com/fawazahmed0/exchange-api
type InrResponse = { date: string; inr: Record<string, number> };

function datedUrls(tag: string): string[] {
  // tag is "latest" or a "YYYY-MM-DD" date.
  return [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${tag}/v1/currencies/inr.json`,
    `https://${tag}.currency-api.pages.dev/v1/currencies/inr.json`,
  ];
}

async function fetchInr(tag: string): Promise<InrResponse | null> {
  for (const url of datedUrls(tag)) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const json = (await res.json()) as InrResponse;
      if (json?.inr) return json;
    } catch {
      // try next url
    }
  }
  return null;
}

function buildQuotes(today: InrResponse, prev: InrResponse | null): TickerQuote[] {
  return tickerQuotes.map((quote) => {
    const code = quote.pair.split("/")[0].toLowerCase();
    const todayInr = today.inr[code];
    if (!todayInr) return quote; // unknown code — keep illustrative fallback
    const price = 1 / todayInr; // API gives INR→X; we want INR per 1 X
    const prevInr = prev?.inr[code];
    // Change in price (INR per X): prevInr/todayInr - 1, since price = 1/inr.
    const changePct =
      prevInr && prevInr > 0 ? (prevInr / todayInr - 1) * 100 : quote.changePct;
    return { ...quote, price, changePct };
  });
}

function formatPrice(price: number) {
  // Small-value pairs (e.g. JPY/INR) need more precision to be meaningful.
  return price >= 1 ? price.toFixed(4) : price.toFixed(6);
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
      const today = await fetchInr("latest");
      if (!today) return; // keep illustrative fallback

      // Walk back up to 5 days to find the previous published rate (skips
      // weekends/holidays) for a real 24h change.
      let prev: InrResponse | null = null;
      const base = new Date(`${today.date}T00:00:00Z`);
      for (let i = 1; i <= 5 && !prev; i += 1) {
        const d = new Date(base);
        d.setUTCDate(d.getUTCDate() - i);
        prev = await fetchInr(d.toISOString().slice(0, 10));
      }

      if (active) setQuotes(buildQuotes(today, prev));
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
