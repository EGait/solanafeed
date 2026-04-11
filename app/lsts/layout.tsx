import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solana Liquid Staking Tokens — SolanaFeed',
  description: 'Compare the best liquid staking tokens on Solana. JitoSOL, mSOL, JupSOL and more.',
}

export default function LSTsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}