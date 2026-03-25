import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { page_id, owner_id, name, email, company, message, source } = body

    if (!page_id || !owner_id || !name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from('leads').insert({
      page_id,
      owner_id,
      name: name.slice(0, 200),
      email: email.slice(0, 200),
      company: company?.slice(0, 200) ?? null,
      message: message.slice(0, 2000),
      source: source ?? 'public-page',
      status: 'new',
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
