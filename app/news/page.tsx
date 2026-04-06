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

      <div className="px-6 md:px-8 py-12 border-b border-purple-900/20 text-center">
        <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full mb-4">
          Solana news
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Latest{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Solana News
          </span>
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
            className="flex-1 bg-white/[0.04] border border-purple-900/30 rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none placeholder-gray-600 focus:border-indigo-500/50"
          />
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-xs px-4 py-2 rounded-lg border transition-colors ${
                  activeTag === tag
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                    : 'border-purple-900/30 text-gray-500 hover:text-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="text-xs text-gray-600 py-8 text-center">Loading news...</div>
        )}

        {ownFiltered.length > 0 && (
          <div className="mb-10">
            <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-4">
              From SolanaFeed
            </div>
            <div className="flex flex-col gap-3">
              {ownFiltered.map((article, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => openArticle(article.link)}
                    className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5 cursor-pointer hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded inline-block mb-2">
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
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {ctFiltered.length > 0 && (
          <div>
            <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-4">
              From Cointelegraph
            </div>
            <div className="flex flex-col gap-3">
              {ctFiltered.map((article, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => openArticle(article.link)}
                    className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-5 cursor-pointer hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded inline-block mb-2">
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
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
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