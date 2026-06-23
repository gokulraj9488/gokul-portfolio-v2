import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { journey } from '../../data/site.js'
import bikeImg from '../../bike.png'

// The Continental GT "journey" — a vertical scroll-progress rail on the right gutter.
// A line-art café-racer rides down the road as you scroll; section checkpoints ignite into
// completed stars as they're reached, and each star is a smooth-scroll nav link.
// Desktop (xl) only — there's no gutter room below it. Reduced-motion: rider hidden, rail + stars stay.

function Sparkle({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 1.5 L13.8 9.6 L22 12 L13.8 14.4 L12 22.5 L10.2 14.4 L2 12 L10.2 9.6 Z"
        fill={filled ? '#E6B17E' : 'none'}
        stroke={filled ? '#E6B17E' : 'rgba(179,169,152,0.5)'}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function JourneyRail() {
  const reduce = useReducedMotion()
  const [pts, setPts] = useState(journey.map((j) => ({ ...j, frac: 1 })))
  const [done, setDone] = useState(journey.map(() => false))
  const trailRef = useRef(null)
  const riderRef = useRef(null)
  const ptsRef = useRef(pts)
  ptsRef.current = pts

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const next = journey.map((j) => {
        const el = document.getElementById(j.id)
        if (!el || max <= 0) return { ...j, frac: 1 }
        const top = el.getBoundingClientRect().top + window.scrollY
        const frac = Math.min(1, Math.max(0, (top - window.innerHeight * 0.4) / max))
        return { ...j, frac }
      })
      setPts(next)
    }

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
        if (trailRef.current) trailRef.current.style.height = `${p * 100}%`
        if (riderRef.current) riderRef.current.style.top = `${p * 100}%`
        setDone((prev) => {
          const next = ptsRef.current.map((pt) => p >= pt.frac - 0.005)
          return next.some((v, i) => v !== prev[i]) ? next : prev
        })
      })
    }

    measure()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 600) // re-measure after fonts/layout settle
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      clearTimeout(t)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <aside
      aria-label="Section progress"
      className="pointer-events-none fixed right-20 top-1/2 z-40 hidden h-[58vh] max-h-[560px] min-h-[380px] -translate-y-1/2 md:block"
    >
      <div className="relative h-full w-12">
        {/* the road */}
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border-subtle" aria-hidden="true" />
        {/* warm light trail (filled distance) */}
        <span
          ref={trailRef}
          aria-hidden="true"
          className="absolute left-1/2 top-0 w-px -translate-x-1/2"
          style={{
            height: '0%',
            background: 'linear-gradient(180deg, rgba(230,177,126,0.9), rgba(224,144,94,0.5))',
            boxShadow: '0 0 10px rgba(230,177,126,0.4)',
            transition: reduce ? 'none' : 'height 0.25s cubic-bezier(0.19,1,0.22,1)',
          }}
        />

        {/* checkpoints — clickable star nav */}
        {pts.map((pt, i) => (
          <a
            key={pt.id}
            href={`#${pt.id}`}
            aria-label={`Go to ${pt.label}${done[i] ? ' (visited)' : ''}`}
            className="group pointer-events-auto absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ top: `${pt.frac * 100}%` }}
          >
            <span
              className="grid place-items-center rounded-full p-1 transition-transform duration-300 ease-premium group-hover:scale-125"
              style={{ filter: done[i] ? 'drop-shadow(0 0 6px rgba(230,177,126,0.6))' : 'none' }}
            >
              <Sparkle filled={done[i]} />
            </span>
            <span className="absolute right-full mr-3 whitespace-nowrap rounded-md border border-border-subtle bg-raised/90 px-2 py-1 font-mono text-[0.66rem] text-secondary opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {pt.label}
            </span>
          </a>
        ))}

        {/* the rider */}
        <span
          ref={riderRef}
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: '0%', transition: reduce ? 'none' : 'top 0.22s cubic-bezier(0.19,1,0.22,1)' }}
        >
          <img src={bikeImg} alt="" className="w-48 drop-shadow-[0_0_28px_rgba(230,177,126,0.55)]" />
        </span>
      </div>
    </aside>
  )
}
