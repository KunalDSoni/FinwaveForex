import type { Metadata } from "next";
import { CitiesSection } from "@/components/sections/CitiesSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { RatesTeaser } from "@/components/sections/RatesTeaser";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { pageMetadata } from "@/lib/seo";

const base = pageMetadata({
  title: "Finwave Forex — RBI-Approved Money Changers in Ahmedabad",
  description:
    "Buy and sell 15+ currencies, send money abroad, and load travel cards with RBI-approved money changers. Home delivery in six cities across India.",
  path: "/",
});

export const metadata: Metadata = {
  ...base,
  title: { absolute: "Finwave Forex — RBI-Approved Money Changers in Ahmedabad" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <RatesTeaser />
      <StatsBand />
      <CitiesSection />
      <CtaBand />
    </>
  );
}
