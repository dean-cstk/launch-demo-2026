import { NextResponse } from 'next/server'
import { fetchStackSummary, readStackConfig } from '@/lib/contentstack'

export const dynamic = 'force-dynamic'

export async function GET() {
  const configResult = readStackConfig()

  if (!configResult.ok) {
    return NextResponse.json({ ok: false, error: configResult.error }, { status: 503 })
  }

  try {
    const summary = await fetchStackSummary(configResult.config)
    return NextResponse.json({ ok: true, summary })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error connecting to Contentstack.'
    return NextResponse.json({ ok: false, error: message }, { status: 502 })
  }
}
