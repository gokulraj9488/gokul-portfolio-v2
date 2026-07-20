import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion, animate } from 'framer-motion'

// Counts from 0 to `value` when scrolled into view.
// SSR/hydration-safe: renders the final value in static HTML (crawlers and no-JS
// readers see the truth); the count-up only replays client-side, while the parent
// reveal still has the element visually hidden — so there is no visible flash.
export default function CountUp({ value, prefix = '', suffix = '', decimals = 0, duration = 1.2, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(value)
  const [armed, setArmed] = useState(false)

  // Arm after mount so the server-rendered value never mismatches.
  useEffect(() => {
    if (!reduce) setArmed(true)
  }, [reduce])

  useEffect(() => {
    if (!armed || !inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.19, 1, 0.22, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [armed, inView, value, duration])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  const text = `${prefix}${formatted}${suffix}`
  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  )
}
