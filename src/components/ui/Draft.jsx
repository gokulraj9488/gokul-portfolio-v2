// Drafting-table details — the small marks that make a surface feel drawn, not generated.
// All decorative pieces are aria-hidden; use sparingly (one or two per view).

// Four corner ticks, like registration marks on a drawing sheet.
export function DraftCorners({ inset = 10, size = 14, className = '' }) {
  const s = `${size}px`
  const off = `${inset}px`
  const corner = 'absolute border-tertiary/40'
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${corner} border-l border-t`} style={{ left: off, top: off, width: s, height: s }} />
      <span className={`${corner} border-r border-t`} style={{ right: off, top: off, width: s, height: s }} />
      <span className={`${corner} border-b border-l`} style={{ left: off, bottom: off, width: s, height: s }} />
      <span className={`${corner} border-b border-r`} style={{ right: off, bottom: off, width: s, height: s }} />
    </div>
  )
}

// A tiny crosshair "+" — scatter two or three across a drawing bed, never more.
export function Crosshair({ x, y, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute font-mono text-[0.7rem] leading-none text-tertiary/40 ${className}`}
      style={{ left: x, top: y }}
    >
      +
    </span>
  )
}

// Handwritten margin note — the human hand in the machine. Keep them short and
// true. A near-imperceptible wobble (--note-rot feeds the paper-wobble
// keyframe in index.css) keeps the paper from ever looking perfectly still.
export function Note({ children, rotate = -2, className = '' }) {
  return (
    <span className={`note note-wobble inline-block ${className}`} style={{ '--note-rot': `${rotate}deg` }}>
      {children}
    </span>
  )
}

// Dimension line: |———— label ————| . Reads like a measurement on a drawing.
export function Measure({ label, className = '' }) {
  return (
    <div aria-hidden="true" className={`flex select-none items-center gap-3 text-tertiary/70 ${className}`}>
      <span className="h-3 w-px bg-current" />
      <span className="h-px flex-1 bg-current opacity-60" />
      <span className="text-center font-mono text-[0.66rem] uppercase leading-snug tracking-[0.14em]">{label}</span>
      <span className="h-px flex-1 bg-current opacity-60" />
      <span className="h-3 w-px bg-current" />
    </div>
  )
}

// Ambient ember sparks drifting up from a hearth. Deterministic (SSR-safe),
// CSS-animated, hidden on low-end devices. Use inside a relative container.
export function Sparks({ count = 5, className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="spark"
          style={{
            left: `${10 + ((i * 19) % 78)}%`,
            bottom: '4%',
            animationDelay: `${i * 1.1}s`,
            animationDuration: `${3.8 + (i % 3) * 0.9}s`,
          }}
        />
      ))}
    </div>
  )
}

// Inked drawing stamp. One per sheet, maximum.
export function Stamp({ children, className = '' }) {
  return (
    <span aria-hidden="true" className={`stamp select-none ${className}`}>
      {children}
    </span>
  )
}

// Vertical ruler ticks down a drawing's edge.
export function Ruler({ className = '' }) {
  return <div aria-hidden="true" className={`ruler-y pointer-events-none w-3 ${className}`} />
}

// Engineering-drawing title block — the strip of boxes in a sheet's corner.
export function TitleBlock({ fields, className = '' }) {
  return (
    <div className={`title-block ${className}`}>
      {fields.map(([k, v]) => (
        <div key={k} className="min-w-0">
          <span className="block text-[0.56rem] text-tertiary">{k}</span>
          <span className="block truncate text-[0.66rem] text-secondary">{v}</span>
        </div>
      ))}
    </div>
  )
}
