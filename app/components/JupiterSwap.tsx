'use client'

import { useState } from 'react'

type Props = {
  fromMint: string
  toMint: string
}

export default function JupiterSwap({ fromMint, toMint }: Props) {
  const [quote, setQuote] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getQuote = async () => {
    setLoading(true)
    setQuote(null)

    try {
      // Simulate fetching a real quote with delay
      await new Promise(r => setTimeout(r, 500))

      // MOCK QUOTE: randomly generate output amount for realism
      const inputAmount = 1e9 // 1 SOL
      const outputAmount = Math.floor(Math.random() * 10_000_000_000) / 1e9 // up to ~10 tokens
      const priceImpactPct = parseFloat((Math.random() * 0.02).toFixed(4))

      const mockQuote = {
        inputAmount,
        outputAmount,
        priceImpactPct,
        route: [
          { from: fromMint, to: toMint, market: 'Mock Market' }
        ]
      }

      setQuote(mockQuote)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-2 w-full">
      <button
        onClick={getQuote}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
        disabled={loading}
      >
        {loading ? 'Fetching Quote...' : 'Get Swap Quote'}
      </button>

      {quote && (
        <div className="text-xs bg-gray-200 p-2 mt-2 rounded max-h-48 overflow-auto w-full">
          <div>
            <strong>Input Amount:</strong> {quote.inputAmount / 1e9} SOL
          </div>
          <div>
            <strong>Output Amount:</strong> {quote.outputAmount.toFixed(4)}
          </div>
          <div>
            <strong>Price Impact:</strong> {(quote.priceImpactPct * 100).toFixed(2)}%
          </div>
          <div className="mt-1">
            <strong>Route:</strong> {quote.route.map((r: any) => `${r.from} → ${r.to} (${r.market})`).join(', ')}
          </div>
        </div>
      )}
    </div>
  )
}