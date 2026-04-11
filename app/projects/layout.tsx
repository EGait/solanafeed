import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Top Solana Projects — SolanaFeed',
  description: 'Discover the best projects building on Solana — DeFi, NFTs, staking, and more.',
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}