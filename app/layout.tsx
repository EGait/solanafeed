import type { Metadata } from 'next'
import './globals.css'
import WalletProviderWrapper from './components/WalletProviderWrapper'

export const metadata: Metadata = {
  title: 'SolanaFeed — The hub for everything Solana',
  description: 'Top Solana projects, breaking news, and token swaps all in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WalletProviderWrapper>
          {children}
        </WalletProviderWrapper>
      </body>
    </html>
  )
}