'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SwapModal from '../components/SwapModal'
import { stablecoins } from '../data/stablecoins'

export default function StablecoinsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState<any>(null)

  const openSwap = (coin: any) => {
    setSelectedCoin(coin)
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
          Stablecoins
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Solana{' '}
          <span style={{ color: '#C9A84C' }}>Stablecoins</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          Stablecoins pegged to the US dollar available on Solana. Swap into stability or put your dollars to work in DeFi.
        </p>
      </div>

      <div className="px-6 md:px-8 py-8 max-w-5xl mx-auto">
        <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="text-xs font-medium mb-2" style={{ color: '#C9A84C' }}>What are stablecoins?</div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Stablecoins are tokens designed to maintain a stable value, usually pegged to the US dollar. They let you stay in crypto without exposure to price volatility — useful for trading, saving, and earning yield in DeFi.
          </p>
        </div>

        <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
          Top Stablecoins on Solana
        </div>

        {/* Desktop table view */}
        <div className="hidden md:block rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.15)' }}>
          <div className="grid grid-cols-12 px-4 py-3 text-xs font-medium uppercase tracking-widest" style={{ backgroundColor: 'rgba(201,168,76,0.08)', color: '#C9A84C', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
            <div className="col-span-3">Token</div>
            <div className="col-span-2 text-right">Issuer</div>
            <div className="col-span-2 text-right">Peg</div>
            <div className="col-span-2 text-right">Supply</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {stablecoins.map((coin, index) => {
            return (
              <div
                key={coin.id}
                className="grid grid-cols-12 px-4 py-4 items-center"
                style={{
                  borderBottom: index < stablecoins.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none',
                  backgroundColor: index % 2 === 0 ? 'rgba(201,168,76,0.02)' : 'transparent'
                }}
              >
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                    {coin.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-200">{coin.name}</div>
                    <div className="text-xs text-gray-600">{coin.symbol}</div>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs text-gray-300">{coin.issuer}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs font-medium" style={{ color: '#C9A84C' }}>{coin.peg}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs text-gray-300">{coin.supply}</span>
                </div>
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openSwap(coin)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all"
                    style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
                  >
                    Swap
                  </button>
                  <button
                    onClick={() => visitSite(coin.website)}
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
          {stablecoins.map((coin) => {
            return (
              <div
                key={coin.id}
                className="rounded-2xl p-4"
                style={{ backgroundColor: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                      {coin.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-200">{coin.name}</div>
                      <div className="text-xs text-gray-600">{coin.symbol}</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium" style={{ color: '#C9A84C' }}>{coin.peg}</span>
                </div>
                <div className="flex gap-4 text-xs mb-3">
                  <div>
                    <span className="text-gray-600">Issuer </span>
                    <span className="text-gray-300">{coin.issuer}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Supply </span>
                    <span className="text-gray-300">{coin.supply}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openSwap(coin)}
                    className="flex-1 text-xs py-2 rounded-lg transition-all"
                    style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
                  >
                    Swap → {coin.symbol}
                  </button>
                  <button
                    onClick={() => visitSite(coin.website)}
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
        defaultToMint={selectedCoin?.mintAddress}
        defaultToSymbol={selectedCoin?.symbol}
      />

      <Footer />
    </main>
  )
}