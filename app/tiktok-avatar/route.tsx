import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";

export async function GET() {
  const [fontData, logoData, wordmarkData] = await Promise.all([
    readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf")),
    readFile(join(process.cwd(), "./public/images/logos/whiskcam-logo-icon-hd.png")),
    readFile(join(process.cwd(), "./public/images/logos/whiskcam-logo-wordmark.png")),
  ]);

  const font = Uint8Array.from(fontData).buffer;
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;
  const wordmarkSrc = `data:image/png;base64,${wordmarkData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "800px",
          height: "800px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter",
          background: "linear-gradient(145deg, #1e1b2e 0%, #1a1a2a 35%, #1c1a1a 65%, #201a15 100%)",
          position: "relative",
        }}
      >
        {/* Ambient amber glow behind logo */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0.03) 50%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -55%)",
          }}
        />

        {/* Logo icon — HD */}
        <img
          src={logoSrc}
          width="220"
          height="220"
        />

        {/* Wordmark image — the real logo text */}
        <img
          src={wordmarkSrc}
          width="240"
          height="45"
          style={{
            marginTop: "28px",
            filter: "brightness(0) invert(1)",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#F5A623",
            marginTop: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          See Their World
        </div>
      </div>
    ),
    {
      width: 800,
      height: 800,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
