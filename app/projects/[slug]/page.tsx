'use client'

import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SwapModal from '../../components/SwapModal'
import { projects } from '../../data/projects'
import { useState } from 'react'

export default function ProjectPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const project = projects.find(p => p.slug === slug)
  const [modalOpen, setModalOpen] = useState(false)

  if (!project) {
    return (
      <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
        <Navbar />
        <div className="text-center py-32 text-gray-600">Project not found</div>
        <Footer />
      </main>
    )
  }

  const relatedProjects = projects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3)

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 md:px-8 py-12">
        <button
          onClick={() => router.push('/projects')}
          className="text-xs mb-8 hover:opacity-80 transition-opacity flex items-center gap-2"
          style={{ color: '#C9A84C' }}
        >
          ← Back to projects
        </button>

        <div className="rounded-2xl p-8 mb-8" style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                {project.icon}
              </div>
              <div>
                <h1 className="text-2xl font-medium text-gray-100">{project.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}>
                    {project.category}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}>
                    {project.badge}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="text-sm px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#C9A84C', color: '#0a0a0f' }}
            >
              Swap → {project.symbol}
            </button>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {project.longDescription}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {project.tvl && (
              <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
                <div className="text-xs text-gray-600 mb-1">TVL</div>
                <div className="text-sm font-medium" style={{ color: '#C9A84C' }}>{project.tvl}</div>
              </div>
            )}
            <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="text-xs text-gray-600 mb-1">Chain</div>
              <div className="text-sm font-medium" style={{ color: '#C9A84C' }}>{project.chain}</div>
            </div>
            <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="text-xs text-gray-600 mb-1">Founded</div>
              <div className="text-sm font-medium" style={{ color: '#C9A84C' }}>{project.founded}</div>
            </div>
            <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <div className="text-xs text-gray-600 mb-1">Token</div>
              <div className="text-sm font-medium" style={{ color: '#C9A84C' }}>{project.symbol}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C' }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.open(project.website, '_blank')}
              className="text-xs px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
            >
              🌐 Website
            </button>
            {project.twitter && (
              <button
                onClick={() => window.open(project.twitter, '_blank')}
                className="text-xs px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
              >
                𝕏 Twitter
              </button>
            )}
            {project.discord && (
              <button
                onClick={() => window.open(project.discord, '_blank')}
                className="text-xs px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
              >
                💬 Discord
              </button>
            )}
            {project.docs && (
              <button
                onClick={() => window.open(project.docs, '_blank')}
                className="text-xs px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
              >
                📄 Docs
              </button>
            )}
          </div>
        </div>

        {relatedProjects.length > 0 && (
          <div>
            <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
              Related Projects
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedProjects.map((related) => (
                <div
                  key={related.id}
                  onClick={() => router.push(`/projects/${related.slug}`)}
                  className="rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.15)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
                      {related.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-200">{related.name}</div>
                  </div>
                  <div className="text-xs text-gray-600 line-clamp-2">{related.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <SwapModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultToMint={project.mintAddress}
        defaultToSymbol={project.symbol}
      />

      <Footer />
    </main>
  )
}