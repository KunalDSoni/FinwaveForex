import { describe, expect, it } from "vitest";
import { changePct, formatPrice, priceFromInr } from "@/lib/fx";

describe("formatPrice", () => {
  it("uses 4 decimals for values >= 1", () => {
    expect(formatPrice(88.9123456)).toBe("88.9123");
  });
  it("uses 6 decimals for values < 1", () => {
    expect(formatPrice(0.5904461)).toBe("0.590446");
  });
});

describe("priceFromInr", () => {
  it("inverts INR-per-unit to price", () => {
    expect(priceFromInr(0.0112)).toBeCloseTo(89.2857, 3);
  });
});

describe("changePct", () => {
  it("computes signed percent from prev/today INR", () => {
    // price rose ~1%: prevInr slightly higher than todayInr
    expect(changePct(0.0112, 0.011312, 0)).toBeCloseTo(1, 1);
  });
  it("falls back when prev is missing or zero", () => {
    expect(changePct(0.0112, undefined, 0.42)).toBe(0.42);
    expect(changePct(0.0112, 0, 0.42)).toBe(0.42);
  });
});
