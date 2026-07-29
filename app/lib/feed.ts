// app/lib/feed.ts
// Grounds the bot in your site's real data. News is pulled live from /api/news
// (merged with your own articles, like NewsFeed.tsx). Everything else comes from
// your hand-maintained data files, each as its own labeled section.
//
// ── CHECK THESE IMPORT PATHS ──────────────────────────────────────────────────
// They assume each file sits in app/data/ with the export name shown. If any
// filename differs in your project, fix just that one line.
import { ownArticles } from "../data/ownArticles";
import { lsts } from "../data/lsts";
import { stablecoins } from "../data/stablecoins";
import { projects } from "../data/projects";
import { tokenizedStocks } from "../data/rwas";
import { guides } from "../data/guides";
// ──────────────────────────────────────────────────────────────────────────────

const NEWS_ITEMS = 15;
const CACHE_MS = 5 * 60 * 1000;

let cache: { at: number; text: string } | null = null;

const trim = (s?: string, n = 110) =>
  s ? (s.length > n ? s.slice(0, n).trimEnd() + "…" : s) : "";

function fmtDate(d?: string): string {
  if (!d) return "";
  const date = new Date(d);
  return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function section(title: string, lines: string[], footer?: string): string {
  if (!lines.length) return "";
  return `## ${title}\n${lines.join("\n")}${footer ? `\n${footer}` : ""}\n`;
}

// ── Static sections (built once — these don't change at runtime) ──────────────
const LST_SECTION = section(
  "Liquid Staking Tokens (LSTs)",
  (lsts as any[]).slice(0, 12).map((x, i) => {
    const sym = x.symbol && x.symbol !== x.name ? ` (${x.symbol})` : "";
    return `${i + 1}. ${x.name}${sym} — ${x.apy ?? "?"} APY, ${x.tvl ?? "?"} TVL. ${trim(x.description, 90)}`;
  }),
  "(Full comparison at /lsts)"
);

const STABLE_SECTION = section(
  "Stablecoins",
  (stablecoins as any[]).slice(0, 12).map((x, i) => {
    const sym = x.symbol && x.symbol !== x.name ? ` (${x.symbol})` : "";
    const issuer = x.issuer ? `${x.issuer}, ` : "";
    const peg = x.peg ? `peg ${x.peg}${x.pegStatus ? ` (${x.pegStatus})` : ""}, ` : "";
    return `${i + 1}. ${x.name}${sym} — ${issuer}${peg}${x.tvl ?? "?"} TVL. ${trim(x.description, 80)}`;
  }),
  "(Full list at /stablecoins)"
);

const RWA_SECTION = section(
  "Tokenized Stocks / RWAs (xStocks)",
  (tokenizedStocks as any[]).slice(0, 20).map((x, i) => `${i + 1}. ${x.ticker} — ${x.name}${x.underlying ? ` (${x.underlying})` : ""}`),
  "(Full list at /rwas)"
);

const PROJECT_SECTION = section(
  "Projects Directory",
  (projects as any[]).slice(0, 18).map((x, i) => `${i + 1}. ${x.name} — ${trim(x.description, 120)}`),
  "(Browse all at /projects)"
);

const GUIDE_SECTION = section(
  "Learn Guides",
  (guides as any[]).slice(0, 12).map((x, i) => `${i + 1}. ${x.title}${x.level ? ` (${x.level})` : ""} — ${x.link ?? ""}`),
  "(All guides at /learn)"
);

const STATIC_SECTIONS = [LST_SECTION, STABLE_SECTION, RWA_SECTION, PROJECT_SECTION, GUIDE_SECTION]
  .filter(Boolean)
  .join("\n");

// ── News section (live — fetched from /api/news, merged with your own) ────────
async function newsSection(baseUrl: string): Promise<string> {
  let fetched: any[] = [];
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 4000); // give up after 4s
    const res = await fetch(`${baseUrl}/api/news`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(t);
    if (res.ok) {
      const data = await res.json();
      fetched = Array.isArray(data.articles) ? data.articles : [];
    }
  } catch {
    // timed out or failed — fall back to your own articles + static data
  }

  const combined = [...(ownArticles as any[]), ...fetched].slice(0, NEWS_ITEMS);
  const lines = combined.map((a, i) => {
    const src = a.own ? "SolanaFeed" : "Cointelegraph";
    const day = fmtDate(a.date);
    const meta = day ? ` — ${src} (${day})` : ` — ${src}`;
    const sum = a.summary ? `\n   ${trim(a.summary, 140)}` : "";
    const link = a.link ? `\n   ${a.link}` : "";
    return `${i + 1}. ${a.title ?? "Untitled"}${meta}${sum}${link}`;
  });

  return section("Latest News (most recent first)", lines, "(Full feed at /news)");
}

export async function getFeedContext(baseUrl: string): Promise<string> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.text;

  const news = await newsSection(baseUrl);
  const text = [news, STATIC_SECTIONS].filter(Boolean).join("\n");

  cache = { at: Date.now(), text };
  return text;
}