'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'

export default function WalletSecurityGuide() {
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
          Wallet Security: Scams, Drainers, and How Not to Get Wrecked
        </h1>

        <div className="text-xs text-gray-600 mb-8">
          July 9, 2026 · 6 min read · Written by SolanaFeed
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Here is the uncomfortable truth about crypto losses: most people are not hacked in any technical sense. They are tricked into signing something, clicking something, or typing their seed phrase somewhere they should not have. That is actually good news, because it means security is mostly about habits, not expertise. This guide covers the scams circulating on Solana and the habits that beat them.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            The scams you will actually encounter
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>🎣 Fake support</span> — You post a question in a Discord or on X, and within minutes a &quot;support agent&quot; DMs offering help. They will eventually ask you to &quot;validate&quot; your wallet, visit a link, or share your seed phrase. Real support never DMs you first, and nothing legitimate ever requires your seed phrase. Ever.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>💸 Wallet drainers</span> — Malicious sites that prompt you to sign a transaction which, once approved, empties your wallet. They spread through fake airdrop links, hacked project accounts on X, and sponsored search results. The defense: never connect your wallet to a site you reached from a random link, and read what a transaction actually says before approving it. Modern wallets like Phantom simulate transactions and warn you what will leave your wallet; take those warnings seriously.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>🪂 Fake airdrops and dust tokens</span> — Random tokens or NFTs appear in your wallet claiming you won something, with a link to claim it. The link leads to a drainer. Anything that appears in your wallet unprompted is bait. Do not interact with it, do not try to sell it, just ignore or hide it.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>🎭 Impostor tokens</span> — Scammers create tokens with the same name and ticker as real ones, hoping you will buy the fake. The name means nothing; only the token&apos;s mint address identifies it. Before buying anything, verify the address against the project&apos;s official site or a trusted source, and check it on Solscan.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            <span style={{ color: '#C9A84C' }}>📋 Address poisoning</span> — Scammers send tiny transactions from addresses crafted to look like ones you have used, hoping you will copy the wrong address from your history when sending later. Never copy addresses from your transaction history. Get them from the source, and check the first and last four characters before every send.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            The habits that protect you
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            First: <span style={{ color: '#C9A84C' }}>use two wallets</span>. A &quot;hot&quot; wallet with small amounts for daily trading, minting, and connecting to new sites, and a separate vault wallet that holds the bulk and connects to nothing. If your hot wallet gets drained, you lose lunch money, not savings. This single habit prevents more catastrophic losses than any other.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Second: slow down at the moment of signing. Every loss happens at a signature. Ask yourself: do I know this site, did I type the URL myself, does the transaction preview match what I expect? Urgency is the scammer&apos;s main weapon. Anything real will still be there in five minutes.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Third: review your connected apps occasionally. Both Phantom and Solflare let you see and revoke site connections in settings. Disconnect anything you no longer use. And if you hold serious size, get a hardware wallet; it makes remote theft of your keys essentially impossible.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            If something goes wrong
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            If you signed something suspicious but still have funds: move everything to a fresh wallet immediately, then investigate. Speed matters more than understanding in that moment. If your seed phrase was exposed, the wallet is permanently compromised; never reuse it, even if nothing was taken yet. And know that on a public blockchain, stolen funds are almost never recoverable. Anyone who contacts you promising recovery for a fee is running the second scam on top of the first. It is a common and cruel follow-up.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            None of this should scare you off. Millions of people use Solana daily without incident, and the entire threat model collapses against a few habits: seed phrase on paper only, two wallets, type URLs yourself, read before you sign, ignore unsolicited anything. Learn those and you are safer than the vast majority of users.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="text-gray-600 text-xs">
              Disclaimer: This guide is for informational purposes only. Scam techniques evolve constantly; no guide can cover every threat. When in doubt, do not sign, do not click, and do not share.
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}