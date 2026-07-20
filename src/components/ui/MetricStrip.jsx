import { motion } from 'framer-motion'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import { metrics } from '../../data/site.js'
import CountUp from './CountUp.jsx'

// "By the numbers" credibility strip — counted, specific, scannable. Values count up on reveal.
export default function MetricStrip() {
  return (
    <motion.ul
      variants={stagger(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle md:grid-cols-4"
    >
      {metrics.map((m) => (
        <motion.li key={m.label} variants={fadeUp} className="bg-surface p-5">
          <span className="block font-display text-3xl font-semibold text-primary">
            <CountUp value={m.value} />
          </span>
          <span className="mt-1 block text-sm text-secondary">{m.label}</span>
          <span className="mt-1 block font-mono text-[0.7rem] text-tertiary">{m.sub}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
