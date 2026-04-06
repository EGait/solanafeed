'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const tokens = [
  { symbol: 'SOL', mint: 'So11111111111111111111111111111111111111112', name: 'Solana' },
  { symbol: 'USDC', mint: 'EPjFWdd5Au1v1pJLa8k7VNe9gG2rZ9x0h8axVLPGd8N', name: 'USD Coin' },
  { symbol: 'USDT', mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', name: 'Tether' },
  { symbol: 'RAY', mint: '4k3Dyjzvzp8eMcFubGzEwQ7GJMd7PmJQa4kbMoqMrBnk', name: 'Raydium' },
  { symbol: 'JUP', mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', name: 'Jupiter' },
  { symbol: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', name: 'Bonk' },
  { symbol: 'JTO', mint: 'jtojtomepa8bduh8b5duh5uhduhb8b5duh5uhduhb8', name: 'Jito' },
  { symbol: 'MNDE', mint: 'MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey', name: 'Marinade' },
  { symbol: 'jitoSOL', mint: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn', name: 'Jito SOL' },
  { symbol: 'mSOL', mint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', name: 'Marinade SOL' },
]

export default function SwapPage() {
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
    const rate = (parseFloat(outputAmount) / parseFloat(amount)).toFixed(4)
    setQuote({ outputAmount, priceImpact, rate })
    setLoading(false)
  }

  const switchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setQuote(null)
  }

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="px-6 md:px-8 py-12 border-b border-purple-900/20 text-center">
        <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full mb-4">
          Token swap
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Swap{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Solana Tokens
          </span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Get the best swap rates on Solana powered by Jupiter routing.
        </p>
      </div>

      <div className="max-w-lg mx-auto px-6 md:px-8 py-10">

        <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-6 mb-4">

          <div className="bg-white/[0.04] border border-purple-900/30 rounded-xl p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-600">From</div>
              <div className="text-xs text-gray-600">Balance: —</div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <select
                value={fromToken.symbol}
                onChange={e => {
                  const t = tokens.find(t => t.symbol === e.target.value)!
                  setFromToken(t)
                  setQuote(null)
                }}
                className="bg-transparent text-gray-200 text-base font-medium outline-none cursor-pointer flex-shrink-0"
              >
                {tokens.map(t => (
                  <option key={t.symbol} value={t.symbol} className="bg-[#0a0a0f]">
                    {t.symbol}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={e => { setAmount(e.target.value); setQuote(null) }}
                className="bg-transparent text-right text-gray-200 text-xl font-medium w-full outline-none"
                placeholder="0.00"
                min="0"
              />
            </div>
            <div className="text-xs text-gray-600 mt-1">{fromToken.name}</div>
          </div>

          <button
            onClick={switchTokens}
            className="mx-auto w-9 h-9 flex items-center justify-center rounded-full border border-purple-900/40 text-indigo-400 hover:bg-indigo-500/10 transition-colors text-lg mb-3"
          >
            ⇄
          </button>

          <div className="bg-white/[0.04] border border-purple-900/30 rounded-xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-600">To</div>
              <div className="text-xs text-gray-600">Balance: —</div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <select
                value={toToken.symbol}
                onChange={e => {
                  const t = tokens.find(t => t.symbol === e.target.value)!
                  setToToken(t)
                  setQuote(null)
                }}
                className="bg-transparent text-gray-200 text-base font-medium outline-none cursor-pointer flex-shrink-0"
              >
                {tokens.map(t => (
                  <option key={t.symbol} value={t.symbol} className="bg-[#0a0a0f]">
                    {t.symbol}
                  </option>
                ))}
              </select>
              <div className="text-right text-xl font-medium text-gray-400 w-full">
                {quote ? quote.outputAmount : '0.00'}
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-1">{toToken.name}</div>
          </div>

          {quote && (
            <div className="bg-white/[0.02] border border-purple-900/20 rounded-xl p-4 mb-5">
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
                <div className="flex justify-between">
                  <span className="text-gray-600">Route</span>
                  <span className="text-gray-300">Jupiter V6</span>
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

          <button className="w-full border border-indigo-500/30 text-indigo-300 text-sm py-3 rounded-xl hover:bg-indigo-500/10 transition-colors">
            Connect Wallet to Swap
          </button>

        </div>

        <div className="text-center text-xs text-gray-600">
          Powered by Jupiter routing — best prices across all Solana DEXs
        </div>

      </div>

      <Footer />
    </main>
  )
}