interface IconProps {
  className?: string
}

function iconClassName(className?: string) {
  return className ?? 'h-5 w-5'
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={iconClassName(className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CursorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={iconClassName(className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v14l4-3.5 2.5 5.5 2.5-1.2-2.5-5.3H17L5 3Z" />
    </svg>
  )
}

export function InboxIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={iconClassName(className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4l2 3h6l2-3h4v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4Z" />
    </svg>
  )
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={iconClassName(className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4L12 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 17.5 6 20l2.5 1L6 22l-1 2-1-2-2.5-1L4 20l1-2.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 14 19.4 16l2.1.8-2.1.8-.9 2-.8-2-2.1-.8 2.1-.8.8-2Z" />
    </svg>
  )
}

export function PencilIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={iconClassName(className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 16.5 9.7-9.7 3.5 3.5-9.7 9.7L4 20l.8-3.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m12.8 7.8 3.4 3.4" />
    </svg>
  )
}

export function FolderIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={iconClassName(className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  )
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={iconClassName(className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" />
      <circle cx="10" cy="9" r="3" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 19v-1a3 3 0 0 0-2.1-2.9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 6.5a2.5 2.5 0 0 1 0 5" />
    </svg>
  )
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={iconClassName(className)} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18M12 3a13.5 13.5 0 0 0 0 18" />
    </svg>
  )
}

export function ArrowOutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={iconClassName(className)} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 7H17v8.5" />
    </svg>
  )
}
