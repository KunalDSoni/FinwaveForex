import { describe, expect, it } from "vitest";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { currencies } from "@/content/rates";

describe("content integrity", () => {
  it("has the 15 currencies from finwaveforex.com", () => {
    expect(currencies).toHaveLength(15);
    expect(currencies.map((c) => c.code)).toContain("KWD");
    expect(new Set(currencies.map((c) => c.code)).size).toBe(15);
  });

  it("has four services with complete cards and unique slugs", () => {
    expect(services).toHaveLength(4);
    for (const s of services) {
      expect(s.slug).toMatch(/^[a-z-]+$/);
      expect(s.blurb.length).toBeGreaterThan(20);
      expect(s.features.length).toBeGreaterThan(2);
      expect(s.steps.length).toBe(3);
    }
    expect(new Set(services.map((s) => s.slug)).size).toBe(4);
  });

  it("contains no leftover template junk from the old site", () => {
    const all = JSON.stringify({ siteConfig, services, currencies });
    expect(all).not.toContain("zoner@example.com");
    expect(all).not.toContain("810-991");
  });

  it("has verified contact details", () => {
    expect(siteConfig.email).toBe("info@finwaveforex.com");
    expect(siteConfig.phone).toBe("+91 79 4891 6100");
    expect(siteConfig.cities).toHaveLength(6);
  });
});
