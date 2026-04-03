const stats = [
  { value: '500+', label: 'Solana projects tracked' },
  { value: 'Daily', label: 'News updates' },
  { value: 'Live', label: 'Token swap quotes' },
  { value: '100K+', label: 'Monthly readers' },
]

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-8 md:gap-16 px-8 py-6 border-b border-purple-900/20">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-xl font-medium bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            {stat.value}
          </div>
          <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}