// Restrained ambient light — a single faint ember glow at the top fold and a
// neutral vignette. Static, cheap, behind everything. No drift, no grain.
export default function AtmosphereBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Ember key light — top center, barely there */}
      <div
        className="absolute left-1/2 top-[-28%] h-[62vw] w-[86vw] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(closest-side, rgba(226,164,90,0.07), transparent 70%)' }}
      />
      {/* Forge mode — an extra layer of heat, off until someone finds the hammer */}
      <div
        className="forge-ext absolute left-1/2 top-[-20%] h-[70vw] w-[95vw] -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(closest-side, rgba(226,140,60,0.13), transparent 72%)' }}
      />
      {/* Neutral cool fill — keeps the lower page from going flat */}
      <div
        className="absolute -left-[18%] top-[52%] h-[48vw] w-[48vw] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.025), transparent 68%)' }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 28%, transparent 48%, rgba(0,0,0,0.5) 100%)' }}
      />
    </div>
  )
}
