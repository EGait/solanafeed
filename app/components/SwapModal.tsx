'use client'

import { useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const tokens = [
  { symbol: 'SOL', mint: 'So11111111111111111111111111111111111111112' },
  { symbol: 'USDC', mint: 'EPjFWdd5Au1v1pJLa8k7VNe9gG2rZ9x0h8axVLPGd8N' },
  { symbol: 'USDT', mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' },
  { symbol: 'RAY', mint: '4k3Dyjzvzp8eMcFubGzEwQ7GJMd7PmJQa4kbMoqMrBnk' },
  { symbol: 'JUP', mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN' },
  { symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
  { symbol: 'JTO', mint: 'jtojtomepa8bduh8b5duh5uhduhb8b5duh5uhduhb8' },
  { symbol: 'MNDE', mint: 'MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey' },
  { symbol: 'jitoSOL', mint: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn' },
  { symbol: 'mSOL', mint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So' },
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
  const [error, setError] = useState('')

  if (!isOpen) return null

  const getQuote = async () => {
    if (!amount || parseFloat(amount) <= 0) return
    if (fromToken.symbol === toToken.symbol) return

    setLoading(true)
    setQuote(null)
    setError('')

    try {
      const lamports = Math.floor(parseFloat(amount) * 1e9)
      const res = await fetch(
        `/api/jupiterQuote?inputMint=${fromToken.mint}&outputMint=${toToken.mint}&amount=${lamports}`
      )
      const data = await res.json()

      if (data.error) {
        setError('Could not fetch quote for this pair. Try a different token.')
        return
      }

      const outputAmount = (parseInt(data.outAmount) / 1e6).toFixed(4)
      const priceImpact = data.priceImpactPct || '0'
      const rate = (parseFloat(outputAmount) / parseFloat(amount)).toFixed(4)

      setQuote({ outputAmount, priceImpact, rate })
    } catch (err) {
      setError('Failed to fetch quote. Please try again.')
      console.error('Failed to fetch quote:', err)
    } finally {
      setLoading(false)
    }
  }

  const switchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setQuote(null)
    setError('')
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

        <div className="bg-white/[0.04] border border-purple-900/30 rounded-xl p-4 mb-3">
          <div className="text-xs text-gray-600 mb-2">From</div>
          <div className="flex items-center justify-between gap-3">
            <select
              value={fromToken.symbol}
              onChange={e => {
                const t = tokens.find(t => t.symbol === e.target.value)!
                setFromToken(t)
                setQuote(null)
                setError('')
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
              onChange={e => { setAmount(e.target.value); setQuote(null); setError('') }}
              className="bg-transparent text-right text-gray-200 text-lg font-medium w-full outline-none"
              min="0"
              placeholder="0.00"
            />
          </div>
        </div>

        <button
          onClick={switchTokens}
          className="mx-auto w-8 h-8 flex items-center justify-center rounded-full border border-purple-900/40 text-indigo-400 hover:bg-indigo-500/10 transition-colors text-lg mb-3"
        >
          ⇄
        </button>

        <div className="bg-white/[0.04] border border-purple-900/30 rounded-xl p-4 mb-4">
          <div className="text-xs text-gray-600 mb-2">To</div>
          <div className="flex items-center justify-between gap-3">
            <select
              value={toToken.symbol}
              onChange={e => {
                const t = tokens.find(t => t.symbol === e.target.value)!
                setToToken(t)
                setQuote(null)
                setError('')
              }}
              className="bg-transparent text-gray-200 text-sm font-medium outline-none cursor-pointer"
            >
              {tokens.map(t => (
                <option key={t.symbol} value={t.symbol} className="bg-[#0f0f1a]">{t.symbol}</option>
              ))}
            </select>
            <div className="text-right text-lg font-medium text-gray-400 w-full">
              {quote ? quote.outputAmount : '0.00'}
            </div>
          </div>
        </div>

        {error && (
          <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {quote && (
          <div className="bg-white/[0.02] border border-purple-900/20 rounded-xl p-4 mb-4">
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Rate</span>
                <span className="text-gray-300">1 {fromToken.symbol} = {quote.rate} {toToken.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price impact</span>
                <span className="text-green-400">{(parseFloat(quote.priceImpact) * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum received</span>
                <span className="text-gray-300">{(parseFloat(quote.outputAmount) * 0.995).toFixed(4)} {toToken.symbol}</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={getQuote}
          disabled={loading || !amount || fromToken.symbol === toToken.symbol}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm py-3 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity mb-3"
        >
          {loading ? 'Fetching Quote...' : 'Get Quote'}
        </button>

        <WalletMultiButton className="!w-full !bg-transparent !border !border-indigo-500/30 !text-indigo-300 !text-xs !py-2 !rounded-xl hover:!bg-indigo-500/10 !transition-colors !justify-center" />

      </div>
    </div>
  )
}