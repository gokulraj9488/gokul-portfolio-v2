import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useWorkshop } from '../../lib/workshop.jsx'
import bikeImg from '../../bike.png'

// The Continental GT650 — the scroll indicator. The page is the road: the bike
// rides a forged rail down the right gutter, each section a milestone. It idles
// with a puff of exhaust at the Forge, and the headlight comes on for the last
// stretch to Contact. Click it. (Desktop xl only; reduced-motion gets rail + stars.)

const MILESTONES = [
  { id: 'hero', label: 'ignition' },
  { id: 'work', label: "brok's forge" },
  { id: 'projects', label: 'side quests' },
  { id: 'about', label: 'principles' },
  { id: 'log', label: 'build log' },
  { id: 'experience', label: 'the road' },
  { id: 'contact', label: 'destination' },
]

export default function BikeRail() {
  const reduce = useReducedMotion()
  const ws = useWorkshop()
  const [pts, setPts] = useState(MILESTONES.map((m) => ({ ...m, frac: 1 })))
  const [progress, setProgress] = useState(0)
  const trailRef = useRef(null)
  const riderRef = useRef(null)
  const ptsRef = useRef(pts)
  ptsRef.current = pts

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPts(
        MILESTONES.map((m) => {
          const el = document.getElementById(m.id)
          if (!el || max <= 0) return { ...m, frac: 1 }
          const top = el.getBoundingClientRect().top + window.scrollY
          return { ...m, frac: Math.min(1, Math.max(0, (top - window.innerHeight * 0.4) / max)) }
        }),
      )
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
        setProgress(p)
      })
    }

    measure()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 700) // re-measure after fonts/layout settle
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      clearTimeout(t)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const done = pts.map((pt) => progress >= pt.frac - 0.005)
  // idle at the forge: bike within the #work..#projects stretch
  const workFrac = pts[1]?.frac ?? 0.2
  const nextFrac = pts[2]?.frac ?? 0.4
  const idlingAtForge = progress >= workFrac - 0.02 && progress < nextFrac - 0.02
  const headlightOn = progress > 0.82

  return (
    <aside
      aria-label="Ride progress"
      className="pointer-events-none fixed right-10 top-1/2 z-40 hidden h-[60vh] max-h-[560px] min-h-[380px] -translate-y-1/2 xl:block"
    >
      <div className="relative h-full w-16">
        {/* the rail */}
        <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-border-subtle" aria-hidden="true" />
        {/* ridden distance */}
        <span
          ref={trailRef}
          aria-hidden="true"
          className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2"
          style={{
            height: '0%',
            background: 'linear-gradient(180deg, rgba(226,164,90,0.9), rgba(185,127,58,0.4))',
            boxShadow: '0 0 8px rgba(226,164,90,0.35)',
            transition: reduce ? 'none' : 'height 0.25s cubic-bezier(0.19,1,0.22,1)',
          }}
        />

        {/* milestones */}
        {pts.map((pt, i) => (
          <a
            key={pt.id}
            href={`#${pt.id}`}
            aria-label={`Ride to ${pt.label}${done[i] ? ' (visited)' : ''}`}
            className="group pointer-events-auto absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-1.5"
            style={{ top: `${pt.frac * 100}%` }}
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full border transition-colors duration-300 ${
                done[i] ? 'border-ember bg-ember shadow-glow-ember' : 'border-tertiary/50 bg-ink'
              }`}
            />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-border-subtle bg-raised/95 px-2 py-1 font-mono text-[0.64rem] text-secondary opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {pt.label}
            </span>
          </a>
        ))}

        {/* the rider */}
        <div
          ref={riderRef}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: '0%', transition: reduce ? 'none' : 'top 0.22s cubic-bezier(0.19,1,0.22,1)' }}
        >
          <button
            type="button"
            onClick={() => {
              ws.toast('beep beep.')
              ws.openGarage()
            }}
            aria-label="The Continental GT 650 — open the garage"
            title="my continental gt 650 — open the garage"
            className="pointer-events-auto relative block rounded-md"
          >
            {/* headlight — the last stretch rides lit */}
            {headlightOn && (
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-full h-10 w-8 -translate-x-1/2"
                style={{
                  background: 'linear-gradient(180deg, rgba(240,214,160,0.35), transparent 80%)',
                  clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)',
                }}
              />
            )}
            {/* natural 320×539 — explicit box keeps the aspect-ratio audit green */}
            <img
              src={bikeImg}
              alt=""
              width="52"
              height="88"
              className={`bike-float ${headlightOn ? 'drop-shadow-[0_0_18px_rgba(240,214,160,0.5)]' : 'drop-shadow-[0_0_14px_rgba(226,164,90,0.45)]'}`}
            />
            {/* exhaust at the forge — three puffs, then again */}
            {idlingAtForge && !reduce && (
              <span aria-hidden="true" className="absolute -top-1 left-0">
                <span className="exhaust" style={{ animationDelay: '0s' }} />
                <span className="exhaust" style={{ animationDelay: '0.5s' }} />
                <span className="exhaust" style={{ animationDelay: '1s' }} />
              </span>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}
