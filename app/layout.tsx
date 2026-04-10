import type { Metadata, Viewport } from 'next'
import './globals.css'
import WalletProviderWrapper from './components/WalletProviderWrapper'
import ServiceWorker from './components/ServiceWorker'

export const metadata: Metadata = {
  title: 'SolanaFeed — The hub for everything Solana',
  description: 'Discover top Solana projects, read the latest Solana news, and swap tokens — all in one place. Your go-to Solana ecosystem hub.',
  manifest: '/manifest.json',
  keywords: ['Solana', 'SOL', 'Solana news', 'Solana projects', 'Solana DeFi', 'token swap', 'LSTs', 'stablecoins', 'Jupiter swap'],
  authors: [{ name: 'SolanaFeed' }],
  creator: 'SolanaFeed',
  verification: {
    google: '_h04YZtfSVpN785-q_fgxfCBUyaXgUsU6LTcj4Ac0lI',
  },
  openGraph: {
  type: 'website',
  url: 'https://solanafeed.com',
  title: 'SolanaFeed — The hub for everything Solana',
  description: 'Discover top Solana projects, read the latest Solana news, and swap tokens — all in one place.',
  siteName: 'SolanaFeed',
  images: [
    {
      url: 'https://solanafeed.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'SolanaFeed — The hub for everything Solana',
    },
  ],
},
twitter: {
  card: 'summary_large_image',
  site: '@SolanaFeedHQ',
  creator: '@SolanaFeedHQ',
  title: 'SolanaFeed — The hub for everything Solana',
  description: 'Discover top Solana projects, read the latest Solana news, and swap tokens — all in one place.',
  images: ['https://solanafeed.com/og-image.png'],
},
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SolanaFeed',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  themeColor: '#C9A84C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <ServiceWorker />
        <WalletProviderWrapper>
          {children}
        </WalletProviderWrapper>
      </body>
    </html>
  )
}