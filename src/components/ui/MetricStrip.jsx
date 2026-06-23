import { motion } from 'framer-motion'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import { metrics } from '../../data/site.js'

// "By the numbers" credibility strip — true, specific, scannable.
export default function MetricStrip() {
  return (
    <motion.dl
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle md:grid-cols-4"
    >
      {metrics.map((m) => (
        <motion.div key={m.label} variants={fadeUp} className="bg-surface p-5">
          <dd className="font-display text-3xl font-semibold text-primary">{m.value}</dd>
          <dt className="mt-1 text-sm text-secondary">{m.label}</dt>
          <p className="mt-1 font-mono text-[0.72rem] text-tertiary">{m.sub}</p>
        </motion.div>
      ))}
    </motion.dl>
  )
}
