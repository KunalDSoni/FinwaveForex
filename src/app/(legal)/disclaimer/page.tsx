import { notFound } from "next/navigation";
import { LegalArticle } from "@/components/sections/LegalArticle";
import { legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description:
    "Terms accepted when booking foreign exchange with Finwave Forex Pvt. Ltd., including the cancellation policy for fixed-rate and non-margin transactions.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const page = legalPages.find((p) => p.slug === "disclaimer");
  if (!page) notFound();
  return <LegalArticle page={page} />;
}
