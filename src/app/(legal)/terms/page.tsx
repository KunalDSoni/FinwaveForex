import { notFound } from "next/navigation";
import { LegalArticle } from "@/components/sections/LegalArticle";
import { legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms governing the services of Finwave Forex Pvt. Ltd.",
  path: "/terms",
});

export default function TermsPage() {
  const page = legalPages.find((p) => p.slug === "terms");
  if (!page) notFound();
  return <LegalArticle page={page} />;
}
