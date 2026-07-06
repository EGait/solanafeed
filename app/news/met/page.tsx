'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'

export default function MeteoraDDArticle() {
  const router = useRouter()

  const metrics = [
    { label: 'Price', value: '~$0.16' },
    { label: 'Market Cap', value: '~$90M' },
    { label: 'FDV', value: '~$172M' },
    { label: 'Circulating Supply', value: '~540M / 1B (54%)' },
    { label: 'Drawdown from ATH', value: '~75%' },
    { label: 'TVL', value: '~$320M' },
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
          Meteora ($MET) Deep Dive: Strong Tech, Collapsed Volume, and a Lawsuit in the Room
        </h1>

        <div className="text-xs text-gray-600 mb-8">
          July 6, 2026 · 8 min read
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Meteora is one of the most technically interesting protocols on Solana — and one of the most controversial. Eight months after the $MET token launched with some of the boldest tokenomics in crypto, we take a full due diligence look at where the protocol, the token, and the legal situation stand today.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Key metrics at a glance
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
            What Meteora actually is
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Meteora began life in 2021 as Mercurial Finance before rebranding after the FTX collapse stranded MER tokens on the exchange. Its flagship product is the <span style={{ color: '#C9A84C' }}>Dynamic Liquidity Market Maker (DLMM)</span> — concentrated liquidity pools that focus capital in active price ranges, delivering meaningfully higher capital efficiency than traditional AMMs. Lifetime, the protocol has processed roughly $330B in cumulative swap volume and generated about $1.8B in fees since early 2023.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            At its peak around the token launch, Meteora was Solana&apos;s second-largest DEX by spot volume with roughly 26% market share and over $800M in TVL — largely because it became the default liquidity venue for high-profile memecoin launches. That position drove enormous volume, and equally enormous baggage.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Tokenomics: the anti-VC launch
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            $MET launched on October 23, 2025 with a deliberately community-first structure: <span style={{ color: '#C9A84C' }}>48% of the 1B supply hit the market fully unlocked on day one</span>, with the team&apos;s 18% and a 34% ecosystem reserve vesting linearly over six years. Airdrop recipients got auto-staked LP positions that earn fees while gradually selling — a clever attempt to defuse the classic post-airdrop dump. There are no cliff unlocks ahead; the next scheduled release (July 23) is a modest ~0.73% of supply.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            The market still punished it. MET opened around $0.57, fell 36% on day one, and now trades near $0.16 — roughly 75% below its spot high. High float means honest price discovery, and price discovery has not been kind.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            The core tension: fees up, volume down
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            In June 2026, Solana-wide weekly DEX volume collapsed roughly 82% as the memecoin cycle stalled — and Meteora, the most memecoin-exposed major venue, saw weekly volume fall <span style={{ color: '#C9A84C' }}>over 90%, from ~$93B to ~$9B</span>. Yet over a recent 30-day window, DLMM fee revenue actually rose ~64%, outperforming other major Solana DeFi protocols. The speculative flow left; what remains is higher-value and fee-productive. Whether that resilience survives a prolonged memecoin winter is the single most important question in the MET thesis.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            On the product side, the team keeps shipping: DLMM v2 (announced December 2025) added on-chain limit orders, single-token fee earning, zapping, and auto-compounding vaults, while the Comet Points system ties MET staking and protocol usage to redeemable rewards.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            The lawsuit you cannot ignore
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Meteora is a named defendant — alongside co-founder Benjamin Chow, Kelsier Ventures, and the Davis family — in a class-action lawsuit alleging a coordinated &quot;liquidity trap&quot; scheme across at least 15 tokens, including LIBRA, MELANIA, ENRON, TRUST, and M3M3. Chow resigned in February 2025 after the LIBRA collapse, denying insider trading but admitting he had &quot;enabled&quot; the wrong people. The complaint also references Ng Ming Yeow (&quot;Meow&quot;), co-founder of both Meteora and Jupiter, though he is not a listed defendant, and Jupiter commissioned an independent investigation that it says found no wrongdoing.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            For holders, the risks are concrete: potential liability for the Meteora entity, brand damage to the platform MET depends on, and whatever surfaces in discovery. The allegations remain unproven, and the protocol has continued shipping through the controversy — but this is a genuine overhang, not FUD.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Performance vs. SOL
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Since MET&apos;s launch in late October 2025, SOL has fallen from roughly $190 to about $80 — a ~58% decline. MET fell ~72% from its opening price over the same window. SOL has been weak; MET has been weaker, which is typical for a newly launched, memecoin-levered token in a risk-off Solana market. Beta cuts both ways: if memecoin volume returns to Solana, Meteora is positioned to capture a disproportionate share of it.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Bull case vs. bear case
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>Bull:</span> Best-in-class DLMM tech with a major v2 upgrade live, honest high-float tokenomics with no cliff bombs, resilient fee generation even in a volume drought, and a ~$90M market cap against ~$1.8B in lifetime fees. Any memecoin revival flows straight through Meteora.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            <span style={{ color: '#C9A84C' }}>Bear:</span> Named defendant in an active fraud lawsuit, revenue concentrated in a collapsed niche, weak value-accrual linkage between protocol fees and the token, launchpads increasingly keeping liquidity in-house, and only eight months of price history.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="text-gray-600 text-xs">
              Disclaimer: This article is for informational purposes only and is not financial advice. Figures are approximate and sourced from public data as of July 6, 2026. Always do your own research.
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}