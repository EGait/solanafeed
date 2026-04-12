'use client'

import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter()

  return (
    <div className="text-center px-6 py-6 md:py-8 border-b" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
      <img
        src="/icon.png"
        alt="SolanaFeed"
        className="w-12 h-12 mx-auto mb-4 object-contain"
      />
      <div className="inline-block text-xs px-3 py-1 rounded-full mb-4 border badge-outline">
        Your Solana universe, all in one place
      </div>
      <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-3">
        The hub for everything{" "}
        <span className="gold-text">Solana</span>
      </h1>
      <p className="text-gray-500 text-sm max-w-md mx-auto mb-5 leading-relaxed">
        Top projects, breaking news, and token swaps — all in one place for the Solana ecosystem.
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={() => router.push('/projects')} className="btn-gold">
          Projects
        </button>
        <button onClick={() => router.push('/news')} className="btn-hero-outline">
          News
        </button>
        <button onClick={() => router.push('/lsts')} className="btn-hero-outline">
          LSTs
        </button>
        <button onClick={() => router.push('/stablecoins')} className="btn-hero-outline">
          Stablecoins
        </button>
        <button onClick={() => router.push('/swap')} className="btn-hero-outline">
          Swap
        </button>
      </div>
    </div>
  )
}