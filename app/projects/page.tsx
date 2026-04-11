'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { projects, categories } from '../data/projects'

const badgeStyles = {
  backgroundColor: 'rgba(201,168,76,0.1)',
  color: '#C9A84C',
}

export default function ProjectsPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = projects.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featured = filtered.filter((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="px-6 md:px-8 py-12 border-b text-center" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
        <div className="inline-block text-xs px-3 py-1 rounded-full mb-4 border" style={{ backgroundColor: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.3)', color: '#C9A84C' }}>
          Solana ecosystem
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Top{' '}
          <span style={{ color: '#C9A84C' }}>Solana Projects</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Discover the best projects building on Solana — from DeFi to NFTs to infrastructure.
        </p>
      </div>

      <div className="px-6 md:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none placeholder-gray-600 bg-white/[0.04]"
            style={{ border: '1px solid rgba(201,168,76,0.2)' }}
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs px-4 py-2 rounded-lg transition-colors"
                style={activeCategory === cat ? {
                  backgroundColor: 'rgba(201,168,76,0.2)',
                  border: '1px solid rgba(201,168,76,0.5)',
                  color: '#C9A84C',
                } : {
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: '#888888',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {featured.length > 0 && (
          <div className="mb-10">
            <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
              Featured
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featured.map((project) => (
                <div
                  key={project.id}
                  onClick={() => router.push(`/projects/${project.slug}`)}
                  className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl overflow-hidden" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                      {project.logo ? (
                        <img
                          src={project.logo}
                          alt={project.name}
                          className="w-full h-full object-cover rounded-xl"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const sibling = e.currentTarget.nextElementSibling as HTMLElement
                            if (sibling) sibling.style.display = 'block'
                          }}
                        />
                      ) : null}
                      <span style={{ display: project.logo ? 'none' : 'block' }}>{project.icon}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded" style={badgeStyles}>
                      {project.badge}
                    </span>
                  </div>
                  <div className="font-medium text-gray-200 mb-1">{project.name}</div>
                  <div className="text-xs text-gray-500 leading-relaxed mb-3">
                    {project.description}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-0.5 rounded" style={badgeStyles}>
                      {project.category}
                    </span>
                    {project.tvl && (
                      <span className="text-xs text-gray-600">TVL {project.tvl}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div>
            <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
              All Projects
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rest.map((project) => (
                <div
                  key={project.id}
                  onClick={() => router.push(`/projects/${project.slug}`)}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 cursor-pointer transition-all hover:scale-[1.01]"
                  style={{ backgroundColor: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 overflow-hidden" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                    {project.logo ? (
                      <img
                        src={project.logo}
                        alt={project.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const sibling = e.currentTarget.nextElementSibling as HTMLElement
                          if (sibling) sibling.style.display = 'block'
                        }}
                      />
                    ) : null}
                    <span style={{ display: project.logo ? 'none' : 'block' }}>{project.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="text-sm font-medium text-gray-200">{project.name}</div>
                      <span className="text-xs px-2 py-0.5 rounded" style={badgeStyles}>
                        {project.category}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 truncate">{project.description}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded" style={badgeStyles}>
                      {project.badge}
                    </span>
                    {project.tvl && (
                      <span className="text-xs text-gray-600">TVL {project.tvl}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-600">
            No projects found for "{search}"
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}