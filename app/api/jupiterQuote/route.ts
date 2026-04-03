import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const inputMint = searchParams.get('inputMint')
    const outputMint = searchParams.get('outputMint')
    const amount = searchParams.get('amount') || '1000000000'

    if (!inputMint || !outputMint) {
      return NextResponse.json({ error: 'Missing inputMint or outputMint' }, { status: 400 })
    }

    const res = await fetch(
      `https://quote-api.jup.ag/v4/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`
    )

    if (!res.ok) {
      const text = await res.text()
      console.error('Jupiter API failed:', res.status, text)
      return NextResponse.json({ error: 'Jupiter API request failed' }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Server fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 })
  }
}