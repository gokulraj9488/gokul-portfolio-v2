// Lit-glass surface (via .card utility: gradient + top highlight + soft shadow, not a hard border).
// Optional spotlight-on-hover (mouse-follow radial highlight) + a subtle premium lift.
import { useRef } from 'react'

export default function Card({ children, className = '', spotlight = false, as = 'div', ...props }) {
  const ref = useRef(null)
  const Tag = as

  const onMouseMove = (e) => {
    if (!spotlight || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      className={`card group relative overflow-hidden transition duration-300 ease-premium ${
        spotlight ? 'hover:-translate-y-1 hover:border-white/12 hover:shadow-float' : ''
      } ${className}`}
      {...props}
    >
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(240px circle at var(--mx,50%) var(--my,50%), rgba(230,177,126,0.12), transparent 70%)',
          }}
        />
      )}
      <div className="relative">{children}</div>
    </Tag>
  )
}
