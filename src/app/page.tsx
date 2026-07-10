import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
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
  return <Hero />;
}
