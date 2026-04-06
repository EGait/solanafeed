'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { projects, categories } from '../data/projects'

const badgeStyles: Record<string, string> = {
  up: 'bg-green-500/10 text-green-400',
  hot: 'bg-purple-500/10 text-purple-400',
  new: 'bg-indigo-500/10 text-indigo-400',
}

export default function ProjectsPage() {
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

      <div className="px-6 md:px-8 py-12 border-b border-purple-900/20 text-center">
        <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full mb-4">
          Solana ecosystem
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Top{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Solana Projects
          </span>
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
            className="flex-1 bg-white/[0.04] border border-purple-900/30 rounded-xl px-4 py-2.5 text-sm text-gray-200 outline-none placeholder-gray-600 focus:border-indigo-500/50"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-4 py-2 rounded-lg border transition-colors ${
                  activeCategory === cat
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                    : 'border-purple-900/30 text-gray-500 hover:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {featured.length > 0 && (
          <div className="mb-10">
            <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-4">
              Featured
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featured.map((project) => {
                return (
                  <div
                    key={project.id}
                    onClick={() => window.open(project.website, '_blank')}
                    className="bg-white/[0.03] border border-indigo-500/20 rounded-2xl p-5 hover:border-indigo-500/40 transition-colors block cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-xl">
                        {project.icon}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${badgeStyles[project.badgeType]}`}>
                        {project.badge}
                      </span>
                    </div>
                    <div className="font-medium text-gray-200 mb-1">{project.name}</div>
                    <div className="text-xs text-gray-500 leading-relaxed mb-3">
                      {project.description}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">
                        {project.category}
                      </span>
                      {project.tvl && (
                        <span className="text-xs text-gray-600">TVL {project.tvl}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div>
            <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-4">
              All Projects
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rest.map((project) => {
                return (
                  <div
                    key={project.id}
                    onClick={() => window.open(project.website, '_blank')}
                    className="flex items-center gap-4 bg-white/[0.03] border border-purple-900/30 rounded-xl px-4 py-3 hover:border-purple-500/30 transition-colors cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-base flex-shrink-0">
                      {project.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="text-sm font-medium text-gray-200">{project.name}</div>
                        <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">
                          {project.category}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 truncate">{project.description}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded ${badgeStyles[project.badgeType]}`}>
                        {project.badge}
                      </span>
                      {project.tvl && (
                        <span className="text-xs text-gray-600">TVL {project.tvl}</span>
                      )}
                    </div>
                  </div>
                )
              })}
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