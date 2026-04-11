import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solana Stablecoins — SolanaFeed',
  description: 'Compare the best stablecoins on Solana including USDC, USDT, PYUSD, hyUSD and more.',
}

export default function StablecoinsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}