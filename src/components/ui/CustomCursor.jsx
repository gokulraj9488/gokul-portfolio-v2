import { useEffect, useRef, useState } from 'react'
import { getDeviceTier } from '../../lib/device.js'

// Liquid pebble cursor — a small, crisp, SOLID ivory object (clear silhouette, no blur) that
// leans/stretches with velocity and relaxes to round at rest. Grows + glows on interactive
// elements and is gently attracted to them. Transform-only on one element, single rAF, no
// re-renders while moving → cheapest possible. Desktop + fine-pointer + tier!=low only.

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor]'

export default function CustomCursor() {
  const blobRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced || getDeviceTier() === 'low') return

    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 }
    const cur = { x: mouse.x, y: mouse.y }
    let scale = 1
    const hoverRef = { current: false }
    const elRef = { current: null }
    const visRef = { current: false }
    let raf

    const loop = () => {
      let tx = mouse.x
      let ty = mouse.y
      const el = elRef.current
      if (el) {
        const r = el.getBoundingClientRect()
        tx = mouse.x + (r.left + r.width / 2 - mouse.x) * 0.3
        ty = mouse.y + (r.top + r.height / 2 - mouse.y) * 0.3
      }

      const dx = tx - cur.x
      const dy = ty - cur.y
      cur.x += dx * 0.28 // responsive follow (less "trail")
      cur.y += dy * 0.28

      const speed = Math.hypot(dx, dy)
      const stretch = Math.min(speed * 0.025, 0.34) // subtle, defined deform
      const angle = Math.atan2(dy, dx)
      scale += ((hoverRef.current ? 1.5 : 1) - scale) * 0.18

      const sx = scale * (1 + stretch)
      const sy = scale * (1 - stretch * 0.5)
      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${sx}, ${sy})`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!visRef.current) {
        visRef.current = true
        setVisible(true)
      }
    }
    const onOver = (e) => {
      const el = e.target.closest?.(INTERACTIVE)
      if (el) {
        elRef.current = el
        hoverRef.current = true
        setHovering(true)
      }
    }
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE) && !e.relatedTarget?.closest?.(INTERACTIVE)) {
        elRef.current = null
        hoverRef.current = false
        setHovering(false)
      }
    }
    const onLeave = () => {
      visRef.current = false
      setVisible(false)
    }
    const onEnter = () => {
      visRef.current = true
      setVisible(true)
    }

    addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-custom-cursor')
      removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.25s ease' }} aria-hidden="true">
      <div
        ref={blobRef}
        className="fixed left-0 top-0 h-3.5 w-3.5 rounded-full will-change-transform"
        style={{
          // Solid ivory pebble with a subtle sheen — crisp edge, no blur filter.
          background: 'radial-gradient(circle at 42% 38%, #FBF7EE, #F1EADC 68%, #E4C9A6 100%)',
          boxShadow: hovering
            ? '0 0 14px 2px rgba(230,177,126,0.32), 0 2px 6px rgba(0,0,0,0.35)'
            : '0 0 9px 1px rgba(230,177,126,0.22), 0 1px 4px rgba(0,0,0,0.3)',
          opacity: hovering ? 0.72 : 0.95,
          transition: 'box-shadow 0.25s ease, opacity 0.25s ease',
        }}
      />
    </div>
  )
}
