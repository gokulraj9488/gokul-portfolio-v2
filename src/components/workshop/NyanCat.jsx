import { useEffect, useState } from 'react'
import { useWorkshop } from '../../lib/workshop.jsx'

// `nyan` — an ASCII cat crosses the viewport once, trailing a rainbow. That's it.
// Pure CSS animation (transform only); unmounts when the run ends.

export default function NyanCat() {
  const ws = useWorkshop()
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (ws.nyanRun === 0) return
    setRunning(true)
    const t = setTimeout(() => setRunning(false), 6500)
    return () => clearTimeout(t)
  }, [ws.nyanRun])

  if (!running) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-[22vh] z-[75] overflow-hidden">
      <div className="nyan-fly flex items-center">
        <span className="font-mono text-[0.72rem] leading-tight">
          <span className="text-[#ff6b9d]">▄▄▄▄▄▄</span>
          <span className="text-[#ffa94d]">▄▄▄▄▄▄</span>
          <span className="text-[#ffe066]">▄▄▄▄▄▄</span>
          <span className="text-[#8ce99a]">▄▄▄▄▄▄</span>
          <span className="text-[#74c0fc]">▄▄▄▄▄▄</span>
          <span className="text-[#b197fc]">▄▄▄▄▄▄</span>
        </span>
        <pre className="ml-1 font-mono text-[0.6rem] leading-[0.75rem] text-primary">{String.raw`
 ,------,
 |  /\_/\
~|_( ^ .^)
  ""  ""`}</pre>
      </div>
    </div>
  )
}
