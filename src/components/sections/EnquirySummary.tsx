"use client";

import { useSearchParams } from "next/navigation";
import { Mail, PhoneCall, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site";

/**
 * Echoes back the enquiry built in the hero quote card, and turns it into a
 * call or a pre-filled email. The legacy site captured the same fields
 * (quantity, currency, product, city) and submitted them; this keeps that intent
 * without pretending a form endpoint exists.
 *
 * Renders nothing when arrived at directly.
 */
export function EnquirySummary() {
  const params = useSearchParams();
  const pay = params.get("pay");
  const receive = params.get("receive");
  const product = params.get("product");
  const city = params.get("city");
  const mode = params.get("mode");
  const currency = params.get("currency");

  // Arrives either from the hero quote card (amounts) or a rates row (currency).
  const rows = [
    pay ? { label: mode === "sell" ? "You are selling" : "You are paying", value: pay } : null,
    receive ? { label: "You receive", value: receive } : null,
    currency ? { label: "Currency", value: currency } : null,
    product ? { label: "Product", value: product } : null,
    city ? { label: "City", value: city } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  if (rows.length === 0) return null;

  const subject = `Forex enquiry — ${product ?? "currency"} in ${city ?? siteConfig.address.city}`;
  const body = [
    "Hello Finwave Forex,",
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    "Please confirm today's rate.",
  ].join("\n");
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <div className="shadow-card mb-5 rounded-2xl border border-hairline bg-white p-8 ring-1 ring-brand/25">
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand text-ink">
          <Receipt className="size-5" aria-hidden />
        </span>
        <div>
          <p className="label-micro text-ink-soft">
            Your enquiry
          </p>
          <p className="mt-0.5 text-sm font-semibold">Quote it with the desk</p>
        </div>
      </div>

      <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="bg-canvas px-5 py-4">
            <dt className="label-micro text-ink-soft">
              {row.label}
            </dt>
            <dd className="tnum mt-1 text-sm font-semibold">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <a href={siteConfig.phoneHref}>
            <PhoneCall className="size-4" aria-hidden />
            Call the desk
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-ink/20 bg-white">
          <a href={mailto}>
            <Mail className="size-4" aria-hidden />
            Email this enquiry
          </a>
        </Button>
      </div>
      <p className="mt-4 text-xs leading-5 text-ink-soft">
        Rates shown are indicative and move through the day. We&apos;ll confirm the applicable rate
        when you call.
      </p>
    </div>
  );
}
