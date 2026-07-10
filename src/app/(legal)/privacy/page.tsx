import { notFound } from "next/navigation";
import { LegalArticle } from "@/components/sections/LegalArticle";
import { legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Finwave Forex Pvt. Ltd. collects and uses your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const page = legalPages.find((p) => p.slug === "privacy");
  if (!page) notFound();
  return <LegalArticle page={page} />;
}
