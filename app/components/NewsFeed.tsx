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

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const diff = Math.floor((Date.now() - date.getTime()) / 1000)
  if (isNaN(diff)) return dateStr
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function SkeletonRow() {
  return (
    <div style={{
      padding: '20px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 8, flexShrink: 0,
          background: 'rgba(255,255,255,0.04)',
          animation: 'sf-shimmer 1.6s ease-in-out infinite',
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 10, borderRadius: 4, width: 70, marginBottom: 10, background: 'rgba(201,168,76,0.1)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
          <div style={{ height: 13, borderRadius: 4, width: '100%', marginBottom: 8, background: 'rgba(255,255,255,0.06)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
          <div style={{ height: 13, borderRadius: 4, width: '70%', marginBottom: 8, background: 'rgba(255,255,255,0.06)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
          <div style={{ height: 10, borderRadius: 4, width: 50, background: 'rgba(255,255,255,0.03)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  )
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        const combined = [...ownArticles, ...(data.articles || [])]
        setArticles(combined.slice(0, 12))
      } catch (err) {
        console.error('News fetch error:', err)
        setArticles(ownArticles)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const hero = articles[0]
  const rest = articles.slice(1)

  return (
    <>
      <style>{`
        @keyframes sf-shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .sf-hero-img {
          width: 100%;
          aspect-ratio: 16/7;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .sf-hero-card:hover .sf-hero-img {
          transform: scale(1.02);
        }
        .sf-row-thumb {
          transition: transform 0.2s ease;
        }
        .sf-article-row:hover .sf-row-thumb {
          transform: scale(1.04);
        }
        .sf-article-row:hover .sf-article-title {
          color: #C9A84C !important;
        }
        .sf-read-more {
          transition: gap 0.15s ease;
        }
        .sf-hero-card:hover .sf-read-more {
          gap: 8px !important;
        }
      `}</style>

      <div style={{
        padding: '48px 48px 80px',
        maxWidth: 860,
      }}>

        {/* Section label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 32,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#C9A84C',
            boxShadow: '0 0 8px rgba(201,168,76,0.6)',
            animation: 'sf-shimmer 2s ease-in-out infinite',
          }} />
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#C9A84C',
          }}>
            Latest News
          </span>
        </div>

        {loading ? (
          <div>
            {/* Hero skeleton */}
            <div style={{
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid rgba(201,168,76,0.12)',
              marginBottom: 32,
              background: 'rgba(255,255,255,0.02)',
            }}>
              <div style={{ height: 220, background: 'rgba(255,255,255,0.04)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
              <div style={{ padding: 28 }}>
                <div style={{ height: 10, width: 80, borderRadius: 4, background: 'rgba(201,168,76,0.1)', marginBottom: 14, animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
                <div style={{ height: 18, width: '85%', borderRadius: 4, background: 'rgba(255,255,255,0.06)', marginBottom: 10, animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
                <div style={{ height: 18, width: '60%', borderRadius: 4, background: 'rgba(255,255,255,0.06)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
              </div>
            </div>
            {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : (
          <>
            {/* ── Hero card ── */}
            {hero && (
              <a
                href={hero.link}
                target="_blank"
                rel="noopener noreferrer"
                className="sf-hero-card"
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid rgba(201,168,76,0.18)',
                  marginBottom: 36,
                  background: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.45)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(0,0,0,0.4)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.18)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                {/* Image */}
                {hero.image && (
                  <div style={{ overflow: 'hidden' }}>
                    <img
                      src={hero.image}
                      alt={hero.title}
                      className="sf-hero-img"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                )}

                <div style={{ padding: '24px 28px 28px' }}>
                  {/* Source + time */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#C9A84C',
                      background: 'rgba(201,168,76,0.1)',
                      padding: '3px 9px',
                      borderRadius: 4,
                    }}>
                      {hero.own ? 'SolanaFeed' : 'Cointelegraph'}
                    </span>
                    <span style={{
                      width: 3, height: 3, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.15)',
                      display: 'inline-block',
                    }} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>
                      {timeAgo(hero.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontSize: 'clamp(17px, 2.2vw, 22px)',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    margin: '0 0 12px',
                  }}>
                    {hero.title}
                  </h2>

                  {/* Summary */}
                  {hero.summary && (
                    <p style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.65,
                      margin: '0 0 20px',
                      fontWeight: 300,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    } as React.CSSProperties}>
                      {hero.summary}
                    </p>
                  )}

                  {/* Read more */}
                  <div className="sf-read-more" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#C9A84C',
                    letterSpacing: '0.04em',
                  }}>
                    Read article
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H5M9.5 2.5V7" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </a>
            )}

            {/* ── Article list ── */}
            <div>
              {rest.map((article, i) => (
                <a
                  key={i}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sf-article-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: article.image ? '80px 1fr' : '1fr',
                    gap: 16,
                    alignItems: 'flex-start',
                    padding: '18px 10px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    borderRadius: 8,
                    margin: '0 -10px',
                    transition: 'background 0.15s ease',
                    background: hoveredIdx === i ? 'rgba(255,255,255,0.025)' : 'transparent',
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Thumbnail */}
                  {article.image && (
                    <div style={{
                      width: 80, height: 56,
                      borderRadius: 7,
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: 'rgba(255,255,255,0.04)',
                    }}>
                      <img
                        src={article.image}
                        alt=""
                        className="sf-row-thumb"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={e => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none' }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                      <span style={{
                        width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
                        background: article.own ? '#C9A84C' : 'rgba(201,168,76,0.5)',
                      }} />
                      <span style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: article.own ? '#C9A84C' : 'rgba(201,168,76,0.6)',
                      }}>
                        {article.own ? 'SolanaFeed' : 'Cointelegraph'}
                      </span>
                      <span style={{
                        fontSize: 10,
                        color: 'rgba(255,255,255,0.2)',
                        fontWeight: 300,
                      }}>
                        {timeAgo(article.date)}
                      </span>
                    </div>

                    <div
                      className="sf-article-title"
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.45,
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {article.title}
                    </div>

                    {article.summary && (
                      <div style={{
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.3)',
                        lineHeight: 1.55,
                        marginTop: 6,
                        fontWeight: 300,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      } as React.CSSProperties}>
                        {article.summary}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}