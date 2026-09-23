'use client'

import { useState, useEffect, useCallback } from 'react'

type Timeframe = 'h1' | 'h6' | 'h24'

interface PoolData {
  poolAddress: string
  pair: string
  baseSymbol: string
  quoteSymbol: string
  dex: string
  priceUsd: number
  volume: { h1: number; h6: number; h24: number }
  priceChange: { h1: number; h6: number; h24: number }
  liquidityUsd: number
  txCount24h: number
}

const TIMEFRAMES: { key: Timeframe; label: string }[] = [
  { key: 'h1', label: '1H' },
  { key: 'h6', label: '6H' },
  { key: 'h24', label: '24H' },
]

function formatUsd(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`
  return `$${n.toFixed(2)}`
}

function formatPrice(n: number) {
  if (n === 0) return '—'
  if (n < 0.01) return `$${n.toFixed(6)}`
  if (n < 1) return `$${n.toFixed(4)}`
  return `$${n.toFixed(2)}`
}

export default function TopTokensTable() {
  const [timeframe, setTimeframe] = useState<Timeframe>('h24')
  const [pools, setPools] = useState<PoolData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/token-volume')
      const data = await res.json()
      if (data.error) {
        setError(true)
      } else {
        setPools(data.pools ?? [])
        setUpdatedAt(data.updatedAt ?? null)
        setError(false)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5 * 60 * 1000) // refresh every 5 min
    return () => clearInterval(interval)
  }, [fetchData])

  const sorted = [...pools].sort((a, b) => b.volume[timeframe] - a.volume[timeframe])

  return (
    <div className="px-6 py-12 border-b" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="text-xs font-medium uppercase tracking-widest" style={{ color: '#C9A84C' }}>
              Top Solana Tokens by Volume
            </div>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full border"
              style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}
            >
              Live
            </span>
          </div>

          <div className="flex gap-1 rounded-lg p-1" style={{ backgroundColor: 'rgba(201,168,76,0.06)' }}>
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf.key}
                onClick={() => setTimeframe(tf.key)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                  timeframe === tf.key ? '' : 'text-gray-500'
                }`}
                style={
                  timeframe === tf.key
                    ? { backgroundColor: '#C9A84C', color: '#0a0a0f' }
                    : undefined
                }
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-5">
          Live DEX pool data on Solana via GeckoTerminal. Prices and volume update every few minutes — not real-time to the second.
          {updatedAt && ` Last updated ${new Date(updatedAt).toLocaleTimeString()}.`}
        </p>

        {loading ? (
          <div className="rounded-lg border px-6 py-10 text-center text-sm text-gray-500" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
            Loading live data…
          </div>
        ) : error || sorted.length === 0 ? (
          <div className="rounded-lg border px-6 py-10 text-center text-sm text-gray-500" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
            Live data isn't available right now — check back soon.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-600 border-b" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                  <th className="py-2 pr-3 font-medium">#</th>
                  <th className="py-2 pr-3 font-medium">Pair</th>
                  <th className="py-2 pr-3 font-medium">DEX</th>
                  <th className="py-2 pr-3 font-medium text-right">Price</th>
                  <th className="py-2 pr-3 font-medium text-right">{TIMEFRAMES.find(t => t.key === timeframe)?.label} Change</th>
                  <th className="py-2 pr-3 font-medium text-right">{TIMEFRAMES.find(t => t.key === timeframe)?.label} Volume</th>
                  <th className="py-2 pr-0 font-medium text-right">Liquidity</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((pool, i) => {
                  const change = pool.priceChange[timeframe]
                  const positive = change >= 0
                  return (
                    <tr
                      key={pool.poolAddress}
                      className="border-b transition-colors hover:bg-white/[0.02]"
                      style={{ borderColor: 'rgba(201,168,76,0.08)' }}
                    >
                      <td className="py-2.5 pr-3 text-gray-600">{i + 1}</td>
                      <td className="py-2.5 pr-3">
                        <span className="font-medium text-gray-200">{pool.baseSymbol}</span>
                        <span className="text-gray-600"> / {pool.quoteSymbol}</span>
                      </td>
                      <td className="py-2.5 pr-3 text-gray-500 text-xs">{pool.dex}</td>
                      <td className="py-2.5 pr-3 text-right text-gray-300">{formatPrice(pool.priceUsd)}</td>
                      <td
                        className="py-2.5 pr-3 text-right font-medium"
                        style={{ color: positive ? '#22C55E' : '#f87171' }}
                      >
                        {positive ? '+' : ''}{change.toFixed(2)}%
                      </td>
                      <td className="py-2.5 pr-3 text-right text-gray-300">{formatUsd(pool.volume[timeframe])}</td>
                      <td className="py-2.5 pr-0 text-right text-gray-500">{formatUsd(pool.liquidityUsd)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-[10px] text-gray-700 mt-4">
          Data from GeckoTerminal, an independent third-party indexer. Figures can lag onchain reality by several minutes and coverage of newer pools may be incomplete. Not financial advice.
        </p>
      </div>
    </div>
  )
}