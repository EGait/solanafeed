export default function Hero() {
  return (
    <div className="text-center px-6 py-12 md:py-16 border-b border-purple-900/20">
      <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full mb-5">
        Your Solana universe, all in one place
      </div>
      <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-4">
        The hub for everything{" "}
        <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Solana
        </span>
      </h1>
      <p className="text-gray-500 text-sm max-w-md mx-auto mb-7 leading-relaxed">
        Top projects, breaking news, and token swaps — all in one place for the Solana ecosystem.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-5 py-2 rounded-lg">
          Explore Projects
        </button>
        <button className="border border-indigo-500/40 text-indigo-300 text-sm px-5 py-2 rounded-lg">
          Read Latest News
        </button>
      </div>
    </div>
  )
}