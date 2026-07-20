import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useWorkshop } from '../../lib/workshop.jsx'
import { getDeviceTier } from '../../lib/device.js'

// Forge mode's heat: a warm light that follows the cursor, like holding a lamp
// near hot metal. Transform-only on one element, single rAF, no re-renders.

export default function MouseLight() {
  const ws = useWorkshop()
  const reduce = useReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    if (!ws.forgeMode || reduce || getDeviceTier() === 'low') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const pos = { x: innerWidth / 2, y: innerHeight * 0.4 }
    const cur = { ...pos }
    let raf
    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }
    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.08
      cur.y += (pos.y - cur.y) * 0.08
      if (ref.current) ref.current.style.transform = `translate3d(${cur.x - 350}px, ${cur.y - 350}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [ws.forgeMode, reduce])

  if (!ws.forgeMode) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[3] overflow-hidden">
      <div
        ref={ref}
        className="h-[700px] w-[700px] rounded-full will-change-transform"
        style={{ background: 'radial-gradient(closest-side, rgba(226,150,70,0.09), transparent 68%)' }}
      />
    </div>
  )
}
