// GeckoTerminal's public API for live DEX pool data on Solana.
// Free, keyless, network id for Solana is "solana".
// Base root MUST be api.geckoterminal.com/api/v2 — NOT coingecko.com/api/v3/onchain,
// that's a different (paid) product surface.

export interface PoolData {
  poolAddress: string
  pair: string
  baseSymbol: string
  quoteSymbol: string
  dex: string
  priceUsd: number
  volume: { h1: number; h6: number; h24: number }
  priceChange: { h1: number; h6: number; h24: number }
  liquidityUsd: number
  txCount24h: number
}

interface GeckoPoolAttributes {
  name: string
  address: string
  base_token_price_usd: string
  volume_usd: { h1?: string; h6?: string; h24?: string }
  price_change_percentage: { h1?: string; h6?: string; h24?: string }
  reserve_in_usd: string
  transactions?: { h24?: { buys: number; sells: number } }
}

interface GeckoPool {
  id: string
  attributes: GeckoPoolAttributes
  relationships: {
    base_token: { data: { id: string } }
    quote_token: { data: { id: string } }
    dex: { data: { id: string } }
  }
}

interface GeckoIncluded {
  id: string
  type: string
  attributes: { name?: string; symbol?: string }
}

interface GeckoResponse {
  data: GeckoPool[]
  included?: GeckoIncluded[]
}

const GECKO_BASE = 'https://api.geckoterminal.com/api/v2'
const NETWORK = 'solana'

export async function fetchTopVolumePools(limit = 10): Promise<PoolData[]> {
  const url = new URL(`${GECKO_BASE}/networks/${NETWORK}/pools`)
  url.searchParams.set('page', '1')
  url.searchParams.set('include', 'base_token,quote_token,dex')

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json;version=20230302' },
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    throw new Error(`GeckoTerminal API error: ${res.status} ${res.statusText}`)
  }

  const json: GeckoResponse = await res.json()

  const lookup = new Map<string, GeckoIncluded>()
  for (const item of json.included ?? []) {
    lookup.set(`${item.type}:${item.id}`, item)
  }

  const pools: PoolData[] = (json.data ?? []).map((pool) => {
    const baseId = pool.relationships.base_token.data.id
    const quoteId = pool.relationships.quote_token.data.id
    const dexId = pool.relationships.dex.data.id

    const base = lookup.get(`token:${baseId}`)
    const quote = lookup.get(`token:${quoteId}`)
    const dex = lookup.get(`dex:${dexId}`)

    return {
      poolAddress: pool.attributes.address,
      pair: pool.attributes.name,
      baseSymbol: base?.attributes?.symbol ?? '?',
      quoteSymbol: quote?.attributes?.symbol ?? '?',
      dex: dex?.attributes?.name ?? 'unknown',
      priceUsd: parseFloat(pool.attributes.base_token_price_usd) || 0,
      volume: {
        h1: parseFloat(pool.attributes.volume_usd.h1 ?? '0') || 0,
        h6: parseFloat(pool.attributes.volume_usd.h6 ?? '0') || 0,
        h24: parseFloat(pool.attributes.volume_usd.h24 ?? '0') || 0,
      },
      priceChange: {
        h1: parseFloat(pool.attributes.price_change_percentage.h1 ?? '0') || 0,
        h6: parseFloat(pool.attributes.price_change_percentage.h6 ?? '0') || 0,
        h24: parseFloat(pool.attributes.price_change_percentage.h24 ?? '0') || 0,
      },
      liquidityUsd: parseFloat(pool.attributes.reserve_in_usd) || 0,
      txCount24h: (pool.attributes.transactions?.h24?.buys ?? 0) + (pool.attributes.transactions?.h24?.sells ?? 0),
    }
  })

  // Default ordering from the API isn't guaranteed volume-sorted for every
  // network, so we sort client-side on 24h volume as the baseline order.
  // The frontend re-sorts by whichever window the user picks.
  return pools.sort((a, b) => b.volume.h24 - a.volume.h24).slice(0, limit)
}