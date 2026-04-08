'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="px-6 md:px-8 py-12 border-b text-center" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
        <div className="inline-block text-xs px-3 py-1 rounded-full mb-4 border" style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
          About us
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Built for the{' '}
          <span style={{ color: '#C9A84C' }}>Solana community</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          SolanaFeed is your go-to hub for everything happening in the Solana ecosystem.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-12">
        <div className="mb-10">
          <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
            Our mission
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Solana moves fast. New projects launch daily, protocols ship updates constantly, and the ecosystem evolves at a pace that is hard to keep up with. SolanaFeed exists to make that easier — one place to discover top projects, read the latest news, and swap tokens without leaving.
          </p>
        </div>

        <div className="mb-10">
          <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
            What we offer
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5" style={{ backgroundColor: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="text-2xl mb-3">📰</div>
              <div className="font-medium text-gray-200 text-sm mb-1">News</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                Daily updates on the most important Solana stories, projects, and protocol changes.
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ backgroundColor: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="text-2xl mb-3">🔭</div>
              <div className="font-medium text-gray-200 text-sm mb-1">Projects</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                A curated directory of the best projects building on Solana across DeFi, NFTs, and more.
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{ backgroundColor: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="text-2xl mb-3">⚡</div>
              <div className="font-medium text-gray-200 text-sm mb-1">Swap</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                Swap Solana tokens directly from SolanaFeed using Jupiter best-in-class routing.
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
            Follow us
          </div>
          <div className="flex gap-4">
            <div
              onClick={() => window.open('https://x.com/SolanaFeedHQ', '_blank')}
              className="flex items-center gap-2 rounded-xl px-4 py-3 cursor-pointer text-sm hover:opacity-80 transition-opacity"
              style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C' }}
            >
              <span>𝕏</span>
              <span>@SolanaFeedHQ</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="font-medium text-gray-200 mb-2">Want to feature your project?</div>
          <p className="text-xs text-gray-500 mb-4">
            We are always looking for quality Solana projects to feature on SolanaFeed. Get in touch and lets talk.
          </p>
          <div
            onClick={() => window.location.href = 'mailto:SolanaFeedHQ@gmail.com'}
            className="inline-block text-sm px-5 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity font-medium"
            style={{ backgroundColor: '#C9A84C', color: '#0a0a0f' }}
          >
            Get in touch
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}