import type { Metadata, Viewport } from 'next'
import { JsonLd } from '@/components/json-ld'
import {
  getSiteUrl,
  SITE_NAME,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  SEO_TITLE,
} from '@/lib/site-config'
import './globals.css'

const siteUrl = getSiteUrl()

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#AC75FF' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: SEO_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SEO_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SEO_KEYWORDS,
  authors: [{ name: 'Contentstack', url: 'https://www.contentstack.com' }],
  creator: 'Contentstack',
  publisher: 'Contentstack',
  category: 'technology',
  classification: 'Business & Technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: SITE_NAME,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Contentstack Launch — Hello Composable.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    ...(process.env.NEXT_PUBLIC_TWITTER_SITE && {
      site: process.env.NEXT_PUBLIC_TWITTER_SITE,
    }),
    ...(process.env.NEXT_PUBLIC_TWITTER_CREATOR && {
      creator: process.env.NEXT_PUBLIC_TWITTER_CREATOR,
    }),
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    images: {
      url: '/twitter-image',
      width: 1200,
      height: 630,
      alt: 'Contentstack Launch — Hello Composable.',
    },
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
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/icon.svg',
  },
  other: {
    'msapplication-TileColor': '#050505',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <JsonLd />
      </body>
    </html>
  )
}
