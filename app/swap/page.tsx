'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function SwapPage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="px-6 md:px-8 py-12 border-b text-center" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
        <div className="inline-block text-xs px-3 py-1 rounded-full mb-4 border" style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
          Token swap
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Swap{' '}
          <span style={{ color: '#C9A84C' }}>Solana Tokens</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Get the best swap rates on Solana powered by Jupiter routing.
        </p>
      </div>

      <div className="max-w-lg mx-auto px-6 md:px-8 py-10">
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
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