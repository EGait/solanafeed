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
      <div className="text-xs font-medium uppercase tracking-widest mb-6" style={{ color: '#C9A84C' }}>
        Top Projects
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topProjects.map((project) => {
          return (
            <div
              key={project.id}
              className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 overflow-hidden" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
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
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: '#C9A84C' }}>
                  {project.badge}
                </span>
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
                className="w-full text-xs py-2 rounded-lg transition-all"
                style={{ backgroundColor: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
              >
                Swap → {project.symbol || project.name}
              </button>
            </div>
          )
        })}
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