import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'EasyMind Wellness | Mental Health Therapist Matching',
  description: 'Connect with a therapist who truly fits your needs. EasyMind Wellness offers personalized mental health provider matching to help you begin your wellness journey today.',
  openGraph: {
    title: 'EasyMind Wellness | Mental Health Therapist Matching',
    description: 'Connect with a therapist who truly fits your needs. EasyMind Wellness offers personalized mental health provider matching to help you begin your wellness journey today.',
    siteName: 'EasyMind Wellness',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyMind Wellness | Mental Health Therapist Matching',
    description: 'Connect with a therapist who truly fits your needs. EasyMind Wellness offers personalized mental health provider matching to help you begin your wellness journey today.',
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
