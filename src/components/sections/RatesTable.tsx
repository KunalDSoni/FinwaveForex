import Link from "next/link";
import { Info } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { LiveRate } from "@/components/sections/LiveRate";
import { currencies } from "@/content/rates";
import { siteConfig } from "@/content/site";

function RateCell({ value, code }: { value: number | null; code: string }) {
  if (value !== null) {
    return <span className="font-mono tabular-nums">₹ {value.toFixed(2)}</span>;
  }
  return (
    <span className="flex items-center gap-2">
      <LiveRate code={code} className="font-mono text-sm tabular-nums text-ink-soft" />
      <Link
        href="/contact"
        className="inline-block rounded-full bg-brand-tint px-3 py-1 text-xs font-medium text-brand-deep transition-colors hover:bg-brand hover:text-white"
      >
        Ask us
      </Link>
    </span>
  );
}

export function RatesTable() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Reveal>
        <div className="flex items-start gap-3 rounded-2xl border border-hairline bg-brand-tint/60 p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-brand-deep" aria-hidden />
          <p className="text-sm leading-6 text-brand-deep">
            Rates shown are indicative only. We can surely better this rate for you, call{" "}
            <a href={siteConfig.phoneHref} className="font-semibold underline underline-offset-2">
              {siteConfig.phone}
            </a>{" "}
            for today&apos;s live quote.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-hairline bg-white">
          <table className="w-full min-w-130 text-left">
            <caption className="sr-only">Indicative buy and sell rates by currency</caption>
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-hairline text-xs font-semibold tracking-widest text-ink-soft uppercase">
                <th scope="col" className="px-6 py-4">Currency</th>
                <th scope="col" className="px-6 py-4">Code</th>
                <th scope="col" className="px-6 py-4">We buy</th>
                <th scope="col" className="px-6 py-4">We sell</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {currencies.map((currency) => (
                <tr key={currency.code} className="transition-colors hover:bg-sand/50">
                  <th scope="row" className="px-6 py-4 font-medium">
                    {currency.name}
                  </th>
                  <td className="px-6 py-4 font-mono text-sm text-ink-soft">{currency.code}</td>
                  <td className="px-6 py-4">
                    <RateCell value={currency.indicativeBuy} code={currency.code} />
                  </td>
                  <td className="px-6 py-4">
                    <RateCell value={currency.indicativeSell} code={currency.code} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}
