'use client'

import { useEffect, useState } from 'react'
import { ownArticles } from '../data/ownArticles'

type Article = {
  title: string
  link: string
  date: string
  summary: string
  image: string | null
  own?: boolean
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        const combined = [...ownArticles, ...(data.articles || [])]
        setArticles(combined.slice(0, 5))
      } catch (err) {
        console.error('News fetch error:', err)
        setArticles(ownArticles)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const openLink = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="p-8 border-r border-purple-900/20">
      <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-5">
        Latest News
      </div>

      {loading && (
        <div className="text-xs text-gray-600 py-4">Loading news...</div>
      )}

      {articles.map((article, index) => {
        return (
          <div
            key={index}
            onClick={() => openLink(article.link)}
            className="block py-4 border-b border-white/5 last:border-none hover:opacity-80 transition-opacity cursor-pointer"
          >
            {article.own ? (
              <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded inline-block mb-2">
                SolanaFeed
              </span>
            ) : (
              <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded inline-block mb-2">
                Cointelegraph
              </span>
            )}
            <div className="text-sm font-medium text-gray-200 leading-snug mb-1">
              {article.title}
            </div>
            <div className="text-xs text-gray-600">
              {new Date(article.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}