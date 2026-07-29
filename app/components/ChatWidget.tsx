"use client";

// components/ChatWidget.tsx
// Drop <ChatWidget /> into app/layout.tsx (inside <body>) to show it site-wide.
// Styling is scoped via styled-jsx (built into Next.js) so it won't touch the
// rest of your site — no Tailwind or global CSS required.

import { useEffect, useRef, useState } from "react";

const API_URL = "/api/chat";
const GREETING =
  "gm 👋 I'm the SolanaFeed assistant. Ask me about the feed, projects, or anything Solana. (I can't give financial advice.)";

type Msg = {
  role: "user" | "assistant" | "error";
  content: string;
  sources?: { title: string; url: string }[];
};

// Turn internal paths (/news/crcl, /lsts) and full URLs into clickable links.
function renderContent(text: string) {
  const regex = /(https?:\/\/[^\s]+|\/[a-zA-Z][a-zA-Z0-9-]*(?:\/[a-zA-Z0-9-]+)*)/g;
  return text.split(regex).map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="cbw-link">
          {part}
        </a>
      );
    }
    if (/^\/[a-zA-Z]/.test(part)) {
      return (
        <a key={i} href={part} className="cbw-link">
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, loading]);

  function openChat() {
    setOpen(true);
    setMessages((m) => (m.length === 0 ? [{ role: "assistant", content: GREETING }] : m));
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // Send only real turns, and make sure history starts with a user message
      // (drop the leading assistant greeting).
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
        {
          role: "error",
          content:
            "Couldn't reach the assistant. Check that /api/chat is deployed and GEMINI_API_KEY is set.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className={`cbw-root ${open ? "cbw-open" : ""}`}>
      <div className="cbw-panel" role="dialog" aria-label="Chat assistant">
        <div className="cbw-header">
          <span className="cbw-dot" />
          <div>
            <div className="cbw-title">Feed Assistant</div>
            <div className="cbw-sub">AI assistant · powered by Gemini</div>
          </div>
          <button className="cbw-close" aria-label="Close chat" onClick={() => setOpen(false)}>
            &times;
          </button>
        </div>

        <div className="cbw-log" ref={logRef}>
          {messages.map((m, i) => (
            <div key={i} className="cbw-row">
              <div
                className={`cbw-msg ${
                  m.role === "user" ? "cbw-user" : m.role === "error" ? "cbw-err" : "cbw-ai"
                }`}
              >
                {renderContent(m.content)}
              </div>
              {m.sources && m.sources.length > 0 && (
                <div className="cbw-sources">
                  {m.sources.map((s, j) => (
                    <a
                      key={j}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cbw-src"
                    >
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="cbw-typing" aria-label="Assistant is typing">
              <span /><span /><span />
            </div>
          )}
        </div>

        <div className="cbw-inputbar">
          <textarea
            ref={inputRef}
            className="cbw-input"
            rows={1}
            placeholder="Type a message…"
            aria-label="Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button className="cbw-send" onClick={send} disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
      </div>

      <button className="cbw-launch" aria-label="Open chat" onClick={openChat}>
        <svg viewBox="0 0 24 24">
          <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.3 1.1 4.4 2.9 5.9L4 21l4.3-1.8c1.1.3 2.4.5 3.7.5 5.5 0 10-3.8 10-8.7S17.5 3 12 3z" />
        </svg>
      </button>

      <style jsx>{`
        .cbw-root {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 2147483000;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .cbw-launch {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #d4b75e, #c9a84c);
          box-shadow: 0 8px 30px rgba(201, 168, 76, 0.35);
          display: grid;
          place-items: center;
          transition: transform 0.2s ease;
        }
        .cbw-launch:hover { transform: scale(1.06); }
        .cbw-launch:active { transform: scale(0.96); }
        .cbw-launch svg { width: 26px; height: 26px; fill: #0a0a0f; }
        .cbw-launch:focus-visible { outline: 3px solid #c9a84c; outline-offset: 3px; }

        .cbw-panel {
          position: absolute;
          bottom: 76px;
          right: 0;
          width: min(380px, calc(100vw - 32px));
          height: min(560px, calc(100vh - 120px));
          background: #0a0a0f;
          color: #e5e5ea;
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
          opacity: 0;
          transform: translateY(12px) scale(0.98);
          pointer-events: none;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .cbw-root.cbw-open .cbw-panel {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }
        .cbw-header {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(201, 168, 76, 0.2);
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
        }
        .cbw-header::before {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 2px;
          background: linear-gradient(90deg, #c9a84c, #d4b75e);
        }
        .cbw-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #c9a84c;
          box-shadow: 0 0 10px rgba(201, 168, 76, 0.9);
        }
        .cbw-title { font-size: 15px; font-weight: 600; }
        .cbw-sub { font-size: 12px; color: #8a8a95; margin-top: 1px; }
        .cbw-close {
          margin-left: auto;
          background: none;
          border: none;
          color: #8a8a95;
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
        }
        .cbw-close:hover { color: #e5e5ea; }

        .cbw-log {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cbw-msg {
          max-width: 82%;
          padding: 10px 13px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.45;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .cbw-user {
          align-self: flex-end;
          background: #c9a84c;
          color: #0a0a0f;
          font-weight: 500;
          border-bottom-right-radius: 4px;
        }
        .cbw-ai {
          align-self: flex-start;
          background: #17171f;
          border: 1px solid rgba(201, 168, 76, 0.12);
          border-bottom-left-radius: 4px;
        }
        .cbw-err {
          align-self: flex-start;
          background: #3a1a20;
          color: #ffb4b4;
        }
        .cbw-row { display: contents; }
        .cbw-link {
          color: #d8c37e;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .cbw-user .cbw-link { color: #0a0a0f; }
        .cbw-sources {
          align-self: flex-start;
          max-width: 82%;
          margin-top: -4px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .cbw-src {
          font-size: 11px;
          color: #d8c37e;
          text-decoration: none;
          background: #14141c;
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 999px;
          padding: 3px 9px;
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cbw-src:hover { border-color: #c9a84c; }

        .cbw-typing {
          align-self: flex-start;
          background: #17171f;
          border: 1px solid rgba(201, 168, 76, 0.12);
          border-radius: 14px;
          padding: 12px 14px;
          display: flex;
          gap: 4px;
        }
        .cbw-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8a8a95;
          animation: cbw-bounce 1.2s infinite;
        }
        .cbw-typing span:nth-child(2) { animation-delay: 0.15s; }
        .cbw-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes cbw-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        .cbw-inputbar {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-top: 1px solid rgba(201, 168, 76, 0.2);
          background: #121218;
        }
        .cbw-input {
          flex: 1;
          resize: none;
          max-height: 100px;
          background: #0a0a0f;
          color: #e5e5ea;
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 12px;
          padding: 10px 12px;
          font: inherit;
          font-size: 14px;
        }
        .cbw-input:focus { outline: none; border-color: #c9a84c; }
        .cbw-send {
          border: none;
          border-radius: 12px;
          padding: 0 16px;
          cursor: pointer;
          background: #c9a84c;
          color: #0a0a0f;
          font-weight: 600;
        }
        .cbw-send:hover:not(:disabled) { background: #d4b75e; }
        .cbw-send:disabled { opacity: 0.5; cursor: default; }

        @media (prefers-reduced-motion: reduce) {
          .cbw-launch, .cbw-panel { transition: none; }
          .cbw-typing span { animation: none; }
        }
      `}</style>
    </div>
  );
}