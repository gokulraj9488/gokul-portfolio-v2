// The lit room — warm cinematic. Warm amber/copper ambient light dominates; a single cool teal
// glow sits upper-right (the technical zone, where the hero pipeline lives). All CSS, behind content.
// Drift freezes under prefers-reduced-motion (global rule in index.css).

export default function AtmosphereBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Warm amber key light — upper area */}
      <div
        className="absolute -right-[8%] -top-[20%] h-[60vw] w-[60vw] rounded-full blur-[150px] animate-drift-a"
        style={{ background: 'radial-gradient(circle at center, rgba(230,177,126,0.16), transparent 62%)' }}
      />
      {/* Warm copper fill — lower left */}
      <div
        className="absolute -left-[16%] top-[40%] h-[54vw] w-[54vw] rounded-full blur-[160px] animate-drift-b"
        style={{ background: 'radial-gradient(circle at center, rgba(224,144,94,0.13), transparent 62%)' }}
      />
      {/* Cool teal accent — confined to the technical zone (upper right, behind the pipeline) */}
      <div
        className="absolute right-[6%] top-[6%] h-[32vw] w-[32vw] rounded-full blur-[130px] animate-drift-c"
        style={{ background: 'radial-gradient(circle at center, rgba(95,208,190,0.10), transparent 64%)' }}
      />
      {/* Warm depth haze behind the upper fold */}
      <div
        className="absolute inset-x-0 top-[8%] h-[40vh]"
        style={{ background: 'radial-gradient(60% 100% at 50% 0%, rgba(230,177,126,0.05), transparent 70%)' }}
      />
      {/* Vignette — warm-leaning, focuses the center */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(118% 92% at 50% 32%, transparent 44%, rgba(8,6,5,0.62) 100%)' }}
      />
      {/* Film grain */}
      <div className="grain absolute inset-0" />
    </div>
  )
}
