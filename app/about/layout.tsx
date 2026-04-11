import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — SolanaFeed',
  description: 'SolanaFeed is your go-to hub for Solana news, projects and token swaps.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}