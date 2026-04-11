import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CopyrightPage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-12">
        <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
          Legal
        </div>
        <h1 className="text-3xl font-medium text-gray-100 mb-2">Copyright Notice</h1>
        <p className="text-xs text-gray-600 mb-10">Last updated: April 2026</p>

        <div className="flex flex-col gap-8 text-sm text-gray-400 leading-relaxed">
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Ownership</h2>
            <p>© 2026 SolanaFeed. All rights reserved. SolanaFeed and its logo, design, content, and original written materials are the intellectual property of SolanaFeed and are protected by copyright law.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Original Content</h2>
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>— The SolanaFeed name, logo, and brand identity</li>
              <li>— Original project descriptions and editorial content</li>
              <li>— Website design, layout, and user interface</li>
              <li>— Original articles published under the SolanaFeed byline</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Third Party Content</h2>
            <p>News articles aggregated from Cointelegraph and other sources via RSS remain the copyright of their respective publishers. Project logos and trademarks displayed on SolanaFeed are the property of their respective owners and are used for informational purposes only.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Fair Use</h2>
            <p>SolanaFeed aggregates publicly available news content for informational purposes. We link back to original sources and do not claim ownership of third party content. If you believe your copyrighted content has been used incorrectly please contact us.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">DMCA</h2>
            <p>If you believe any content on SolanaFeed infringes your copyright please send a DMCA notice to <span style={{ color: '#C9A84C' }}>SolanaFeedHQ@gmail.com</span> with details of the allegedly infringing content and we will respond promptly.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">Contact</h2>
            <p>For copyright inquiries contact us at <span style={{ color: '#C9A84C' }}>SolanaFeedHQ@gmail.com</span></p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}