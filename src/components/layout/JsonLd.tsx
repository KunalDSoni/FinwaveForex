import { siteConfig } from "@/content/site";

export function JsonLd() {
  const { address } = siteConfig;
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.tagline,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.line1}, ${address.line2}`,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    areaServed: siteConfig.cities.map((city) => ({ "@type": "City", name: city })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
