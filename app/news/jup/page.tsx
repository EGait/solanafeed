'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'

export default function JupiterDDArticle() {
  const router = useRouter()

  const metrics = [
    { label: 'Price', value: '~$0.24' },
    { label: 'Market Cap', value: '~$795M' },
    { label: 'FDV', value: '~$1.64B' },
    { label: 'Annual Trading Volume', value: '~$1T' },
    { label: 'Annualized Fees / Revenue', value: '~$650M / ~$150M' },
    { label: 'Net New Emissions', value: 'Zero (since Feb 2026)' },
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
          Jupiter ($JUP) Deep Dive: A $150M Revenue Superapp Trading Like an Afterthought
        </h1>

        <div className="text-xs text-gray-600 mb-8">
          July 6, 2026 · 9 min read · Written by SolanaFeed
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Jupiter is no longer just a swap aggregator. Over the past year it has quietly become the closest thing DeFi has to a full-stack financial superapp: perps, lending, prediction markets, a native stablecoin, payments, and an initiative to put stocks and forex on Solana. The protocol&apos;s numbers are elite. The token&apos;s chart is not. This deep dive looks at both sides.
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
            The full product suite
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>⚡ Swap aggregator</span> — The core engine. Jupiter routes trades across 50+ Solana DEXs, holds roughly 95% of aggregator market share, and handles over half of all Solana DEX volume. Competitors route through Jupiter&apos;s APIs rather than compete with it. Gasless swaps went live in Jupiter Wallet in June 2026.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>📈 Perps</span> — Up to 100x leverage against the JLP liquidity pool, ranking top-10 among perp DEXs. Solana perps volume is reportedly growing faster than Hyperliquid year over year. Worth knowing: over 80% of JLP supply sits in about 10 wallets, and the April 2026 Drift exploit drained ~41.7M JLP. Jupiter says JLP stayed fully backed, but the concentration is real.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>🏦 Lending</span> — Jupiter Lend (built with Fluid) hit $1B supplied within eight days of launch, the fastest-growing protocol in Solana history, with LTVs up to 95%. Jupiter Offerbook adds P2P lending against any on-chain asset, including RWAs, with no price-based liquidations. Caveat: early growth was incentive-fueled.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>🔮 Prediction markets</span> — A three-layer play. A Kalshi partnership (October 2025), a Polymarket integration (February 2026) making Jupiter the only Polymarket venue on Solana, and the Jupiter Forecast beta (June 2026) with fast-cycle markets like 15-minute Bitcoin price bets, settled in JupUSD. Note that the API is geo-restricted from US and South Korean IPs, a reminder of the regulatory sensitivity here.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>💵 JupUSD</span> — A native stablecoin launched January 2026 with Ethena, backed in part by BlackRock-affiliated assets. Jupiter plans to convert ~$750M of stablecoins in the JLP pool into JupUSD, making it the ecosystem&apos;s default collateral.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>🌐 GUM, the Giant Unified Market</span> — Jupiter&apos;s most ambitious bet: one atomic market indexing memecoins, tokenized stocks, forex, and RWAs on Solana, backed by a partner alliance including Wintermute and DWF Labs, with tokenized equities going live via Securitize and Jump Trading. The Unified Market API entered private beta in early 2026. Critically for holders, <span style={{ color: '#C9A84C' }}>GUM is powered by the JUP token</span>, and anticipation of the beta has already driven double-digit JUP rallies.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            <span style={{ color: '#C9A84C' }}>💳 Jupiter Global</span> — Real-world payments: zero-fee QR payments for APAC merchants, USD transfers to 200+ countries, and a physical USDC card, alongside mobile apps, Jupiter Portfolio, and the JupNet omnichain network. Over 40 launches were unveiled at the CatLumpurr conference alone.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Tokenomics: the dilution problem that got deleted
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            For two years, dilution was the JUP bear case. Then governance killed it. In February 2026, the <span style={{ color: '#C9A84C' }}>&quot;Jupiter Goes Green&quot; proposal passed with 75% approval, cutting net JUP emissions to zero</span>. The Jupuary airdrop was postponed indefinitely, with its 700M JUP returned to the community multisig and the eligibility snapshot preserved for a possible future distribution. Team unlocks were converted into claims against Jupiter&apos;s balance sheet instead of tokens hitting the market, and Mercurial stakeholder vesting was accelerated with Jupiter buying back an equivalent amount to absorb the sell pressure. The final unlock landed on February 25, 2026. After that, nothing. Stacked on the earlier 30% supply burn (10B to 7B) and the Litterbox burns, JUP went from one of DeFi&apos;s heaviest emission schedules to effectively zero net new supply in the span of a single governance vote.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            The valuation disconnect
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Jupiter processed roughly $1 trillion in trading volume over the past year, generates annualized fees near $650M and protocol revenue around $150M, holds $2.4B+ in TVL, and in February 2026 took its first-ever outside investment of $35M from ParaFi Capital after years of being bootstrapped and profitable. At a ~$795M market cap, that is roughly <span style={{ color: '#C9A84C' }}>5x revenue for one of the top-15 revenue protocols in all of crypto</span>. Yet JUP sits ~88% below its 2024 ATH of $2.00 and printed its all-time low earlier this year. The market is still pricing JUP off its old emission-heavy reputation and weak historical value capture, but the dilution half of that story ended in February. What remains unresolved is value accrual: how much of that $150M actually reaches tokenholders.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Performance vs. SOL
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            SOL trades near $80, down ~72% from its January 2025 high near $295. JUP&apos;s ~88% drawdown means it has underperformed its own chain across the cycle, a persistent frustration in the community. The counterpoint: in recent months JUP has behaved like a high-beta recovery trade, with sharp outperformance on rallies driven by GUM anticipation, the zero-emissions vote, and rotation into Solana majors.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Bull case vs. bear case
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>Bull:</span> Near-monopoly aggregation position, ~$150M in real revenue at a sub-$1B cap, relentless product velocity, net emissions cut to zero with unlocks fully concluded, and institutional validation from ParaFi, Securitize, Jump, Bitwise, and Ethena. GUM gives JUP a demand driver it never had, and for the first time there is no supply headwind working against it.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            <span className="text-gray-200">Bear:</span> The 700M postponed-Jupuary tokens still sit in the community multisig, a latent overhang that a future DAO vote could burn, hold, or release back onto the market. Add three years of evidence that revenue has not translated into token value, expanding regulatory surface across prediction markets, RWAs, and payments, full dependence on Solana, and execution risk from an extremely broad product scope. Zero emissions removes a headwind. It does not by itself create demand.
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