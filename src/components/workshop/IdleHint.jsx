import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorkshop } from '../../lib/workshop.jsx'

// After 20s of stillness, a whisper: "press / to explore the workshop".
// Shows for 3 seconds, once per visit — and never again after the console
// has been opened even once (localStorage flag set by openPalette).

const IDLE_MS = 20000
const SHOW_MS = 3000

export default function IdleHint() {
  const ws = useWorkshop()
  const [visible, setVisible] = useState(false)
  const shownRef = useRef(false)
  const timerRef = useRef(null)

  useEffect(() => {
    let retired = false
    try {
      retired = localStorage.getItem('gq-console-used') === '1'
    } catch {
      /* private mode */
    }
    if (retired || !window.matchMedia('(pointer: fine)').matches) return

    const arm = () => {
      clearTimeout(timerRef.current)
      if (shownRef.current) return
      timerRef.current = setTimeout(() => {
        shownRef.current = true
        setVisible(true)
        setTimeout(() => setVisible(false), SHOW_MS)
      }, IDLE_MS)
    }

    const events = ['mousemove', 'keydown', 'scroll', 'pointerdown']
    events.forEach((e) => window.addEventListener(e, arm, { passive: true }))
    arm()
    return () => {
      clearTimeout(timerRef.current)
      events.forEach((e) => window.removeEventListener(e, arm))
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && !ws.paletteOpen && !ws.recruiterOpen && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none fixed inset-x-0 bottom-16 z-[60] text-center font-mono text-[0.74rem] text-tertiary"
        >
          press <kbd className="rounded border border-border-subtle px-1.5 py-0.5 text-[0.64rem] text-secondary">/</kbd> to explore the workshop
        </motion.p>
      )}
    </AnimatePresence>
  )
}
