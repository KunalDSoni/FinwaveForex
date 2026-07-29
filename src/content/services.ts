/**
 * Products and services, matched to what Finwave publishes on
 * finwaveforex.com/services.html: three products (currency exchange,
 * travellers' cheques, travel cards) plus outbound services (TT/DD).
 *
 * "Corporate & Business FX" previously listed here does not exist on the live
 * site and has been removed. Blurbs and features restate published copy;
 * nothing is claimed that Finwave does not advertise.
 */

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: "Banknote" | "Send" | "CreditCard" | "ScrollText";
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
    blurb: "Buy and sell all major 30 currencies at competitive market rates.",
    description:
      "We buy and sell all major 30 currencies — US Dollar, British Pound, Euro, Singapore Dollar, Canadian Dollar, Australian Dollar, New Zealand Dollar and more — as an RBI-approved money changer, with home delivery or branch pick-up across six cities.",
    features: [
      "All major 30 currencies bought and sold",
      "Competitive rates — bring us a quote and we'll work to better it",
      "Home delivery or branch pick-up",
      "Full KYC completed in a single visit",
    ],
    steps: [
      {
        title: "Tell us your requirement",
        body: "Choose the currency, amount, and whether you're buying or selling.",
      },
      {
        title: "Get a live quote",
        body: "We confirm today's rate over phone or email, and try to better any rate you have.",
      },
      {
        title: "Delivery or pick-up",
        body: "Receive your currency by home delivery or collect it from our Ahmedabad office.",
      },
    ],
    faqs: [
      {
        q: "Which currencies do you exchange?",
        a: "All major 30 currencies, including USD, GBP, Euro, SGD, CAD, AUD and NZD. If you need one you don't see listed, call the desk and ask.",
      },
      {
        q: "Are your published rates final?",
        a: "No. Rates shown online are indicative and move through the day. The rate that applies is the one we confirm with you at the time of the transaction.",
      },
    ],
  },
  {
    slug: "travellers-cheques",
    name: "Travellers' Cheques",
    shortName: "Cheques",
    icon: "ScrollText",
    blurb: "We buy and sell all valid American Express travellers' cheques.",
    description:
      "Finwave Forex buys and sells all valid American Express travellers' cheques. A long-standing way to carry funds abroad with the ability to replace them if they are lost or stolen.",
    features: [
      "All valid American Express travellers' cheques",
      "Both issued and encashed",
      "Handled by an RBI-approved money changer",
      "Home delivery or branch pick-up",
    ],
    steps: [
      {
        title: "Tell us what you hold",
        body: "Let us know the currency and value of the cheques you want to buy or encash.",
      },
      {
        title: "Get a live quote",
        body: "We confirm today's rate and the documentation required for the transaction.",
      },
      {
        title: "Complete at the desk",
        body: "Finish KYC and settle, either at our Ahmedabad office or by home delivery.",
      },
    ],
    faqs: [
      {
        q: "Which travellers' cheques do you accept?",
        a: "All valid American Express travellers' cheques, both for purchase and encashment.",
      },
    ],
  },
  {
    slug: "travel-cards",
    name: "Travel Currency Cards",
    shortName: "Travel Cards",
    icon: "CreditCard",
    blurb: "Prepaid travel cards in all major currencies, a safer way to carry money abroad.",
    description:
      "We provide travel cards in all major currencies, including US Dollar, British Pound, Euro, Singapore Dollar, Canadian Dollar, Australian Dollar, Saudi Riyal and UAE Dirham. Load before you fly and spend abroad without carrying large amounts of cash.",
    features: [
      "Cards in USD, GBP, Euro, SGD, CAD, AUD, SAR and AED",
      "Safer than carrying cash",
      "Usable at ATMs and merchants overseas",
      "Loaded at the rate we confirm with you",
    ],
    steps: [
      {
        title: "Choose your currencies",
        body: "Pick the currency mix for your trip and the amount to load.",
      },
      {
        title: "Complete KYC and load",
        body: "Submit your documents and we load the card at today's confirmed rate.",
      },
      {
        title: "Spend abroad",
        body: "Use the card at ATMs and merchants worldwide.",
      },
    ],
    faqs: [
      {
        q: "Which currencies can I load?",
        a: "All major currencies, including US Dollar, British Pound, Euro, Singapore Dollar, Canadian Dollar, Australian Dollar, Saudi Riyal and UAE Dirham.",
      },
      {
        q: "Why choose a card over cash?",
        a: "A prepaid card is a safer way to carry money abroad than a large amount of notes, and it works at ATMs and merchants overseas. Many travellers carry a mix of both.",
      },
    ],
  },
  {
    slug: "remittance",
    name: "Outbound Services (TT/DD)",
    shortName: "Remittance",
    icon: "Send",
    blurb:
      "Send money worldwide by telegraphic transfer, or arrange a demand draft in foreign currency.",
    description:
      "Outbound services comprise sending money throughout the world by way of telegraphic transfers, and we also make arrangements for demand drafts in foreign currencies. These services are carried out in collaboration with RBI-approved banks and authorised dealers.",
    features: [
      "Tour remittances",
      "Education fees for foreign universities, institutes and colleges",
      "Application fees for education and immigration",
      "Sending money to close relatives staying abroad",
      "Medical purposes, business training and conference remittances",
    ],
    steps: [
      {
        title: "Share transfer details",
        body: "Beneficiary, destination, currency, and the purpose of the remittance.",
      },
      {
        title: "Complete documentation",
        body: "We guide you through the KYC and paperwork required under RBI regulations.",
      },
      {
        title: "Funds dispatched",
        body: "Your transfer is sent by TT or DD and we confirm once it's on its way.",
      },
    ],
    faqs: [
      {
        q: "What can I send money abroad for?",
        a: "Tour remittances; education fees for foreign universities, institutes and colleges; application fees for education and immigration; sending money to close relatives staying abroad; and remittances for medical purposes, business training and conferences.",
      },
      {
        q: "Is there a limit on how much I can send?",
        a: "Yes. All foreign exchange purchased or remitted, across every source, must stay within the limits prescribed by the Reserve Bank of India and the Exchange Control Regulations in force at the time. We'll confirm the limit that applies to your purpose before you commit.",
      },
    ],
  },
];
