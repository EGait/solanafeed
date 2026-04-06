'use client'

import { useState } from 'react'

const tokens = [
  { symbol: 'SOL', mint: 'So11111111111111111111111111111111111111112' },
  { symbol: 'USDC', mint: 'EPjFWdd5Au1v1pJLa8k7VNe9gG2rZ9x0h8axVLPGd8N' },
  { symbol: 'RAY', mint: '4k3Dyjzvzp8eK1qC8gkDjK8r9rNKXkZbqM6gqjGqz7fX' },
  { symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
  { symbol: 'JTO', mint: 'jtojtomepa8bduh8b5duh5uhduhb8b5duh5uhduhb8' },
  { symbol: 'JITOSOL', mint: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn' },
]

type Props = {
  isOpen: boolean
  onClose: () => void
  defaultToMint?: string
  defaultToSymbol?: string
}

export default function SwapModal({ isOpen, onClose, defaultToMint, defaultToSymbol }: Props) {
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(
    tokens.find(t => t.mint === defaultToMint) || tokens[1]
  )
  const [amount, setAmount] = useState('1')
  const [quote, setQuote] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const getQuote = async () => {
    setLoading(true)
    setQuote(null)
    await new Promise(r => setTimeout(r, 600))
    const outputAmount = (parseFloat(amount) * (Math.random() * 50 + 100)).toFixed(4)
    const priceImpact = (Math.random() * 0.02).toFixed(4)
    setQuote({ outputAmount, priceImpact })
    setLoading(false)
  }

  const switchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setQuote(null)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f1a] border border-purple-900/40 rounded-2xl p-6 w-full max-w-md mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-medium text-gray-200">
            Swap {defaultToSymbol ? `SOL → ${defaultToSymbol}` : 'Tokens'}
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-400 transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-white/[0.04] border border-purple-900/30 rounded-xl p-4">
            <div className="text-xs text-gray-600 mb-2">From</div>
            <div className="flex items-center justify-between">
              <select
                value={fromToken.symbol}
                onChange={e => {
                  const t = tokens.find(t => t.symbol === e.target.value)!
                  setFromToken(t)
                  setQuote(null)
                }}
                className="bg-transparent text-gray-200 text-sm font-medium outline-none cursor-pointer"
              >
                {tokens.map(t => (
                  <option key={t.symbol} value={t.symbol} className="bg-[#0f0f1a]">{t.symbol}</option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={e => { setAmount(e.target.value); setQuote(null) }}
                className="bg-transparent text-right text-gray-200 text-sm w-24 outline-none"
                min="0"
              />
            </div>
          </div>

          <button
            onClick={switchTokens}
            className="mx-auto w-8 h-8 flex items-center justify-center rounded-full border border-purple-900/40 text-indigo-400 hover:bg-indigo-500/10 transition-colors text-lg"
          >
            ⇄
          </button>

          <div className="bg-white/[0.04] border border-purple-900/30 rounded-xl p-4">
            <div className="text-xs text-gray-600 mb-2">To</div>
            <div className="flex items-center justify-between">
              <select
                value={toToken.symbol}
                onChange={e => {
                  const t = tokens.find(t => t.symbol === e.target.value)!
                  setToToken(t)
                  setQuote(null)
                }}
                className="bg-transparent text-gray-200 text-sm font-medium outline-none cursor-pointer"
              >
                {tokens.map(t => (
                  <option key={t.symbol} value={t.symbol} className="bg-[#0f0f1a]">{t.symbol}</option>
                ))}
              </select>
              <div className="text-sm text-gray-400">
                {quote ? quote.outputAmount : '—'}
              </div>
            </div>
          </div>
        </div>

        {quote && (
          <div className="mt-4 flex gap-4 text-xs text-gray-500 border-t border-white/5 pt-4">
            <span>Output: <span className="text-gray-300">{quote.outputAmount} {toToken.symbol}</span></span>
            <span>Impact: <span className="text-gray-300">{(parseFloat(quote.priceImpact) * 100).toFixed(2)}%</span></span>
          </div>
        )}

        <button
          onClick={getQuote}
          disabled={loading || !amount || fromToken.symbol === toToken.symbol}
          className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm py-3 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          {loading ? 'Fetching Quote...' : 'Get Quote'}
        </button>

        <div className="text-center mt-3 text-xs text-indigo-400 cursor-pointer hover:text-indigo-300">
          Connect wallet to swap →
        </div>
      </div>
    </div>
  )
}