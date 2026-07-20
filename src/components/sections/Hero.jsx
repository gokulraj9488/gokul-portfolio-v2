import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'
import { hero, bench } from '../../data/site.js'
import { easePremium } from '../../lib/motion.js'
import { Link } from '../../lib/router.jsx'
import Magnetic from '../ui/Magnetic.jsx'
import Tilt from '../ui/Tilt.jsx'
import CountUp from '../ui/CountUp.jsx'
import MetricStrip from '../ui/MetricStrip.jsx'
import { DraftCorners, Crosshair, Note, Measure, TitleBlock, Sparks } from '../ui/Draft.jsx'

// Dashed connector between bench nodes — data flowing along the loop.
function FlowJoint() {
  return (
    <svg aria-hidden="true" width="22" height="8" className="mx-1 flex-none text-ember/70">
      <line x1="0" y1="4" x2="22" y2="4" stroke="currentColor" strokeWidth="1.4" className="flow-line animate-flow" />
    </svg>
  )
}

// The workbench: one sheet from the drafting table — the loop the flagship owns.
function BenchSheet() {
  return (
    <Tilt max={3}>
      <div className="card grid-bed relative overflow-hidden shadow-float">
        <DraftCorners />
        <Crosshair x="38%" y="14%" />
        <Crosshair x="82%" y="62%" />

        <div className="relative p-5 sm:p-6">
          {/* sheet header */}
          <div className="flex items-start justify-between gap-3">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-tertiary">{bench.sheetLabel}</p>
            <Note rotate={2} className="-mt-1 text-right">
              {bench.note}
            </Note>
          </div>

          {/* the loop */}
          <div className="mt-6 flex flex-wrap items-center gap-y-2.5">
            {bench.nodes.map((n, i) => (
              <span key={n} className="flex items-center">
                <span className="rounded-md border border-border-subtle bg-ink px-3 py-1.5 font-mono text-[0.76rem] text-primary">
                  {n}
                </span>
                {i < bench.nodes.length - 1 && <FlowJoint />}
              </span>
            ))}
          </div>

          {/* run shape — counts up when seen */}
          <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle">
            {bench.metrics.map((m) => (
              <div key={m.label} className="bg-ink-deep/60 px-3 py-3">
                <p className="font-display text-lg font-semibold text-primary">
                  <CountUp value={m.value} decimals={m.decimals} suffix={m.suffix} />
                </p>
                <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-tertiary">{m.label}</p>
              </div>
            ))}
          </div>

          {/* on the bench right now */}
          <p className="mt-5 flex items-center gap-2 font-mono text-[0.72rem] text-secondary">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
            </span>
            now building: {hero.now}
          </p>
        </div>

        <TitleBlock fields={bench.titleBlock} />
      </div>
    </Tilt>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <section id="hero" ref={ref} className="relative scroll-mt-24">
      {/* forge glow — drifts slightly as you leave the fold */}
      <motion.div
        aria-hidden="true"
        // x lives inside the motion style — framer owns the whole transform, so a
        // Tailwind translate class would be silently overwritten (and overflow the page).
        style={reduce ? { x: '-50%' } : { y: glowY, x: '-50%' }}
        className="pointer-events-none absolute left-1/2 top-[-18%] -z-10 h-[46vw] w-[70vw] rounded-full blur-[130px]"
      >
        <div className="h-full w-full animate-forge-breathe rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(226,164,90,0.1), transparent 70%)' }} />
      </motion.div>

      <Sparks count={4} className="[mask-image:linear-gradient(to_top,black,transparent_60%)]" />

      <div className="container-edge flex min-h-[92svh] flex-col justify-center pb-16 pt-32 sm:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left: the claim — renders instantly, no entrance animation on the words that matter */}
          <div className="flex flex-col gap-6">
            <span className="eyebrow">{hero.eyebrow}</span>

            <div>
              <h1 className="max-w-[19ch] font-display text-display font-semibold text-primary [text-wrap:balance]">
                {hero.headline}
              </h1>
              <Note className="ml-1 mt-3 whitespace-pre-line">{hero.headlineNote}</Note>
            </div>

            <p className="max-w-xl text-body-lg text-secondary">{hero.subhead}</p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easePremium, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Link
                  to={hero.primaryCta.href}
                  className="btn-sparks group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-ink transition duration-200 hover:bg-white"
                >
                  <span className="sp" aria-hidden="true" />
                  <span className="sp" aria-hidden="true" />
                  <span className="sp" aria-hidden="true" />
                  {hero.primaryCta.label}
                  <ArrowRight size={15} className="transition-transform duration-200 ease-premium group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
              <a
                href={hero.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-6 py-3.5 text-sm font-medium text-primary transition duration-200 hover:border-border-strong hover:bg-white/[0.03]"
              >
                <Github size={15} />
                {hero.secondaryCta.label}
              </a>
              {/* a mechanic's note pinned near the tools — the terminal lives here too */}
              <Note rotate={-3} className="text-[0.78rem]">
                psst… press /
              </Note>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, ease: easePremium, delay: 0.3 }}
              className="mt-2 flex flex-col gap-4 border-t border-border-subtle pt-5"
            >
              <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.74rem] text-tertiary">
                {hero.credibility.map((c, i) => (
                  <li key={c} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true" className="text-tertiary/50">·</span>}
                    {c}
                  </li>
                ))}
              </ul>
              <Measure label={hero.measure} className="max-w-sm" />
            </motion.div>
          </div>

          {/* Right: the workbench */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easePremium, delay: 0.1 }}
          >
            <BenchSheet />
            <p className="mt-3 text-center font-mono text-[0.68rem] text-tertiary">{bench.caption}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: easePremium }}
          className="mt-16 sm:mt-20"
        >
          <MetricStrip />
        </motion.div>
      </div>
    </section>
  )
}
