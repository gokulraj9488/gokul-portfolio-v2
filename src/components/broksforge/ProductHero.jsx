import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { broksforge } from '../../data/broksforge.js'
import { easePremium, stagger, fadeUp } from '../../lib/motion.js'
import Badge from '../ui/Badge.jsx'
import Magnetic from '../ui/Magnetic.jsx'
import CountUp from '../ui/CountUp.jsx'
import { Crosshair, Note, Stamp, Ruler, Sparks, SignalDot } from '../ui/Draft.jsx'

// The flagship's front door. Wordmark, claim, proof, CTAs — and the maker's hand.
export default function ProductHero() {
  return (
    <section className="relative scroll-mt-24 border-b border-border-subtle">
      <div className="grid-bed absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_38%,black,transparent)]" aria-hidden="true" />
      <Crosshair x="12%" y="24%" />
      <Crosshair x="87%" y="58%" />
      <Ruler className="absolute bottom-24 left-4 top-32 hidden opacity-50 lg:block" />
      <Sparks count={4} />
      <Stamp className="absolute right-6 top-28 hidden lg:inline-block xl:right-16">
        approved for production
      </Stamp>
      <div className="container-edge relative flex min-h-[80svh] flex-col items-center justify-center pb-20 pt-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easePremium }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <Badge tone="live">
            <SignalDot tone="status" />
            {broksforge.status}
          </Badge>
          <Badge>{broksforge.version}</Badge>
          <Badge>Open source · {broksforge.license}</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easePremium, delay: 0.08 }}
          className="mt-7 font-display text-display font-semibold text-primary [text-wrap:balance]"
        >
          Brok&apos;s Forge
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easePremium, delay: 0.15 }}
          className="mt-4 max-w-2xl font-display text-h2 font-medium text-secondary [text-wrap:balance]"
        >
          {broksforge.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easePremium, delay: 0.22 }}
          className="mt-5 max-w-2xl text-body-lg text-secondary"
        >
          {broksforge.oneLiner}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easePremium, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <a
              href={broksforge.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-ink transition duration-200 hover:bg-white"
            >
              Open the live platform
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <a
            href={broksforge.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-6 py-3.5 text-sm font-medium text-primary transition duration-200 hover:border-border-strong hover:bg-white/[0.03]"
          >
            <Github size={15} />
            Source & architecture docs
          </a>
        </motion.div>

        {/* verified numbers */}
        <motion.ul
          variants={stagger(0.05, 0.35)}
          initial="hidden"
          animate="show"
          className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-3 lg:grid-cols-6"
        >
          {broksforge.stats.map((s) => (
            <motion.li key={s.label} variants={fadeUp} className="bg-ink px-3 py-4">
              <span className="block font-display text-xl font-semibold text-primary">
                <CountUp value={s.value} prefix={s.prefix ?? ''} />
              </span>
              <span className="mt-1 block text-[0.72rem] leading-snug text-tertiary">{s.label}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: easePremium, delay: 0.55 }}
        >
          <Note rotate={-1.5} className="mt-6">
            built by one engineer — documented like a team did it
          </Note>
        </motion.div>
      </div>
    </section>
  )
}
