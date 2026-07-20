import { useEffect, useState } from 'react'
import { useWorkshop } from '../../lib/workshop.jsx'

// Developer mode — the game-console debug view. A blueprint grid, container
// guides, live FPS, and (via .dev-mode CSS) section outlines with their ids.
function Fps() {
  const [fps, setFps] = useState(0)
  useEffect(() => {
    let frames = 0
    let last = performance.now()
    let raf
    const loop = (now) => {
      frames += 1
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)))
        frames = 0
        last = now
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <span className="tabular-nums">
      {fps} <span className="text-tertiary">fps</span>
    </span>
  )
}

export default function DevOverlay() {
  const ws = useWorkshop()
  if (!ws.devMode) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      {/* blueprint grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(226,164,90,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(226,164,90,0.05) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }}
      />
      {/* container guides */}
      <div className="container-edge h-full">
        <div className="h-full border-x border-dashed border-ember/25" />
      </div>
      {/* center line */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-ember/20" />

      {/* HUD */}
      <div className="pointer-events-auto absolute bottom-4 left-4 flex items-center gap-3 rounded-lg border border-ember/30 bg-ink/90 px-3 py-2 font-mono text-[0.7rem] text-primary backdrop-blur">
        <Fps />
        <span className="text-tertiary">·</span>
        <span className="text-tertiary">grid 8px</span>
        <span className="text-tertiary">·</span>
        <span className="text-tertiary">container 1120px</span>
      </div>
      <div className="absolute bottom-4 right-4 rounded-lg border border-ember/30 bg-ink/90 px-3 py-2 font-mono text-[0.66rem] text-tertiary backdrop-blur">
        dev.mode — konami again to exit
      </div>
    </div>
  )
}
