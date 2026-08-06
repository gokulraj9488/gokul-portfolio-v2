import { motion } from 'framer-motion'
import { production } from '../../data/broksforge.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Card from '../ui/Card.jsx'

export default function SecurityModel() {
  return (
    <section id="bf-security" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader
          eyebrow="Production security"
          title="Locked down where it actually matters."
          subhead="A platform that holds credentials and calls endpoints outbound has to treat security as infrastructure, not a checklist added at the end."
        />

        <motion.div
          variants={stagger(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {production.security.map((s) => (
            <motion.div key={s.title} variants={fadeUp}>
              <Card spotlight className="h-full p-6">
                <h3 className="font-display text-[1rem] font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{s.body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
