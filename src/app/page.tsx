import type { Metadata } from "next";
import { CitiesSection } from "@/components/sections/CitiesSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { DeskShowcase } from "@/components/sections/DeskShowcase";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MarketTicker } from "@/components/sections/MarketTicker";
import { PullQuote } from "@/components/sections/PullQuote";
import { RatesTeaser } from "@/components/sections/RatesTeaser";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { WhyFinwave } from "@/components/sections/WhyFinwave";
import { pageMetadata } from "@/lib/seo";

const base = pageMetadata({
  title: "Finwave Forex: RBI-Approved Money Changers in Ahmedabad",
  description:
    "Buy and sell 30 major currencies, send money abroad by TT or DD, and load travel cards with RBI-approved money changers. Home delivery in six cities across India.",
  path: "/",
});

export const metadata: Metadata = {
  ...base,
  title: { absolute: "Finwave Forex: RBI-Approved Money Changers in Ahmedabad" },
};

export default function Home() {
  return (
    <>
      {/* Live rate tape sits directly under the fixed header. */}
      <MarketTicker className="mt-[72px]" />
      <Hero />
      {/* Proof of scale, then what we do, then how simple it is. */}
      <StatsBand innerClassName="pt-2 pb-20 lg:pt-4 lg:pb-24" />
      <ServicesGrid />
      <HowItWorks />
      <WhyFinwave />
      <DeskShowcase />
      <RatesTeaser />
      <PullQuote />
      <CitiesSection />
      <CtaBand />
    </>
  );
}
