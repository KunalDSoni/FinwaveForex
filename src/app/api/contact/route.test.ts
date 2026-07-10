import { beforeEach, describe, expect, it, vi } from "vitest";

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it("rejects an invalid payload with 400", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      new Request("http://test/api/contact", { method: "POST", body: JSON.stringify({ name: "x" }) }),
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("accepts a valid payload without RESEND_API_KEY and reports delivered: false", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const { POST } = await import("./route");
    const body = {
      name: "Test Person",
      email: "test@example.com",
      phone: "",
      subject: "general",
      message: "I would like a quote for USD, please.",
    };
    const res = await POST(
      new Request("http://test/api/contact", { method: "POST", body: JSON.stringify(body) }),
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true, delivered: false });
  });

  it("rejects non-JSON bodies with 400", async () => {
    const { POST } = await import("./route");
    const res = await POST(
      new Request("http://test/api/contact", { method: "POST", body: "not json" }),
    );
    expect(res.status).toBe(400);
  });
});
