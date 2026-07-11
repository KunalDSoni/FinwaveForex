import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = "Finwave Forex — RBI-approved money changers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Required for `output: export` — generate the OG image at build time.
export const dynamic = "force-static";

// ImageResponse requires style objects; the site-wide no-inline-styles rule
// applies to DOM components, not OG image generation.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#fefaf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: 160, height: 10, backgroundColor: "#61ab77" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, color: "#2f2c25", letterSpacing: -3 }}>
            Finwave&nbsp;
            <span style={{ color: "#61ab77" }}>Forex</span>
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#6f6a5e", maxWidth: 900 }}>
            {siteConfig.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#6f6a5e" }}>{siteConfig.url}</div>
      </div>
    ),
    size,
  );
}
