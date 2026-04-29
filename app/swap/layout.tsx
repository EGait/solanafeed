import type { Metadata } from 'next'
import WalletProviderWrapper from '../components/WalletProviderWrapper'

export const metadata: Metadata = {
  title: 'Swap Solana Tokens — SolanaFeed',
  description: 'Swap Solana tokens at the best rates powered by Jupiter routing.',
}

export default function SwapLayout({ children }: { children: React.ReactNode }) {
  return <WalletProviderWrapper>{children}</WalletProviderWrapper>
}