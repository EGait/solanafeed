'use client'

import { useEffect } from 'react'

const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'

type Props = {
  isOpen: boolean
  onClose: () => void
  defaultToMint?: string
  defaultToSymbol?: string
}

export default function SwapModal({ isOpen, onClose, defaultToMint, defaultToSymbol }: Props) {
  const mint = defaultToMint || USDC_MINT

  useEffect(() => {
    if (!isOpen) return

    // Load Jupiter Terminal script if not already loaded
    if (!document.getElementById('jupiter-terminal-script')) {
      const script = document.createElement('script')
      script.id = 'jupiter-terminal-script'
      script.src = 'https://terminal.jup.ag/main-v3.js'
      script.async = true
      script.onload = () => initJupiter(mint)
      document.head.appendChild(script)
    } else {
      initJupiter(mint)
    }

    return () => {
      // Clean up terminal on close
      if ((window as any).Jupiter) {
        (window as any).Jupiter.close()
      }
    }
  }, [isOpen, mint])

  const initJupiter = (mintAddress: string) => {
    if ((window as any).Jupiter) {
      (window as any).Jupiter.init({
        displayMode: 'integrated',
        integratedTargetId: 'jupiter-terminal-container',
        endpoint: 'https://mainnet.helius-rpc.com/?api-key=public',
        defaultExplorer: 'Solscan',
        formProps: {
          initialInputMint: 'So11111111111111111111111111111111111111112',
          initialOutputMint: mintAddress,
        },
        referralAccount: 'F7pkMtisKPWKJMXvrRcHaXUfChykA1Ry5xYXT6XtFcSG',
        referralName: 'SolanaFeed',
      })
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-6 w-full max-w-lg mx-4"
        style={{ backgroundColor: '#0f0f1a', border: '1px solid rgba(201,168,76,0.3)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-200">
            Swap SOL → {defaultToSymbol || 'USDC'}
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-400 transition-colors text-xl"
          >
            ✕
          </button>
        </div>
        <div
          id="jupiter-terminal-container"
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(201,168,76,0.2)', height: '500px' }}
        />
        <div className="text-center text-xs text-gray-600 mt-3">
          Powered by Jupiter — best prices across all Solana DEXs
        </div>
      </div>
    </div>
  )
}