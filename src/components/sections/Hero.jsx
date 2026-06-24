import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { hero, profile } from '../../data/site.js'
import { stagger, maskRise, fadeUp, easePremium } from '../../lib/motion.js'
import PipelineDiagram from '../ui/PipelineDiagram.jsx'
import ProfileCard from '../ui/ProfileCard.jsx'
import MetricStrip from '../ui/MetricStrip.jsx'
import Magnetic from '../ui/Magnetic.jsx'

const heroNodes = [
  { id: 'data', label: 'BigQuery', detail: 'governed, queryable data', layer: 'data' },
  { id: 'pipeline', label: 'Dataflow', detail: 'pipelines that move it', layer: 'data' },
  { id: 'model', label: 'Groq LLM', detail: 'models that reason', layer: 'intelligence' },
  { id: 'product', label: 'React', detail: 'products people use', layer: 'product' },
]

// Editorial headline — capped responsive size + measure forces a clean 3-4 line wrap (not 7 tiny lines).
function Headline() {
  const words = hero.headline.split(' ')
  return (
    <h1 className="max-w-[14ch] font-display text-[clamp(2.15rem,7vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-primary [text-wrap:balance] sm:max-w-[18ch] sm:text-[clamp(2.75rem,6vw,3.75rem)] lg:max-w-[15ch] lg:text-[clamp(3.25rem,4.4vw,4.25rem)]">
      <motion.span variants={stagger(0.05, 0.15)} initial="hidden" animate="show">
        {words.map((w, i) => {
          const isSerif = w.replace(/[^a-zA-Z]/g, '') === hero.headlineSerif
          return (
            <span key={i} className="inline-flex overflow-hidden pb-[0.2em] align-baseline" style={{ marginBottom: '-0.2em' }}>
              <motion.span
  variants={maskRise}
  className={`inline-block mr-[0.2em] ${isSerif ? 'serif-accent pr-[0.06em]' : ''}`}
>
  {w}
  {' '}
</motion.span>
            </span>
          )
        })}
      </motion.span>
    </h1>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yDepart = useTransform(scrollYProgress, [0, 1], [0, -50])
  const fadeDepart = useTransform(scrollYProgress, [0, 0.8], [1, 0.35])

  return (
    <section id="hero" ref={ref} className="relative scroll-mt-24">
      <motion.div
        style={reduce ? undefined : { y: yDepart, opacity: fadeDepart }}
        className="container-edge flex min-h-[100svh] flex-col justify-start pb-20 pt-28 sm:pt-32 md:pt-36 lg:justify-center"
      >
        <div className="grid items-start gap-12 lg:gap-16 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Left: copy */}
          <div className="flex flex-col gap-6 sm:gap-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easePremium }}
              className="eyebrow"
            >
              {hero.eyebrow}
            </motion.span>

            <Headline />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easePremium, delay: 0.5 }}
              className="max-w-md text-body-lg text-secondary sm:max-w-xl"
            >
              {hero.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easePremium, delay: 0.66 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.4}>
                <a
                  href={hero.primaryCta.href}
                  className="group inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3.5 text-sm font-semibold text-ink transition duration-300 ease-premium hover:shadow-glow"
                >
                  {hero.primaryCta.label}
                  <ArrowRight size={16} className="transition-transform duration-300 ease-premium group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl border border-border-subtle px-6 py-3.5 text-sm font-medium text-primary transition duration-300 ease-premium hover:border-amber/30 hover:bg-white/[0.03]"
              >
                {hero.secondaryCta.label}
              </a>
            </motion.div>

            {/* credibility — desktop only (the card already carries 'Currently @ TCS' + chips on mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: easePremium, delay: 0.85 }}
              className="mt-3 hidden flex-col gap-3 border-t border-border-subtle pt-5 lg:flex"
            >
              <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.78rem] text-tertiary">
                {hero.credibility.map((c, i) => (
                  <li key={c} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true" className="text-tertiary/50">·</span>}
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right: ONE composition — identity (card) -> status -> system (pipeline) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: easePremium, delay: 0.4 }}
            className="relative lg:mt-2"
          >
            {/* shared warm light bed (responsive bleed so it never pushes past a 360px viewport) */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 sm:-inset-8"
              style={{ background: 'radial-gradient(58% 56% at 62% 28%, rgba(230,177,126,0.09), transparent 72%)' }}
            />
            <div className="flex flex-col gap-4 sm:gap-5">
              <ProfileCard />

              {/* middle 'status' beat — always visible on touch (desktop uses the card's hover panel) */}
              <div className="flex justify-center lg:hidden">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-raised/60 px-4 py-2 text-sm">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-synapse opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-synapse" />
                  </span>
                  <span className="serif-accent">Open to work.</span>
                  <span className="text-secondary">{profile.availableLabel}</span>
                </span>
              </div>

              {/* connector — warm identity flowing into the cool technical core */}
              <div className="relative mx-auto h-7 w-px" aria-hidden="true">
                <span className="absolute inset-0 bg-gradient-to-b from-amber/60 to-synapse/50" />
                <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-glow-soft" />
              </div>

              <PipelineDiagram
                nodes={heroNodes}
                ariaLabel="My stack as a system: BigQuery to Dataflow to Groq LLM to React — data becomes decisions, decisions become products."
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-16 sm:mt-20"
        >
          <MetricStrip />
        </motion.div>
      </motion.div>
    </section>
  )
}
