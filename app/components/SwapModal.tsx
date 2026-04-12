'use client'

type Props = {
  isOpen: boolean
  onClose: () => void
  defaultToMint?: string
  defaultToSymbol?: string
}

export default function SwapModal({ isOpen, onClose, defaultToMint, defaultToSymbol }: Props) {
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
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
          <iframe
            src={swapUrl}
            width="100%"
            height="500"
            style={{ border: 'none' }}
          />
        </div>
        <div className="text-center text-xs text-gray-600 mt-3">
          Powered by Jupiter — best prices across all Solana DEXs
        </div>
      </div>
    </div>
  )
}