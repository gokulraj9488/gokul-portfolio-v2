import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Radio as RadioIcon, ExternalLink } from 'lucide-react'
import { useWorkshop } from '../../lib/workshop.jsx'
import { useScrollLock } from '../../hooks/useScrollLock.js'

// The workbench radio. Click it and it tells you what the workshop sounds like.
// A compact drawer, not a redirect — nothing autoplays, every track opens in
// Spotify on your terms. `dock` renders the big-touch-target mobile variant.

export const TRACKS = [
  { title: 'Flashing Lights', artist: 'Kanye West', q: 'Flashing Lights Kanye West' },
  { title: 'No Church in the Wild', artist: 'JAY-Z · Kanye West', q: 'No Church in the Wild' },
  { title: 'House of Balloons', artist: 'The Weeknd', q: 'House of Balloons The Weeknd' },
  { title: 'Resonance', artist: 'HOME', q: 'Resonance HOME' },
]

export default function Radio({ dock = false, pulsing = false }) {
  const ws = useWorkshop()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = () =>
    setOpen((v) => {
      if (!v) ws.unlock('radio')
      return !v
    })

  return (
    <span ref={rootRef} className={dock ? 'relative flex' : 'relative inline-flex'}>
      {dock ? (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-label="Workbench radio — what the workshop sounds like"
          className={`flex w-full flex-col items-center gap-1.5 rounded-xl border px-3 py-3.5 transition ${
            open ? 'border-ember/40 text-ember' : 'border-border-subtle text-secondary'
          }`}
        >
          <RadioIcon size={17} aria-hidden="true" />
          <span className="font-mono text-[0.68rem]">radio</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-label="Workbench radio — what the workshop sounds like"
          className={`inline-flex items-center gap-1.5 transition-colors ${open ? 'text-ember' : 'hover:text-primary'}`}
        >
          <span className={pulsing ? 'pulse-wave inline-flex rounded-full' : 'inline-flex'}>
            <RadioIcon size={13} aria-hidden="true" />
          </span>
          radio
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.97, y: 4 }}
            transition={reduce ? { duration: 0.01 } : { type: 'spring', stiffness: 420, damping: 30, mass: 0.7 }}
            style={{ transformOrigin: 'bottom' }}
            data-lenis-prevent
            className={`scroll-contain absolute bottom-full z-[70] mb-3 max-h-[60vh] w-64 overflow-y-auto rounded-xl border border-border-subtle bg-raised/95 shadow-float backdrop-blur ${
              dock ? 'left-1/2 -translate-x-1/2' : 'right-0'
            }`}
          >
            <div className="border-b border-border-subtle px-3.5 py-2.5">
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-ember">workshop playlist</p>
              <p className="mt-0.5 font-mono text-[0.66rem] text-tertiary">music I build to.</p>
            </div>
            <ul className="flex flex-col p-1.5">
              {TRACKS.map((t, i) => (
                <li key={t.title}>
                  <a
                    href={`https://open.spotify.com/search/${encodeURIComponent(t.q)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left transition hover:bg-white/[0.04]"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      {i === 0 && (
                        <span className="now-bars flex-none" aria-hidden="true">
                          <span /><span /><span />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-[0.8rem] text-primary">{t.title}</span>
                        <span className="block truncate font-mono text-[0.62rem] text-tertiary">{t.artist}</span>
                      </span>
                    </span>
                    <ExternalLink size={11} className="flex-none text-tertiary" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="border-t border-border-subtle px-3.5 py-2 font-mono text-[0.62rem] text-tertiary">
              now playing <span className="text-secondary">on the bench</span> · opens in Spotify →
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
