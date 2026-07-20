import { motion } from 'framer-motion'
import { security } from '../../data/broksforge.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Card from '../ui/Card.jsx'

export default function SecurityModel() {
  return (
    <section id="bf-security" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader
          eyebrow={security.eyebrow}
          title={security.title}
          subhead="A platform that stores other teams' credentials and calls their endpoints outbound has to treat security as architecture, not review feedback."
        />

        <motion.div
          variants={stagger(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {security.items.map((s) => (
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
