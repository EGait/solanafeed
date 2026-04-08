'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'

export default function WelcomeArticle() {
  const router = useRouter()

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-12">
        <button
          onClick={() => router.push('/news')}
          className="text-xs mb-8 hover:opacity-80 transition-opacity flex items-center gap-2"
          style={{ color: '#C9A84C' }}
        >
          ← Back to news
        </button>

        <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
          SolanaFeed
        </div>

        <h1 className="text-3xl font-medium text-gray-100 leading-snug mb-4">
          Welcome to SolanaFeed — Your Solana Hub
        </h1>

        <div className="text-xs text-gray-600 mb-8">
          April 6, 2026 · 2 min read
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Welcome to SolanaFeed — the one place Solana users actually need. We built SolanaFeed to bring together everything happening in the Solana ecosystem in one clean, fast, and easy to use hub.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Whether you are a seasoned DeFi degen who has been on Solana since the beginning, or someone just getting started with their first wallet — SolanaFeed is built for you. No noise, no fluff. Just the projects, news, and tools you need to stay ahead in the Solana ecosystem.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            What you can do on SolanaFeed
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>📰 Read the latest news</span> — We pull daily Solana news from top sources so you never miss an important update. Protocol changes, new project launches, ecosystem developments — it is all here.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>🔭 Discover top projects</span> — Browse our curated directory of the best projects building on Solana. From DeFi protocols and NFT marketplaces to wallets and infrastructure — we cover the full ecosystem.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>⚡ Swap tokens</span> — Swap any Solana token directly from SolanaFeed using Jupiter routing. Get the best prices across all Solana DEXs without leaving the site.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>🏦 Explore LSTs</span> — Learn about and swap into the best liquid staking tokens on Solana. Earn staking rewards while keeping your SOL liquid and productive in DeFi.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            <span style={{ color: '#C9A84C' }}>💵 Browse stablecoins</span> — Compare the top stablecoins available on Solana and swap into stability whenever you need it.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            We are just getting started
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            SolanaFeed is growing fast. We are adding new projects, new content, and new features every week. Our goal is to become the go-to destination for anyone who wants to stay informed and active in the Solana ecosystem.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            If you want to get your project featured on SolanaFeed, reach out to us at SolanaFeedHQ@gmail.com. We are always looking for quality Solana projects to spotlight.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed">
            Follow us on X at{' '}
            <span
              onClick={() => window.open('https://x.com/SolanaFeedHQ', '_blank')}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              style={{ color: '#C9A84C' }}
            >
              @SolanaFeedHQ
            </span>
            {' '}to stay up to date as we grow. Welcome to SolanaFeed — your Solana universe, all in one place.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}