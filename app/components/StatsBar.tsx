const stats = [
  { value: 'Daily', label: 'Solana news updates' },
  { value: 'Live', label: 'Token swap quotes' },
  { value: 'Top', label: 'Solana projects tracked' },
  { value: 'Free', label: 'Always free to use' },
]

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-8 md:gap-16 px-8 py-6 border-b" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-xl font-medium gold-text">{stat.value}</div>
          <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}