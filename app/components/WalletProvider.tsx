'use client'

import '@solana/wallet-adapter-react-ui/styles.css'
import { useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import {
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
  createDefaultWalletNotFoundHandler,
  SolanaMobileWalletAdapter,
} from '@solana-mobile/wallet-adapter-mobile'

type Props = {
  children: React.ReactNode
}

export default function AppWalletProvider({ children }: Props) {
  const network = WalletAdapterNetwork.Mainnet

  const wallets = useMemo(
    () => [
      new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        appIdentity: {
          name: 'SolanaFeed',
          uri: 'https://solanafeed.com',
          icon: '/favicon.ico',
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: WalletAdapterNetwork.Mainnet,
        onWalletNotFound: createDefaultWalletNotFoundHandler(),
      }),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_HELIUS_RPC!}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}