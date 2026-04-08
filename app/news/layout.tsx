import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solana News — SolanaFeed',
  description: 'Latest Solana news and updates. Stay up to date with everything happening in the Solana ecosystem.',
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}