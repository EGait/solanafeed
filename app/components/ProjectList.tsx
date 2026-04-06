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
      <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-6">
        Top Projects
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topProjects.map((project) => {
          return (
            <div
              key={project.id}
              className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-5 flex flex-col gap-3 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-lg">
                    {project.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-200">{project.name}</div>
                    <div className="text-xs text-gray-600">{project.category}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  project.badgeType === 'up' ? 'bg-green-500/10 text-green-400' :
                  project.badgeType === 'hot' ? 'bg-purple-500/10 text-purple-400' :
                  'bg-indigo-500/10 text-indigo-400'
                }`}>
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
                className="w-full bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 text-indigo-300 text-xs py-2 rounded-lg hover:from-indigo-500/30 hover:to-purple-600/30 transition-all"
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
        defaultToSymbol={selectedProject?.name}
      />
    </div>
  )
}