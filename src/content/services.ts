export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: "Banknote" | "Send" | "CreditCard" | "Building2";
  blurb: string;
  description: string;
  features: string[];
  steps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "currency-exchange",
    name: "Currency Exchange",
    shortName: "Exchange",
    icon: "Banknote",
    blurb:
      "Buy and sell foreign currency notes and traveller's cheques at competitive market rates.",
    description:
      "Exchange 15+ major currencies — from US dollars to Kuwaiti dinar — with an RBI-approved money changer. We buy and sell currency notes and traveller's cheques, with home delivery or branch pick-up in six cities.",
    features: [
      "15+ currencies bought and sold",
      "Traveller's cheques encashed and issued",
      "Home delivery or branch pick-up",
      "Competitive rates — ask us to better your quote",
    ],
    steps: [
      {
        title: "Tell us your requirement",
        body: "Choose the currency, amount, and whether you're buying or selling.",
      },
      {
        title: "Get a live quote",
        body: "We confirm today's rate over phone or email — and try to better any rate you have.",
      },
      {
        title: "Delivery or pick-up",
        body: "Receive your currency by home delivery or collect it from our Ahmedabad office.",
      },
    ],
    faqs: [
      {
        q: "Which currencies do you exchange?",
        a: "USD, GBP, EUR, AUD, SGD, THB, SAR, AED, CAD, NZD, HKD, CNY, OMR, KWD and CHF.",
      },
      {
        q: "What documents do I need?",
        a: "TODO: confirm KYC document list with Finwave Forex.",
      },
    ],
  },
  {
    slug: "remittance",
    name: "Wire Transfers & Remittance",
    shortName: "Remittance",
    icon: "Send",
    blurb:
      "Outward wire transfers (TT/DD) for education, family maintenance, and travel.",
    description:
      "Send money abroad through wire transfer (TT) or demand draft (DD) with an RBI-approved money changer handling the paperwork and compliance.",
    features: [
      "Telegraphic transfers (TT) and demand drafts (DD)",
      "RBI-compliant documentation handled for you",
      "Competitive exchange rates on transfers",
      "TODO: confirm supported remittance purposes and limits",
    ],
    steps: [
      {
        title: "Share transfer details",
        body: "Beneficiary, destination, currency, and purpose of the remittance.",
      },
      {
        title: "Complete documentation",
        body: "We guide you through the KYC and LRS paperwork required by RBI.",
      },
      {
        title: "Funds dispatched",
        body: "Your transfer is sent by TT or DD and we confirm once it's on its way.",
      },
    ],
    faqs: [
      {
        q: "How long does a wire transfer take?",
        a: "TODO: confirm typical TT/DD timelines with Finwave Forex.",
      },
      {
        q: "What are the transfer limits?",
        a: "TODO: confirm limits under the RBI Liberalised Remittance Scheme.",
      },
    ],
  },
  {
    slug: "travel-cards",
    name: "Travel Currency Cards",
    shortName: "Travel Cards",
    icon: "CreditCard",
    blurb: "Prepaid multi-currency cards — a safer way to carry money abroad.",
    description:
      "Load a traveller's currency card before you fly and spend abroad without carrying large amounts of cash. Reloadable and safer than notes.",
    features: [
      "Prepaid cards loadable in major currencies",
      "Safer than carrying cash",
      "TODO: confirm card partner banks and reload process",
      "TODO: confirm supported card currencies",
    ],
    steps: [
      {
        title: "Choose your currencies",
        body: "Pick the currency mix for your trip.",
      },
      {
        title: "Complete KYC and load",
        body: "Submit documents and load the card at today's rate.",
      },
      {
        title: "Spend abroad",
        body: "Use the card at ATMs and merchants worldwide; reload if you need more.",
      },
    ],
    faqs: [
      {
        q: "Can I reload the card while abroad?",
        a: "TODO: confirm reload process with Finwave Forex.",
      },
    ],
  },
  {
    slug: "corporate-fx",
    name: "Corporate & Business FX",
    shortName: "Corporate FX",
    icon: "Building2",
    blurb:
      "Foreign-exchange support for businesses — bulk exchange, transfers, and employee travel.",
    description:
      "Dedicated foreign-exchange support for companies: bulk currency for business travel, outward transfers, and traveller's cards for teams. TODO: confirm the corporate service scope with Finwave Forex.",
    features: [
      "Bulk currency exchange for business travel",
      "Business wire transfers (TT/DD)",
      "Travel cards for employees",
      "TODO: confirm corporate onboarding and credit terms",
    ],
    steps: [
      {
        title: "Talk to us",
        body: "Tell us your company's FX requirement.",
      },
      {
        title: "Agree rates and paperwork",
        body: "We set up documentation and quote competitive rates.",
      },
      {
        title: "Ongoing support",
        body: "A single point of contact for repeat requirements.",
      },
    ],
    faqs: [
      {
        q: "Do you offer corporate accounts?",
        a: "TODO: confirm corporate account offering with Finwave Forex.",
      },
    ],
  },
];
