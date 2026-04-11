'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="px-6 md:px-8 py-12 border-b text-center" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
        <div className="inline-block text-xs px-3 py-1 rounded-full mb-4 border" style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
          About
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          About{' '}
          <span style={{ color: '#C9A84C' }}>SolanaFeed</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Your go-to hub for everything happening in the Solana ecosystem.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-12">
        <div className="flex flex-col gap-8 text-sm text-gray-400 leading-relaxed">
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Our Mission</h2>
            <p>
              SolanaFeed is built to be the one place Solana users actually need. We bring together the best projects, breaking news, liquid staking tokens, stablecoins, and token swaps — all in one clean, fast hub built for the Solana community.
            </p>
          </div>

          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">What We Offer</h2>
            <div className="flex flex-col gap-3 text-gray-500">
              <p>📰 <strong className="text-gray-400">Daily News</strong> — Stay up to date with the latest Solana news pulled from top crypto sources.</p>
              <p>🔭 <strong className="text-gray-400">Project Directory</strong> — Browse our curated directory of the best projects building on Solana.</p>
              <p>⚡ <strong className="text-gray-400">Token Swaps</strong> — Swap any Solana token directly from SolanaFeed using Jupiter routing.</p>
              <p>🏦 <strong className="text-gray-400">LST Comparison</strong> — Compare the top liquid staking tokens on Solana by APY and TVL.</p>
              <p>💵 <strong className="text-gray-400">Stablecoins</strong> — Browse and compare the top stablecoins available on Solana.</p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Contact</h2>
            <p>
              Have a project you want featured? Want to get in touch?
            </p>
            <button
              onClick={() => window.location.href = 'mailto:SolanaFeedHQ@gmail.com'}
              className="mt-3 text-xs px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
            >
              SolanaFeedHQ@gmail.com
            </button>
          </div>

          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Follow Us</h2>
            <button
              onClick={() => window.open('https://x.com/SolanaFeedHQ', '_blank')}
              className="text-xs px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
            >
              𝕏 @SolanaFeedHQ
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}