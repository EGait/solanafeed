'use client'

import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-purple-900/30 bg-[#0a0a0f]/95">
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
      <a href="/swap" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-4 py-2 rounded-lg">
        Launch App
      </a>
    </nav>
  )
}