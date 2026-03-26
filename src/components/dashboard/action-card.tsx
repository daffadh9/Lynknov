import Link from 'next/link'
import type { ReactNode } from 'react'

interface ActionCardProps {
  icon: ReactNode
  title: string
  description: string
  href?: string
  id?: string
  target?: '_blank'
  rel?: string
  disabled?: boolean
}

function CardContent({
  icon,
  title,
  description,
  disabled,
}: Pick<ActionCardProps, 'icon' | 'title' | 'description' | 'disabled'>) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_70%)] opacity-40 transition duration-500 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col items-start p-9">
        <span className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/[0.03] text-purple-300 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:text-purple-200">
          {icon}
        </span>

        <div className="mt-10">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold tracking-tight text-white group-hover:text-purple-100 transition-colors">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
            {description}
          </p>
        </div>

        <div className="mt-auto pt-8">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${disabled ? 'text-slate-500' : 'text-purple-400/80 group-hover:text-purple-300 group-hover:translate-x-1'}`}>
                {disabled ? 'LOCKED' : (
                    <>
                        EXECUTE
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </>
                )}
            </span>
        </div>
      </div>
    </>
  )
}

export function ActionCard({
  icon,
  title,
  description,
  href,
  id,
  target,
  rel,
  disabled = false,
}: ActionCardProps) {
  const cardStyles = `group relative h-[320px] overflow-hidden rounded-[2.5rem] border transition-all duration-500 ${
    disabled
      ? 'border-white/[0.03] bg-white/[0.01] opacity-60 cursor-not-allowed'
      : 'border-white/5 bg-[#0f0f16]/80 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] hover:border-purple-500/25 hover:bg-[#12121d] hover:shadow-[0_30px_60px_-25px_rgba(107,70,193,0.3)]'
  }`

  if (disabled || !href) {
    return (
      <article className={cardStyles}>
        <CardContent
          icon={icon}
          title={title}
          description={description}
          disabled={true}
        />
      </article>
    )
  }

  return (
    <Link
      href={href}
      id={id}
      target={target}
      rel={rel}
      className={cardStyles}
    >
      <CardContent
        icon={icon}
        title={title}
        description={description}
        disabled={false}
      />
    </Link>
  )
}
