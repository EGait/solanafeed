const projects = [
  { name: "Jupiter", desc: "Leading Solana DEX aggregator", icon: "⚡", badge: "+12.4%", badgeStyle: "bg-green-500/10 text-green-400", iconBg: "bg-indigo-500/15" },
  { name: "Raydium", desc: "Automated market maker on Solana", icon: "🌊", badge: "Trending", badgeStyle: "bg-purple-500/10 text-purple-400", iconBg: "bg-purple-500/15" },
  { name: "Drift Protocol", desc: "Perpetuals and spot trading", icon: "🎯", badge: "New", badgeStyle: "bg-indigo-500/10 text-indigo-400", iconBg: "bg-green-500/10" },
  { name: "Marinade Finance", desc: "Liquid staking for Solana", icon: "🏦", badge: "+8.1%", badgeStyle: "bg-green-500/10 text-green-400", iconBg: "bg-yellow-500/10" },
]

export default function ProjectList() {
  return (
    <div className="p-8">
      <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-5">
        Top Projects
      </div>
      {projects.map((project) => (
        <div key={project.name} className="flex items-center gap-4 bg-white/[0.03] border border-purple-900/30 rounded-xl px-4 py-3 mb-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${project.iconBg}`}>
            {project.icon}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-200">{project.name}</div>
            <div className="text-xs text-gray-600 mt-0.5">{project.desc}</div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded ${project.badgeStyle}`}>
            {project.badge}
          </span>
        </div>
      ))}
    </div>
  )
}