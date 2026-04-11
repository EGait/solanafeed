'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function SwapPage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="px-6 md:px-8 py-12 border-b text-center" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
        <div className="inline-block text-xs px-3 py-1 rounded-full mb-4 border" style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
          Token Swap
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Swap{' '}
          <span style={{ color: '#C9A84C' }}>Solana Tokens</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Swap any Solana token at the best rates powered by Jupiter routing across all major Solana DEXs.
        </p>
      </div>

      <div className="flex justify-center items-start py-8 px-4">
        <iframe
          src="https://jup.ag/swap/SOL-USDC?referrer=F7pkMtisKPWKJMXvrRcHaXUfChykA1Ry5xYXT6XtFcSG&feeBps=50"
          width="100%"
          height="700"
          style={{
            maxWidth: '480px',
            border: 'none',
            borderRadius: '16px',
          }}
        />
      </div>

      <Footer />
    </main>
  )
}