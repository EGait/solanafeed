'use client'

import { useRouter } from 'next/navigation'

const featured = [
  {
    tag: 'Deep Dive',
    title: 'Circle ($CRCL): USDC Just Got a Federal Bank Charter',
    link: '/news/crcl',
    image: '/crcl-deepdive.jpg',
  },
  {
    tag: 'Deep Dive',
    title: "Robinhood Chain's First Week vs. Peak Solana",
    link: '/news/robinhood-chain',
    image: '/robinhood-chain-deepdive.jpg',
  },
  {
    tag: 'Deep Dive',
    title: 'Jupiter ($JUP): A $150M Revenue Superapp',
    link: '/news/jup',
    image: '/jup-deepdive.jpg',
  },
  {
    tag: 'Deep Dive',
    title: 'Meteora ($MET): Strong Tech, Collapsed Volume',
    link: '/news/met',
    image: '/met-deepdive.jpg',
  },
]

export default function FeaturedResearch() {
  const router = useRouter()

  return (
    <div className="px-6 py-12 border-b" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="text-xs font-medium uppercase tracking-widest" style={{ color: '#C9A84C' }}>
            Featured Research
          </div>
          <div
            className="text-[10px] px-2 py-0.5 rounded-full border"
            style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}
          >
            Written in-house by SolanaFeed
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: '#C9A84C' }}>
                    {a.tag}
                  </span>
                  <span className="text-[10px] text-gray-600">·</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                    SolanaFeed Original
                  </span>
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