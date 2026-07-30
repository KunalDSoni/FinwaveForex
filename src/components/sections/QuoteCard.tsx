"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { cachedInrWithPrev, formatPrice, priceFromInr } from "@/lib/fx";
import { currencies, INR } from "@/content/rates";
import { tickerQuotes } from "@/content/ticker";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Product and city were captured by the legacy enquiry form and are what the
 * desk actually needs to quote: which instrument, and where it has to reach.
 * Options mirror content/services and siteConfig.cities.
 */
const PRODUCTS = [
  "Currency notes",
  "Travel card",
  "Travellers' cheques",
  "Outbound transfer (TT/DD)",
] as const;

/**
 * Illustrative INR-per-unit fallbacks, reused from the ticker content so the
 * card shows a plausible quote before the live feed resolves (and if it never
 * does). Live values overwrite these.
 */
const FALLBACK_INR_PER_UNIT: Record<string, number> = Object.fromEntries(
  tickerQuotes.map((quote) => [quote.pair.split("/")[0], quote.price]),
);

/** "buy" = customer buys foreign currency with rupees; "sell" = the reverse. */
type Mode = "buy" | "sell";

const MODES: { id: Mode; label: string }[] = [
  { id: "buy", label: "Buy currency" },
  { id: "sell", label: "Sell currency" },
];

/** Opening amount per mode: a realistic forex ticket rather than a token value. */
const DEFAULT_ENTRY: Record<Mode, number> = { buy: 100000, sell: 1000 };

const inrFormat = new Intl.NumberFormat("en-IN");
const fxFormat = new Intl.NumberFormat("en-US");

function formatAmount(value: number, currency: string, decimals: number) {
  const format = currency === "INR" ? inrFormat : fxFormat;
  return format.format(Number(value.toFixed(decimals)));
}

type FieldProps = {
  id: string;
  label: string;
  currency: string;
  flag: string;
  value: string;
  onChange: (digits: string) => void;
  onCurrencyChange?: (code: string) => void;
  emphasis?: boolean;
};

/** One amount row: currency picker on the left, editable amount on the right. */
function AmountField({
  id,
  label,
  currency,
  flag,
  value,
  onChange,
  onCurrencyChange,
  emphasis,
}: FieldProps) {
  return (
    <div className="px-5 py-5 transition-colors focus-within:bg-brand-tint/25 sm:px-6">
      <label htmlFor={id} className="text-[13px] font-medium text-ink-soft">
        {label}
      </label>
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <span
          className={cn(
            "relative inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline bg-canvas py-2 pr-3 pl-3.5 text-[15px] font-semibold transition-colors",
            onCurrencyChange
              ? "cursor-pointer hover:border-brand focus-within:border-brand focus-within:ring-3 focus-within:ring-brand/25"
              : "cursor-default",
          )}
        >
          <span aria-hidden>{flag}</span>
          {currency}
          {onCurrencyChange ? (
            <>
              <ChevronDown className="size-4 text-ink-soft" aria-hidden />
              <select
                aria-label="Foreign currency"
                value={currency}
                onChange={(event) => onCurrencyChange(event.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                {currencies.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code} — {item.name}
                  </option>
                ))}
              </select>
            </>
          ) : null}
        </span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/[^\d]/g, "").slice(0, 12))}
          placeholder="0"
          className={cn(
            "tnum w-full min-w-0 bg-transparent text-right tracking-tight outline-none placeholder:text-ink-soft/40",
            emphasis ? "text-[2rem] font-bold sm:text-4xl" : "text-2xl font-semibold sm:text-[1.75rem]",
          )}
        />
      </div>
    </div>
  );
}

export function QuoteCard() {
  const [mode, setMode] = useState<Mode>("buy");
  const [code, setCode] = useState("USD");
  const [entry, setEntry] = useState<{ side: "pay" | "receive"; value: number }>({
    side: "pay",
    value: DEFAULT_ENTRY.buy,
  });
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [product, setProduct] = useState<string>(PRODUCTS[0]);
  const [city, setCity] = useState<string>(siteConfig.cities[0]);

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

  const currency = currencies.find((item) => item.code === code) ?? currencies[0];
  const live = rates?.[code.toLowerCase()];
  /** Rupees per one unit of the selected foreign currency. */
  const inrPerUnit = live ? priceFromInr(live) : FALLBACK_INR_PER_UNIT[code];

  const pay = mode === "buy" ? INR : currency;
  const receive = mode === "buy" ? currency : INR;

  const { payValue, receiveValue } = useMemo(() => {
    // Buying: rupees in, foreign out. Selling: foreign in, rupees out.
    const toReceive = (amount: number) =>
      mode === "buy" ? amount / inrPerUnit : amount * inrPerUnit;
    const toPay = (amount: number) =>
      mode === "buy" ? amount * inrPerUnit : amount / inrPerUnit;
    return entry.side === "pay"
      ? { payValue: entry.value, receiveValue: toReceive(entry.value) }
      : { payValue: toPay(entry.value), receiveValue: entry.value };
  }, [entry, mode, inrPerUnit]);

  // The side being typed into shows the raw entry; the other shows a formatted
  // conversion (rupees lose their decimals once the number gets large).
  const decimalsFor = (currencyCode: string, value: number) =>
    currencyCode === "INR" && value >= 100000 ? 0 : 2;

  const payDisplay =
    entry.side === "pay"
      ? payValue
        ? formatAmount(payValue, pay.code, 0)
        : ""
      : formatAmount(payValue, pay.code, decimalsFor(pay.code, payValue));
  const receiveDisplay =
    entry.side === "receive"
      ? receiveValue
        ? formatAmount(receiveValue, receive.code, 0)
        : ""
      : formatAmount(receiveValue, receive.code, decimalsFor(receive.code, receiveValue));

  /** Passed to Contact so the enquiry survives the click. */
  const enquiry = {
    mode,
    pay: `${payValue.toFixed(2)} ${pay.code}`,
    receive: `${receiveValue.toFixed(2)} ${receive.code}`,
    product,
    city,
  };

  function selectMode(next: Mode) {
    setMode(next);
    setEntry({ side: "pay", value: DEFAULT_ENTRY[next] });
  }

  return (
    // Deliberately static: this is a form with tabs, selects and two text
    // inputs, so a perpetual float would make every control a moving target.
    <div className="shadow-quote mx-auto w-full max-w-md rounded-[26px] bg-white p-2.5">
      <div className="rounded-[19px] border border-hairline-soft bg-canvas">
        {/* Mode + live status */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline-soft px-3 py-3">
          <div role="tablist" aria-label="Exchange direction" className="flex gap-1">
            {MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={mode === item.id}
                onClick={() => selectMode(item.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none",
                  mode === item.id
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:bg-sand/70 hover:text-ink",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-1.5 pr-1.5 text-[11px] font-medium text-ink-soft">
            <span
              className={cn("size-1.5 rounded-full", live ? "animate-live bg-pos" : "bg-hairline")}
              aria-hidden
            />
            {live ? "Live" : "Indicative"}
          </span>
        </div>

        {/* Amounts */}
        <div className="divide-y divide-hairline-soft">
          <AmountField
            id="quote-pay"
            label="You pay"
            currency={pay.code}
            flag={pay.flag}
            value={payDisplay}
            onChange={(digits) => setEntry({ side: "pay", value: digits ? Number(digits) : 0 })}
            onCurrencyChange={mode === "sell" ? setCode : undefined}
            emphasis
          />
          <AmountField
            id="quote-receive"
            label="You receive"
            currency={receive.code}
            flag={receive.flag}
            value={receiveDisplay}
            onChange={(digits) => setEntry({ side: "receive", value: digits ? Number(digits) : 0 })}
            onCurrencyChange={mode === "buy" ? setCode : undefined}
            emphasis
          />
        </div>

        {/* What and where — the two things the desk needs beyond the amount. */}
        <div className="grid grid-cols-2 divide-x divide-hairline-soft border-t border-hairline-soft">
          <label className="flex flex-col gap-1.5 px-5 py-3.5 sm:px-6">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-soft uppercase">
              Product
            </span>
            <span className="relative flex items-center justify-between gap-2">
              <span className="truncate text-[13px] font-semibold">{product}</span>
              <ChevronDown className="size-3.5 shrink-0 text-ink-soft" aria-hidden />
              <select
                aria-label="Product"
                value={product}
                onChange={(event) => setProduct(event.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                {PRODUCTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <label className="flex flex-col gap-1.5 px-5 py-3.5 sm:px-6">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-soft uppercase">
              City
            </span>
            <span className="relative flex items-center justify-between gap-2">
              <span className="truncate text-[13px] font-semibold">{city}</span>
              <ChevronDown className="size-3.5 shrink-0 text-ink-soft" aria-hidden />
              <select
                aria-label="City"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                {siteConfig.cities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </span>
          </label>
        </div>

        {/* Rate */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-hairline-soft px-5 py-3.5 sm:px-6">
          <span className="text-[13px] text-ink-soft">Rate today</span>
          <span className="tnum text-[13px] font-semibold">
            1 {currency.code} = ₹{formatPrice(inrPerUnit)}
          </span>
        </div>
      </div>

      <div className="px-1.5 pt-3.5 pb-1.5">
        <Link
          href={{ pathname: "/contact", query: enquiry }}
          className="btn-sweep group flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold"
        >
          Get this rate
          <ArrowRight
            className="size-5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] leading-4 text-ink-soft">
          <ShieldCheck className="size-3.5 shrink-0 text-brand-deep" aria-hidden />
          RBI-approved money changer · we&apos;ll work to better any quote
        </p>
      </div>
    </div>
  );
}
