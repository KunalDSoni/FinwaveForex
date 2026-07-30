"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Info, PhoneCall, Search } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { currencies } from "@/content/rates";
import { siteConfig } from "@/content/site";
import { tickerQuotes } from "@/content/ticker";
import { cachedInrWithPrev, changePct, formatPrice, priceFromInr } from "@/lib/fx";
import { cn } from "@/lib/utils";

/** Illustrative INR-per-unit values used until the feed resolves. */
const FALLBACK: Record<string, number> = Object.fromEntries(
  tickerQuotes.map((q) => [q.pair.split("/")[0], q.price]),
);

type Row = { code: string; name: string; flag: string; inr: number; change: number | null };

/**
 * One reference-rate column, not a buy column and a sell column.
 *
 * `indicativeBuy` and `indicativeSell` are null for every currency, so the
 * previous two-column table rendered the same mid-market figure twice — telling
 * visitors a money changer trades at zero spread. A single clearly-labelled
 * reference rate plus an explicit note about spreads is both honest and more
 * useful.
 */
export function RatesTable() {
  const [live, setLive] = useState<{
    today: Record<string, number>;
    prev: Record<string, number> | null;
    date: string | null;
  } | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await cachedInrWithPrev();
      if (res && active) {
        setLive({ today: res.today.inr, prev: res.prev?.inr ?? null, date: res.today.date });
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const rows: Row[] = useMemo(
    () =>
      currencies.map((c) => {
        const key = c.code.toLowerCase();
        const todayInr = live?.today[key];
        const inr = todayInr ? priceFromInr(todayInr) : FALLBACK[c.code];
        const prevInr = live?.prev?.[key];
        const change = todayInr && prevInr ? changePct(todayInr, prevInr, 0) : null;
        return { code: c.code, name: c.name, flag: c.flag, inr, change };
      }),
    [live],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q));
  }, [rows, query]);

  const asOf = live?.date
    ? new Date(`${live.date}T00:00:00Z`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <label
              htmlFor="rate-search"
              className="text-[11px] font-semibold tracking-[0.14em] text-ink-soft uppercase"
            >
              Find a currency
            </label>
            <div className="mt-2 flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2.5 focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/25 sm:w-80">
              <Search className="size-4 shrink-0 text-ink-soft" aria-hidden />
              <input
                id="rate-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="US Dollar, GBP, AED…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink-soft/60"
              />
            </div>
          </div>
          <p className="flex items-center gap-2 text-xs text-ink-soft">
            <span
              className={cn("size-1.5 rounded-full", live ? "animate-live bg-pos" : "bg-hairline")}
              aria-hidden
            />
            {asOf ? `Reference rates as of ${asOf}` : "Indicative reference rates"}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="shadow-card mt-6 overflow-hidden rounded-2xl border border-hairline bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left">
              <caption className="sr-only">
                Indicative mid-market reference rates in rupees per unit of foreign currency
              </caption>
              <thead>
                <tr className="border-b border-hairline text-[11px] font-semibold tracking-[0.12em] text-ink-soft uppercase">
                  <th scope="col" className="px-6 py-4">
                    Currency
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    Reference rate
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    24h
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    Your rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {filtered.map((row) => {
                  const up = (row.change ?? 0) >= 0;
                  return (
                    <tr key={row.code} className="transition-colors hover:bg-sand/40">
                      <th scope="row" className="px-6 py-4 font-normal">
                        <span className="flex items-center gap-3">
                          <span className="text-lg leading-none" aria-hidden>
                            {row.flag}
                          </span>
                          <span>
                            <span className="block text-sm font-semibold tracking-tight">
                              {row.code}
                            </span>
                            <span className="block text-xs text-ink-soft">{row.name}</span>
                          </span>
                        </span>
                      </th>
                      <td className="tnum px-6 py-4 text-right text-sm font-semibold">
                        ₹{formatPrice(row.inr)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {row.change === null ? (
                          <span className="text-xs text-ink-soft">—</span>
                        ) : (
                          <span
                            className={cn(
                              "tnum inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                              up
                                ? "bg-[rgb(22_163_74_/_0.1)] text-pos"
                                : "bg-[rgb(220_38_38_/_0.1)] text-neg",
                            )}
                          >
                            <span aria-hidden>{up ? "▲" : "▼"}</span>
                            {Math.abs(row.change).toFixed(2)}%
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={{
                            pathname: "/contact",
                            query: { product: "Currency notes", currency: row.code },
                          }}
                          className="inline-block rounded-full bg-brand-tint px-3.5 py-1.5 text-xs font-semibold text-brand-deep transition-colors hover:bg-brand hover:text-ink"
                        >
                          Ask us
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-ink-soft">
              No currency matches “{query}”. We exchange 30 major currencies — call the desk and ask.
            </p>
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-hairline bg-brand-tint/50 p-6 sm:flex-row sm:items-center sm:justify-between lg:p-7">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-5 shrink-0 text-brand-deep" aria-hidden />
            <p className="max-w-2xl text-sm leading-6 text-brand-deep">
              These are indicative mid-market reference rates, not the price you transact at. Buying
              and selling rates carry a spread that depends on the currency, the amount and the
              product — so we quote your rate on the call, and we&apos;ll work to better any quote
              you already have.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <a href={siteConfig.phoneHref}>
              <PhoneCall className="size-4" aria-hidden />
              Get your rate
            </a>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
