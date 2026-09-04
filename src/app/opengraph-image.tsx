import { ImageResponse } from "next/og";

export const alt = "thisyearnofear — selected work from the agentic era";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "90px 100px",
          background:
            "radial-gradient(circle at 12% 15%, #3a1560 0%, rgba(10,10,12,0) 55%), " +
            "radial-gradient(circle at 88% 88%, #5a1030 0%, rgba(10,10,12,0) 55%), #0a0a0c",
          color: "#f4f1ea",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(244,241,234,0.6)",
            marginBottom: 32,
          }}
        >
          Experimental products · AI, WebGL, onchain
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 132,
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          this year
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 132,
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          <span style={{ color: "#f4f1ea" }}>no</span>
          <span style={{ color: "#ff4d2e", marginLeft: 12 }}>fear</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 40,
            color: "rgba(244,241,234,0.75)",
          }}
        >
          Ship fast. Build in public. Share the code.
        </div>
      </div>
    ),
    { ...size }
  );
}
