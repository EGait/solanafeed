'use client'

import { useRouter } from 'next/navigation'

const featured = [
  {
    tag: 'Deep Dive',
    title: 'Jupiter ($JUP): A $150M Revenue Superapp Trading Like an Afterthought',
    link: '/news/jup',
    image: '/jup-deepdive.jpg',
  },
  {
    tag: 'Deep Dive',
    title: 'Meteora ($MET): Strong Tech, Collapsed Volume, and a Lawsuit in the Room',
    link: '/news/met',
    image: '/met-deepdive.jpg',
  },
]

export default function Hero() {
  const router = useRouter()

  return (
    <div className="text-center px-6 py-7 md:py-8 border-b" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
      <img
        src="/icon.png"
        alt="SolanaFeed"
        className="w-12 h-12 mx-auto mb-3 object-contain"
      />
      <div className="inline-block text-xs px-3 py-1 rounded-full mb-4 border" style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
        Your Solana universe,  all in one place
      </div>
      <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-3">
        The hub for everything{" "}
        <span style={{ color: '#C9A84C' }}>
          Solana
        </span>
      </h1>
      <p className="text-gray-500 text-sm max-w-md mx-auto mb-5 leading-relaxed">
        Top projects , breaking news, and token swaps — all in one place for the Solana ecosystem.
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => router.push('/projects')}
          className="text-sm px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#C9A84C', color: '#0a0a0f' }}
        >
          Projects
        </button>
        <button
          onClick={() => router.push('/news')}
          className="text-sm px-4 py-2 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          News
        </button>
        <button
          onClick={() => router.push('/lsts')}
          className="text-sm px-4 py-2 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          LSTs
        </button>
        <button
          onClick={() => router.push('/stablecoins')}
          className="text-sm px-4 py-2 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          Stablecoins
        </button>
        <button
          onClick={() => router.push('/swap')}
          className="text-sm px-4 py-2 rounded-lg hover:opacity-80 transition-opacity border"
          style={{ borderColor: '#C9A84C', color: '#C9A84C' }}
        >
          Swap
        </button>
      </div>

      {/* Featured research */}
      <div className="max-w-3xl mx-auto mt-8 text-left">
        <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
          Featured Research
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((a) => (
            <div
              key={a.link}
              onClick={() => router.push(a.link)}
              className="cursor-pointer rounded-lg overflow-hidden border transition-colors group"
              style={{ borderColor: 'rgba(201,168,76,0.2)', backgroundColor: 'rgba(201,168,76,0.04)' }}
            >
              <img
                src={a.image}
                alt={a.title}
                className="w-full aspect-[1200/630] object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="p-4">
                <div className="text-[10px] font-medium uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>
                  {a.tag}
                </div>
                <div className="text-sm text-gray-200 leading-snug group-hover:opacity-80 transition-opacity">
                  {a.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}