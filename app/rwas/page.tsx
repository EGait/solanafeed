'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { rwas, tokenizedStocks } from '../data/rwas'

export default function RWAsPage() {
  const [copied, setCopied] = useState('')
  const categories = Array.from(new Set(rwas.map((r) => r.category)))

  const copyMint = (mint: string) => {
    navigator.clipboard.writeText(mint)
    setCopied(mint)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
          SolanaFeed
        </div>

        <h1 className="text-3xl font-medium text-gray-100 leading-snug mb-4">
          Real-World Assets on <span style={{ color: '#C9A84C' }}>Solana</span>
        </h1>

        <p className="text-gray-400 text-sm leading-relaxed mb-3 max-w-2xl">
          Tokenized stocks, Treasuries, and funds are the fastest-growing corner of Solana. The chain has led every other blockchain in tokenized stock trading volume for 54 consecutive weeks, total RWA value on Solana has grown from $1.4B to roughly $3.5B in 2026 alone, and monthly transfer volume recently topped $8.6B. This page tracks the major assets, who issues them, and who can actually access them.
        </p>

        <p className="text-xs text-gray-600 leading-relaxed mb-10 max-w-2xl">
          Disclaimer: This directory is for informational purposes only and is not financial, legal, or investment advice. Tokenized securities carry issuer, structural, and regulatory risks, and most are unavailable to US persons or require KYC. Access rules change frequently; always verify eligibility with the issuer before interacting with any asset. External trading links go to third-party platforms with their own terms and restrictions. SolanaFeed is not affiliated with the issuers listed and does not recommend any asset.
        </p>

        {/* Popular tokenized stocks with verified mints */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-lg font-medium text-gray-200">Popular Tokenized Stocks</h2>
            <div
              className="text-[10px] px-2 py-0.5 rounded-full border"
              style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}
            >
              Verified addresses
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-4">
            The 9 most traded xStocks, with addresses cross-verified against multiple exchange listings. xStocks offers 60+ assets in total; see the full catalog at{' '}
            <span
              onClick={() => window.open('https://xstocks.com', '_blank')}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              style={{ color: '#C9A84C' }}
            >
              xstocks.com ↗
            </span>
            . Not available to US residents; check your eligibility before trading. Always verify the token address matches before swapping anywhere.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tokenizedStocks.map((s) => (
              <div
                key={s.mint}
                className="rounded-lg border p-5"
                style={{ borderColor: 'rgba(201,168,76,0.2)', backgroundColor: 'rgba(201,168,76,0.04)' }}
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="font-medium" style={{ color: '#C9A84C' }}>{s.ticker}</span>
                  <span className="text-xs text-gray-500">{s.underlying}</span>
                </div>

                <div className="text-sm text-gray-200 mb-3">{s.name}</div>

                <div
                  onClick={() => copyMint(s.mint)}
                  className="text-[11px] text-gray-500 font-mono bg-black/30 border border-gray-800 rounded px-2 py-1.5 mb-4 cursor-pointer hover:border-gray-700 transition-colors break-all"
                  title="Click to copy"
                >
                  {copied === s.mint ? 'Copied ✓' : s.mint}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    onClick={() => window.open(`https://jup.ag/swap/USDC-${s.mint}`, '_blank')}
                    className="text-[10px] cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: '#C9A84C' }}
                  >
                    Trade on Jupiter ↗
                  </span>
                  <span
                    onClick={() => window.open(`https://solscan.io/token/${s.mint}`, '_blank')}
                    className="text-[10px] cursor-pointer hover:opacity-80 transition-opacity ml-auto"
                    style={{ color: '#C9A84C' }}
                  >
                    Verify on Solscan ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-10">
            <h2 className="text-lg font-medium text-gray-200 mb-4">{cat}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rwas
                .filter((r) => r.category === cat)
                .map((r) => (
                  <div
                    key={r.name}
                    className="rounded-lg border p-5"
                    style={{ borderColor: 'rgba(201,168,76,0.2)', backgroundColor: 'rgba(201,168,76,0.04)' }}
                  >
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="text-gray-100 font-medium">{r.name}</span>
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 text-right">
                        {r.issuer}
                      </span>
                    </div>

                    <div className="text-xs mb-3" style={{ color: '#C9A84C' }}>
                      {r.ticker}
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {r.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border"
                        style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}
                      >
                        {r.access}
                      </span>
                      {r.yield && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-gray-800 text-gray-500">
                          {r.yield}
                        </span>
                      )}
                      <span
                        onClick={() => window.open(r.link, '_blank')}
                        className="text-[10px] cursor-pointer hover:opacity-80 transition-opacity ml-auto"
                        style={{ color: '#C9A84C' }}
                      >
                        Website ↗
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </main>
  )
}