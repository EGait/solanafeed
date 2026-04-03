'use client'

import { useState } from 'react'

const tokens = [
  { symbol: 'SOL', mint: 'So11111111111111111111111111111111111111112' },
  { symbol: 'USDC', mint: 'EPjFWdd5Au1v1pJLa8k7VNe9gG2rZ9x0h8axVLPGd8N' },
  { symbol: 'RAY', mint: '4k3Dyjzvzp8eK1qC8gkDjK8r9rNKXkZbqM6gqjGqz7fX' },
  { symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
]

export default function QuickSwap() {
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(tokens[1])
  const [amount, setAmount] = useState('1')
  const [quote, setQuote] = useState<any>(null)
  const [loading, setLoading] = useState(false)

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
    <div className="mx-6 md:mx-8 mb-8 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
      <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-5">
        Quick Swap
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* From */}
        <div className="flex-1 bg-white/[0.04] border border-purple-900/30 rounded-xl p-4">
          <div className="text-xs text-gray-600 mb-2">From</div>
          <div className="flex items-center justify-between gap-2">
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
                <option key={t.symbol} value={t.symbol} className="bg-[#0a0a0f]">{t.symbol}</option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={e => { setAmount(e.target.value); setQuote(null) }}
              className="bg-transparent text-right text-gray-200 text-sm w-20 outline-none"
              min="0"
            />
          </div>
        </div>

        {/* Switch button */}
        <button
          onClick={switchTokens}
          className="w-9 h-9 mx-auto flex items-center justify-center rounded-full border border-purple-900/40 text-indigo-400 hover:bg-indigo-500/10 transition-colors flex-shrink-0 text-lg"
        >
          ⇄
        </button>

        {/* To */}
        <div className="flex-1 bg-white/[0.04] border border-purple-900/30 rounded-xl p-4">
          <div className="text-xs text-gray-600 mb-2">To</div>
          <div className="flex items-center justify-between gap-2">
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
                <option key={t.symbol} value={t.symbol} className="bg-[#0a0a0f]">{t.symbol}</option>
              ))}
            </select>
            <div className="text-sm text-gray-400 text-right">
              {quote ? quote.outputAmount : '—'}
            </div>
          </div>
        </div>

        {/* Get Quote button */}
        <button
          onClick={getQuote}
          disabled={loading || !amount || fromToken.symbol === toToken.symbol}
          className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-5 py-3 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          {loading ? 'Fetching...' : 'Get Quote'}
        </button>
      </div>

      {/* Quote result */}
      {quote && (
        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs text-gray-500 border-t border-white/5 pt-4">
          <span>
            Output: <span className="text-gray-300 font-medium">{quote.outputAmount} {toToken.symbol}</span>
          </span>
          <span>
            Price impact: <span className="text-gray-300 font-medium">{(parseFloat(quote.priceImpact) * 100).toFixed(2)}%</span>
          </span>
          <span className="text-indigo-400 cursor-pointer hover:text-indigo-300">
            Connect wallet to swap →
          </span>
        </div>
      )}
    </div>
  )
}