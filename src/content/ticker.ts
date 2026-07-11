export type TickerQuote = {
  /** Display pair, e.g. "USD/INR". */
  pair: string;
  /** INR per 1 unit of the foreign currency. */
  price: number;
  /** Signed 24h change in percent. */
  changePct: number;
};

// Illustrative figures for display only — see the rates disclaimer.
// TODO: swap for a live feed (see MarketTicker) if enabled.
export const tickerQuotes: TickerQuote[] = [
  { pair: "USD/INR", price: 88.9123, changePct: 0.06 },
  { pair: "GBP/INR", price: 112.5041, changePct: 0.19 },
  { pair: "EUR/INR", price: 96.4287, changePct: -0.12 },
  { pair: "AED/INR", price: 24.2098, changePct: -0.17 },
  { pair: "SAR/INR", price: 23.7052, changePct: -0.15 },
  { pair: "AUD/INR", price: 57.6413, changePct: 0.31 },
  { pair: "SGD/INR", price: 66.2075, changePct: 0.08 },
  { pair: "CAD/INR", price: 62.1338, changePct: 0.22 },
  { pair: "CHF/INR", price: 99.8412, changePct: 0.27 },
  { pair: "NZD/INR", price: 51.8604, changePct: 0.92 },
  { pair: "HKD/INR", price: 11.4127, changePct: 0.04 },
  { pair: "CNY/INR", price: 12.3266, changePct: -0.09 },
  { pair: "THB/INR", price: 2.5231, changePct: 0.44 },
  { pair: "JPY/INR", price: 0.590446, changePct: 0.44 },
  { pair: "OMR/INR", price: 231.0184, changePct: -0.05 },
  { pair: "KWD/INR", price: 289.5471, changePct: 0.11 },
];
