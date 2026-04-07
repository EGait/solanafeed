'use client'

import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="border-b border-purple-900/30 bg-[#0a0a0f]/95">
      <div className="flex items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-medium bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          SolanaFeed
        </a>
        <div className="hidden md:flex gap-6">
          <a href="/" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">Home</a>
          <a href="/projects" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">Projects</a>
          <a href="/lsts" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">LSTs</a>
          <a href="/stablecoins" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">Stablecoins</a>
          <a href="/news" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">News</a>
          <a href="/swap" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">Swap</a>
          <a href="/about" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">About</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/swap" className="hidden md:block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-4 py-2 rounded-lg">
            Launch App
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block w-6 h-0.5 bg-gray-400 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-400 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-400 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-purple-900/20 px-6 py-4 flex flex-col gap-4">
          <a href="/" onClick={() => setMenuOpen(false)} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Home</a>
          <a href="/projects" onClick={() => setMenuOpen(false)} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Projects</a>
          <a href="/lsts" onClick={() => setMenuOpen(false)} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">LSTs</a>
          <a href="/stablecoins" onClick={() => setMenuOpen(false)} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Stablecoins</a>
          <a href="/news" onClick={() => setMenuOpen(false)} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">News</a>
          <a href="/swap" onClick={() => setMenuOpen(false)} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Swap</a>
          <a href="/about" onClick={() => setMenuOpen(false)} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">About</a>
          <a href="/swap" onClick={() => setMenuOpen(false)} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-4 py-2 rounded-lg text-center">
            Launch App
          </a>
        </div>
      )}
    </nav>
  )
}