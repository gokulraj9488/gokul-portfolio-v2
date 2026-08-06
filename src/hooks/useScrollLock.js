import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

// Locks background scroll while `active` is true — Notion/Discord/macOS-sheet
// behavior: the page underneath is frozen solid, and scrolling never leaks
// through to it. Popup content scrolls independently via its own
// `overflow-y-auto` + the `.scroll-contain` class (overscroll-behavior) +
// a `data-lenis-prevent` attribute — without that last one, Lenis's global
// wheel listener (bound to `window`) hijacks the wheel event before the
// browser ever gets to scroll the popup natively, so only dragging the
// scrollbar thumb (which bypasses the wheel pipeline entirely) would work.
//
// `position: fixed` on <body> (not just `overflow: hidden`) is what actually
// stops iOS Safari's rubber-band scroll from reaching the page behind a modal;
// plain overflow-hidden alone lets touch scrolls bleed through on iOS.
//
// Lenis (the smooth-scroll engine) intercepts wheel/touch globally, so it must
// be paused too, or it keeps driving the page scroll even while the body is
// pinned. `useLenis()` resolves the app's root instance from anywhere in the
// tree (a global store fallback), so this works even though overlays render
// outside <ReactLenis>.
//
// Lock is reference-counted so nested/overlapping overlays never fight over
// who restores scroll first.

let lockCount = 0
let savedScrollY = 0

export function useScrollLock(active) {
  const lenis = useLenis()

  useEffect(() => {
    if (!active) return

    lockCount += 1
    lenis?.stop()

    if (lockCount === 1) {
      savedScrollY = window.scrollY
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.position = 'fixed'
      document.body.style.top = `-${savedScrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.width = ''
        document.body.style.paddingRight = ''
        window.scrollTo(0, savedScrollY)
        lenis?.start()
        // Sections use content-visibility:auto — while <body> was position:fixed,
        // document height is briefly just the viewport, so a section can settle
        // to its true (often smaller) height right as the lock releases. One
        // corrective pass once that's happened (same idiom as the anchor-jump
        // re-check in lib/router.jsx's scrollToHash) — but if the document has
        // genuinely gotten shorter than savedScrollY, this intentionally lands
        // at the new bottom rather than chasing a position that no longer exists.
        setTimeout(() => window.scrollTo(0, savedScrollY), 150)
      }
    }
  }, [active, lenis])
}
