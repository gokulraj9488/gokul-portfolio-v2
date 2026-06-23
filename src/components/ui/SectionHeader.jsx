import Reveal from './Reveal.jsx'

// Repeated identically across every section for rhythm: eyebrow -> heading -> one-line subhead.
export default function SectionHeader({ eyebrow, title, subhead, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-h1 font-semibold">{title}</h2>
      {subhead && <p className="text-body-lg text-secondary">{subhead}</p>}
    </Reveal>
  )
}
