'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100 flex items-center justify-center">
      <div className="text-center px-6">
        <img
          src="/icon.png"
          alt="SolanaFeed"
          className="w-16 h-16 mx-auto mb-6 object-contain opacity-50"
        />
        <div className="text-6xl font-medium mb-4" style={{ color: '#C9A84C' }}>
          404
        </div>
        <div className="text-xl font-medium text-gray-200 mb-3">
          Page not found
        </div>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">
          This page does not exist or has been moved. Head back to the homepage to explore Solana.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push('/')}
            className="text-sm px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#C9A84C', color: '#0a0a0f' }}
          >
            Go home
          </button>
          <button
            onClick={() => router.push('/news')}
            className="text-sm px-5 py-2 rounded-lg hover:opacity-80 transition-opacity border"
            style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
          >
            Read news
          </button>
        </div>
      </div>
    </main>
  )
}