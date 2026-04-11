'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const AppWalletProvider = dynamic(
  () => import('./WalletProvider'),
  { 
    ssr: false,
    loading: () => <>{null}</>
  }
)

export default function WalletProviderWrapper({ children }: { children: ReactNode }) {
  return <AppWalletProvider>{children}</AppWalletProvider>
}