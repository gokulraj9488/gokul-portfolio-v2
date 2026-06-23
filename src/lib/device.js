// Device capability tiers for progressive enhancement.
// high  = full experience (fluid cursor, glass blur, aurora drift, particles, grain, Lenis)
// mid   = lighter (no grain, fewer particles)
// low   = lightweight (no cursor, no backdrop-blur, static aurora, no particles, native scroll)
// Computed once per session — capability doesn't change mid-visit.

let cached = null

export function getDeviceTier() {
  if (cached) return cached
  if (typeof window === 'undefined') return 'high'
  const mm = (q) => typeof window.matchMedia === 'function' && window.matchMedia(q).matches

  const reduced = mm('(prefers-reduced-motion: reduce)')
  const fine = mm('(pointer: fine)')
  const coarse = mm('(pointer: coarse)')
  const cores = navigator.hardwareConcurrency || 8 // assume capable if unknown
  const mem = navigator.deviceMemory // undefined on Safari/Firefox — only used when present
  const saveData = !!(navigator.connection && navigator.connection.saveData)

  let tier
  if (reduced || saveData || (coarse && !fine)) {
    tier = 'low' // touch-only, data-saver, or motion-averse
  } else if (cores <= 4 || (mem !== undefined && mem <= 4)) {
    tier = 'mid'
  } else if (cores >= 8) {
    tier = 'high'
  } else {
    tier = 'mid'
  }
  cached = tier
  return tier
}

// Tag <html> with the tier so CSS can gate effects cheaply (no per-component JS).
export function applyPerfClass() {
  if (typeof document === 'undefined') return
  document.documentElement.classList.add('perf-' + getDeviceTier())
}
