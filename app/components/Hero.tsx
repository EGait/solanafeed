'use client'

import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter()

  return (
    <div className="text-center px-6 py-10 md:py-16 border-b" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
      <img
        src="/icon.png"
        alt="SolanaFeed"
        className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 object-contain"
      />
      <div className="inline-block text-xs md:text-sm px-3 py-1 rounded-full mb-4 border" style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
        Your Solana universe,  all in one place
      </div>
      <h1 className="text-4xl md:text-6xl font-medium leading-tight mb-3">
        The hub for everything{" "}
        <span style={{ color: '#C9A84C' }}>
          Solana
        </span>
      </h1>
      <p className="text-gray-500 text-sm md:text-base max-w-md md:max-w-xl mx-auto mb-5 leading-relaxed">
        Top projects , breaking news, and token swaps — all in one place for the Solana ecosystem.
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => router.push('/projects')}
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#C9A84C', color: '#0a0a0f' }}
        >
          Projects
        </button>
        <button
          onClick={() => router.push('/news')}
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          News
        </button>
        <button
          onClick={() => router.push('/lsts')}
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          LSTs
        </button>
        <button
          onClick={() => router.push('/stablecoins')}
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          Stablecoins
        </button>
        <button
          onClick={() => router.push('/rwas')}
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          RWAs
        </button>
        <button
          onClick={() => router.push('/swap')}
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          Swap
        </button>
        <button
          onClick={() => router.push('/learn')}
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-2.5 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          Learn
        </button>
      </div>
    </div>
  )
}