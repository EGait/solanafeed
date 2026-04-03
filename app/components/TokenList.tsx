'use client'

import JupiterSwap from './JupiterSwap'
import { useEffect, useState } from 'react'

type Token = {
  name: string
  symbol: string
  mintAddress: string
  logo: string
}

export default function TokenList() {
  const [tokens, setTokens] = useState<Token[]>([])

  useEffect(() => {
    // MOCK TOKENS
    const mockTokens: Token[] = [
      {
        name: 'USD Coin',
        symbol: 'USDC',
        mintAddress: 'EPjFWdd5Au1v1pJLa8k7VNe9gG2rZ9x0h8axVLPGd8N',
        logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=025'
      },
      {
        name: 'Raydium',
        symbol: 'RAY',
        mintAddress: '4k3Dyjzvzp8eK1qC8gkDjK8r9rNKXkZbqM6gqjGqz7fX',
        logo: 'https://cryptologos.cc/logos/raydium-ray-logo.png?v=025'
      },
      {
        name: 'Serum',
        symbol: 'SRM',
        mintAddress: 'SRMuA6YYNMQz9W5bWJwK8oK2c3tTgMSvZ9pChS4qKz3Y',
        logo: 'https://cryptologos.cc/logos/serum-srm-logo.png?v=025'
      }
    ]
    setTokens(mockTokens)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {tokens.map(token => (
        <div
          key={`${token.symbol}-${token.mintAddress}`}
          className="flex flex-col items-start gap-2 p-4 border rounded shadow bg-white"
        >
          <div className="flex items-center gap-4 w-full">
            {token.logo && (
              <img
                src={token.logo}
                alt={token.name}
                className="w-10 h-10 rounded"
              />
            )}
            <div>
              <div className="font-bold text-gray-800">
                {token.name} ({token.symbol})
              </div>
            </div>
          </div>

          {/* Swap button with mock quote */}
          <JupiterSwap
            fromMint="So11111111111111111111111111111111111111112" // SOL
            toMint={token.mintAddress}
          />
        </div>
      ))}
    </div>
  )
}