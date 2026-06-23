import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import { certifications } from '../../data/certifications.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'

export default function Certifications() {
  return (
    <section id="certifications" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader eyebrow="Certifications" title="Credentials, quickly." />

        <motion.ul
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((c) => (
            <motion.li
              key={c.name}
              variants={fadeUp}
              className={`flex items-center gap-3 rounded-xl border bg-surface px-4 py-3 ${
                c.featured ? 'border-amber/30' : 'border-border-subtle'
              }`}
            >
              <BadgeCheck
                size={18}
                className={c.featured ? 'flex-none text-amber' : 'flex-none text-tertiary'}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="truncate text-sm text-primary">{c.name}</p>
                <p className="font-mono text-[0.68rem] text-tertiary">{c.issuer}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
