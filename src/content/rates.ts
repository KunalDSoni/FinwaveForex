export type Currency = {
  code: string;
  name: string;
  /** Illustrative only — TODO: replace with actual daily rates or a live feed. */
  indicativeBuy: number | null;
  indicativeSell: number | null;
};

// Order matches the currency list on finwaveforex.com.
export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "GBP", name: "British Pound", indicativeBuy: null, indicativeSell: null },
  { code: "EUR", name: "Euro", indicativeBuy: null, indicativeSell: null },
  { code: "AUD", name: "Australian Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "SGD", name: "Singapore Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "THB", name: "Thai Baht", indicativeBuy: null, indicativeSell: null },
  { code: "SAR", name: "Saudi Riyal", indicativeBuy: null, indicativeSell: null },
  { code: "AED", name: "UAE Dirham", indicativeBuy: null, indicativeSell: null },
  { code: "CAD", name: "Canadian Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "NZD", name: "New Zealand Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "HKD", name: "Hong Kong Dollar", indicativeBuy: null, indicativeSell: null },
  { code: "CNY", name: "Chinese Yuan", indicativeBuy: null, indicativeSell: null },
  { code: "OMR", name: "Omani Rial", indicativeBuy: null, indicativeSell: null },
  { code: "KWD", name: "Kuwaiti Dinar", indicativeBuy: null, indicativeSell: null },
  { code: "CHF", name: "Swiss Franc", indicativeBuy: null, indicativeSell: null },
];

export const tickerPairs = currencies.slice(0, 8).map((c) => `${c.code}/INR`);
