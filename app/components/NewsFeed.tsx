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

function SkeletonHero() {
  return (
    <div style={{ borderRadius: 20, overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ height: 340, background: 'rgba(255,255,255,0.05)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
      <div style={{ padding: 32 }}>
        <div style={{ height: 10, width: 90, borderRadius: 4, background: 'rgba(201,168,76,0.15)', marginBottom: 16, animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
        <div style={{ height: 22, width: '90%', borderRadius: 4, background: 'rgba(255,255,255,0.07)', marginBottom: 10, animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
        <div style={{ height: 22, width: '60%', borderRadius: 4, background: 'rgba(255,255,255,0.07)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
      </div>
    </div>
  )
}

function SkeletonRow() {
  return (
    <div style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ width: 64, height: 48, borderRadius: 8, flexShrink: 0, background: 'rgba(255,255,255,0.05)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: 9, width: 60, borderRadius: 4, background: 'rgba(201,168,76,0.1)', marginBottom: 9, animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
        <div style={{ height: 12, width: '100%', borderRadius: 4, background: 'rgba(255,255,255,0.06)', marginBottom: 6, animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
        <div style={{ height: 12, width: '70%', borderRadius: 4, background: 'rgba(255,255,255,0.06)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
      </div>
    </div>
  )
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        const combined = [...ownArticles, ...(data.articles || [])]
        setArticles(combined.slice(0, 15))
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
  const featured = articles.slice(1, 4)
  const rest = articles.slice(4)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap');

        @keyframes sf-shimmer {
          0%,100% { opacity:.45; }
          50%      { opacity:1; }
        }

        /* Hero */
        .sf-hero-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(201,168,76,0.18);
          cursor: pointer;
          text-decoration: none;
          display: block;
          transition: border-color .25s ease, box-shadow .25s ease;
          background: #111118;
          margin-bottom: 20px;
        }
        .sf-hero-wrap:hover {
          border-color: rgba(201,168,76,.55);
          box-shadow: 0 20px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(201,168,76,.1);
        }
        .sf-hero-img {
          width: 100%; height: 340px;
          object-fit: cover; display: block;
          transition: transform .5s ease;
        }
        .sf-hero-wrap:hover .sf-hero-img { transform: scale(1.025); }
        .sf-hero-no-img {
          width: 100%; height: 160px;
          background: linear-gradient(135deg, rgba(201,168,76,.08) 0%, rgba(201,168,76,.02) 100%);
          position: relative; overflow: hidden;
        }
        .sf-hero-no-img::after {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(45deg,transparent,transparent 24px,rgba(201,168,76,.04) 24px,rgba(201,168,76,.04) 25px);
        }
        .sf-hero-gradient {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 65%;
          background: linear-gradient(to top, #0d0d12 0%, rgba(13,13,18,.75) 50%, transparent 100%);
          pointer-events: none;
        }
        .sf-hero-body { position: relative; padding: 26px 30px 30px; }
        .sf-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          line-height: 1.25;
          letter-spacing: -.02em;
          margin: 0 0 12px;
          transition: color .15s ease;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .sf-hero-wrap:hover .sf-hero-title { color: #C9A84C; }
        .sf-read-cta {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 600;
          color: #C9A84C; letter-spacing: .04em;
          transition: gap .15s ease;
        }
        .sf-hero-wrap:hover .sf-read-cta { gap: 9px; }

        /* Featured cards */
        .sf-card-wrap {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          text-decoration: none;
          display: block;
          transition: border-color .2s ease, transform .2s ease;
          background: rgba(255,255,255,0.025);
        }
        .sf-card-wrap:hover {
          border-color: rgba(201,168,76,.35);
          transform: translateY(-3px);
        }
        .sf-card-img {
          width: 100%; height: 130px;
          object-fit: cover; display: block;
          transition: transform .4s ease;
        }
        .sf-card-wrap:hover .sf-card-img { transform: scale(1.04); }
        .sf-card-no-img {
          width: 100%; height: 70px;
          background: linear-gradient(135deg, rgba(201,168,76,.06) 0%, transparent 100%);
        }
        .sf-card-body { padding: 14px 16px 18px; }
        .sf-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 13px; font-weight: 700;
          color: rgba(255,255,255,.85);
          line-height: 1.35; letter-spacing: -.01em;
          transition: color .15s ease;
        }
        .sf-card-wrap:hover .sf-card-title { color: #C9A84C; }

        /* Sidebar rows */
        .sf-row {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 13px;
          align-items: flex-start;
          padding: 14px 10px;
          border-radius: 10px;
          margin: 0 -10px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          text-decoration: none;
          cursor: pointer;
          transition: background .15s ease;
        }
        .sf-row:last-child { border-bottom: none; }
        .sf-row:hover { background: rgba(255,255,255,.03); }
        .sf-row-thumb {
          width: 60px; height: 44px;
          border-radius: 7px;
          object-fit: cover; display: block;
          transition: transform .2s ease;
        }
        .sf-row:hover .sf-row-thumb { transform: scale(1.06); }
        .sf-row-no-thumb {
          width: 60px; height: 44px;
          border-radius: 7px;
          background: rgba(201,168,76,.06);
          display: flex; align-items: center; justify-content: center;
        }
        .sf-row-title {
          font-size: 12.5px; font-weight: 500;
          color: rgba(255,255,255,.78);
          line-height: 1.4;
          transition: color .15s ease;
        }
        .sf-row:hover .sf-row-title { color: #C9A84C; }

        /* Source badge */
        .sf-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 9.5px; font-weight: 700;
          letter-spacing: .09em; text-transform: uppercase;
          padding: 2px 7px; border-radius: 3px;
        }
        .sf-badge::before {
          content: '';
          width: 3.5px; height: 3.5px;
          border-radius: 50%;
          background: currentColor;
        }
        .sf-badge.own { color: #C9A84C; background: rgba(201,168,76,.12); }
        .sf-badge.ct  { color: rgba(201,168,76,.6); background: rgba(201,168,76,.06); }

        .sf-sidebar-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: .14em; text-transform: uppercase;
          color: rgba(255,255,255,.2);
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,.06);
          margin-bottom: 2px;
        }

        @media (max-width: 900px) {
          .sf-layout { grid-template-columns: 1fr !important; }
          .sf-sidebar { position: static !important; }
          .sf-featured { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ padding: '48px 48px 80px', maxWidth: 1400 }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#C9A84C',
            boxShadow: '0 0 10px rgba(201,168,76,.7)',
            animation: 'sf-shimmer 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#C9A84C' }}>
            Latest News
          </span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(201,168,76,.2) 0%,transparent 100%)', marginLeft: 8 }} />
        </div>

        {loading ? (
          <div className="sf-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40 }}>
            <div>
              <SkeletonHero />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 20 }}>
                {[...Array(3)].map((_,i) => (
                  <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,.06)', background: 'rgba(255,255,255,.02)' }}>
                    <div style={{ height: 110, background: 'rgba(255,255,255,.05)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
                    <div style={{ padding: 16 }}>
                      <div style={{ height: 9, width: 60, borderRadius: 4, background: 'rgba(201,168,76,.1)', marginBottom: 10, animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
                      <div style={{ height: 12, borderRadius: 4, background: 'rgba(255,255,255,.06)', marginBottom: 7, animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
                      <div style={{ height: 12, width: '70%', borderRadius: 4, background: 'rgba(255,255,255,.06)', animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ height: 12, width: 80, borderRadius: 4, background: 'rgba(255,255,255,.05)', marginBottom: 20, animation: 'sf-shimmer 1.6s ease-in-out infinite' }} />
              {[...Array(7)].map((_,i) => <SkeletonRow key={i} />)}
            </div>
          </div>
        ) : (
          <div className="sf-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>

            {/* ══ LEFT ══ */}
            <div>
              {/* Hero */}
              {hero && (
                <a href={hero.link} target="_blank" rel="noopener noreferrer" className="sf-hero-wrap">
                  {hero.image ? (
                    <div style={{ overflow: 'hidden', position: 'relative' }}>
                      <img src={hero.image} alt={hero.title} className="sf-hero-img"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                      <div className="sf-hero-gradient" />
                    </div>
                  ) : (
                    <div className="sf-hero-no-img" />
                  )}
                  <div className="sf-hero-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
                      <span className={`sf-badge ${hero.own ? 'own' : 'ct'}`}>
                        {hero.own ? 'SolanaFeed' : 'Cointelegraph'}
                      </span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,.25)', fontWeight: 300 }}>
                        {timeAgo(hero.date)}
                      </span>
                    </div>
                    <h2 className="sf-hero-title">{hero.title}</h2>
                    {hero.summary && (
                      <p style={{
                        fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.65,
                        fontWeight: 300, margin: '0 0 20px',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      } as React.CSSProperties}>
                        {hero.summary}
                      </p>
                    )}
                    <span className="sf-read-cta">
                      Read article
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2.5 10.5L10.5 2.5M10.5 2.5H5.5M10.5 2.5V7.5" stroke="#C9A84C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </a>
              )}

              {/* Featured 3-up */}
              {featured.length > 0 && (
                <div className="sf-featured" style={{ display: 'grid', gridTemplateColumns: `repeat(${featured.length},1fr)`, gap: 14 }}>
                  {featured.map((article, i) => (
                    <a key={i} href={article.link} target="_blank" rel="noopener noreferrer" className="sf-card-wrap">
                      {article.image ? (
                        <div style={{ overflow: 'hidden' }}>
                          <img src={article.image} alt={article.title} className="sf-card-img"
                            onError={e => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none' }} />
                        </div>
                      ) : (
                        <div className="sf-card-no-img" />
                      )}
                      <div className="sf-card-body">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                          <span className={`sf-badge ${article.own ? 'own' : 'ct'}`}>
                            {article.own ? 'SolanaFeed' : 'Cointelegraph'}
                          </span>
                          <span style={{ fontSize: 10, color: 'rgba(255,255,255,.2)', fontWeight: 300 }}>
                            {timeAgo(article.date)}
                          </span>
                        </div>
                        <div className="sf-card-title">{article.title}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ══ SIDEBAR ══ */}
            <div className="sf-sidebar" style={{ position: 'sticky', top: 100 }}>
              <div className="sf-sidebar-label">More stories</div>
              {rest.map((article, i) => (
                <a
                  key={i}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sf-row"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {article.image ? (
                    <img src={article.image} alt="" className="sf-row-thumb"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                  ) : (
                    <div className="sf-row-no-thumb">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M2 12L5.5 8L8 10.5L11 7L14 12H2Z" stroke="rgba(201,168,76,0.35)" strokeWidth="1.2" strokeLinejoin="round"/>
                        <circle cx="5" cy="5" r="1.5" stroke="rgba(201,168,76,0.35)" strokeWidth="1.2"/>
                      </svg>
                    </div>
                  )}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                      <span className={`sf-badge ${article.own ? 'own' : 'ct'}`}>
                        {article.own ? 'SolanaFeed' : 'Cointelegraph'}
                      </span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,.18)', fontWeight: 300 }}>
                        {timeAgo(article.date)}
                      </span>
                    </div>
                    <div className="sf-row-title">{article.title}</div>
                  </div>
                </a>
              ))}
            </div>

          </div>
        )}
      </div>
    </>
  )
}