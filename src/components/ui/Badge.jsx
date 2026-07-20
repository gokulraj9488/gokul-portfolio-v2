// Mono tech-pill / tag. Small, hairline border, quiet.
export default function Badge({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'border-border-subtle text-secondary',
    live: 'border-status/30 text-status bg-status/[0.07]',
    accent: 'border-ember/30 text-ember bg-ember/[0.06]',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[0.72rem] leading-none ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
