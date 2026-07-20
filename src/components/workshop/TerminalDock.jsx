import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useWorkshop } from '../../lib/workshop.jsx'

// The tiny terminal in the corner — a blinking prompt that occasionally types a
// hint and deletes it. Its whole job is to make people find the real terminal.

const HINTS = ['press /', 'type help', 'sudo hire gokulraj']

export default function TerminalDock() {
  const ws = useWorkshop()
  const reduce = useReducedMotion()
  const [text, setText] = useState('')
  const timers = useRef([])

  useEffect(() => {
    if (reduce) return
    let hintIdx = 0
    const t = (ms, fn) => timers.current.push(setTimeout(fn, ms))

    const cycle = () => {
      const hint = HINTS[hintIdx % HINTS.length]
      hintIdx += 1
      // type
      hint.split('').forEach((_, i) => t(i * 70, () => setText(hint.slice(0, i + 1))))
      const typed = hint.length * 70
      // hold, then delete
      for (let i = hint.length; i >= 0; i--) {
        t(typed + 2200 + (hint.length - i) * 40, () => setText(hint.slice(0, i)))
      }
      // schedule next
      t(typed + 2200 + hint.length * 40 + 11000, cycle)
    }

    t(9000, cycle)
    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [reduce])

  if (ws.paletteOpen || ws.recruiterOpen || ws.devMode) return null

  return (
    <button
      type="button"
      onClick={ws.openPalette}
      aria-label="Open the workshop terminal"
      className="fixed bottom-4 right-4 z-[60] hidden items-center gap-2 rounded-lg border border-border-subtle bg-ink-deep/90 px-3 py-2 font-mono text-[0.72rem] text-tertiary shadow-lift backdrop-blur transition duration-200 hover:border-ember/40 hover:text-secondary md:flex"
    >
      <span className="text-ember" aria-hidden="true">&gt;</span>
      <span className="min-w-[1ch]">{text}</span>
      <span aria-hidden="true" className="term-cursor inline-block h-3.5 w-[7px] bg-secondary/70" />
    </button>
  )
}
