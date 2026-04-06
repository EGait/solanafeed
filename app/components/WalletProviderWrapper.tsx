'use client'

import dynamic from 'next/dynamic'

const AppWalletProvider = dynamic(
  () => import('./WalletProvider'),
  { ssr: false }
)

export default function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AppWalletProvider>{children}</AppWalletProvider>
}