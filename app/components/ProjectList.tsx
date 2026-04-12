'use client'

import { useState } from 'react'
import SwapModal from './SwapModal'
import { projects } from '../data/projects'

export default function ProjectList() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const topProjects = projects.slice(0, 6)

  const openSwap = (project: any) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <div className="px-6 md:px-8 py-10">
      <div className="section-label mb-6">Top Projects</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topProjects.map((project) => (
          <div
            key={project.id}
            className="card-sm flex flex-col gap-3 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 icon-bg flex-shrink-0 overflow-hidden">
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
                <div>
                  <div className="text-sm font-medium text-gray-200">{project.name}</div>
                  <div className="text-xs text-gray-600">{project.category}</div>
                </div>
              </div>
              <span className="badge">{project.badge}</span>
            </div>
            <div className="text-xs text-gray-500 leading-relaxed">
              {project.description}
            </div>
            {project.tvl && (
              <div className="text-xs text-gray-600">
                TVL <span className="text-gray-400">{project.tvl}</span>
              </div>
            )}
            <button
              onClick={() => openSwap(project)}
              className="btn-outline-gold w-full py-2"
            >
              Swap → {project.symbol || project.name}
            </button>
          </div>
        ))}
      </div>

      <SwapModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultToMint={selectedProject?.mintAddress}
        defaultToSymbol={selectedProject?.symbol}
      />
    </div>
  )
}