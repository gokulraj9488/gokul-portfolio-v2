import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { getDeviceTier } from '../../lib/device.js'

// Smooth, responsive scroll (Lenis). Tuned to be buttery but NOT laggy — lerp 0.1, short duration.
// Disabled entirely under prefers-reduced-motion (returns children with native scroll).

function AnchorScroll() {
  const lenis = useLenis()
  useEffect(() => {
    if (!lenis) return
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      // No extra offset — Lenis already honors the section's scroll-margin-top.
      const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0
      lenis.scrollTo(target, {
        duration: 1.1,
        // Sections use content-visibility:auto, so layout can settle just after the
        // scroll ends — converge with a short corrective pass if we landed off.
        onComplete: () => {
          setTimeout(() => {
            if (Math.abs(target.getBoundingClientRect().top - margin) > 4) {
              lenis.scrollTo(target, { duration: 0.3 })
            }
          }, 120)
        },
      })
      history.pushState(null, '', id)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis])
  return null
}

export default function SmoothScroll({ children }) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Native scroll on low-end / reduced-motion — Lenis can feel laggy on weak hardware.
  // (During build-time prerender there is no window; render children as-is.)
  if (typeof window === 'undefined' || prefersReduced || getDeviceTier() === 'low') return children

  return (
    <ReactLenis
      root
      options={{
        // No global `duration` here on purpose: Lenis re-triggers a full eased
        // animation on every wheel tick when `duration` is set, which is what
        // made wheel scroll feel dampened — each notch queued its own 1.1s
        // catch-up. Pure `lerp` follows the input every frame instead, which is
        // what makes trackpad flick-scroll already feel good (many tiny deltas
        // arrive faster than any duration-eased catch-up could resolve). Anchor
        // jumps (AnchorScroll above) still pass their own explicit `duration`.
        lerp: 0.13,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 1.5,
      }}
    >
      <AnchorScroll />
      {children}
    </ReactLenis>
  )
}
