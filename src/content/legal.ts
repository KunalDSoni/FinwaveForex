/**
 * Legal copy is reproduced from what Finwave Forex publishes on
 * finwaveforex.com. Nothing here is drafted or paraphrased — legal wording is
 * for the company and its counsel to set, not for this site to invent.
 */

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = {
  /** Used as the heading and the in-page anchor. */
  heading: string;
  blocks: LegalBlock[];
};

export type LegalPage = {
  slug: string;
  title: string;
  /** Lead paragraph shown above the sections. */
  intro: string;
  /** Effective date, when the company has published one. */
  updated: string | null;
  sections: LegalSection[];
};

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    intro:
      'We at Finwave Forex Pvt. Ltd. understand the importance of your privacy. We will never willfully disclose individually identifiable information about our customers to any third party without first receiving your permission. You can be rest-assured that your information is safe with us. Your visit to this Site is subject to this "Privacy Policy" and our Terms of Use, as may be amended from time to time.',
    // The published policy carries no effective date.
    updated: null,
    sections: [
      {
        heading: "We will be collecting your personal details when",
        blocks: [
          {
            type: "list",
            items: [
              "You post a lead or respond to a lead on our website or through our customer service team — by email / phone / mobile application. The personal information collected is primarily used where it is necessary to process your lead posted on portal, enquiry for any reasons.",
              "You take part in surveys or provide us with your feedback.",
              "Personal information may be used internally for research, analysis and auditing.",
            ],
          },
        ],
      },
    ],
  },
];
