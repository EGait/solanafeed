'use client'

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ownArticles } from '../data/ownArticles'

type Article = {
  title: string
  link: string
  date: string
  summary: string
  image: string | null
  own?: boolean
}

const tags = ['All', 'DeFi', 'NFT', 'Protocol', 'Ecosystem', 'Staking']

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        const combined = [...ownArticles, ...(data.articles || [])]
        setArticles(combined)
      } catch (err) {
        console.error('News fetch error:', err)
        setArticles(ownArticles)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary?.toLowerCase().includes(search.toLowerCase())
    return matchesSearch
  })

  const ownFiltered = filtered.filter((a) => a.own)
  const ctFiltered = filtered.filter((a) => !a.own)

  const openArticle = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="px-6 md:px-8 py-12 border-b text-center" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
        <div className="inline-block text-xs px-3 py-1 rounded-full mb-4 border" style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
          Solana news
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Latest{' '}
          <span style={{ color: '#C9A84C' }}>Solana News</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Stay up to date with everything happening in the Solana ecosystem.
        </p>
      </div>

      <div className="px-6 md:px-8 py-8 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none placeholder-gray-600 bg-white/[0.04]"
            style={{ border: '1px solid rgba(201,168,76,0.2)' }}
          />
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className="text-xs px-4 py-2 rounded-lg transition-colors"
                style={activeTag === tag ? {
                  backgroundColor: 'rgba(201,168,76,0.2)',
                  border: '1px solid rgba(201,168,76,0.5)',
                  color: '#C9A84C',
                } : {
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: '#888888',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col gap-4">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="py-4 border-b animate-pulse" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="h-3 rounded mb-2 w-16" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }} />
                <div className="h-4 rounded mb-2 w-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
                <div className="h-4 rounded mb-2 w-3/4" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }} />
                <div className="h-3 rounded w-24" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} />
              </div>
            ))}
          </div>
        )}

        {!loading && ctFiltered.length > 0 && (
          <div
            onClick={() => openArticle(ctFiltered[0].link)}
            className="rounded-2xl p-6 mb-8 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
              Featured Article
            </div>
            <div className="text-lg font-medium text-gray-100 leading-snug mb-3">
              {ctFiltered[0].title}
            </div>
            {ctFiltered[0].summary && (
              <div className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
                {ctFiltered[0].summary}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600">
                {new Date(ctFiltered[0].date).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric',
                })}
              </div>
              <div className="text-xs font-medium" style={{ color: '#C9A84C' }}>
                Read article →
              </div>
            </div>
          </div>
        )}

        {ownFiltered.length > 0 && (
          <div className="mb-10">
            <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
              From SolanaFeed
            </div>
            <div className="flex flex-col gap-3">
              {ownFiltered.map((article, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => openArticle(article.link)}
                    className="rounded-2xl p-5 cursor-pointer transition-colors hover:opacity-90"
                    style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}
                  >
                    <span className="text-xs px-2 py-0.5 rounded inline-block mb-2" style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}>
                      SolanaFeed
                    </span>
                    <div className="text-sm font-medium text-gray-200 leading-snug mb-2">
                      {article.title}
                    </div>
                    {article.summary && (
                      <div className="text-xs text-gray-500 leading-relaxed mb-2">
                        {article.summary}
                      </div>
                    )}
                    <div className="text-xs text-gray-600">
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {ctFiltered.length > 0 && (
          <div>
            <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
              From Cointelegraph
            </div>
            <div className="flex flex-col gap-3">
              {ctFiltered.map((article, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => openArticle(article.link)}
                    className="rounded-2xl p-5 cursor-pointer transition-colors hover:opacity-90"
                    style={{ backgroundColor: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}
                  >
                    <span className="text-xs px-2 py-0.5 rounded inline-block mb-2" style={{ backgroundColor: 'rgba(201,168,76,0.05)', color: '#9A7A3A' }}>
                      Cointelegraph
                    </span>
                    <div className="text-sm font-medium text-gray-200 leading-snug mb-2">
                      {article.title}
                    </div>
                    {article.summary && (
                      <div className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">
                        {article.summary}
                      </div>
                    )}
                    <div className="text-xs text-gray-600">
                      {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-gray-600">
            No articles found for "{search}"
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}