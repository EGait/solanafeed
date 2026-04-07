'use client'

import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter()

  return (
    <div className="text-center px-6 py-12 md:py-16 border-b" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
      <div className="inline-block text-xs px-3 py-1 rounded-full mb-5 border" style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
        Your Solana universe, all in one place
      </div>
      <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-4">
        The hub for everything{" "}
        <span style={{ color: '#C9A84C' }}>
          Solana
        </span>
      </h1>
      <p className="text-gray-500 text-sm max-w-md mx-auto mb-7 leading-relaxed">
        Top projects, breaking news, and token swaps — all in one place for the Solana ecosystem.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => router.push('/projects')}
          className="text-sm px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#C9A84C', color: '#0a0a0f' }}
        >
          Explore Projects
        </button>
        <button
          onClick={() => router.push('/news')}
          className="text-sm px-5 py-2 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          Read Latest News
        </button>
      </div>
    </div>
  )
}