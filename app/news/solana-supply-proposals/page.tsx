'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'

export default function SolanaProposalsArticle() {
  const router = useRouter()

  const metrics = [
    { label: 'Current Daily SOL Burn', value: '~650 SOL (~$47K)' },
    { label: 'Proposed Daily Burn', value: '7,500–9,000 SOL (~$650K)' },
    { label: 'Current Inflation Rate', value: '~3.8%' },
    { label: 'Terminal Rate Arrival', value: '2029 (vs. 2032 today)' },
    { label: 'Signaling Support So Far', value: '24.94M SOL (5.8% staked)' },
    { label: 'Threshold to Reach a Vote', value: '15% (deadline Aug 18)' },
  ]

  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 md:px-8 py-12">
        <button
          onClick={() => router.push('/news')}
          className="text-xs mb-8 hover:opacity-80 transition-opacity flex items-center gap-2"
          style={{ color: '#C9A84C' }}
        >
          ← Back to news
        </button>

        <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
          SolanaFeed Research
        </div>

        <h1 className="text-3xl font-medium text-gray-100 leading-snug mb-4">
          Solana&apos;s Two New Proposals Could Take Daily SOL Burns From $47K to $650K
        </h1>

        <div className="text-xs text-gray-600 mb-8">
          August 4, 2026 · 7 min read · Written by SolanaFeed
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Solana validators started signaling support this week for two linked governance proposals that would change how much SOL enters and leaves circulation. Together, <span style={{ color: '#C9A84C' }}>SIMD-0550 and SIMD-0553</span> attack supply from both ends: one slows down how much new SOL gets created, the other speeds up how much existing SOL gets destroyed. Neither is close to passing yet, but the mechanics are worth understanding now, because if this clears the bar, it changes the supply math behind every SOL holding on Solana, including the ones sitting in your wallet.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Key numbers at a glance
          </h2>

          <div className="mb-8 border border-gray-800 rounded-lg overflow-hidden">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`flex justify-between items-center px-4 py-3 text-sm ${
                  i !== metrics.length - 1 ? 'border-b border-gray-800' : ''
                }`}
              >
                <span className="text-gray-500">{m.label}</span>
                <span style={{ color: '#C9A84C' }}>{m.value}</span>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            SIMD-0553: charge for what you actually use
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            SIMD-0553 introduces <span style={{ color: '#C9A84C' }}>resource-based transaction fees</span>, meaning a transaction gets charged according to the actual network resources it consumes rather than a flat rate. Today, Solana burns roughly 650 SOL a day this way, worth about $47,000 at current prices. Under the new fee structure, that climbs to somewhere between 7,500 and 9,000 SOL a day, or up to roughly $650,000. That is more than a 10x jump in daily burn.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            SIMD-0550: pull the finish line forward
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            SIMD-0550 works the supply side from the other direction. Solana&apos;s inflation currently sits near 3.8%, down from an 8% starting rate under a schedule that cuts issuance by 15% every year until it reaches a permanent 1.5% terminal rate. This proposal doubles the annual disinflation rate to 30%, which would pull that 1.5% floor forward from 2032 to <span style={{ color: '#C9A84C' }}>2029</span>. The practical effect is roughly 18.9 million fewer SOL issued over six years, worth an estimated $1.36 billion at today&apos;s prices.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Why they travel together, and why it is not actually deflationary
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Here is the number that puts this in perspective: even at the top end of the projected range, 9,000 SOL burned per day is still dwarfed by roughly 60,000 SOL issued per day at current inflation. A 14x increase in burns barely dents what the network prints. That is exactly why the two proposals are bundled. SIMD-0553 alone would not move the needle much on its own, so SIMD-0550 does the heavier lifting by cutting issuance at the source, while SIMD-0553 adds a genuine burn mechanism on top. Together they meaningfully tighten net new supply. Neither one makes SOL deflationary by itself, and even combined, Solana keeps inflating, just measurably slower.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            The governance mechanics, and who is actually behind this
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            SIMD stands for Solana Improvement Document, the standard technical proposal process. SGP, Solana Governance Proposal, is a newer stake-weighted vote that sits above it, reserved for questions the Solana Foundation considers significant enough to need broad validator buy-in rather than routine technical review. This one, tracked as SGP-0003, needs signaling support from 15% of staked SOL before it even reaches a formal vote. As of this week, backing sits at 24.94 million SOL, about 5.8% of the 432.65 million SOL staked, roughly 38% of the way to threshold. Sixteen validators have signaled, just 2.3% of the validator set, but one name dominates the total: <span style={{ color: '#C9A84C' }}>Helius alone supplied 16.03 million SOL</span>, nearly two-thirds of everything gathered so far. Worth knowing: Helius employs the engineer who authored SIMD-0550. Blueshift and Temporal Emerald follow at a fraction of that size. The proposal needs roughly 40 million more SOL in support, about $2.9 billion worth, before signaling closes on August 18.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            What this means if you hold or stake SOL
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Slower issuance and higher burns both work in the same direction for existing holders: less new supply hitting the market over time. For stakers specifically, disinflation cuts both ways. Staking rewards are funded by new issuance, so a faster march toward the 1.5% terminal rate means staking yields trend lower over the same horizon, even as the SOL you already hold faces less dilution. Whether that trade is good for you depends on whether you value current yield or long-term scarcity more, and this is exactly the kind of protocol-level tradeoff that is easy to miss if you only watch price.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            What happens next
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            The 15% signaling gate exists specifically so validators only vote on changes that matter, keeping routine work inside the normal SIMD process. Clearing it means several more operators the size of Helius need to decide emissions reform is worth their signal, and at the current pace with two weeks left, that has not happened yet. If signaling succeeds by August 18, the proposals move to a formal validator vote. If it stalls, Solana&apos;s existing 2032 disinflation schedule stays in place and this becomes one of the proposals that generated headlines without changing anything. We will follow this through the signaling deadline.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="text-gray-600 text-xs">
              Disclaimer: This article is for informational purposes only and is not financial advice. Governance proposals can change materially or fail to pass; figures reflect projections as of August 4, 2026 and are approximate. Always do your own research.
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}