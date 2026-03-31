import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

interface PageWithProfile {
  id: string
  title: string
  seo_title: string | null
  seo_description: string | null
  profiles: {
    full_name: string | null
    headline: string | null
    bio: string | null
    avatar_url: string | null
    primary_cta_label: string | null
    primary_cta_url: string | null
  } | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: page } = await supabase
    .from('public_pages')
    .select('title, seo_title, seo_description')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!page) return { title: 'Page not found' }

  return {
    title: page.seo_title ?? page.title,
    description: page.seo_description ?? undefined,
  }
}

export default async function PublicProfilePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: page } = await supabase
    .from('public_pages')
    .select('id, title, seo_title, seo_description, profiles(full_name, headline, bio, avatar_url, primary_cta_label, primary_cta_url)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!page) notFound()

  const typedPage = page as unknown as PageWithProfile
  const profile = typedPage.profiles

  return (
    <main className="min-h-screen bg-[#0f0f11] px-6 py-16">
      <div className="mx-auto max-w-xl">
        {/* Identity block */}
        <div className="mb-12 text-center">
          {/* Avatar */}
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-purple-600/20 text-3xl">
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span>👤</span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-white">
            {profile?.full_name ?? typedPage.title}
          </h1>
          {profile?.headline && (
            <p className="mt-1 text-sm text-gray-400">{profile.headline}</p>
          )}
          {profile?.bio && (
            <p className="mt-4 text-sm leading-relaxed text-gray-300">{profile.bio}</p>
          )}
        </div>

        {/* CTA */}
        {profile?.primary_cta_label && profile?.primary_cta_url && (
          <div className="mb-12 text-center">
            <a
              href={profile.primary_cta_url}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-primary"
              className="inline-block rounded-lg bg-purple-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 active:scale-95"
            >
              {profile.primary_cta_label}
            </a>
          </div>
        )}

        {/* Placeholder — sections coming Sprint 1 */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
          <p className="text-sm text-gray-500">
            Portfolio, testimonials, and inquiry form coming in Sprint 1.
          </p>
        </div>

        {/* Powered by */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-xs text-gray-600 hover:text-gray-500">
            Powered by lynknov
          </Link>
        </div>
      </div>
    </main>
  )
}
