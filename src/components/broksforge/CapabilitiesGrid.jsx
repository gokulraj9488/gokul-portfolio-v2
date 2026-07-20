import { motion } from 'framer-motion'
import { capabilities } from '../../data/broksforge.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Card from '../ui/Card.jsx'

export default function CapabilitiesGrid() {
  return (
    <section id="bf-capabilities" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader
          eyebrow="Core modules"
          title="Everything after the agent is built."
          subhead="Nine product capabilities over 22 backend modules — the full engineering loop from registration to advice."
        />

        <motion.div
          variants={stagger(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((c, i) => (
            <motion.div key={c.title} variants={fadeUp}>
              <Card spotlight className="h-full p-6">
                <span className="font-mono text-[0.7rem] text-tertiary">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-[1.02rem] font-semibold text-primary">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{c.body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
