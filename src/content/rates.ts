export type Currency = {
  code: string;
  name: string;
  /** Emoji flag, used by currency pickers and rate rows. */
  flag: string;
  /** Illustrative only — TODO: replace with actual daily rates or a live feed. */
  indicativeBuy: number | null;
  indicativeSell: number | null;
};

// Order matches the currency list on finwaveforex.com.
export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", indicativeBuy: null, indicativeSell: null },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", indicativeBuy: null, indicativeSell: null },
  { code: "EUR", name: "Euro", flag: "🇪🇺", indicativeBuy: null, indicativeSell: null },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", indicativeBuy: null, indicativeSell: null },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", indicativeBuy: null, indicativeSell: null },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭", indicativeBuy: null, indicativeSell: null },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", indicativeBuy: null, indicativeSell: null },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", indicativeBuy: null, indicativeSell: null },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", indicativeBuy: null, indicativeSell: null },
  {
    code: "NZD",
    name: "New Zealand Dollar",
    flag: "🇳🇿",
    indicativeBuy: null,
    indicativeSell: null,
  },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰", indicativeBuy: null, indicativeSell: null },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", indicativeBuy: null, indicativeSell: null },
  { code: "OMR", name: "Omani Rial", flag: "🇴🇲", indicativeBuy: null, indicativeSell: null },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼", indicativeBuy: null, indicativeSell: null },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", indicativeBuy: null, indicativeSell: null },
];

export const INR = { code: "INR", name: "Indian Rupee", flag: "🇮🇳" } as const;

export const tickerPairs = currencies.slice(0, 8).map((c) => `${c.code}/INR`);
