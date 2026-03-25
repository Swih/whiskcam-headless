import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";

export type Props = {
  title?: string;
};

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const { title } = {
    ...{
      title: "See Their World.",
    },
    ...props,
  };

  const [fontData, logoData, productData] = await Promise.all([
    readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf")),
    readFile(join(process.cwd(), "./public/images/logos/whiskcam-logo-icon.png")),
    readFile(join(process.cwd(), "./public/images/product/whiskcam-product-studio-og.png")),
  ]);

  const font = Uint8Array.from(fontData).buffer;
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;
  const productSrc = `data:image/png;base64,${productData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          backgroundColor: "#1A1A1A",
          fontFamily: "Inter",
        }}
      >
        {/* Left content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "70px 80px",
            width: "700px",
          }}
        >
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logoSrc} width="48" height="48" />
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "white",
                marginLeft: "14px",
              }}
            >
              Whiskcam
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "#F5A623",
              marginTop: "28px",
              textTransform: "uppercase",
            }}
          >
            Pet Collar Camera
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "54px",
              fontWeight: 700,
              color: "white",
              lineHeight: "1.1",
              marginTop: "12px",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: "1.5",
              marginTop: "16px",
            }}
          >
            The ultra-light 1080P collar camera. No app needed.
          </div>

          {/* Badges */}
          <div style={{ display: "flex", marginTop: "28px", gap: "10px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: "50px",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              1080P Full HD
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: "50px",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              24g Ultra-Light
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: "50px",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              No App Needed
            </div>
          </div>
        </div>

        {/* Right: Product image + price */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "500px",
          }}
        >
          <img
            src={productSrc}
            width="340"
            height="340"
            style={{ borderRadius: "24px" }}
          />
          <div
            style={{
              marginTop: "-14px",
              background: "#F5A623",
              color: "#1A1A1A",
              fontWeight: 700,
              fontSize: "16px",
              padding: "8px 24px",
              borderRadius: "50px",
            }}
          >
            Free Shipping — €49.90
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
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
