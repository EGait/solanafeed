export default function Footer() {
  return (
    <footer className="px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 border-t" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
      <div className="text-xs text-gray-700">© 2026 SolanaFeed · Built for the Solana ecosystem</div>
      <div className="flex gap-4 items-center flex-wrap justify-center">
        <a href="/privacy" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">Privacy Policy</a>
        <a href="/license" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">License</a>
        <a href="/copyright" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">Copyright</a>
        <a href="/about" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">About</a>
        <a href="/news" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">News</a>
        <a href="/projects" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">Projects</a>
        <a href="/swap" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">Swap</a>
        <span className="text-xs text-gray-700">@SolanaFeedHQ</span>
      </div>
    </footer>
  )
}