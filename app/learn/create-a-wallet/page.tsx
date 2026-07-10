'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'

export default function CreateWalletGuide() {
  const router = useRouter()

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-12">
        <button
          onClick={() => router.push('/learn')}
          className="text-xs mb-8 hover:opacity-80 transition-opacity flex items-center gap-2"
          style={{ color: '#C9A84C' }}
        >
          ← Back to Solana 101
        </button>

        <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
          Solana 101
        </div>

        <h1 className="text-3xl font-medium text-gray-100 leading-snug mb-4">
          How to Create a Solana Wallet
        </h1>

        <div className="text-xs text-gray-600 mb-8">
          July 9, 2026 · 5 min read · Written by SolanaFeed
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Everything on Solana starts with a wallet. It is your account, your login for every app, and your vault, all in one. The good news: setting one up takes about five minutes and costs nothing. The important news: there is one rule in this guide that you can never, ever break. We will get to it.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Step 1: Pick a wallet app
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            The two most popular Solana wallets are <span style={{ color: '#C9A84C' }}>Phantom</span> and <span style={{ color: '#C9A84C' }}>Solflare</span>. Both are free, both work as a browser extension and a mobile app, and both are good. Phantom is the most widely used and the most beginner-friendly. Solflare is Solana-native with deep staking features. You cannot go wrong with either; pick one and move on.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            One critical detail: download only from the official website (phantom.com or solflare.com) or your phone&apos;s official app store. Fake wallet apps and fake download links are one of the oldest scams in crypto. Type the URL yourself rather than clicking a link from social media or a search ad.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Step 2: Create the wallet and meet your seed phrase
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            When you tap &quot;Create new wallet,&quot; the app will show you a list of 12 or 24 random words. This is your <span style={{ color: '#C9A84C' }}>seed phrase</span> (also called a recovery phrase), and it is the single most important thing in this entire guide. Those words ARE your wallet. Anyone who has them has your money, from anywhere in the world, instantly and irreversibly. There is no bank to call, no password reset, no undo.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            So here is the one rule you can never break: <span style={{ color: '#C9A84C' }}>never share your seed phrase with anyone, ever, for any reason</span>. No app needs it after setup. No support agent will ever legitimately ask for it. No airdrop, validation, or verification requires it. One hundred percent of the people who ask for your seed phrase are trying to rob you. This is not an exaggeration; it is the literal truth.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Step 3: Back it up properly
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Write the words on paper, in order, and store that paper somewhere safe. Ideally make two copies in two different physical locations. What you should NOT do: screenshot it, email it to yourself, save it in your notes app, store it in a cloud drive, or paste it anywhere digital. Phones get hacked and clouds get breached; paper in a drawer does not. If you lose your phone or laptop, that written phrase is the only way to recover your wallet on a new device.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Step 4: Understand your address
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Once set up, your wallet has a public address: a long string of letters and numbers like 7xKX...gAsU. This is the opposite of your seed phrase. It is completely safe to share; it is how people send you tokens, like an account number. Seed phrase secret, address public. That distinction is half of crypto security in one sentence.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Step 5: Fund it and try it
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            To use Solana you need a little SOL, which pays for transaction fees (typically fractions of a cent). Most people buy SOL on an exchange like Coinbase or Kraken and withdraw it to their wallet address, and both Phantom and Solflare also offer in-app purchase options in many regions. Start small: send a test amount first, confirm it arrives, then move larger sums. That habit of test transactions will save you from expensive typos forever.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            A note on hardware wallets
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            If you end up holding more than you would be comfortable losing, consider a hardware wallet like a Ledger. It keeps your keys on a physical device that never touches the internet, and it pairs with Phantom and Solflare so you keep the same interface. Think of it as the upgrade path, not the starting point.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            That is genuinely it. You now have a Solana wallet and know the one rule that matters most. Next up: the scams to watch for, because knowing how to set up a wallet is step one, and knowing how not to lose it is step two. Read our wallet security guide next.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="text-gray-600 text-xs">
              Disclaimer: This guide is for informational purposes only and is not financial advice. SolanaFeed is not affiliated with the wallets mentioned. Always download software from official sources.
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}