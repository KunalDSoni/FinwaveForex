import { CtaBand } from "@/components/sections/CtaBand";
import { RatesTable } from "@/components/sections/RatesTable";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Exchange Rates",
  description:
    "Indicative buy and sell rates for 15+ currencies. Call Finwave Forex for today's live quote.",
  path: "/rates",
});

export default function RatesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 lg:pt-44">
        <SectionHeading
          as="h1"
          eyebrow="Rates"
          lines={["Today's rates,", "on request."]}
          sub="Fifteen major currencies, bought and sold. One call gets you a live quote — and we'll try to better any rate you bring us."
        />
      </section>
      <section className="py-16 pb-24">
        <RatesTable />
      </section>
      <CtaBand />
    </>
  );
}
