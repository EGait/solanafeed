import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="px-6 md:px-8 py-12 border-b border-purple-900/20 text-center">
        <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-full mb-4">
          About us
        </div>
        <h1 className="text-3xl md:text-4xl font-medium mb-3">
          Built for the{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Solana community
          </span>
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          SolanaFeed is your go-to hub for everything happening in the Solana ecosystem.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-12">

        <div className="mb-10">
          <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-4">
            Our mission
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Solana moves fast. New projects launch daily, protocols ship updates constantly, and the ecosystem evolves at a pace that is hard to keep up with. SolanaFeed exists to make that easier — one place to discover top projects, read the latest news, and swap tokens without leaving.
          </p>
        </div>

        <div className="mb-10">
          <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-4">
            What we offer
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-5">
              <div className="text-2xl mb-3">📰</div>
              <div className="font-medium text-gray-200 text-sm mb-1">News</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                Daily updates on the most important Solana stories, projects, and protocol changes.
              </div>
            </div>
            <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-5">
              <div className="text-2xl mb-3">🔭</div>
              <div className="font-medium text-gray-200 text-sm mb-1">Projects</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                A curated directory of the best projects building on Solana across DeFi, NFTs, and more.
              </div>
            </div>
            <div className="bg-white/[0.03] border border-purple-900/30 rounded-2xl p-5">
              <div className="text-2xl mb-3">⚡</div>
              <div className="font-medium text-gray-200 text-sm mb-1">Swap</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                Swap Solana tokens directly from SolanaFeed using Jupiter best-in-class routing.
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-4">
            Follow us
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white/[0.03] border border-purple-900/30 rounded-xl px-4 py-3 text-sm text-gray-400">
              <span>X</span>
              <span>@SolanaFeedHQ</span>
            </div>
          </div>
        </div>

        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 text-center">
          <div className="font-medium text-gray-200 mb-2">Want to feature your project?</div>
          <p className="text-xs text-gray-500 mb-4">
            We are always looking for quality Solana projects to feature on SolanaFeed. Get in touch and lets talk.
          </p>
          <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-5 py-2 rounded-lg cursor-pointer">
            Get in touch
          </div>
        </div>

      </div>

      <Footer />
    </main>
  )
}