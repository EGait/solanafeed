import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function LicensePage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-12">
        <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
          Legal
        </div>
        <h1 className="text-3xl font-medium text-gray-100 mb-2">License</h1>
        <p className="text-xs text-gray-600 mb-10">Last updated: April 2026</p>

        <div className="flex flex-col gap-8 text-sm text-gray-400 leading-relaxed">
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">License Agreement</h2>
            <p>SolanaFeed is a proprietary web application owned and operated by SolanaFeed. All rights reserved. This software and its content are protected under applicable copyright and intellectual property laws.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Permitted Use</h2>
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>— You may access and use SolanaFeed for personal, non-commercial purposes</li>
              <li>— You may share links to SolanaFeed content</li>
              <li>— You may use the token swap features through our Jupiter integration</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Restrictions</h2>
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>— You may not copy, reproduce, or redistribute the SolanaFeed codebase</li>
              <li>— You may not use SolanaFeed content for commercial purposes without permission</li>
              <li>— You may not attempt to reverse engineer or extract source code</li>
              <li>— You may not use automated tools to scrape or harvest content</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Third Party Content</h2>
            <p>SolanaFeed aggregates news content from third party sources including Cointelegraph via RSS feeds. This content remains the intellectual property of the original publishers. Project information and descriptions are created by SolanaFeed and are our original work.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Disclaimer</h2>
            <p>SolanaFeed is provided as is without warranties of any kind. Token swap functionality is powered by Jupiter and subject to their terms. SolanaFeed is not responsible for any losses incurred through token swaps or DeFi interactions. Nothing on SolanaFeed constitutes financial advice.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Contact</h2>
            <p>For licensing inquiries contact us at <span style={{ color: '#C9A84C' }}>SolanaFeedHQ@gmail.com</span></p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}