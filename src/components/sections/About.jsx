import { motion } from 'framer-motion'
import { about } from '../../data/site.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Card from '../ui/Card.jsx'
import { Note } from '../ui/Draft.jsx'

export default function About() {
  return (
    <section id="about" className="section border-t border-border-subtle">
      <div className="container-edge">
        <div className="relative">
          <SectionHeader eyebrow={about.eyebrow} title={about.title} subhead={about.intro} />
          <Note rotate={2} className="mt-3 inline-block lg:absolute lg:right-8 lg:top-10 lg:mt-0">
            {about.note}
          </Note>
        </div>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {about.principles.map((p, i) => (
            <motion.div key={p.title} variants={fadeUp}>
              <Card spotlight className="h-full p-6">
                <span className="font-mono text-[0.7rem] text-tertiary">0{i + 1}</span>
                <h3 className="mt-2 font-display text-[1.02rem] font-semibold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{p.body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
