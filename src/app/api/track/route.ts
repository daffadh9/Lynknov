import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { page_id, owner_id, event_type, session_id, metadata } = body

    // Validate event_type
    const validTypes = ['page_view', 'cta_click', 'lead_submit']
    if (!validTypes.includes(event_type)) {
      return NextResponse.json({ error: 'Invalid event_type' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from('analytics_events').insert({
      page_id: page_id ?? null,
      owner_id: owner_id ?? null,
      event_type,
      session_id: session_id ?? null,
      metadata: metadata ?? {},
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
