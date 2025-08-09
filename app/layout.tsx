import './global.css'
import './prism-theme.css'
import type { Metadata } from 'next'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { ViewCountsProvider } from './contexts/view-counts-context'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Nurbek Fayziev | Software Engineer',
    template: '%s | Nurbek Fayziev',
  },
  description: 'Nurbek is a 25-year old engineer and product visionary with more 5+ years of experience in leading projects and designing/building software systems from the ground up',
  openGraph: {
    title: 'Nurbek Fayziev | Software Engineer',
    description: 'Nurbek is a 25-year old engineer and product visionary with more 5+ years of experience in leading projects and designing/building software systems from the ground up',
    url: baseUrl,
    siteName: 'Nurbek Fayziev',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
    >
      <body className="antialiased max-w-2xl mx-4 mt-4 lg:mx-auto">
        <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0">
          <ViewCountsProvider>
            <Navbar />
            {children}
            <Footer />
          </ViewCountsProvider>
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
