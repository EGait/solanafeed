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

    const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`

    console.log('Fetching Jupiter URL:', url)

    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 0 }
    })

    console.log('Jupiter response status:', res.status)

    if (!res.ok) {
      const text = await res.text()
      console.error('Jupiter API failed:', res.status, text)
      return NextResponse.json({ error: text }, { status: 500 })
    }

    const data = await res.json()
    console.log('Jupiter data:', JSON.stringify(data).slice(0, 200))
    return NextResponse.json(data)
  } catch (err: any) {
    console.error('Server fetch error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}