'use client'

import { useState } from 'react'

const tokens = [
  { symbol: 'SOL', mint: 'So11111111111111111111111111111111111111112' },
  { symbol: 'USDC', mint: 'EPjFWdd5Au1v1pJLa8k7VNe9gG2rZ9x0h8axVLPGd8N' },
  { symbol: 'RAY', mint: '4k3Dyjzvzp8eMcFubGzEwQ7GJMd7PmJQa4kbMoqMrBnk' },
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
    <div className="mx-6 md:mx-8 mb-8 rounded-2xl p-6" style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>
      <div className="text-xs font-medium uppercase tracking-widest mb-5" style={{ color: '#C9A84C' }}>
        Quick Swap
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="flex-1 rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
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

        <button
          onClick={switchTokens}
          className="mx-auto w-9 h-9 flex items-center justify-center rounded-full text-lg transition-colors"
          style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
        >
          ⇄
        </button>

        <div className="flex-1 rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)' }}>
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

        <button
          onClick={getQuote}
          disabled={loading || !amount || fromToken.symbol === toToken.symbol}
          className="w-full md:w-auto text-sm px-5 py-3 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity font-medium"
          style={{ backgroundColor: '#C9A84C', color: '#0a0a0f' }}
        >
          {loading ? 'Fetching...' : 'Get Quote'}
        </button>
      </div>

      {quote && (
        <div className="mt-4 flex gap-6 text-xs text-gray-500 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <span>
            Output: <span className="text-gray-300 font-medium">{quote.outputAmount} {toToken.symbol}</span>
          </span>
          <span>
            Price impact: <span className="text-gray-300 font-medium">{(parseFloat(quote.priceImpact) * 100).toFixed(2)}%</span>
          </span>
          <span style={{ color: '#C9A84C' }} className="cursor-pointer hover:opacity-80">
            Connect wallet to swap →
          </span>
        </div>
      )}
    </div>
  )
}