import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import path from "path"

export const runtime = "nodejs"
export const alt = "EasyMind Wellness"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  const logoBuffer = readFileSync(path.join(process.cwd(), "public/easy-mind-logo.png"))
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`

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
            gap: 32,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            width={160}
            height={160}
            style={{ borderRadius: "50%" }}
            alt="EasyMind logo"
          />

          {/* Brand name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 72,
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
                fontSize: 28,
                fontWeight: 500,
                color: "#f9a8b8",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Wellness
            </span>
          </div>

          {/* Tagline */}
          <span
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "#94a3b8",
              maxWidth: 700,
              lineHeight: 1.5,
            }}
          >
            Find your perfect mental health provider match
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
