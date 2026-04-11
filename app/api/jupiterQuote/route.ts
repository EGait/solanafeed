import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const inputMint = searchParams.get('inputMint')
  const outputMint = searchParams.get('outputMint')
  const amount = searchParams.get('amount')

  try {
    const res = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`
    )
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Jupiter quote error:', error)
    return NextResponse.json({ error: 'Failed to fetch quote' })
  }
}