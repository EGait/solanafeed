import { articles } from "../data/articles"

const tagColors: Record<string, string> = {
  DeFi: "bg-purple-500/10 text-purple-400",
  NFT: "bg-indigo-500/10 text-indigo-400",
  Protocol: "bg-blue-500/10 text-blue-400",
  Ecosystem: "bg-violet-500/10 text-violet-400",
}

export default function NewsFeed() {
  return (
    <div className="p-8 border-r border-purple-900/20">
      <div className="text-xs font-medium text-indigo-500 uppercase tracking-widest mb-5">
        Latest News
      </div>
      {articles.map((article) => (
        <div key={article.id} className="py-4 border-b border-white/5 last:border-none">
          <span className={`text-xs px-2 py-0.5 rounded inline-block mb-2 ${tagColors[article.tag] ?? "bg-gray-500/10 text-gray-400"}`}>
            {article.tag}
          </span>
          <div className="text-sm font-medium text-gray-200 leading-snug mb-1">
            {article.title}
          </div>
          <div className="text-xs text-gray-600">
            {article.time} · {article.read}
          </div>
        </div>
      ))}
    </div>
  )
}