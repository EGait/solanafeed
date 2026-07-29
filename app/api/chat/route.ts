// app/api/chat/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { getFeedContext } from "../../lib/feed";
import { getModel } from "../../lib/models";

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

const MAX_MESSAGES = 20;
const MAX_CHARS = 4000;
const MAX_OUTPUT_TOKENS = 800;

// Simple in-memory rate limit (per warm serverless instance).
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
type Result = { reply: string; sources: { title: string; url: string }[] };

// ── Provider: Gemini (grounded, thinking minimal) ────────────────────────────
async function callGemini(messages: ChatMessage[], systemInstruction: string): Promise<Result> {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await ai.models.generateContent({
    model: getModel("gemini").id,
    contents,
    config: {
      systemInstruction,
      // tools: [{ googleSearch: {} }], // enable after turning on billing
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    },
  });

  const reply = response.text?.trim() || "Sorry, I didn't catch that. Try again?";

  const chunks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks ??
    []) as Array<{ web?: { uri?: string; title?: string } }>;
  const seen = new Set<string>();
  const sources = chunks
    .map((c) => c.web)
    .filter((w): w is { uri: string; title?: string } => Boolean(w?.uri))
    .filter((w) => (seen.has(w.uri) ? false : (seen.add(w.uri), true)))
    .slice(0, 4)
    .map((w) => ({ title: w.title || w.uri, url: w.uri }));

  return { reply, sources };
}

// ── Provider: OpenRouter (OpenAI-compatible, with auto-free fallback) ─────────
async function callOpenRouter(
  messages: ChatMessage[],
  systemText: string,
  modelId: string
): Promise<Result> {
  // Fall back to the auto free router if the named model is delisted.
  const models = modelId === "openrouter/free" ? ["openrouter/free"] : [modelId, "openrouter/free"];

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://www.solanafeed.com",
      "X-Title": "SolanaFeed",
    },
    body: JSON.stringify({
      models,
      messages: [{ role: "system", content: systemText }, ...messages],
      max_tokens: MAX_OUTPUT_TOKENS,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${detail.slice(0, 200)}`);
  }

  const data = await res.json();
  const reply =
    data.choices?.[0]?.message?.content?.trim() || "Sorry, I didn't catch that. Try again?";
  return { reply, sources: [] };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Slow down a moment and try again." }, { status: 429 });
  }

  try {
    const body = (await req.json()) as { messages?: ChatMessage[]; model?: string };
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array is required." }, { status: 400 });
    }

    const model = getModel(body.model);

    const clean: ChatMessage[] = messages
      .slice(-MAX_MESSAGES)
      .filter((m) => m && typeof m.content === "string" && m.content.trim())
      .map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content.slice(0, MAX_CHARS),
      }));

    if (clean.length === 0) {
      return NextResponse.json({ error: "No valid messages." }, { status: 400 });
    }

    // Shared grounding context — both providers get the same site data.
    const feed = await getFeedContext(req.nextUrl.origin);
    const systemText = `${SYSTEM_PROMPT}

## SolanaFeed site data
Below is current data from the site: news, LSTs, stablecoins, tokenized stocks
(RWAs), the projects directory, and learn guides. Answer from this data first,
use the real numbers, and point users to the relevant page (e.g. /lsts,
/stablecoins, /rwas, /projects, /news, /learn) when it helps. If something isn't
here, say so plainly.

${feed}`;

    const result =
      model.provider === "openrouter"
        ? await callOpenRouter(clean, systemText, model.id)
        : await callGemini(clean, systemText);

    return NextResponse.json({ ...result, model: model.label });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json(
      { error: "The assistant is unavailable right now. Please try again." },
      { status: 502 }
    );
  }
}