import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "EasyMind Wellness - Find Your Perfect Mental Health Provider"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #171f36 0%, #1e2d4a 50%, #2a3f5f 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent circles */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(108, 124, 146, 0.12)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(108, 124, 146, 0.08)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Brand name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-2px",
                lineHeight: 1,
              }}
            >
              EasyMind
            </span>
            <span
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: "#f9a8b8",
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              Wellness
            </span>
          </div>

          {/* Headline */}
          <span
            style={{
              fontSize: 30,
              fontWeight: 400,
              color: "#cbd5e1",
              maxWidth: 760,
              lineHeight: 1.5,
            }}
          >
            Find your perfect mental health provider — personalized matching for your unique needs
          </span>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f9a8b8",
              color: "#171f36",
              fontSize: 22,
              fontWeight: 700,
              padding: "14px 40px",
              borderRadius: 50,
              letterSpacing: "0.5px",
            }}
          >
            Start Your Journey Today
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
