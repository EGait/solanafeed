'use client'

import { useEffect } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  defaultToMint?: string
  defaultToSymbol?: string
}

let scriptLoaded = false

export default function SwapModal({ isOpen, onClose, defaultToMint, defaultToSymbol }: Props) {
  useEffect(() => {
    if (!isOpen) return

    const initTerminal = () => {
      window.Jupiter.init({
        displayMode: 'integrated',
        integratedTargetId: 'jupiter-swap-modal',
        endpoint: process.env.NEXT_PUBLIC_HELIUS_RPC!,
        strictTokenList: false,
        formProps: {
          initialInputMint: 'So11111111111111111111111111111111111111112',
          ...(defaultToMint
            ? { initialOutputMint: defaultToMint }
            : { initialOutputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' }
          ),
        },
      })
    }

    if (scriptLoaded && window.Jupiter) {
      initTerminal()
    } else if (!scriptLoaded) {
      scriptLoaded = true
      const script = document.createElement('script')
      script.src = 'https://terminal.jup.ag/main-v4.js'
      script.async = true
      script.onload = initTerminal
      document.body.appendChild(script)
    }

    return () => {
      if (window.Jupiter?.close) window.Jupiter.close()
    }
  }, [isOpen, defaultToMint])

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

        <div className="rounded-xl" style={{ border: '1px solid rgba(201,168,76,0.2)', overflow: 'visible' }}>
          <div id="jupiter-swap-modal" style={{ minHeight: '500px', height: '500px', overflow: 'visible' }} />
        </div>

        <div className="text-center text-xs text-gray-600 mt-3">
          Powered by Jupiter — best prices across all Solana DEXs
        </div>
      </div>
    </div>
  )
}