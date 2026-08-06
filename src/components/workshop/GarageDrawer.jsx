import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Music2, ExternalLink } from 'lucide-react'
import { useWorkshop } from '../../lib/workshop.jsx'
import { useScrollLock } from '../../hooks/useScrollLock.js'
import { Note, TitleBlock, Sparks, SignalDot } from '../ui/Draft.jsx'
import bikeImg from '../../bike.png'

// The Garage — the GT650's corner of the workshop. Not decoration: part of the
// story. Opens from the bike on the rail, the footer, or `ride`/`garage`/`bike`
// in the terminal.

const SOUNDTRACK = [
  { title: 'Flashing Lights', q: 'Flashing Lights Kanye West' },
  { title: 'No Church in the Wild', q: 'No Church in the Wild' },
  { title: 'House of Balloons', q: 'House of Balloons The Weeknd' },
]

export default function GarageDrawer() {
  const ws = useWorkshop()
  const reduce = useReducedMotion()
  const closeRef = useRef(null)
  useScrollLock(ws.garageOpen)

  useEffect(() => {
    if (!ws.garageOpen) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && ws.closeGarage()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws.garageOpen])

  return (
    <AnimatePresence>
      {ws.garageOpen && (
        <div className="fixed inset-0 z-[85]">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Close the garage"
            onClick={ws.closeGarage}
            className="absolute inset-0 cursor-default bg-ink/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={reduce ? false : { x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduce ? undefined : { x: 40, opacity: 0 }}
            transition={reduce ? { duration: 0.01 } : { type: 'spring', stiffness: 340, damping: 32, mass: 0.9 }}
            role="dialog"
            aria-modal="true"
            aria-label="The garage — Royal Enfield Continental GT 650"
            data-lenis-prevent
            className="scroll-contain absolute right-0 top-0 flex h-full w-[24rem] max-w-[92vw] flex-col overflow-y-auto border-l border-border-subtle bg-surface shadow-float"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-border-subtle bg-raised/50 px-5 py-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-tertiary">
                workshop:// <span className="text-ember">garage</span>
              </p>
              <button
                ref={closeRef}
                onClick={ws.closeGarage}
                aria-label="Close the garage"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-secondary transition hover:border-border-strong hover:text-primary"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex flex-col gap-6 p-5">
              {/* the machine — the actual bike, the same photo as the rail
                  outside. Not rotated, not cropped: presented whole, the way
                  it'd sit parked in a workshop corner. */}
              <div className="blueprint-flicker grid-bed relative overflow-hidden rounded-xl border border-border-subtle bg-ink-deep/60 px-4 pb-5 pt-6 text-center">
                {/* forge glow, low in the frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-28 w-40 animate-forge-breathe rounded-full blur-2xl"
                  style={{ background: 'radial-gradient(closest-side, rgba(226,164,90,0.32), transparent 75%)' }}
                />
                <Sparks count={3} />
                <div className="relative mx-auto w-fit">
                  {/* grounded contact shadow, sits at the wheels */}
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-1 mx-auto h-3 w-28 rounded-full bg-black/55 blur-md" />
                  <img
                    src={bikeImg}
                    alt=""
                    width="320"
                    height="539"
                    className="bike-float relative z-10 mx-auto h-[13.5rem] w-auto drop-shadow-[0_0_20px_rgba(240,214,160,0.4)]"
                  />
                </div>
                <p className="relative mt-3 font-display text-[1.02rem] font-semibold text-primary">
                  Royal Enfield Continental GT 650
                </p>
                <p className="relative mt-1 flex items-center justify-center gap-2 font-mono text-[0.7rem] text-status">
                  <SignalDot tone="status" />
                  status: riding to clear compiler errors
                </p>
              </div>

              {/* why it's here */}
              <div className="flex flex-col gap-3">
                <Note rotate={-1.5}>some bugs deserve throttle instead of stack traces.</Note>
                <p className="text-sm leading-relaxed text-secondary">
                  Shipping code is fun. Riding home after shipping is better.
                </p>
              </div>

              {/* garage notes */}
              <div className="rounded-xl border border-border-subtle bg-ink p-4">
                <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-tertiary">garage notes</p>
                <ul className="mt-3 flex flex-col gap-2 font-mono text-[0.76rem] text-secondary">
                  <li>· helmet on. always.</li>
                  <li>· compile. commit. clutch. repeat.</li>
                  <li>· let's grab coffee and disappear on a café racer.</li>
                  <li>· the rail on the right edge? that's this bike.</li>
                </ul>
              </div>

              {/* soundtrack */}
              <div className="rounded-xl border border-border-subtle bg-ink p-4">
                <p className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-tertiary">
                  <Music2 size={11} aria-hidden="true" /> riding soundtrack
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {SOUNDTRACK.map((t) => (
                    <li key={t.title}>
                      <a
                        href={`https://open.spotify.com/search/${encodeURIComponent(t.q)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-2 text-[0.82rem] text-secondary transition hover:text-primary"
                      >
                        {t.title}
                        <ExternalLink size={10} className="text-tertiary opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto">
              <TitleBlock
                fields={[
                  ['machine', 'gt 650'],
                  ['role', 'debugger'],
                  ['fuel', 'coffee-adjacent'],
                ]}
              />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
