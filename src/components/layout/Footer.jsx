import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Hammer, Bike, SquareTerminal } from 'lucide-react'
import { identity, social, footerQuips } from '../../data/site.js'
import { broksforge } from '../../data/broksforge.js'
import { Link } from '../../lib/router.jsx'
import { useWorkshop } from '../../lib/workshop.jsx'
import Radio from '../workshop/Radio.jsx'

// The footer is not the end of the site — it's the workshop's quiet corner.
// Three benches: the signature, the note pinned above the bench, and the tools
// (radio · console · garage). Every ~18s one soft pulse suggests it's alive —
// and every fourth pulse, rare enough to feel found rather than scheduled,
// whispers one line of workshop activity. Not a dashboard — nothing here is a
// live metric, it's the same ambient personality as the footer quips.

const WORKSHOP_ACTIVITY = ['worker completed', 'benchmark archived', 'queue empty', 'nightly regression passed', 'kernel event appended']

// Small tooltip that appears above a footer item on hover/focus.
function FootTip({ tip, children }) {
  return (
    <span className="group/tip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-subtle bg-raised/95 px-2.5 py-1 font-mono text-[0.64rem] text-secondary opacity-0 shadow-lift backdrop-blur transition-opacity duration-200 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100"
      >
        {tip}
      </span>
    </span>
  )
}

export default function Footer() {
  const ws = useWorkshop()
  const reduce = useReducedMotion()
  // SSR renders quip[0]; the client draws a fresh one after hydration.
  const [quip, setQuip] = useState(footerQuips[0])
  const [pulsing, setPulsing] = useState(false)
  const [activity, setActivity] = useState(null)
  const timers = useRef([])
  const pulseCount = useRef(0)

  useEffect(() => {
    setQuip(footerQuips[Math.floor(Math.random() * footerQuips.length)])
  }, [])

  // The idle pulse cycle: once every ~18s, one quiet ripple across the tools.
  useEffect(() => {
    if (reduce) return
    const interval = setInterval(() => {
      setPulsing(true)
      pulseCount.current += 1
      if (pulseCount.current % 4 === 0) {
        setActivity(WORKSHOP_ACTIVITY[Math.floor(Math.random() * WORKSHOP_ACTIVITY.length)])
      }
      timers.current.push(
        setTimeout(() => {
          setPulsing(false)
          setActivity(null)
        }, 2600),
      )
    }, 18000)
    return () => {
      clearInterval(interval)
      timers.current.forEach(clearTimeout)
    }
  }, [reduce])

  const toolCls =
    'inline-flex items-center gap-1.5 font-mono text-[0.82rem] tracking-[0.02em] text-secondary transition-colors duration-200 hover:text-primary'

  return (
    <footer className="footer-glow relative">
      {/* one ember drifts up from the bench during a pulse */}
      {pulsing && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 overflow-visible">
          <span className="spark footer-ember" style={{ left: '18%', bottom: '90%' }} />
          {activity && (
            <span className="footer-activity absolute inset-x-0 top-0 text-center font-mono text-[0.62rem] tracking-wide text-tertiary/70">
              {activity}
            </span>
          )}
        </span>
      )}

      <div className="container-edge grid items-center gap-7 py-10 md:grid-cols-3 md:py-12">
        {/* the signature */}
        <div className="flex justify-center md:justify-start">
          <FootTip tip="v3.0 — forged jul 2026">
            <span className="cursor-default font-mono text-[0.82rem] tracking-[0.02em] text-secondary">
              © {identity.name}
            </span>
          </FootTip>
        </div>

        {/* the note pinned above the bench */}
        <p className="flex items-center justify-center gap-2 text-center font-mono text-[0.82rem] leading-relaxed tracking-[0.02em] text-secondary">
          <Hammer size={12} className="flex-none text-ember/80" aria-hidden="true" />
          <span className="whitespace-pre-line">{quip}</span>
        </p>

        {/* the tools — desktop */}
        <div className="hidden items-center justify-end gap-6 md:flex">
          <FootTip tip="current soundtrack →">
            <span className={toolCls.replace('hover:text-primary', '')}>
              <Radio pulsing={pulsing} />
            </span>
          </FootTip>
          <FootTip tip="open the workshop console">
            <button type="button" onClick={ws.openPalette} className={toolCls}>
              press
              <kbd
                className={`rounded border border-border-subtle px-1.5 py-0.5 text-[0.68rem] text-secondary ${
                  pulsing ? 'pulse-kbd' : ''
                }`}
              >
                /
              </kbd>
            </button>
          </FootTip>
          <FootTip tip="take the GT650 out">
            <button type="button" onClick={ws.openGarage} className={toolCls}>
              <Bike size={14} className={pulsing ? 'pulse-glow' : ''} aria-hidden="true" />
              garage
            </button>
          </FootTip>
        </div>

        {/* the tools — mobile dock */}
        <div className="grid grid-cols-3 gap-2.5 md:hidden">
          <Radio dock />
          <button
            type="button"
            onClick={ws.openPalette}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border-subtle px-3 py-3.5 text-secondary transition"
          >
            <SquareTerminal size={17} aria-hidden="true" />
            <span className="font-mono text-[0.68rem]">console</span>
          </button>
          <button
            type="button"
            onClick={ws.openGarage}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border-subtle px-3 py-3.5 text-secondary transition"
          >
            <Bike size={17} aria-hidden="true" />
            <span className="font-mono text-[0.68rem]">garage</span>
          </button>
        </div>
      </div>

      {/* quiet second shelf: the places this points to */}
      <div className="border-t border-border-subtle/60">
        <div className="container-edge flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 font-mono text-[0.72rem] text-tertiary md:justify-between">
          <span className="hidden md:inline">the workshop is open source — inspect away</span>
          <span className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/broksforge" className="transition-colors hover:text-secondary">
              Brok&apos;s Forge
            </Link>
            <a href={broksforge.githubUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-secondary">
              GitHub
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-secondary">
              LinkedIn
            </a>
            <a href={`mailto:${identity.email}`} className="transition-colors hover:text-secondary">
              Email
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
