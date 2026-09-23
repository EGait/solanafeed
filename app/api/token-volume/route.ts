import { NextResponse } from 'next/server'
import { fetchTopVolumePools } from '../../lib/geckoterminal'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const pools = await fetchTopVolumePools(10)
    return NextResponse.json({ pools, updatedAt: new Date().toISOString() })
  } catch (error) {
    console.error('Token volume fetch error:', error)
    return NextResponse.json(
      { pools: [], error: 'Failed to fetch live volume data', updatedAt: new Date().toISOString() },
      { status: 200 } // don't hard-fail the page — frontend shows an empty state instead
    )
  }
}