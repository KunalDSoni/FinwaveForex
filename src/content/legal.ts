export type LegalPage = {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
};

const TODO_LEGAL =
  "TODO: This section requires review and final wording from Finwave Forex Pvt. Ltd. and its legal counsel. Placeholder only — not legal text.";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "TODO: set effective date",
    sections: [
      { heading: "Information we collect", body: TODO_LEGAL },
      { heading: "How we use your information", body: TODO_LEGAL },
      { heading: "KYC and regulatory obligations", body: TODO_LEGAL },
      { heading: "Data retention", body: TODO_LEGAL },
      {
        heading: "Contact",
        body: "Questions about this policy: info@finwaveforex.com.",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "TODO: set effective date",
    sections: [
      { heading: "Services", body: TODO_LEGAL },
      { heading: "Rates and quotations", body: TODO_LEGAL },
      { heading: "KYC requirements", body: TODO_LEGAL },
      { heading: "Limitation of liability", body: TODO_LEGAL },
      { heading: "Governing law", body: TODO_LEGAL },
    ],
  },
];
