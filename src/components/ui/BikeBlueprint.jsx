// A proper side-profile technical drawing of a café-racer — the GT650, drawn
// like a page from the workshop manual, not a rotated photo. Facing right,
// wheels on the ground, never flipped. Warm ember highlights on the parts
// that would run hot (headlight, exhaust, rims); everything else in cool
// blueprint line. The whole sheet floats a couple of pixels — a machine on a
// lift, not a photograph pinned to a wall.

export default function BikeBlueprint({ className = '' }) {
  return (
    <svg
      viewBox="0 0 300 150"
      className={`bike-float mx-auto w-full max-w-[15rem] text-tertiary ${className}`}
      role="img"
      aria-label="Side-profile technical drawing of a Royal Enfield Continental GT 650"
    >
      <defs>
        <radialGradient id="bike-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(226,164,90,0.4)" />
          <stop offset="100%" stopColor="rgba(226,164,90,0)" />
        </radialGradient>
      </defs>

      {/* ambient warm light behind the machine */}
      <ellipse cx="150" cy="95" rx="130" ry="55" fill="url(#bike-glow)" opacity="0.5" />

      {/* ground line + measurement ticks */}
      <line x1="12" y1="130" x2="288" y2="130" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="2 4" />
      <line x1="70" y1="130" x2="70" y2="136" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="225" y1="130" x2="225" y2="136" stroke="currentColor" strokeOpacity="0.4" />

      {/* registration crosshairs */}
      <g stroke="currentColor" strokeOpacity="0.3" strokeWidth="1">
        <path d="M18 20h6M21 17v6" />
        <path d="M276 108h6M279 105v6" />
      </g>

      {/* exhaust pipe, sweeping back to the muffler */}
      <path
        d="M148 104 C 110 112, 80 112, 52 110"
        fill="none"
        stroke="#e2a45a"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <rect x="36" y="104" width="20" height="10" rx="4" fill="none" stroke="#e2a45a" strokeWidth="1.6" opacity="0.85" />

      {/* rear wheel */}
      <circle cx="70" cy="100" r="29" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="70" cy="100" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line
          key={a}
          x1={70 + 7 * Math.cos((a * Math.PI) / 180)}
          y1={100 + 7 * Math.sin((a * Math.PI) / 180)}
          x2={70 + 27 * Math.cos((a * Math.PI) / 180)}
          y2={100 + 27 * Math.sin((a * Math.PI) / 180)}
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      ))}

      {/* front wheel */}
      <circle cx="225" cy="100" r="29" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="225" cy="100" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line
          key={`f${a}`}
          x1={225 + 7 * Math.cos((a * Math.PI) / 180)}
          y1={100 + 7 * Math.sin((a * Math.PI) / 180)}
          x2={225 + 27 * Math.cos((a * Math.PI) / 180)}
          y2={100 + 27 * Math.sin((a * Math.PI) / 180)}
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      ))}

      {/* frame: swingarm, main tube, downtube, fork */}
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M70 100 L128 88" />
        <path d="M128 88 L152 58 L199 66" />
        <path d="M199 66 L138 94" />
        <path d="M199 60 L225 100" />
      </g>

      {/* engine block */}
      <rect x="118" y="80" width="46" height="26" rx="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1="118" y1="93" x2="164" y2="93" stroke="currentColor" strokeOpacity="0.4" />

      {/* fuel tank + seat */}
      <path d="M150 46 C 165 40, 184 42, 190 52 C 184 60, 165 60, 150 58 Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M188 52 C 200 50, 214 52, 218 58 L 214 62 C 202 62, 192 60, 188 56 Z" fill="none" stroke="currentColor" strokeWidth="1.8" />

      {/* clip-on handlebar + headlight */}
      <path d="M199 60 L 210 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="211" cy="70" r="7" fill="none" stroke="#e2a45a" strokeWidth="1.8" />
      <circle cx="211" cy="70" r="2.5" fill="#e2a45a" opacity="0.7" />

      {/* foot peg */}
      <line x1="140" y1="106" x2="152" y2="112" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
