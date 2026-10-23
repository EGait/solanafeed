'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'

export default function AlpenglowArticle() {
  const router = useRouter()

  const metrics = [
    { label: 'Mainnet Activation', value: 'Oct 21, 2026 (epoch 1064)' },
    { label: 'Finality Before', value: '~12.8 seconds' },
    { label: 'Finality Target', value: '~150 milliseconds' },
    { label: 'Fault Tolerance', value: '33% to 40%' },
    { label: 'Live Now', value: 'Votor' },
    { label: 'Still Coming', value: 'Rotor' },
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
          Alpenglow Is Live: What Solana&apos;s Biggest Upgrade Changed, and What It Did Not
        </h1>

        <div className="text-xs text-gray-600 mb-8">
          October 23, 2026 · 6 min read · Written by SolanaFeed
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            On October 21, Solana activated <span style={{ color: '#C9A84C' }}>Alpenglow</span> on mainnet. It is the largest consensus upgrade since the network launched in 2020. The headline number is a finality target of about 150 milliseconds, down from roughly 12.8 seconds. That is a big change. It is also easy to overstate. Here is what actually went live, and what still needs proof.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Key facts at a glance
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
            What went live
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Alpenglow replaces TowerBFT, the voting system Solana has used since day one. The piece that went live is <span style={{ color: '#C9A84C' }}>Votor</span>. Under the old system, validator votes were sent as regular transactions. They piled up until a block was final. With Votor, validators trade votes directly and bundle them into certificates. A block can finalize in one or two voting rounds.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Per Solana&apos;s upgrade docs, the switch happened at the start of epoch 1064, around 13:36 UTC. The network kept its old process for a short transition window. Then Alpenglow consensus took over. No client code change was needed on activation day.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            The three changes that matter
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>⚡ Faster finality:</span> Finality is the point where a transaction cannot be reversed. The old path took about 12.8 seconds. The target is now about 150 milliseconds, roughly 85 times faster.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>🗳️ Votes move off chain:</span> Voting no longer takes up block space. That frees room for user transactions. It should also lower validator operating costs over time.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            <span style={{ color: '#C9A84C' }}>🛡️ More fault tolerance:</span> The network can now tolerate up to 40% of stake failing or misbehaving. The old limit was 33%.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            What did not change yet
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            The second big piece, <span style={{ color: '#C9A84C' }}>Rotor</span>, is not live. Rotor replaces Turbine, the system that spreads blocks across validators. It is planned for a later release. Calling October 21 the full Alpenglow launch would overstate it. Transaction execution also did not change. Programs run the same way they did before.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Why the TPS charts look strange
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Vote transactions no longer appear in blocks. Many dashboards counted them in total transactions. So some charts now show a sharp drop. That is bookkeeping, not a slowdown. If you track activity, compare non vote user transactions before and after. Solana itself tells data consumers to re-baseline those metrics.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Is 150ms real?
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Not yet proven. Solana frames 150 milliseconds as a design target. Mainnet numbers need time to show a steady pattern. And finality is only one step in what a user feels. Submitting, inclusion, execution, and the app&apos;s own display all take time too. A wallet may look about the same as it did last week. Apps that wait on finality have the most to gain, and only if they adopt the new signal.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            The rollout was not perfectly smooth
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Ahead of activation, about 20% of staked SOL was reportedly tied to validators that were not yet ready. Those were early snapshots, not final participation. The date itself also moved around. A rumored September 28 activation was denied by Anza&apos;s research head, who wrote &quot;No Alpenrush.&quot; Anza confirmed the October 21 date on October 13. It had public testing, red teaming, migration rehearsals, and a security competition first.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            What it means for SOL holders
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            This is a network upgrade, not a token event. Faster finality can make some apps more practical, especially payments and trading. But no price outcome follows from it. The useful question is what evidence would show real change. Watch measured mainnet finality over weeks, not one lucky reading. Watch whether apps and data providers keep working cleanly. And watch whether developers actually build around the faster signal.
          </p>

          <h2 className="text-lg font-medium text-gray-200 mb-3 mt-8">
            Proven vs. unproven
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            <span style={{ color: '#C9A84C' }}>Proven:</span> Alpenglow is live on mainnet. Votor is running. Anza took it from white paper to mainnet in under 18 months. The migration itself held.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            <span className="text-gray-200">Unproven:</span> Steady 150ms finality in real conditions. Any TPS gain. Rotor on mainnet. App level benefits. And any link to SOL price.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="text-gray-600 text-xs">
              Disclaimer: This article is for informational purposes only and is not financial advice. Performance figures are protocol targets unless stated otherwise and may differ from measured mainnet results. Details reflect public reporting and Solana documentation as of October 23, 2026. Always do your own research.
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}