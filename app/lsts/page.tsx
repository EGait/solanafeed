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

      <div className="px-6 md:px-8 py-12 border-b text-center" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
        <div className="inline-block text-xs px-3 py-1 rounded-full mb-4 border" style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
          Liquid Staking
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Solana{' '}
          <span style={{ color: '#C9A84C' }}>Liquid Staking Tokens</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          Stake your SOL and keep it liquid. LSTs let you earn staking rewards while still using your SOL in DeFi.
        </p>
      </div>

      <div className="px-6 md:px-8 py-8 max-w-5xl mx-auto">
        <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="text-xs font-medium mb-2" style={{ color: '#C9A84C' }}>What is liquid staking?</div>
          <p className="text-xs text-gray-500 leading-relaxed">
            When you stake SOL normally it gets locked up and you can not use it. Liquid staking gives you a token that represents your staked SOL — you earn staking rewards while still being able to use that token in DeFi protocols, swap it, or sell it anytime.
          </p>
        </div>

        <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
          Top LSTs on Solana
        </div>

        {/* Desktop table view */}
        <div className="hidden md:block rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
          <div className="grid grid-cols-12 px-4 py-3 text-xs font-medium uppercase tracking-widest" style={{ backgroundColor: 'rgba(201,168,76,0.08)', color: '#C9A84C', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
            <div className="col-span-4">Token</div>
            <div className="col-span-2 text-right">APY</div>
            <div className="col-span-2 text-right">SOL Staked</div>
            <div className="col-span-2 text-right">TVL</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {lsts.map((lst, index) => {
            return (
              <div
                key={lst.id}
                className="grid grid-cols-12 px-4 py-4 items-center"
                style={{
                  borderBottom: index < lsts.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none',
                  backgroundColor: index % 2 === 0 ? 'rgba(201,168,76,0.02)' : 'transparent'
                }}
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                    {lst.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-200">{lst.name}</div>
                    <div className="text-xs text-gray-600">{lst.symbol}</div>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-medium" style={{ color: '#C9A84C' }}>{lst.apy}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs text-gray-300">{lst.solStaked}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs text-gray-300">{lst.tvl}</span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openSwap(lst)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all"
                    style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
                  >
                    Swap
                  </button>
                  <button
                    onClick={() => visitSite(lst.website)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors text-gray-500 hover:text-gray-300"
                    style={{ border: '1px solid rgba(201,168,76,0.15)' }}
                  >
                    Visit
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile card view */}
        <div className="md:hidden flex flex-col gap-3">
          {lsts.map((lst) => {
            return (
              <div
                key={lst.id}
                className="rounded-2xl p-4"
                style={{ backgroundColor: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                      {lst.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-200">{lst.name}</div>
                      <div className="text-xs text-gray-600">{lst.symbol}</div>
                    </div>
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#C9A84C' }}>{lst.apy}</span>
                </div>
                <div className="flex gap-4 text-xs mb-3">
                  <div>
                    <span className="text-gray-600">SOL Staked </span>
                    <span className="text-gray-300">{lst.solStaked}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">TVL </span>
                    <span className="text-gray-300">{lst.tvl}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openSwap(lst)}
                    className="flex-1 text-xs py-2 rounded-lg transition-all"
                    style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
                  >
                    Swap → {lst.symbol}
                  </button>
                  <button
                    onClick={() => visitSite(lst.website)}
                    className="px-3 py-2 text-xs rounded-lg transition-colors text-gray-500 hover:text-gray-300"
                    style={{ border: '1px solid rgba(201,168,76,0.15)' }}
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