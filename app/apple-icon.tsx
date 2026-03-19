import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1A1A",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 700,
            color: "#F5A623",
            fontFamily: "sans-serif",
          }}
        >
          W
        </div>
      </div>
    ),
    { ...size },
  );
}
