"use client";

// components/HeroChat.tsx
// A front-and-center "ask anything" bar for your homepage hero.
// Drop <HeroChat /> into your hero (e.g. app/page.tsx). It calls the same
// /api/chat route — feed-grounded, with web-search fail-safe.

import { useEffect, useRef, useState } from "react";

const API_URL = "/api/chat";

// Starter prompts — tuned to what SolanaFeed actually covers.
const SUGGESTIONS = [
  "What's trending on Solana today?",
  "Compare the top LSTs right now",
  "What can I do on SolanaFeed?",
];

type Msg = {
  role: "user" | "assistant" | "error";
  content: string;
  sources?: { title: string; url: string }[];
};

// Handles Markdown links [label](url), bare URLs, and internal paths like /lsts.
// All links open in a new tab so the conversation stays put.
function renderContent(text: string) {
  const regex =
    /(\[[^\]]+\]\([^)]+\))|(https?:\/\/[^\s)]+)|(\/[a-zA-Z][a-zA-Z0-9-]*(?:\/[a-zA-Z0-9-]+)*)/g;
  return text
    .split(regex)
    .filter(Boolean)
    .map((part, i) => {
      const md = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (md) {
        return (
          <a key={i} href={md[2]} target="_blank" rel="noopener noreferrer" className="hc-link">
            {md[1]}
          </a>
        );
      }
      if (/^https?:\/\//.test(part)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="hc-link">
            {part}
          </a>
        );
      }
      if (/^\/[a-zA-Z]/.test(part)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="hc-link">
            {part}
          </a>
        );
      }
      return part;
    });
}

export default function HeroChat({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only nudge into view when the user just sent a message, and keep it within
    // the thread ("nearest") so it doesn't yank the whole page down.
    if (messages.length && messages[messages.length - 1].role === "user") {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, loading]);

  async function ask(text: string) {
    const q = text.trim();
    if (!q || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const history = next.filter((m) => m.role !== "error");
      while (history.length && history[0].role === "assistant") history.shift();

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply, sources: data.sources },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "error", content: "Couldn't reach the assistant — try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="hc-wrap">
      {!compact && (
        <>
          <h1 className="hc-title">
            Ask the <span className="hc-grad">Solana feed</span> anything
          </h1>
          <p className="hc-sub">Live news, projects, and DeFi — answered in plain English.</p>
        </>
      )}

      <div className="hc-ailabel">✦ AI assistant · powered by Gemini</div>

      <div className="hc-bar">
        <input
          className="hc-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(input)}
          placeholder="e.g. what's new in Solana DeFi this week?"
          aria-label="Ask the feed"
        />
        <button className="hc-ask" onClick={() => ask(input)} disabled={loading || !input.trim()}>
          {loading ? "…" : "Ask"}
        </button>
      </div>

      <div className="hc-chips">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="hc-chip" onClick={() => ask(s)}>
            {s}
          </button>
        ))}
      </div>

      {messages.length > 0 && (
        <div className="hc-thread">
          {messages.map((m, i) => (
            <div key={i} className={`hc-msg hc-${m.role}`}>
              <div className="hc-bubble">{renderContent(m.content)}</div>
              {m.sources && m.sources.length > 0 && (
                <div className="hc-sources">
                  <span className="hc-srclabel">From the web:</span>
                  {m.sources.map((s, j) => (
                    <a key={j} href={s.url} target="_blank" rel="noopener noreferrer" className="hc-src">
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && <div className="hc-msg hc-assistant"><div className="hc-bubble hc-dots">Thinking…</div></div>}
          <div ref={endRef} />
        </div>
      )}

      <style jsx>{`
        .hc-wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 8px 16px;
          text-align: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #e5e5ea;
        }
        .hc-title {
          font-size: clamp(28px, 5vw, 46px);
          font-weight: 700;
          line-height: 1.1;
          margin: 0 0 10px;
          letter-spacing: -0.02em;
        }
        .hc-grad {
          background: linear-gradient(135deg, #d4b75e, #c9a84c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hc-sub { color: #8a8a95; font-size: 16px; margin: 0 0 24px; }

        .hc-ailabel {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(201, 168, 76, 0.75);
          margin-bottom: 10px;
        }

        .hc-bar {
          display: flex;
          gap: 8px;
          padding: 6px;
          background: rgba(18, 18, 24, 0.9);
          border: 1px solid rgba(201, 168, 76, 0.25);
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }
        .hc-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #e5e5ea;
          font: inherit;
          font-size: 16px;
          padding: 12px 14px;
        }
        .hc-input::placeholder { color: #6c6c72; }
        .hc-ask {
          border: none;
          border-radius: 11px;
          padding: 0 22px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          color: #0a0a0f;
          background: #c9a84c;
          min-width: 64px;
        }
        .hc-ask:hover:not(:disabled) { background: #d4b75e; }
        .hc-ask:disabled { opacity: 0.5; cursor: default; }

        .hc-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }
        .hc-chip {
          background: rgba(201, 168, 76, 0.08);
          border: 1px solid rgba(201, 168, 76, 0.3);
          color: #c9a84c;
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 13px;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .hc-chip:hover { border-color: #c9a84c; background: rgba(201, 168, 76, 0.16); }

        .hc-thread {
          margin-top: 22px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .hc-msg { display: flex; flex-direction: column; gap: 6px; }
        .hc-user { align-items: flex-end; }
        .hc-assistant, .hc-error { align-items: flex-start; }
        .hc-bubble {
          max-width: 88%;
          padding: 12px 15px;
          border-radius: 14px;
          font-size: 15px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .hc-user .hc-bubble {
          background: #c9a84c;
          color: #0a0a0f;
          font-weight: 500;
        }
        .hc-assistant .hc-bubble {
          background: #17171f;
          border: 1px solid rgba(201, 168, 76, 0.15);
        }
        .hc-error .hc-bubble { background: #3a1a20; color: #ffb4b4; }
        .hc-dots { color: #8a8a95; }
        .hc-link {
          color: #d8c37e;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .hc-user .hc-link { color: #0a0a0f; }

        .hc-sources { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
        .hc-srclabel { font-size: 11px; color: #6c6c72; }
        .hc-src {
          font-size: 12px;
          color: #d8c37e;
          text-decoration: none;
          background: #14141c;
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 999px;
          padding: 3px 10px;
          max-width: 220px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hc-src:hover { border-color: #c9a84c; }

        @media (prefers-reduced-motion: reduce) {
          .hc-chip { transition: none; }
        }
      `}</style>
    </section>
  );
}