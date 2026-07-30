import { Fragment } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CtaBand } from "@/components/sections/CtaBand";
import { Em } from "@/components/sections/Em";
import { RatesTable } from "@/components/sections/RatesTable";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { currencies } from "@/content/rates";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Exchange Rates",
  description:
    "Indicative reference rates for major currencies, updated daily. Call Finwave Forex for the rate you'll actually transact at.",
  path: "/rates",
});

export default function RatesPage() {
  return (
    <>
      <section className="mx-auto max-w-page px-5 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <Breadcrumb trail={[{ label: "Rates" }]} />
        <SectionHeading
          as="h1"
          layout="split"
          lines={[
            <Fragment key="l1">Today&apos;s rates,</Fragment>,
            <Fragment key="l2">
              and the <Em>real</Em> one.
            </Fragment>,
          ]}
          sub={`Reference rates for our ${currencies.length} most-requested currencies, updated daily. We exchange 30 in total — and the rate you transact at is the one we confirm on the call.`}
        />
      </section>

      <section className="pt-14 pb-24 lg:pt-16 lg:pb-32">
        <RatesTable />
      </section>

      <CtaBand
        lines={[
          <Fragment key="l1">The rate above is</Fragment>,
          <Fragment key="l2">
            not your <Em tone="dark">final rate.</Em>
          </Fragment>,
        ]}
        body="Tell us the currency, the amount and the product, and we'll quote the rate you actually transact at."
      />
    </>
  );
}
