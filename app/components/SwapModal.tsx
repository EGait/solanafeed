'use client'

import { useEffect } from 'react'

type SwapModalProps = {
  isOpen: boolean
  onClose: () => void
  defaultToMint?: string
  defaultToSymbol?: string
}

export default function SwapModal({ isOpen, onClose, defaultToMint, defaultToSymbol }: SwapModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const swapUrl = defaultToMint
    ? `https://jup.ag/swap/SOL-${defaultToMint}?referrer=F7pkMtisKPWKJMXvrRcHaXUfChykA1Ry5xYXT6XtFcSG&feeBps=50`
    : `https://jup.ag/swap/SOL-USDC?referrer=F7pkMtisKPWKJMXvrRcHaXUfChykA1Ry5xYXT6XtFcSG&feeBps=50`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-gray-400 hover:text-gray-200 transition-colors text-sm"
        >
          ✕ Close
        </button>
        <iframe
          src={swapUrl}
          width="100%"
          height="600"
          style={{ border: 'none', borderRadius: '16px' }}
        />
      </div>
    </div>
  )
}