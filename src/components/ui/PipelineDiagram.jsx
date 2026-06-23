import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { getDeviceTier } from '../../lib/device.js'

const PARTICLES = { high: 2, mid: 1, low: 0 }

// The signature element — the cool technical core against the warm page.
// Glowing teal orbs on curved bezier connectors, with particles flowing along the curves and
// nodes breathing softly. Reused in Hero and Kuriosity with different node labels.
// SVG coords and HTML-overlay percentages share one viewBox, so they always align.

const W = 880
const H = 300
const PAD = 122

function layout(nodes) {
  const n = nodes.length
  return nodes.map((node, i) => {
    const x = n === 1 ? W / 2 : PAD + (i * (W - 2 * PAD)) / (n - 1)
    const y = H / 2 + Math.sin(i * 1.25 + 0.6) * 30
    const focal = node.layer === 'intelligence'
    return { ...node, x, y, focal }
  })
}

function connectorPath(a, b) {
  const dx = b.x - a.x
  return `M ${a.x} ${a.y} C ${a.x + dx * 0.5} ${a.y}, ${b.x - dx * 0.5} ${b.y}, ${b.x} ${b.y}`
}

export default function PipelineDiagram({ nodes, ariaLabel }) {
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()
  const pts = layout(nodes)
  const n = pts.length
  const particleCount = PARTICLES[getDeviceTier()] ?? 1

  return (
    <div className="relative w-full overflow-hidden rounded-3xl p-2">
      {/* cool glow bed — the technical zone */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(58% 68% at 50% 46%, rgba(95,208,190,0.08), transparent 72%)' }}
      />

      {/* ---- Desktop / tablet ---- */}
      <div className="relative hidden md:block">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={ariaLabel}>
          <defs>
            <linearGradient id="pd-conn" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5FD0BE" />
              <stop offset="100%" stopColor="#8FE3D5" />
            </linearGradient>
            <radialGradient id="pd-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(95,208,190,0.5)" />
              <stop offset="100%" stopColor="rgba(95,208,190,0)" />
            </radialGradient>
            <radialGradient id="pd-halo-focus" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(201,245,238,0.7)" />
              <stop offset="55%" stopColor="rgba(95,208,190,0.4)" />
              <stop offset="100%" stopColor="rgba(95,208,190,0)" />
            </radialGradient>
            <radialGradient id="pd-core" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#E6FBF6" />
              <stop offset="45%" stopColor="#5FD0BE" />
              <stop offset="100%" stopColor="#16504A" />
            </radialGradient>
            <filter id="pd-soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.2" />
            </filter>
          </defs>

          {/* connectors */}
          {pts.slice(0, -1).map((a, i) => {
            const b = pts[i + 1]
            const d = connectorPath(a, b)
            const hot = active === i || active === i + 1
            return (
              <g key={`c${i}`}>
                <path d={d} fill="none" stroke="url(#pd-conn)" strokeWidth="6" opacity={hot ? 0.3 : 0.15} filter="url(#pd-soft)" />
                <path d={d} fill="none" stroke="rgba(255,250,240,0.08)" strokeWidth="1.4" />
                <path id={`pd-path-${i}`} d={d} fill="none" stroke="url(#pd-conn)" strokeWidth={hot ? 2 : 1.4} opacity={hot ? 1 : 0.7} />
                {!reduce &&
                  Array.from({ length: particleCount }, (_, k) => (
                    <circle key={k} r="2.6" fill="#CFF6EF" filter="url(#pd-soft)">
                      <animateMotion dur="3.4s" begin={`${i * 0.5 + k * 1.7}s`} repeatCount="indefinite">
                        <mpath xlinkHref={`#pd-path-${i}`} />
                      </animateMotion>
                    </circle>
                  ))}
              </g>
            )
          })}

          {/* nodes */}
          {pts.map((p, i) => {
            const isActive = active === i
            const haloR = p.focal ? 58 : 42
            const coreR = p.focal ? 11 : 8
            return (
              <g key={p.id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={haloR}
                  fill={p.focal ? 'url(#pd-halo-focus)' : 'url(#pd-halo)'}
                  className="animate-breathe"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center', opacity: isActive ? 1 : undefined }}
                />
                <circle cx={p.x} cy={p.y} r={coreR + 4} fill="none" stroke="rgba(95,208,190,0.35)" strokeWidth="1" />
                <circle cx={p.x} cy={p.y} r={coreR} fill="url(#pd-core)" />
                {isActive && <circle cx={p.x} cy={p.y} r={coreR + 9} fill="none" stroke="#5FD0BE" strokeWidth="1" opacity="0.6" />}
              </g>
            )
          })}
        </svg>

        {/* HTML overlay: labels + hover/focus tooltips */}
        <div className="absolute inset-0">
          {pts.map((p, i) => (
            <div key={p.id} className="absolute" style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${p.label}: ${p.detail}`}
                className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
              />
              <span className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap font-mono text-[0.72rem] text-secondary">
                {p.label}
              </span>
              <span
                className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border-subtle bg-raised px-3 py-1.5 text-center font-mono text-[0.68rem] text-secondary transition-all duration-300 ease-premium ${
                  active === i ? '-top-12 opacity-100' : '-top-10 opacity-0'
                }`}
              >
                {p.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Mobile: luminous static stack ---- */}
      <ol className="relative flex flex-col gap-0 p-4 md:hidden">
        {pts.map((p, i) => (
          <li key={p.id} className="relative flex gap-4 pb-6 last:pb-0">
            {i < n - 1 && (
              <span aria-hidden="true" className="absolute left-[13px] top-7 h-full w-px bg-gradient-to-b from-synapse/60 to-synapse/20" />
            )}
            <span className="relative z-10 mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full">
              <span className="absolute inset-0 rounded-full blur-[6px]" style={{ background: 'radial-gradient(circle, rgba(95,208,190,0.5), transparent 70%)' }} />
              <span className="relative h-3 w-3 rounded-full bg-synapse shadow-glow-teal" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-sm text-primary">{p.label}</p>
              <p className="text-sm text-secondary">{p.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
