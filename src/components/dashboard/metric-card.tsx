import type { ReactNode } from 'react'

interface MetricCardProps {
  icon: ReactNode
  label: string
  value: string
  hint?: string
}

export function MetricCard({ icon, label, value, hint }: MetricCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0f0f16]/80 p-9 shadow-[0_22px_50px_-30px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-purple-500/20 hover:bg-[#12121d] hover:shadow-[0_32px_70px_-30px_rgba(107,70,193,0.3)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.08),transparent_65%)]" />
      <div className="relative flex flex-col h-full gap-8">
        <div className="flex items-center justify-between">
          <span className="text-purple-300/60 transition-colors duration-500 group-hover:text-purple-300">
            {icon}
          </span>
          {hint ? (
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
               {label.split(' ')[0]}
             </span>
          ) : null}
        </div>

        <div className="mt-auto">
          <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-semibold tracking-tight text-white xl:text-5xl">
            {value}
          </p>
          <p className="mt-2 text-sm font-medium tracking-wide text-slate-400/90 group-hover:text-slate-300 transition-colors">
            {label}
          </p>
          {hint ? (
            <p className="mt-4 text-[11px] font-medium leading-relaxed text-slate-500/80 group-hover:text-slate-400 transition-colors">
              {hint}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
