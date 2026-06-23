import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { profile } from '../../data/site.js'

// Product-grade identity component (Apple/Linear/Raycast energy) — not a social card.
// Glassmorphism + layered depth, pointer 3D-tilt, cursor sheen, ambient float,
// and a floating status panel revealed on hover/focus.
export default function ProfileCard() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 16 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 16 })

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px)
    my.set(py)
    ref.current.style.setProperty('--mx', `${px * 100}%`)
    ref.current.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div className={`group relative ${reduce ? '' : 'animate-float'}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        tabIndex={0}
        aria-label={`${profile.name}, ${profile.role}. ${profile.statusPanel}`}
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
        className="glass relative overflow-hidden rounded-3xl border border-border-subtle p-5 shadow-float outline-none"
      >
        {/* cursor sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(255,250,240,0.08), transparent 70%)' }}
        />

        <div className="relative flex items-start gap-4">
          {/* avatar — monogram in a warm gradient ring (or headshot if profile.photo set) */}
          <div className="relative h-14 w-14 flex-none rounded-2xl p-[1.5px]" style={{ background: 'linear-gradient(140deg, #E6B17E, #E0905E)' }}>
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-ink">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="h-full w-full rounded-2xl object-cover" />
              ) : (
                <span className="font-display text-lg font-semibold text-primary">{profile.monogram}</span>
              )}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-base font-semibold text-primary">{profile.name}</h3>
              {/* live availability — the one cool-accent moment on the card */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-synapse/30 bg-synapse/[0.08] px-2.5 py-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-synapse opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-synapse" />
                </span>
                <span className="font-mono text-[0.68rem] text-synapse">{profile.availableLabel}</span>
              </span>
            </div>
            <p className="mt-0.5 truncate text-sm text-secondary">{profile.role}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-tertiary">
              <MapPin size={12} aria-hidden="true" />
              {profile.location}
            </p>
          </div>
        </div>

        <div className="relative mt-4 flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
          <ul className="flex flex-wrap gap-1.5">
            {profile.chips.map((c) => (
              <li key={c}>
                <span className="rounded-full border border-border-subtle bg-white/[0.02] px-2.5 py-1 font-mono text-[0.7rem] text-secondary">
                  {c}
                </span>
              </li>
            ))}
          </ul>
          <span className="whitespace-nowrap font-mono text-[0.7rem] text-tertiary">{profile.now}</span>
        </div>
      </motion.div>

      {/* floating status panel — revealed on hover / keyboard focus */}
      <div
        role="status"
        className="pointer-events-none absolute inset-x-2 top-full z-10 mt-3 translate-y-2 rounded-2xl border border-amber/20 bg-raised/80 px-4 py-3 opacity-0 backdrop-blur-xl transition-all duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        style={{ boxShadow: '0 0 40px rgba(230,177,126,0.14)' }}
      >
        <p className="text-sm text-primary">
          <span className="serif-accent text-[1.05em]">Open to work.</span>{' '}
          <span className="text-secondary">{profile.statusPanel}</span>
        </p>
      </div>
    </div>
  )
}
