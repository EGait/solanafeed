import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser()

export async function GET() {
  try {
    const feed = await parser.parseURL('https://cointelegraph.com/rss/tag/altcoin')
    const articles = feed.items.slice(0, 20).map((item) => ({
      title: item.title || '',
      link: item.link || '',
      date: item.pubDate || '',
      summary: item.contentSnippet || '',
      image: item.enclosure?.url || null,
    }))
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('RSS fetch error:', error)
    return NextResponse.json({ articles: [] })
  }
}