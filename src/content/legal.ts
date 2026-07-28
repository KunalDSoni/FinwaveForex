/**
 * Legal copy is reproduced from what Finwave Forex publishes on
 * finwaveforex.com. Nothing here is drafted or paraphrased — legal wording is
 * for the company and its counsel to set, not for this site to invent.
 */

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  /** Numbered, verbatim contract clauses. */
  | { type: "clauses"; items: string[] };

export type LegalSection = {
  /** Used as the heading and the in-page anchor. */
  heading: string;
  blocks: LegalBlock[];
};

export type LegalPage = {
  slug: string;
  title: string;
  /** Lead paragraph shown above the sections, where the document has one. */
  intro?: string;
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
  {
    slug: "disclaimer",
    title: "Disclaimer",
    // The published disclaimer carries no effective date.
    updated: null,
    sections: [
      {
        heading: "Terms you accept when booking foreign exchange",
        blocks: [
          {
            type: "clauses",
            items: [
              "The User acknowledges and confirms that he is well aware of the rules & regulations and the risks involved in booking foreign exchange. Finwave Forex Pvt. Ltd. will not be responsible for any data accessed / mis-utilized by any third party due to unauthorized use of Finwave Forex Pvt. Ltd. website by third party due to user's neglect or due to allowing access to personal data to third party intentionally or unintentionally.",
              "The User acknowledges and agrees that he has read and understood the Terms as well as all eligibility criteria and other formalities applicable to the Service and undertakes to abide by the same.",
              "Finwave Forex Pvt. Ltd. is not an agent of Axis Bank Ltd or ING Vysya Bank Ltd or any currency exchange company or bank listed on the site. The role of banks and currency exchange companies is to only provide Foreign Exchange products to customers of Finwave Forex Pvt. Ltd.. Additionally, Finwave Forex Pvt. Ltd. will not be held liable for any dispute that may arise between the service provider and the customer including but not restricted to service provider's service standards and order processing flaws by the bank/ exchange company.",
              "At the time of delivering foreign exchange to the user, the user shall tender the required documents relating to the purchase of the travel.",
              "The User specifically agrees that if any discrepancy is detected in the documents furnished by the User at the time of applying for foreign exchange or the details are incomplete or not accurate or the Bank finds that execution of the request is in violation of any applicable laws / regulations / guidelines, changes in Government Policies RBI / Bank Policies or for reasons beyond control of Finwave Forex Pvt. Ltd. / Service provider leading to cancellation of the transaction the service provider shall not process the request any further and it would be fully entitled to cancel the transaction at its sole discretion. In the said event the amount deposited by the user for the transaction would be credited to the User's Account within 21 working days after deducting the applicable cancellation charges etc. and in the said event the User shall not raise any claim against Finwave Forex Pvt. Ltd. or the service provider or any of its officials, employees or agents.",
              "The User hereby agrees to indemnify and hold harmless Finwave Forex Pvt. Ltd. or any of it's service providers or their directors, officers, employees or agents from and in respect of any loss, damage, liability, cost or expense that he/ she may suffer or incur by reason of his failing to discharge his obligations under or acting in breach of any laws, terms and conditions herein contained.",
              "The User is advised to seek independent legal opinion on matters relating to purchase of Foreign Exchange Products from Finwave Forex Pvt. Ltd.",
              "Finwave Forex Pvt. Ltd. would not under any circumstance be liable for any transactions executed by the User on websites hosted by any third party.",
              "The User represents that the total amount of foreign exchange purchased from or remitted through, all sources including through this service is within the prescribed limits set forth by the Reserve Bank of India (RBI) and is also as per the Exchange Control Regulations of RBI and the applicable laws in force from time to time.",
              "Finwave Forex Pvt. Ltd. shall under no circumstance be liable to the User for non-availability of the Services or for reasons including but not limited to natural calamities, legal restraints, network failure, or any other reason beyond the control of Finwave Forex Pvt. Ltd.. Finwave Forex Pvt. Ltd. would under no circumstance be liable for any damages of whatsoever nature sustained by the User or by any other person on behalf of the User.",
              "The User agrees that Finwave Forex Pvt. Ltd. may hold and process his Personal Information provided by the User and all other information concerning his Account(s) on computer or otherwise in connection with the Service.",
              "Finwave Forex Pvt. Ltd. shall have the absolute discretion to amend or supplement any of the Terms at any time. Finwave Forex Pvt. Ltd. may communicate the amended Terms by hosting the same on the Website or in any other manner as decided by Finwave Forex Pvt. Ltd.. The User shall be responsible for regularly reviewing these Terms including amendments thereto as may be posted on the Website.",
            ],
          },
        ],
      },
      {
        heading: "Cancellation Policy",
        blocks: [
          {
            type: "paragraph",
            text: "Cancellation of orders against Non-margin transactions (orders where the rate isn't fixed):",
          },
          { type: "paragraph", text: "Under this option the customer is required to confirm eligibility to participate in the requested retail forex / private remittance transaction but does not require any advance payment and the rates applied are those that appear on Finwave Forex Pvt. Ltd..com at the time of transactions. Non margin orders (unfixed rate orders) can be cancelled at any time and there is no charge for cancellation of non-margin transactions." },
          { type: "paragraph", text: "The User who opts for booking foreign currency under Fixed Rate transactions category through Finwave Forex Pvt. Ltd. is required to pay a fully refundable rate guarantee deposit of 2% of the entire transaction amount. The said amount shall be paid to Finwave Forex Pvt. Ltd. via an internet payment gateway. Further the foreign exchange would be issued subject to User's eligibility as well as verification of the documents submitted by the user. In the event the User fails to pay the balance amount within the stipulated period of two business days after paying the 2% booking amount, the said amount of 2% deposited by the User would be forfeited without any notice. This is notwithstanding any fluctuations in the Foreign exchange rate. The User has specifically understood and agreed that while booking the foreign exchange at the fixed rate he shall be obliged to pay the balance amount within a maximum period of two business days and shall not be entitled to cancel the transaction for any reason whatsoever even if the transaction is not fulfilled on account of the ineligibility of the User. The user undertakes that in the said event the User shall not hold Finwave Forex Pvt. Ltd. or any of its channel partners or any of its officers, directors, employees, consultants, agents or affiliates liable for the said amount being forfeited." },
        ],
      },
    ],
  },
];
