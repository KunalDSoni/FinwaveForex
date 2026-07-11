"use client";

import { useEffect, useState } from "react";
import { cachedInrWithPrev, formatPrice, priceFromInr } from "@/lib/fx";

/** Shows an indicative ₹ value for a currency code once the feed resolves. */
export function LiveRate({ code, className }: { code: string; className?: string }) {
  const [price, setPrice] = useState<number | null>(null);
  useEffect(() => {
    let active = true;
    (async () => {
      const res = await cachedInrWithPrev();
      const inr = res?.today.inr[code.toLowerCase()];
      if (active && inr) setPrice(priceFromInr(inr));
    })();
    return () => {
      active = false;
    };
  }, [code]);

  if (price === null) return null;
  return <span className={className}>≈ ₹{formatPrice(price)}</span>;
}
