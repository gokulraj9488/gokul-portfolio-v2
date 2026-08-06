import { gameOrigin } from '../../data/gameOrigin.js'
import Reveal from '../ui/Reveal.jsx'

// A cinematic pause, not a project section. Deliberately breaks this site's
// own rhythm — no eyebrow, no cards, no tech tags, no numbered list, heavy
// vertical silence between beats. Each beat is its own independent
// scroll-triggered reveal (not a batch fade-in), so it surfaces the way a
// memory would: one at a time, at the visitor's own scroll speed, not on a
// timer. The question this section answers is never stated out loud —
// "why does this engineer think differently" — only its answer is.
export default function GameOrigin() {
  return (
    <section id="origin" className="section border-t border-border-subtle">
      <div className="container-edge">
        <div className="flex flex-col items-center gap-20 py-8 text-center sm:gap-32">
          <Reveal className="max-w-xl">
            <p className="font-display text-[1.7rem] font-semibold leading-snug text-primary sm:text-[2.3rem]">
              {gameOrigin.hook}
            </p>
          </Reveal>

          <Reveal className="max-w-sm">
            <p className="text-base text-secondary sm:text-body-lg">{gameOrigin.bridge}</p>
          </Reveal>

          {gameOrigin.heroImage && (
            <Reveal className="w-full max-w-2xl">
              <img
                src={gameOrigin.heroImage}
                alt={gameOrigin.heroImageAlt}
                width={gameOrigin.heroImageDims?.width}
                height={gameOrigin.heroImageDims?.height}
                className="w-full rounded-2xl border border-border-subtle object-cover"
              />
            </Reveal>
          )}

          <div className="flex flex-col gap-14 sm:gap-16">
            {gameOrigin.glimpses.map((g) => (
              <Reveal key={g.label} className="max-w-sm">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-tertiary">{g.label}</span>
                <p className="mt-2 font-display text-[1.05rem] leading-snug text-primary/90">{g.line}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="max-w-sm">
            <p className="font-display text-[1.35rem] font-medium leading-snug text-primary sm:text-[1.55rem]">
              {gameOrigin.closing[0]}
              <br />
              {gameOrigin.closing[1]}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
