import { requireAuth, getUserProfile, getProfileCompleteness } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { getFirstName, formatCount } from '@/lib/utils'
import Link from 'next/link'
import { signOut } from '@/features/auth/actions'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const user = await requireAuth()
  const profile = await getUserProfile()

  // Onboarding enforcement (moved from proxy per Next.js 16 best practices)
  if (!profile || profile.is_onboarded === false) {
    redirect('/onboarding')
  }

  const completeness = getProfileCompleteness(profile)

  // Fetch page stats
  const supabase = await createClient()

  const { data: page } = await supabase
    .from('public_pages')
    .select('id, slug, status, published_at')
    .eq('owner_id', user.id)
    .eq('is_primary', true)
    .single()

  const { count: pageViews } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', user.id)
    .eq('event_type', 'page_view')

  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', user.id)

  const { count: ctaClicks } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', user.id)
    .eq('event_type', 'cta_click')

  const stats = [
    { label: 'Page Views', value: formatCount(pageViews ?? 0), icon: '👁' },
    { label: 'CTA Clicks', value: formatCount(ctaClicks ?? 0), icon: '👆' },
    { label: 'Leads', value: formatCount(leadsCount ?? 0), icon: '📬' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f11]">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="text-lg font-bold text-white">
            lynk<span className="text-purple-400">nov</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">{user.email}</span>
            <form action={signOut}>
              <button
                type="submit"
                id="btn-signout"
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-400 transition hover:border-white/20 hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {getFirstName(profile?.full_name)} 👋
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Here&apos;s your business overview.
          </p>
        </div>

        {/* Profile completeness */}
        {completeness.score < 100 && (
          <div className="mb-6 rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-purple-300">
                Profile {completeness.score}% complete
              </p>
              <Link
                href="/dashboard/profile"
                className="text-xs text-purple-400 hover:underline"
              >
                Complete profile →
              </Link>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-purple-500 transition-all"
                style={{ width: `${completeness.score}%` }}
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div className="mb-1 text-2xl">{stat.icon}</div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Page status */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Your Page</h2>
            {page?.status === 'published' ? (
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                Published
              </span>
            ) : (
              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">
                Draft
              </span>
            )}
          </div>

          {page ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              {page.status === 'published' && (
                <Link
                  href={`/p/${page.slug}`}
                  target="_blank"
                  id="link-view-public-page"
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm text-gray-300 transition hover:bg-white/10"
                >
                  View public page ↗
                </Link>
              )}
              <Link
                href="/dashboard/profile"
                id="link-edit-profile"
                className="flex-1 rounded-lg bg-purple-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-purple-500"
              >
                Edit profile
              </Link>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No page found. Complete onboarding.</p>
          )}
        </div>

        {/* Quick links */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            { label: 'Edit Profile', href: '/dashboard/profile', icon: '✏️' },
            { label: 'My Projects', href: '/dashboard/projects', icon: '🗂' },
            { label: 'Leads', href: '/dashboard/leads', icon: '📬' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              id={`link-${item.label.toLowerCase().replace(' ', '-')}`}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-purple-500/30 hover:bg-white/8"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium text-gray-300">{item.label}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
