// Free, keyless, CORS-enabled FX data (community-run, ~daily updates).
// Primary: jsDelivr CDN. Fallback: the project's Cloudflare Pages mirror.
// Docs: https://github.com/fawazahmed0/exchange-api
export type InrResponse = { date: string; inr: Record<string, number> };

function datedUrls(tag: string): string[] {
  // tag is "latest" or a "YYYY-MM-DD" date.
  return [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${tag}/v1/currencies/inr.json`,
    `https://${tag}.currency-api.pages.dev/v1/currencies/inr.json`,
  ];
}

export async function fetchInr(tag: string): Promise<InrResponse | null> {
  for (const url of datedUrls(tag)) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const json = (await res.json()) as InrResponse;
      if (json?.inr) return json;
    } catch {
      // try next url
    }
  }
  return null;
}

export async function fetchInrWithPrev(): Promise<{
  today: InrResponse;
  prev: InrResponse | null;
} | null> {
  const today = await fetchInr("latest");
  if (!today) return null;
  // Walk back up to 5 days to find the previous published rate (skips
  // weekends/holidays) for a real 24h change.
  let prev: InrResponse | null = null;
  const base = new Date(`${today.date}T00:00:00Z`);
  for (let i = 1; i <= 5 && !prev; i += 1) {
    const d = new Date(base);
    d.setUTCDate(d.getUTCDate() - i);
    prev = await fetchInr(d.toISOString().slice(0, 10));
  }
  return { today, prev };
}

/** API gives INR→X; we want INR per 1 X. */
export function priceFromInr(inrPerUnit: number): number {
  return 1 / inrPerUnit;
}

/** Signed % change in price (INR per X). price = 1/inr, so prev/today - 1. */
export function changePct(
  todayInr: number,
  prevInr: number | undefined,
  fallback: number,
): number {
  return prevInr && prevInr > 0 ? (prevInr / todayInr - 1) * 100 : fallback;
}

export function formatPrice(price: number): string {
  // Small-value pairs (e.g. JPY/INR) need more precision to be meaningful.
  return price >= 1 ? price.toFixed(4) : price.toFixed(6);
}
