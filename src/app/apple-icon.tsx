import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#160F08",
        }}
      >
        <svg width="110" height="110" viewBox="0 0 100 100">
          <path d="M56 12 L20 58 L44 58 L38 88 L82 42 L58 42 Z" fill="#FBBF24" />
        </svg>
      </div>
    ),
    { ...size }
  );
}