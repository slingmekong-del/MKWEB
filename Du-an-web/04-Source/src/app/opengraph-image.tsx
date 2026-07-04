import { ImageResponse } from "next/og";

export const alt = "Mekong Sling — Rigging & Lifting Equipment, Vung Tau Vietnam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand-coloured social share card, generated at build time. No external assets.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#06182F",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "8px",
              background: "#19D3C5",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              color: "#19D3C5",
              fontSize: "28px",
              letterSpacing: "6px",
              fontWeight: 600,
            }}
          >
            UNITED MEKONG JSC
          </div>
        </div>

        <div
          style={{
            color: "#ffffff",
            fontSize: "96px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          Mekong Sling
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: "38px",
            marginTop: "28px",
            maxWidth: "900px",
            lineHeight: 1.3,
          }}
        >
          Certified rigging &amp; lifting equipment — wire rope, shackles, chains
          &amp; slings.
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "28px",
            marginTop: "48px",
            letterSpacing: "1px",
          }}
        >
          Vung Tau, Vietnam · mekongsling.com
        </div>
      </div>
    ),
    { ...size }
  );
}
