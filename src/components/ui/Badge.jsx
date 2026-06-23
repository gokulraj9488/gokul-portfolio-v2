// Mono tech-pill / tag. rounded-full, hairline border, small.
export default function Badge({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'border-border-subtle text-secondary',
    live: 'border-status/30 text-status bg-status/[0.08]',
    accent: 'border-amber/30 text-amber bg-amber/[0.06]',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.78rem] leading-none ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
