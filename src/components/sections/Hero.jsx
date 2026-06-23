import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { hero } from '../../data/site.js'
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

function Headline() {
  const words = hero.headline.split(' ')
  return (
    <h1 className="text-display font-semibold leading-[1.04] text-primary">
      <motion.span variants={stagger(0.05, 0.15)} initial="hidden" animate="show">
        {words.map((w, i) => {
          const isSerif = w.replace(/[^a-zA-Z]/g, '') === hero.headlineSerif
          return (
            <span key={i} className="inline-flex overflow-hidden pb-[0.2em] align-baseline" style={{ marginBottom: '-0.2em' }}>
              <motion.span variants={maskRise} className={`inline-block ${isSerif ? 'serif-accent pr-[0.06em]' : ''}`}>
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
        className="container-edge flex min-h-[100svh] flex-col justify-center pb-20 pt-32 md:pt-36"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <div className="flex flex-col gap-7">
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
              className="max-w-xl text-body-lg text-secondary"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: easePremium, delay: 0.85 }}
              className="mt-3 flex flex-col gap-3 border-t border-border-subtle pt-5"
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

          {/* Right: one composition — identity (who) flowing into the system (what) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: easePremium, delay: 0.4 }}
            className="relative"
          >
            {/* shared warm light bed */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10"
              style={{ background: 'radial-gradient(58% 56% at 62% 28%, rgba(230,177,126,0.09), transparent 72%)' }}
            />
            <div className="flex flex-col gap-5">
              <ProfileCard />
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
          className="mt-20"
        >
          <MetricStrip />
        </motion.div>
      </motion.div>
    </section>
  )
}
