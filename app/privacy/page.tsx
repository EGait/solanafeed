import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PrivacyPage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-12">
        <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
          Legal
        </div>
        <h1 className="text-3xl font-medium text-gray-100 mb-2">Privacy Policy</h1>
        <p className="text-xs text-gray-600 mb-10">Last updated: April 2026</p>

        <div className="flex flex-col gap-8 text-sm text-gray-400 leading-relaxed">
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">1. Introduction</h2>
            <p>Welcome to SolanaFeed ("we", "our", or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and application at solanafeed.com.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">2. Information We Collect</h2>
            <p className="mb-3">SolanaFeed is a read-only news and DeFi tools platform. We collect minimal data:</p>
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>— <strong className="text-gray-400">Wallet addresses</strong> — if you choose to connect your Solana wallet, we may see your public wallet address. We never have access to your private keys or funds.</li>
              <li>— <strong className="text-gray-400">Usage data</strong> — we may collect anonymous analytics data such as pages visited, time on site, and general location (country level) to improve the product.</li>
              <li>— <strong className="text-gray-400">Browser data</strong> — standard browser information such as browser type and device type may be collected automatically.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">3. How We Use Your Information</h2>
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>— To provide and improve the SolanaFeed platform</li>
              <li>— To understand how users interact with our app</li>
              <li>— To ensure the security and stability of our services</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">4. Wallet Connection</h2>
            <p>SolanaFeed integrates with Solana wallets including Phantom, Solflare, and Coinbase Wallet to enable token swaps powered by Jupiter. When you connect your wallet, we only see your public wallet address. We do not store private keys, seed phrases, or have the ability to initiate transactions without your explicit approval in your wallet.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">5. Third Party Services</h2>
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>— <strong className="text-gray-400">Jupiter</strong> — powers token swaps. Subject to Jupiter's own privacy policy.</li>
              <li>— <strong className="text-gray-400">Cointelegraph</strong> — news content sourced via RSS feed.</li>
              <li>— <strong className="text-gray-400">Vercel</strong> — our hosting provider. May collect standard web server logs.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">6. Cookies</h2>
            <p>SolanaFeed may use cookies and local storage to remember your preferences and improve your experience. You can disable cookies in your browser settings at any time.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">7. Data Security</h2>
            <p>We take reasonable measures to protect your information. However no method of transmission over the internet is 100% secure. We encourage you to use strong security practices including keeping your wallet seed phrase private and never sharing it with anyone.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">8. Children's Privacy</h2>
            <p>SolanaFeed is not intended for users under the age of 18. We do not knowingly collect personal information from children.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify users of significant changes by updating the date at the top of this page. Continued use of SolanaFeed after changes constitutes acceptance of the updated policy.</p>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-200 mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy please contact us at <span style={{ color: '#C9A84C' }}>SolanaFeedHQ@gmail.com</span></p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}