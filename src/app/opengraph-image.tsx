import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#160F08",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(251, 191, 36, 0.12)",
            filter: "blur(80px)",
            top: -100,
            left: 300,
          }}
        />
        <svg width="90" height="90" viewBox="0 0 100 100" style={{ marginBottom: 24 }}>
          <rect width="100" height="100" rx="22" fill="#221708" />
          <path d="M56 12 L20 58 L44 58 L38 88 L82 42 L58 42 Z" fill="#FBBF24" />
        </svg>
        <div
          style={{
            fontSize: 90,
            fontWeight: 700,
            color: "#FFF8EC",
            letterSpacing: "-0.03em",
          }}
        >
          PowerPulse
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#A89B86",
            marginTop: 16,
          }}
        >
          Community-powered outage tracking for Ghana
        </div>
      </div>
    ),
    { ...size }
  );
}