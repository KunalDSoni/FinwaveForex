/**
 * Customer-facing FAQ.
 *
 * Every answer here is drawn from copy Finwave already publishes on
 * finwaveforex.com (the Products & Services page and the Disclaimer), or from
 * siteConfig. Nothing is invented — where a fact is not published anywhere
 * (LRS ceilings, transfer timelines, card partner banks, business hours), the
 * question is deliberately absent rather than answered speculatively.
 */

export type Faq = { q: string; a: string };

export type FaqCategory = {
  id: string;
  title: string;
  faqs: Faq[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "currency",
    title: "Currency & rates",
    faqs: [
      {
        q: "Which currencies do you buy and sell?",
        // Source: services.html — "all major 30 currencies".
        a: "We buy and sell all major 30 currencies, including US Dollar, British Pound, Euro, Singapore Dollar, Canadian Dollar, Australian Dollar and New Zealand Dollar. If you need a currency you don't see listed, call the desk and ask.",
      },
      {
        q: "Do you handle travellers' cheques?",
        // Source: services.html — American Express travellers' cheques.
        a: "Yes. We buy and sell all valid American Express travellers' cheques.",
      },
      {
        q: "Can you better a rate I've already been quoted?",
        a: "That's the intention. Our published rates are an approximate guide — tell us the rate you've been offered and we'll work to better it. Call for today's live quote.",
      },
      {
        q: "Are the rates on this website final?",
        a: "No. Rates shown online are indicative and move through the day. The rate that applies is the one we confirm with you at the time of the transaction.",
      },
    ],
  },
  {
    id: "sending",
    title: "Sending money abroad",
    faqs: [
      {
        q: "What can I send money abroad for?",
        // Source: services.html — Outbound Services purposes.
        a: "Tour remittances; education fees for foreign universities, institutes and colleges; application fees for education and immigration; sending money to close relatives staying abroad; and remittances for medical purposes, business training and conferences.",
      },
      {
        q: "How is the money actually sent?",
        // Source: services.html — Outbound Services (TT/DD) intro.
        a: "By telegraphic transfer (TT), and we can also arrange a demand draft (DD) in foreign currency. These services are carried out in collaboration with RBI-approved banks and authorised dealers.",
      },
      {
        q: "Is there a limit on how much I can send?",
        // Source: disclaimer.html — RBI prescribed limits / Exchange Control Regulations.
        a: "Yes. All foreign exchange purchased or remitted, across every source, must stay within the limits prescribed by the Reserve Bank of India and the Exchange Control Regulations in force at the time. We'll confirm the limit that applies to your purpose before you commit.",
      },
    ],
  },
  {
    id: "cards",
    title: "Travel cards",
    faqs: [
      {
        q: "Which currencies can I load on a travel card?",
        // Source: services.html — travel cards in major currencies.
        a: "Travel cards are available in all major currencies, including US Dollar, British Pound, Euro, Singapore Dollar, Canadian Dollar, Australian Dollar, Saudi Riyal and UAE Dirham.",
      },
      {
        q: "Why choose a card over cash?",
        a: "A prepaid travel card is a safer way to carry money abroad than a large amount of notes, and it can be used at ATMs and merchants overseas. Many travellers carry a mix of both.",
      },
    ],
  },
  {
    id: "booking",
    title: "Booking, cancellation & refunds",
    faqs: [
      {
        q: "Can I cancel an order after placing it?",
        // Source: disclaimer.html — non-margin cancellation.
        a: "Orders where the rate isn't fixed (non-margin transactions) can be cancelled at any time, and there is no cancellation charge.",
      },
      {
        q: "What happens if I book at a fixed rate?",
        // Source: disclaimer.html — 2% rate guarantee deposit.
        a: "Booking at a fixed rate requires a fully refundable rate-guarantee deposit of 2% of the transaction amount. The balance must be paid within two business days of that deposit; if it isn't, the 2% is forfeited regardless of how the rate has moved. A fixed-rate booking can't be cancelled once made.",
      },
      {
        q: "How long does a refund take?",
        // Source: disclaimer.html — 21 working days.
        a: "If a transaction is cancelled — for example because documents are incomplete or the request can't lawfully be processed — the amount deposited is credited back to your account within 21 working days, after deducting any applicable cancellation charges.",
      },
    ],
  },
  {
    id: "documents",
    title: "Documents & compliance",
    faqs: [
      {
        q: "What do I need to bring?",
        // Source: disclaimer.html — documents tendered at delivery.
        a: "At the time we hand over your foreign exchange, you'll need to produce the documents relating to your travel or the purpose of the transaction, along with valid ID. Bringing them to the first visit means KYC is completed in one go.",
      },
      {
        q: "What happens if my documents are incomplete?",
        // Source: disclaimer.html — discrepancy handling.
        a: "If a discrepancy is found in the documents provided, or the details are incomplete or inaccurate, or the request would breach applicable laws, regulations or RBI policy, the transaction can be cancelled. Any amount you've deposited is returned within 21 working days, less applicable charges.",
      },
      {
        q: "Are you regulated?",
        a: "Finwave Forex Pvt. Ltd. is an RBI-approved money changer with a decade of experience in foreign exchange. Full KYC is completed on every transaction.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery & collection",
    faqs: [
      {
        q: "Where do you deliver?",
        a: "We offer home delivery and branch pick-up across six cities: Ahmedabad, Bangalore, Chennai, Cochin, Kolkata and Mumbai. Our office is on Vijay Cross Roads, Navrangpura, Ahmedabad.",
      },
      {
        q: "How do I start?",
        a: "Call or email the desk with the currency, the amount and your city. We'll confirm today's rate, tell you what documentation is needed, and arrange delivery or collection.",
      },
    ],
  },
];

/** The regulatory explainer Finwave publishes on its FAQ page, kept verbatim. */
export const femaFramework = `The legal framework for administration of foreign exchange transactions in India is provided by the Foreign Exchange Management Act, 1999. Under the Foreign Exchange Management Act, 1999 (FEMA), which came into force with effect from June 1, 2000, all transactions involving foreign exchange have been classified either as capital or current account transactions. All transactions undertaken by a resident that do not alter his / her assets or liabilities, including contingent liabilities, outside India are current account transactions. In terms of Section 5 of the FEMA, persons resident in India are free to buy or sell foreign exchange for any current account transaction except for those transactions for which drawal of foreign exchange has been prohibited by Central Government, such as remittance out of lottery winnings, remittance of income from racing/riding, etc., or any other hobby, remittance for purchase of lottery tickets, banned / proscribed magazines, football pools, sweepstakes, etc., payment of commission on exports made towards equity investment in Joint Ventures/ Wholly Owned Subsidiaries abroad of Indian companies, remittance of dividend by any company to which the requirement of dividend balancing is applicable, payment of commission on exports under Rupee State Credit Route, except commission up to 10% of invoice value of exports of tea and tobacco and payment related to "call back services" of telephones.`;

export const travelGuidelines = {
  label: "Guidelines on Travel Related FAQ's",
  file: "/reports/travel-forex-guidelines.pdf",
};
