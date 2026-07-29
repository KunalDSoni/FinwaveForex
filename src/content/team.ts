/**
 * Leadership profiles.
 *
 * Written as leadership positioning rather than the résumé-style career
 * histories the current site publishes. Grounded claims only: Bhrugesh's 2005
 * start in foreign exchange comes from his own published biography. No
 * employers, tenures or figures are asserted beyond that.
 *
 * Photographs are the ones Finwave publishes, mirrored into /public/team.
 */

export type Leader = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  /** Two or three sentences. Positioning, not a career timeline. */
  bio: string;
  expertise: string[];
};

export const leadership: Leader[] = [
  {
    slug: "bhrugesh-vyas",
    name: "Bhrugesh Vyas",
    role: "Founder & Managing Director",
    photo: "/team/bhrugesh-vyas.jpg",
    bio: "Bhrugesh has worked in foreign exchange since 2005, across currency exchange, outward remittance and money-transfer operations. He founded Finwave Forex around a simple standard: quote a rate plainly, complete the compliance properly, and be worth calling back. He leads the firm's strategic direction, its regulatory posture, and its relationships with banking partners.",
    expertise: [
      "Foreign Exchange",
      "RBI Compliance",
      "International Remittances",
      "Business Strategy",
      "Customer Relations",
      "Financial Operations",
    ],
  },
  {
    slug: "jitendra-ahuja",
    name: "Jitendra Ahuja",
    role: "Director",
    photo: "/team/jitendra-ahuja.jpg",
    bio: "Jitendra oversees how Finwave runs day to day — the processes behind every transaction, the standard of service customers receive, and the coordination between the desk, delivery and partner banks. His focus is consistency: that a rate quoted is a rate honoured, and that each transaction closes as cleanly as the last.",
    expertise: [
      "Business Operations",
      "Customer Experience",
      "Process Management",
      "Team Leadership",
      "Business Development",
      "Operational Excellence",
    ],
  },
];

/** Company-voice statement. Deliberately not attributed to an individual. */
export const leadershipMessage = {
  quote:
    "Foreign exchange runs on small margins and large trust. We would rather quote a rate we can stand behind and complete the paperwork properly than win a transaction we cannot honour. That is the standard we hold on every deal — transparent pricing, dependable service, and relationships that outlast a single trip.",
  attribution: "The leadership team",
};

/** The philosophy section — six commitments, grouped for a three-up grid. */
export const principles = [
  {
    icon: "Users",
    title: "Customer first",
    body: "Every quote starts with what you actually need — the currency, the purpose, the timing — not with what is easiest to sell.",
  },
  {
    icon: "Eye",
    title: "Transparent pricing",
    body: "The rate we quote is the rate we honour. Bring us a better one and we will work to beat it rather than talk around it.",
  },
  {
    icon: "ShieldCheck",
    title: "Regulatory compliance",
    body: "An RBI-approved money changer with full KYC on every transaction, and documentation handled properly the first time.",
  },
  {
    icon: "TrendingDown",
    title: "Competitive rates",
    body: "A decade of market experience and direct banking relationships keep our spreads tight across 30 major currencies.",
  },
  {
    icon: "Handshake",
    title: "Long-term relationships",
    body: "Most of our business is repeat business. We would rather earn the next ten transactions than maximise this one.",
  },
  {
    icon: "Truck",
    title: "Reliable service",
    body: "Home delivery and branch pick-up across six cities, with a single point of contact who knows your file.",
  },
] as const;
