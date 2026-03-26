import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { ActionCard } from '@/components/dashboard/action-card'
import {
  ArrowOutIcon,
  CursorIcon,
  EyeIcon,
  FolderIcon,
  GlobeIcon,
  InboxIcon,
  PencilIcon,
  SparkIcon,
  UsersIcon,
} from '@/components/dashboard/icons'
import { MetricCard } from '@/components/dashboard/metric-card'
import { ProfileProgressCard } from '@/components/dashboard/profile-progress-card'
import { signOut } from '@/features/auth/actions'
import { requireAuth, getProfileCompleteness, getUserProfile } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { formatCount, getFirstName } from '@/lib/utils'

const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata = {
  title: 'Dashboard',
}

function formatPublishDate(value: string | null | undefined) {
  if (!value) return 'Not published yet'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

interface QuickAction {
  icon: ReactNode
  title: string
  description: string
  href?: string
  id?: string
  target?: '_blank'
  rel?: string
  disabled?: boolean
}

function buildQuickActions(isPublished: boolean, publicPageHref: string | undefined): QuickAction[] {
  const baseActions: QuickAction[] = [
    {
      icon: <PencilIcon />,
      title: 'Edit Profile',
      description: 'Refresh your headline, bio, CTA, and positioning.',
      href: '/dashboard/profile',
      id: 'link-edit-profile-quick',
    },
    {
      icon: <FolderIcon />,
      title: 'My Projects',
      description: 'Curate portfolio entries and keep your work highlights current.',
      href: '/dashboard/projects',
      id: 'link-my-projects',
    },
    {
      icon: <UsersIcon />,
      title: 'Leads',
      description: 'Review inbound leads and continue active conversations.',
      href: '/dashboard/leads',
      id: 'link-leads',
    },
  ]

  if (isPublished && publicPageHref) {
    return [
      ...baseActions,
      {
        icon: <GlobeIcon />,
        title: 'View Public Page',
        description: 'Open your live page exactly as visitors see it.',
        href: publicPageHref,
        target: '_blank',
        rel: 'noreferrer',
        id: 'link-view-public-page-quick',
      },
    ]
  }

  return [
    ...baseActions,
    {
      icon: <GlobeIcon />,
      title: 'View Public Page',
      description: 'Publish your page first to unlock this preview action.',
      disabled: true,
    },
  ]
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

  const isPublished = page?.status === 'published'
  const publicPageHref = page?.slug ? `/p/${page.slug}` : undefined

  const completionItems = [
    { label: 'Full name', done: completeness.hasName },
    { label: 'Professional headline', done: completeness.hasHeadline },
    { label: 'Bio summary', done: completeness.hasBio },
    { label: 'Avatar image', done: completeness.hasAvatar },
    { label: 'Primary CTA', done: completeness.hasCta },
  ]

  const completedItems = completionItems.filter((item) => item.done).length
  const readinessScore = Math.min(100, completeness.score + (isPublished ? 10 : 0))

  const stats = [
    {
      label: 'Page Views',
      value: formatCount(pageViews ?? 0),
      hint: 'Visits on your public page',
      icon: <EyeIcon />,
    },
    {
      label: 'CTA Clicks',
      value: formatCount(ctaClicks ?? 0),
      hint: 'Intent captured from CTAs',
      icon: <CursorIcon />,
    },
    {
      label: 'Leads',
      value: formatCount(leadsCount ?? 0),
      hint: 'Inbound contacts received',
      icon: <InboxIcon />,
    },
    {
      label: 'Profile Completion',
      value: `${completeness.score}%`,
      hint: `${completedItems}/${completionItems.length} essentials done`,
      icon: <SparkIcon />,
    },
  ]

  const quickActions = buildQuickActions(isPublished, publicPageHref)

  return (
    <div
      className={`${headingFont.variable} ${bodyFont.variable} min-h-screen bg-[#09090e] font-[family-name:var(--font-plus-jakarta)] text-white`}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 top-[-100px] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute right-[-100px] top-[100px] h-[600px] w-[600px] rounded-full bg-fuchsia-500/8 blur-[160px]" />
      </div>

      <header className="relative z-10 border-b border-white/[0.05] bg-[#09090e]/60 py-6 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-8 sm:px-12 lg:px-16">
          <Link href="/dashboard" className="group flex items-center transition-transform hover:scale-[1.02]">
            <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-white transition-opacity group-hover:opacity-90">
              lynk
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
                nov
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <span className="hidden h-8 items-center rounded-full border border-white/10 bg-white/[0.02] px-4 text-xs font-semibold tracking-wide text-slate-400 sm:flex">
              {user.email}
            </span>

            <form action={signOut}>
              <button
                type="submit"
                id="btn-signout"
                className="rounded-full border border-white/10 bg-white/[0.02] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-slate-200 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-5xl px-8 pb-32 pt-16 sm:px-12 lg:px-16">
        {/* HERO SECTION - REFINED & SPACIOUS */}
        <section className="mb-24 flex flex-col items-center text-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-[4.5rem] leading-[1.1]">
                    Welcome back, <span className="text-purple-300/90">{getFirstName(profile.full_name)}</span>
                </h1>
                <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-slate-400 tracking-wide sm:text-xl">
                    Your business OS is fine-tuned and ready. Monitor metrics, refine your presence, and handle inbound leads from one interface.
                </p>
                
                <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
                    {isPublished && publicPageHref ? (
                        <Link
                            href={publicPageHref}
                            target="_blank"
                            rel="noreferrer"
                            id="link-view-public-page"
                            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-9 text-sm font-bold uppercase tracking-[0.2em] text-[#09090e] transition-all hover:scale-105 hover:bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            View Public Page
                        </Link>
                    ) : (
                        <Link
                            href="/dashboard/profile"
                            className="inline-flex h-14 items-center justify-center rounded-full bg-[linear-gradient(125deg,#7c3aed,#d946ef)] px-9 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:scale-105 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.5)] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            Publish Now
                        </Link>
                    )}

                    <Link
                        href="/dashboard/profile"
                        id="link-edit-profile"
                        className="inline-flex h-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-9 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white/20 hover:bg-white/[0.08]"
                    >
                        Management
                    </Link>
                </div>
            </div>
        </section>

        {/* METRICS - SPACIOUS VERTICAL SECTION */}
        <section className="mb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <MetricCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                hint={stat.hint}
              />
            ))}
          </div>
        </section>

        {/* PAGE STATUS & PROGRESS - CLEARLY SEPARATED */}
        <div className="mb-32 grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <ProfileProgressCard
                    score={completeness.score}
                    items={completionItems}
                    href="/dashboard/profile"
                />
            </div>

            <article className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0b0b12]/60 p-10 lg:col-span-2">
                <div className="relative">
                    <div className="flex items-start justify-between">
                        <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-white">
                            Status
                        </h3>
                        <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${
                            isPublished
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                            : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                        }`}>
                            {isPublished ? 'LIVE' : 'DRAFT'}
                        </span>
                    </div>

                    <div className="mt-12 space-y-8">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Slug</p>
                            <p className="mt-3 text-lg font-medium text-white/90">/p/{page?.slug || '---'}</p>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Quality Score</p>
                            <div className="mt-4 flex items-end gap-3">
                                <span className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-none text-white">
                                    {readinessScore}%
                                </span>
                                <span className="mb-1 text-xs text-slate-500">Optimal: 90%+</span>
                            </div>
                        </div>

                        {isPublished && (
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Last Activity</p>
                                <p className="mt-3 text-sm text-slate-400">
                                    {formatPublishDate(page?.published_at)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </div>

        {/* OPERATIONS - TALL CARDS GRID */}
        <section>
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-white">
                Core Operations
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {quickActions.map((action) => (
              <ActionCard
                key={action.title}
                icon={action.icon}
                title={action.title}
                description={action.description}
                href={action.href}
                id={action.id}
                target={action.target}
                rel={action.rel}
                disabled={action.disabled}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
