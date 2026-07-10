'use client'

import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { guides } from '../data/guides'

export default function LearnPage() {
  const router = useRouter()

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
          SolanaFeed
        </div>

        <h1 className="text-3xl font-medium text-gray-100 leading-snug mb-4">
          Solana <span style={{ color: '#C9A84C' }}>101</span>
        </h1>

        <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-2xl">
          New to Solana? Start here. Plain-English guides on wallets, security, and getting around the ecosystem safely. No hype, no jargon, and nothing to buy. Just the basics done right.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((g) => (
            <div
              key={g.link}
              onClick={() => router.push(g.link)}
              className="cursor-pointer rounded-lg border p-5 transition-colors group"
              style={{ borderColor: 'rgba(201,168,76,0.2)', backgroundColor: 'rgba(201,168,76,0.04)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full border"
                  style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}
                >
                  {g.level}
                </span>
              </div>
              <div className="text-base text-gray-100 font-medium leading-snug mb-2 group-hover:opacity-80 transition-opacity">
                {g.title}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {g.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}