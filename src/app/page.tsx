import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CitiesSection } from "@/components/sections/CitiesSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { EditorialSplit } from "@/components/sections/EditorialSplit";
import { Em } from "@/components/sections/Em";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LeadershipTeaser } from "@/components/sections/LeadershipTeaser";
import { MarketTicker } from "@/components/sections/MarketTicker";
import { RatesTeaser } from "@/components/sections/RatesTeaser";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { WhyFinwave } from "@/components/sections/WhyFinwave";
import { siteConfig } from "@/content/site";
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

      {/* Ticker → hero → services → story → how it works → why us → stats → leadership → rates → coverage → cta. */}
      <ServicesGrid />

      <EditorialSplit
        eyebrow="The Finwave desk"
        title={
          <>
            A real forex desk, not a <Em>black box.</Em>
          </>
        }
        body={
          <>
            <p>
              Quote by phone, confirm a live rate, and receive your currency at home or at the
              branch. Every transaction is RBI-compliant and fully documented before anything
              moves.
            </p>
            <p>
              You deal with the same desk each time — people who know your file, your purpose and
              the paperwork it needs.
            </p>
          </>
        }
        photo={{
          src: "/photography/exchange-desk.webp",
          alt: "Foreign currency notes on the Finwave Forex exchange desk",
          width: 1280,
          height: 548,
        }}
        media="end"
        variant="sand"
        bordered
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" variant="outline" className="border-ink/20 bg-white/70">
            <a href={siteConfig.phoneHref}>
              <PhoneCall className="size-4" aria-hidden />
              {siteConfig.phone}
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost" className="group">
            <Link href="/about">
              Meet the team
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Button>
        </div>
      </EditorialSplit>

      <HowItWorks />
      <WhyFinwave />
      <StatsBand innerClassName="pt-0 lg:pt-0" />
      <LeadershipTeaser />
      <RatesTeaser />
      <CitiesSection />
      <CtaBand />
    </>
  );
}
