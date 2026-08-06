import Reveal from './Reveal.jsx'

// Repeated identically across every section for rhythm: eyebrow -> heading -> one-line subhead.
// size="lg" (default) is the flagship scale; "md" is one notch down, for
// sections that support the flagship rather than standing beside it —
// visual weight should say what a section IS before anyone reads a word.
export default function SectionHeader({ eyebrow, title, subhead, align = 'left', size = 'lg' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  const titleScale = size === 'md' ? 'text-h2' : 'text-h1'
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`${titleScale} font-semibold`}>{title}</h2>
      {subhead && <p className="text-body-lg text-secondary">{subhead}</p>}
    </Reveal>
  )
}
