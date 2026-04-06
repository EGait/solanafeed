'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function SwapPage() {
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
        <div className="rounded-2xl overflow-hidden border border-purple-900/30">
          <iframe
            src="https://jup.ag/swap/SOL-USDC?referrer=F7pkMtisKPWKJMXvrRcHaXUfChykA1Ry5xYXT6XtFcSG&feeBps=50"
            width="100%"
            height="600"
            style={{ border: 'none' }}
          />
        </div>
        <div className="text-center text-xs text-gray-600 mt-4">
          Powered by Jupiter routing — best prices across all Solana DEXs
        </div>
      </div>

      <Footer />
    </main>
  )
}