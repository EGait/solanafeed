// app/api/chat/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { getFeedContext } from "../../lib/feed";

export const runtime = "nodejs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are the assistant for SolanaFeed, a Solana ecosystem hub with news, project
discovery, LST/stablecoin comparisons, and token swaps (powered by Jupiter).
You help visitors navigate the site and understand Solana.

Rules:
- Be concise and friendly. Short answers unless asked for more.
- Reply in plain text only. No Markdown — no **bold**, no backticks, and no
  asterisk bullets. Write links as plain paths like /news/crcl.
- You are NOT a financial advisor. Never tell anyone what to buy, sell, or hold,
  and never predict prices. If asked, say you can't give financial advice.
- If someone asks for live or real-time info you don't have — current token
  prices, on-chain data, or breaking news beyond the feed below — do NOT guess.
  Say something friendly like: "Sorry, pulling live data like that isn't
  something I can do on the current free plan yet — hopefully in a future
  update! In the meantime you can check the relevant page on the site." Then
  point them to the closest page if there is one.
- If something is outside the site's scope or you're unsure, say so plainly.
- Never ask for wallet seed phrases, private keys, or passwords, and warn users
  never to share those with anyone.
`.trim();

const MODEL = "gemini-3.5-flash-lite";
const MAX_MESSAGES = 20;
const MAX_CHARS = 4000;
const MAX_OUTPUT_TOKENS = 800;

const WINDOW_MS = 60_000;
const MAX_REQ_PER_WINDOW = 15;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip) ?? { count: 0, reset: now + WINDOW_MS };
  if (now > rec.reset) {
    rec.count = 0;
    rec.reset = now + WINDOW_MS;
  }
  rec.count += 1;
  hits.set(ip, rec);
  return rec.count > MAX_REQ_PER_WINDOW;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Slow down a moment and try again." }, { status: 429 });
  }

  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array is required." }, { status: 400 });
    }

    const contents = messages
      .slice(-MAX_MESSAGES)
      .filter((m) => m && typeof m.content === "string" && m.content.trim())
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content.slice(0, MAX_CHARS) }],
      }));

    if (contents.length === 0) {
      return NextResponse.json({ error: "No valid messages." }, { status: 400 });
    }

    // Ground the bot in the same news your site shows (passes the origin so it
    // can reach /api/news in both dev and production).
    const feed = await getFeedContext(req.nextUrl.origin);
    const systemInstruction = `${SYSTEM_PROMPT}

## SolanaFeed site data
Below is current data from the site: news, LSTs, stablecoins, tokenized stocks
(RWAs), the projects directory, and learn guides. Answer from this data first,
use the real numbers, and point users to the relevant page (e.g. /lsts,
/stablecoins, /rwas, /projects, /news, /learn) when it helps. If something isn't
here, say so plainly.

${feed}`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction,
        // tools: [{ googleSearch: {} }],
        maxOutputTokens: MAX_OUTPUT_TOKENS,
      },
    });

    const reply = response.text?.trim() || "Sorry, I didn't catch that. Try again?";

    // Collect web sources if grounding is on (empty when it isn't).
    const chunks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks ??
      []) as Array<{ web?: { uri?: string; title?: string } }>;
    const seen = new Set<string>();
    const sources = chunks
      .map((c) => c.web)
      .filter((w): w is { uri: string; title?: string } => Boolean(w?.uri))
      .filter((w) => {
        if (seen.has(w.uri)) return false;
        seen.add(w.uri);
        return true;
      })
      .slice(0, 4)
      .map((w) => ({ title: w.title || w.uri, url: w.uri }));

    return NextResponse.json({ reply, sources });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json(
      { error: "The assistant is unavailable right now. Please try again." },
      { status: 502 }
    );
  }
}