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
    <div className="px-6 md:px-8 py-8 border-t" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
      <div className="text-xs font-medium uppercase tracking-widest mb-5" style={{ color: '#C9A84C' }}>
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
            className="block py-4 border-b cursor-pointer hover:opacity-80 transition-opacity"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          >
            {article.own ? (
              <span className="text-xs px-2 py-0.5 rounded inline-block mb-2" style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}>
                SolanaFeed
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded inline-block mb-2" style={{ backgroundColor: 'rgba(201,168,76,0.05)', color: '#9A7A3A' }}>
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