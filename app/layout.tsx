import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://logans-website.vercel.app'),
  title: 'EasyMind Wellness | Mental Health Therapist Matching',
  description: 'Connect with a therapist who truly fits your needs. EasyMind Wellness provides personalized mental health matching to start your wellness journey.',
  openGraph: {
    title: 'EasyMind Wellness | Mental Health Therapist Matching',
    description: 'Connect with a therapist who truly fits your needs. EasyMind Wellness provides personalized mental health matching to start your wellness journey.',
    siteName: 'EasyMind Wellness',
    type: 'website',
    images: [{ url: 'https://logans-website.vercel.app/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyMind Wellness | Mental Health Therapist Matching',
    description: 'Connect with a therapist who truly fits your needs. EasyMind Wellness provides personalized mental health matching to start your wellness journey.',
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
