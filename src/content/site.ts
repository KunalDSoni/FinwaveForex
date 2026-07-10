export const siteConfig = {
  name: "Finwave Forex",
  legalName: "Finwave Forex Pvt. Ltd.",
  tagline:
    "RBI-approved money changers with a decade of foreign-exchange experience.",
  // TODO: confirm production domain (finwaveforex.com assumed).
  url: "https://finwaveforex.com",
  phone: "+91 79 4891 6100",
  phoneHref: "tel:+917948916100",
  email: "info@finwaveforex.com",
  address: {
    line1: "Ground Floor, Raja Complex",
    line2: "Vijay Cross Road",
    city: "Ahmedabad",
    postalCode: "380009",
    region: "Gujarat",
    country: "IN",
  },
  cities: ["Ahmedabad", "Bangalore", "Chennai", "Cochin", "Kolkata", "Mumbai"],
  fulfilment: ["Home delivery", "Branch pick-up"],
  stats: [
    { value: 10, suffix: "+", label: "Years in foreign exchange" },
    { value: 15, suffix: "+", label: "Currencies exchanged" },
    { value: 6, suffix: "", label: "Cities served across India" },
  ],
  nav: [
    { label: "Services", href: "/services" },
    { label: "Rates", href: "/rates" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerLegal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  // TODO: RBI licence number not published on the current site.
  rbiLicence: "TODO: RBI licence number",
  // TODO: business hours not published on the current site.
  hours: "TODO: business hours",
} as const;

export type SiteConfig = typeof siteConfig;
