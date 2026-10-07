'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'

type Row = { label: string; value: number; display: string; sol?: boolean }

function BarChart({ title, note, rows }: { title: string; note: string; rows: Row[] }) {
  const max = Math.max(...rows.map((r) => r.value))
  return (
    <div className="mb-6 border border-gray-800 rounded-lg overflow-hidden">
      <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-800">
        {title}
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3 text-xs">
            <span
              className="w-24 shrink-0 truncate"
              style={{ color: r.sol ? '#C9A84C' : '#6b7280', fontWeight: r.sol ? 600 : 400 }}
            >
              {r.label}
            </span>
            <div className="flex-1 h-3">
              <div
                className="h-3 rounded-r-sm"
                style={{
                  width: `${Math.max((r.value / max) * 100, 0.8)}%`,
                  backgroundColor: r.sol ? '#C9A84C' : '#3a3a48',
                }}
              />
            </div>
            <span
              className="w-16 shrink-0 text-right font-mono"
              style={{ color: r.sol ? '#e6d28a' : '#9ca3af' }}
            >
              {r.display}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 text-[10px] text-gray-600 border-t border-gray-800">{note}</div>
    </div>
  )
}

const stablecoins: Row[] = [
  { label: 'Ethereum', value: 146.46, display: '$146.5B' },
  { label: 'Tron', value: 94.26, display: '$94.3B' },
  { label: 'Solana', value: 16.58, display: '$16.6B', sol: true },
  { label: 'BNB Chain', value: 13.3, display: '$13.3B' },
  { label: 'Hyperliquid', value: 7.47, display: '$7.5B' },
  { label: 'Base', value: 5.21, display: '$5.2B' },
  { label: 'Arbitrum', value: 3.76, display: '$3.8B' },
  { label: 'Polygon', value: 2.96, display: '$3.0B' },
  { label: 'Avalanche', value: 1.48, display: '$1.5B' },
  { label: 'Aptos', value: 1.05, display: '$1.0B' },
  { label: 'Sui', value: 0.48, display: '$0.5B' },
]

const dex30d: Row[] = [
  { label: 'Solana', value: 77.0, display: '$77.0B', sol: true },
  { label: 'Ethereum', value: 41.4, display: '$41.4B' },
  { label: 'BNB Chain', value: 32.8, display: '$32.8B' },
  { label: 'Base', value: 30.0, display: '$30.0B' },
  { label: 'Hyperliquid', value: 9.8, display: '$9.8B' },
  { label: 'Polygon', value: 7.2, display: '$7.2B' },
  { label: 'Arbitrum', value: 5.8, display: '$5.8B' },
  { label: 'Avalanche', value: 3.9, display: '$3.9B' },
  { label: 'Sui', value: 1.6, display: '$1.6B' },
  { label: 'Tron', value: 1.5, display: '$1.5B' },
]

const turnover: Row[] = [
  { label: 'Base', value: 5.76, display: '5.8x' },
  { label: 'Solana', value: 4.64, display: '4.6x', sol: true },
  { label: 'Sui', value: 3.23, display: '3.2x' },
  { label: 'Avalanche', value: 2.63, display: '2.6x' },
  { label: 'BNB Chain', value: 2.47, display: '2.5x' },
  { label: 'Polygon', value: 2.42, display: '2.4x' },
  { label: 'Arbitrum', value: 1.53, display: '1.5x' },
  { label: 'Hyperliquid', value: 1.31, display: '1.3x' },
  { label: 'Ethereum', value: 0.28, display: '0.3x' },
  { label: 'Tron', value: 0.02, display: '0.02x' },
]

const weekly: Row[] = [
  { label: 'Solana', value: 29.84, display: '29.8M', sol: true },
  { label: 'Tron', value: 8.74, display: '8.7M' },
  { label: 'BNB Chain', value: 8.09, display: '8.1M' },
  { label: 'Bitcoin', value: 2.73, display: '2.7M' },
  { label: 'Ethereum', value: 2.46, display: '2.5M' },
]

const daily: Row[] = [
  { label: 'Tron', value: 3.93, display: '3.9M' },
  { label: 'BNB Chain', value: 2.27, display: '2.3M' },
  { label: 'Solana', value: 1.92, display: '1.9M', sol: true },
  { label: 'Ethereum', value: 0.566, display: '0.57M' },
]

export default function SolanaVsOtherChainsArticle() {
  const router = useRouter()

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
          Solana vs. Every Major Chain: Stablecoins, Volume, and Users
        </h1>

        <div className="text-xs text-gray-600 mb-8">
          October 7, 2026 · 6 min read · Written by SolanaFeed
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Solana is <span style={{ color: '#C9A84C' }}>#1 in DEX volume, #1 in weekly active addresses, and only #3 in stablecoin supply</span>. That mix says a lot about what kind of chain Solana is. It is not where the most dollars are parked. It is where dollars move the fastest. We pulled stablecoin supply and DEX volume from DefiLlama for ten major chains on October 7, 2026, and paired them with the latest multi-chain user snapshots.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Stablecoin supply: a clear #3, a long way behind
          </h2>

          <BarChart
            title="Stablecoin supply by chain"
            note="Source: DefiLlama, circulating USD-pegged stablecoins, Oct 7, 2026."
            rows={stablecoins}
          />

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Ethereum holds about <span style={{ color: '#C9A84C' }}>$146B</span> and Tron about $94B. Solana holds <span style={{ color: '#C9A84C' }}>$16.6B</span>, roughly 6% of the stablecoins across the chains charted above, and a bit more than BNB Chain&apos;s $13.3B. Tron is the surprise for anyone who only watches DeFi: it is the second-largest stablecoin chain by a wide margin because of USDT payment and transfer flows, yet it barely registers in trading. Solana&apos;s lead over the next tier is real, though. It has more than double the supply of Hyperliquid and three times Base. You can compare the individual coins on Solana on our <a href="/stablecoins" className="underline" style={{ color: '#C9A84C' }}>stablecoins page</a>.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            DEX volume: Solana leads by a wide margin
          </h2>

          <BarChart
            title="DEX volume, last 30 days"
            note="Source: DefiLlama DEX overview per chain, Oct 7, 2026. Hyperliquid is spot only; perps are not counted."
            rows={dex30d}
          />

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Over the last 30 days Solana processed about <span style={{ color: '#C9A84C' }}>$77B</span> in DEX volume, roughly 1.9x Ethereum&apos;s $41B and more than double BNB Chain or Base. The trailing year is just as lopsided: about $1.1T on Solana against roughly $599B on Ethereum and $555B on BNB Chain. The picture is consistent over short windows too. On the day we pulled the data Solana did $2.05B, ahead of Ethereum at $1.10B and Base at $1.05B. Single days swing hard (Ethereum was up 88% day over day), which is why we lean on the 30-day figure. Two caveats apply. DEX volume on Solana includes a lot of bot and memecoin trading, so it measures activity more than organic demand. And Hyperliquid looks small here because only its spot volume is counted, while its perpetuals trade far more.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Put the two together: how hard each dollar works
          </h2>

          <BarChart
            title="30-day DEX volume per $1 of stablecoin supply"
            note="30-day DEX volume divided by stablecoin supply. A rough gauge, not a formal metric."
            rows={turnover}
          />

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Divide 30-day DEX volume by stablecoin supply and the chains separate into two camps. Ethereum trades only about <span style={{ color: '#C9A84C' }}>$0.28</span> for every $1 of stablecoins on it, because most of that supply is saved, lent, or held by institutions. Tron is close to zero for the same reason. Solana trades about <span style={{ color: '#C9A84C' }}>$4.64</span> per dollar, second only to Base at $5.76. Stablecoins on Solana are mostly working capital for traders. That also explains why a growing stablecoin base matters so much for the chain: more settled dollars would deepen liquidity without needing any new trading demand.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Users: Solana wins the weekly count, Tron wins the best day
          </h2>

          <BarChart
            title="Weekly active addresses (7 days)"
            note="Source: Nansen via BlockBeats, published Jul 4, 2026."
            rows={weekly}
          />

          <BarChart
            title="Daily active addresses (24 hours)"
            note="Source: Lookonchain via U.Today, published Jun 23, 2026."
            rows={daily}
          />

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Nansen&apos;s weekly count put Solana at <span style={{ color: '#C9A84C' }}>29.8M active addresses</span>, more than three times Tron (8.7M) and BNB Chain (8.1M), and about twelve times Ethereum (2.5M). That week was inflated by a memecoin spike around the ANSEM token, which pushed the number up 55% week over week, so treat it as a high-water mark. The daily view tells a different story: on a record day in June, Tron logged 3.9M active addresses and BNB Chain 2.3M, both ahead of Solana&apos;s 1.9M that day. The two numbers are not contradictory, since weekly counts accumulate every address that appears at least once.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Solana&apos;s own recent stats point the same direction. As of September 2026 the network had about 16.1M funded wallets (up 38.5% month over month), roughly 888K daily active stablecoin addresses (up 269% year over year), and 7,699 monthly active programs. Stablecoin usage by individual wallets is growing much faster than the supply total, which is the healthiest version of this story.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            How to read the user numbers
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            An active address is not a person. On low-fee chains one user or one bot can touch dozens of addresses, which flatters Solana, Tron, and BNB Chain against Ethereum, where each address costs real money to use. The user snapshots also come from different providers on different dates, so the two charts should be compared within themselves, not against each other. No single public source gives a consistent monthly active user count for every chain, and we would rather say that than blend numbers that were never measured the same way.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            The verdict
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Solana is the busiest chain in crypto by trading volume and by address activity, and it holds a distant but comfortable third place in stablecoins. Its weakness is also its opening: Ethereum and Tron hold the saved dollars, Solana holds the moving ones. The number to watch from here is stablecoin supply. If Solana&apos;s $16.6B keeps growing while its turnover stays high, the chain stops being a trading venue that happens to hold stablecoins and becomes a place where dollars live.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="text-gray-600 text-xs">
              Disclaimer: This article is for informational purposes only and is not financial advice. Stablecoin supply and DEX volume are from DefiLlama as of October 7, 2026. Active-address figures are from Nansen (July 2026) and Lookonchain (June 2026) and are older than the other data. All figures are approximate and change quickly. Always do your own research.
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
