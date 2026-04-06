'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SwapModal from '../components/SwapModal'
import { lsts } from '../data/lsts'

export default function LSTsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedLST, setSelectedLST] = useState<any>(null)

  const openSwap = (lst: any) => {
    setSelectedLST(lst)
    setModalOpen(true)
  }

  const visitSite = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="px-6 md:px-8 py-12 border-b border-purple-900/20 text-center">
        <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full mb-4">
          Liquid Staking
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Solana{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Liquid Staking Tokens
          </span>
        </h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          Stake your SOL and keep it liquid. LSTs let you earn staking rewards while still using your SOL in DeFi.
        </p>
      </div>

      <div className="px-6 md:px-8 py-8 max-w-5xl mx-auto">
        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5 mb-8">
          <div className="text-xs font-medium text-indigo-400 mb-2">What is liquid staking?</div>
          <p className="text-xs text-gray-500 leading-relaxed">
            When you stake SOL normally it gets locked up and you can not use it. Liquid staking gives you a token that represents your staked SOL — you earn staking rewards while still being able to use that token in DeFi protocols, swap it, or sell it anytime.
          </p>
        </div>

        <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-6">
          Top LSTs on Solana
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lsts.map((lst) => {
            return (
              <div
                key={lst.id}
                className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-5 flex flex-col gap-3 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xl">
                      {lst.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-200">{lst.name}</div>
                      <div className="text-xs text-gray-600">{lst.symbol}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    lst.badgeType === 'up' ? 'bg-green-500/10 text-green-400' :
                    lst.badgeType === 'hot' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {lst.badge}
                  </span>
                </div>
                <div className="text-xs text-gray-500 leading-relaxed">
                  {lst.description}
                </div>
                <div className="flex gap-4 text-xs">
                  <div>
                    <span className="text-gray-600">APY </span>
                    <span className="text-green-400 font-medium">{lst.apy}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">TVL </span>
                    <span className="text-gray-300">{lst.tvl}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openSwap(lst)}
                    className="flex-1 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 text-indigo-300 text-xs py-2 rounded-lg hover:from-indigo-500/30 hover:to-purple-600/30 transition-all"
                  >
                    Swap → {lst.symbol}
                  </button>
                  <button
                    onClick={() => visitSite(lst.website)}
                    className="px-3 py-2 border border-purple-900/30 text-gray-500 text-xs rounded-lg hover:text-gray-300 transition-colors"
                  >
                    Visit
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

<SwapModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  defaultToMint={selectedLST?.mintAddress}
  defaultToSymbol={selectedLST?.symbol}
/>

      <Footer />
    </main>
  )
}