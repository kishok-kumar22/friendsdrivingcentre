import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const alt = "Friends Driving Centre - Driving School in Chennai";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#0B3C4D",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header: Logo Emblem + Brand Name */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Circular green emblem */}
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              backgroundColor: "#0B8F5A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid white",
              marginRight: "20px",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v7" />
              <path d="M4 14l6-3" />
              <path d="M20 14l-6-3" />
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "38px",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-1px",
                lineHeight: "1",
              }}
            >
              Friends
            </span>
            <span
              style={{
                fontSize: "17px",
                fontWeight: 600,
                color: "#E6F5F3",
                letterSpacing: "1px",
                marginTop: "4px",
              }}
            >
              Driving Centre
            </span>
          </div>
        </div>

        {/* Center: Main Headline & Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "960px",
          }}
        >
          <div style={{ display: "flex", marginBottom: "16px" }}>
            <span
              style={{
                backgroundColor: "#D5EFE8",
                color: "#087A4C",
                padding: "6px 18px",
                borderRadius: "24px",
                fontSize: "15px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Personalised Driving Training
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "54px",
              fontWeight: 800,
              lineHeight: "1.15",
              color: "white",
              letterSpacing: "-1px",
              marginBottom: "16px",
            }}
          >
            <span>Learn to Drive Confidently</span>
            <span style={{ color: "#0B8F5A" }}>in Your Own Vehicle</span>
          </div>

          <span
            style={{
              fontSize: "21px",
              color: "#E6F5F3",
              lineHeight: "1.4",
              opacity: 0.9,
            }}
          >
            One-to-one individual mentor guidance with real-road practice at your pace.
          </span>
        </div>

        {/* Bottom Bar: Locations & Contact Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#E6F5F3",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "28px" }}>📍 Chennai</span>
            <span style={{ marginRight: "28px" }}>📍 Tambaram</span>
            <span>📍 Velachery</span>
          </div>

          <div
            style={{
              display: "flex",
              backgroundColor: "#0B8F5A",
              color: "white",
              padding: "10px 24px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            <span>📞 {siteConfig.telephone}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
