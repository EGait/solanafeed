// app/lib/models.ts
// Single source of truth for the chat models offered in the picker.
// Imported by both the API route (to route the request) and the UI (for labels).
//
// NOTE: OpenRouter's free model IDs rotate and occasionally get delisted. If a
// named model stops working, update its `id` here — the route also falls back to
// "openrouter/free" (an auto-router that always resolves to an available free
// model), so the picker never fully breaks.

export type Provider = "gemini" | "openrouter";

export type ChatModel = {
  key: string;      // stable key sent from the UI
  label: string;    // shown in the picker
  provider: Provider;
  id: string;       // the actual model id for that provider
};

export const CHAT_MODELS: ChatModel[] = [
  {
    key: "gemini",
    label: "Gemini · grounded",
    provider: "gemini",
    id: "gemini-3.5-flash-lite",
  },
  {
    key: "llama",
    label: "Llama 3.3 70B",
    provider: "openrouter",
    id: "meta-llama/llama-3.3-70b-instruct:free",
  },
  {
    key: "auto",
    label: "Open model · auto",
    provider: "openrouter",
    id: "openrouter/free",
  },
];

export const DEFAULT_MODEL_KEY = CHAT_MODELS[0].key;

export function getModel(key?: string): ChatModel {
  return CHAT_MODELS.find((m) => m.key === key) ?? CHAT_MODELS[0];
}