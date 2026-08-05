# SolanaFeed

**The Solana ecosystem hub** — news, project discovery, token swapping, and DeFi comparisons in one place.

🌐 **Live at [solanafeed.com](https://solanafeed.com)**

<img width="1882" height="887" alt="HomePage Screenshot" src="https://github.com/user-attachments/assets/47f9884a-765a-4e0a-a2c0-6d526fe71080" />


---

## What It Does

SolanaFeed is a one-stop dashboard for anyone active in the Solana ecosystem — whether you're a developer tracking the space or a DeFi user managing assets.

- **News Feed** — Aggregated Solana ecosystem news, updated regularly
- **Project Discovery** — Browse and explore Solana projects across categories
- **Token Swapping** — Swap tokens directly via Jupiter integration
- **LST & Stablecoin Comparisons** — Compare liquid staking tokens and stablecoins side by side
- **RWAs** — Tokenized stocks available on Solana
- **AI Assistant** — A multi-model chat assistant grounded in the site's own data

---

## AI Assistant

A chat assistant available both as a hero search bar on the homepage and as a
floating widget site-wide. It answers questions about the site's content —
"what's trending," "compare the top LSTs," "what can I do here" — using the
site's real data rather than the model's general knowledge.

### Multi-provider architecture

The assistant supports multiple model providers behind a single API route.
Users pick a model from a dropdown; each reply is labeled with the model that
produced it.

- **Gemini** (`@google/genai`) — the grounded default, with the highest free-tier ceiling
- **OpenRouter** (OpenAI-compatible REST) — access to open models like Llama 3.3 70B

The two providers have entirely different request and response shapes. Rather
than branching throughout the app, each is wrapped in an adapter that normalizes
its output to a shared `{ reply, sources }` interface, so the frontend is
provider-agnostic:

```
app/lib/models.ts       — shared model registry (server + UI read from one source)
app/api/chat/route.ts   — provider adapters, grounding, rate limiting
app/lib/feed.ts         — builds the grounding context from site data
```

Adding a third provider means writing one adapter function and one registry
entry — no changes to the components.

### Grounding

Rather than duplicating data fetching, the assistant reuses the site's existing
`/api/news` route and imports the same hand-maintained data files that power the
LST, stablecoin, RWA, project, and guide pages. This guarantees the assistant
and the site can never disagree — there's one source of truth.

The context is assembled into labeled sections with per-section item caps and
truncated descriptions, keeping requests small enough to stay fast and within
free-tier limits even as the underlying datasets grow.

### Failure handling

Free-tier APIs are unreliable by nature, so the assistant is built to degrade
rather than break:

- **Feed fetch timeout** — a 4s `AbortController` cap on `/api/news`; on timeout
  the assistant still answers from static site data instead of hanging
- **Model delisting fallback** — OpenRouter rotates and removes free model IDs
  without notice, so requests include `openrouter/free` as an automatic fallback
- **Context caching** — grounding context is cached for 5 minutes rather than
  rebuilt per message
- **Rate limiting** — in-memory per-IP throttling to protect free-tier quota
- **Server-side keys** — all API keys live in route handlers; none are exposed
  to the client

### Guardrails

The system prompt enforces product constraints, not just tone:

- No financial advice, and no price predictions
- No guessing at live data it can't access — it declines and points to the
  relevant page instead of hallucinating figures
- Never requests seed phrases or private keys, and warns users not to share them

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Swap Integration**: Jupiter
- **AI**: Google Gemini + OpenRouter
- **RPC**: Helius
- **Deployment**: Vercel

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variables

Create a `.env.local` in the project root:

```dotenv
NEXT_PUBLIC_HELIUS_RPC=your_helius_rpc_url
GEMINI_API_KEY=your_gemini_key
OPENROUTER_API_KEY=your_openrouter_key
```

Both AI keys are free to obtain — Gemini from
[Google AI Studio](https://aistudio.google.com), OpenRouter from
[openrouter.ai](https://openrouter.ai). Neither requires a credit card.

Note that `GEMINI_API_KEY` and `OPENROUTER_API_KEY` intentionally omit the
`NEXT_PUBLIC_` prefix so they stay server-side only.

---

## Project Structure

```
app/
├── api/
│   ├── chat/       # AI assistant endpoint (provider adapters + grounding)
│   └── news/       # News aggregation endpoint
├── data/           # Hand-maintained datasets (LSTs, stablecoins, projects, RWAs)
├── lib/
│   ├── feed.ts     # Builds AI grounding context from site data
│   └── models.ts   # Shared model registry
├── news/           # News aggregation
├── projects/       # Project discovery
├── swap/           # Jupiter swap integration
├── lsts/           # Liquid staking token comparisons
├── stablecoins/    # Stablecoin comparisons
├── rwas/           # Tokenized stocks
└── components/     # Shared UI components (incl. HeroChat, ChatWidget)
```

---

## Roadmap

- Live web search fallback for the assistant (Gemini grounding, pending billing)
- Real-time token price data in the assistant's context

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## License

[MIT](./license)
