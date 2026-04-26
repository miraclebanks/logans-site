import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'EasyMind Wellness',
  description: 'Find your perfect mental health provider match. Personalized therapist matching with EasyMind Wellness.',
  openGraph: {
    title: 'EasyMind Wellness',
    description: 'Find your perfect mental health provider match.',
    siteName: 'EasyMind Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyMind Wellness',
    description: 'Find your perfect mental health provider match.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
