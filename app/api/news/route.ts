import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser()

function extractImage(html: string | undefined): string | null {
  if (!html) return null
  const match = html.match(/src="([^"]+)"/)
  return match ? match[1] : null
}

export async function GET() {
  try {
    const feed = await parser.parseURL('https://coinpedia.org/feed/')
    const articles = feed.items.slice(0, 20).map((item) => ({
      title: item.title || '',
      link: item.link || '',
      date: item.pubDate || '',
      summary: item.contentSnippet || '',
      image: extractImage(item.content),
    }))
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('RSS fetch error:', error)
    return NextResponse.json({ articles: [] })
  }
}