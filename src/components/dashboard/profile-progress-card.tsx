import Link from 'next/link'

interface CompletionItem {
  label: string
  done: boolean
}

interface ProfileProgressCardProps {
  score: number
  items: CompletionItem[]
  href: string
}

function clampScore(score: number) {
  return Math.min(100, Math.max(0, score))
}

export function ProfileProgressCard({ score, items, href }: ProfileProgressCardProps) {
  const normalizedScore = clampScore(score)
  const completedCount = items.filter((item) => item.done).length

  return (
    <article className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0b0b12]/60 p-10">
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-white">
              {normalizedScore}% <span className="text-purple-300/40">Profile Strength</span>
            </h2>
            <p className="mt-3 text-sm font-medium tracking-wide text-slate-400">
               {completedCount} of {items.length} essentials established
            </p>
          </div>

          <Link
            href={href}
            className="group inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-purple-200 transition-all hover:border-purple-500/40 hover:bg-purple-500/10"
          >
            Refine Details
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.03]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#8b5cf6,#d946ef)] transition-all duration-1000 ease-out"
            style={{ width: `${normalizedScore}%` }}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors ${
                  item.done 
                  ? 'border-emerald-500/10 bg-emerald-500/[0.02] text-emerald-200/70' 
                  : 'border-white/[0.03] bg-white/[0.01] text-slate-500'
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-black ${
                  item.done
                    ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                    : 'border-white/10 bg-white/5 text-slate-600'
                }`}
              >
                {item.done ? '✓' : ''}
              </div>
              <span className="text-[13px] font-medium tracking-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
