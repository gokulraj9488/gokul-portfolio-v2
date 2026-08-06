import { motion } from 'framer-motion'
import { philosophy, roadmap } from '../../data/broksforge.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function PhilosophyRoadmap() {
  return (
    <section id="bf-philosophy" className="section border-t border-border-subtle">
      <div className="container-edge">
        {/* Design constitution */}
        <SectionHeader eyebrow={philosophy.eyebrow} title={philosophy.title} subhead={philosophy.subhead} />
        <motion.ol
          variants={stagger(0.03)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2"
        >
          {philosophy.principles.map((p, i) => (
            <motion.li key={p.title} variants={fadeUp} className="bg-surface p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.7rem] text-ember">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[0.98rem] font-semibold text-primary">{p.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{p.body}</p>
            </motion.li>
          ))}
        </motion.ol>

        {/* Roadmap — reserved-but-unbuilt, plus honest follow-ups */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal className="flex flex-col gap-3">
              <span className="eyebrow">{roadmap.eyebrow}</span>
              <h3 className="font-display text-h2 font-semibold text-primary">{roadmap.title}</h3>
              <p className="text-sm text-secondary">{roadmap.subhead}</p>
            </Reveal>
            <motion.ul
              variants={stagger(0.04)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-8 flex flex-col gap-3"
            >
              {roadmap.items.map((r) => (
                <motion.li key={r.title} variants={fadeUp} className="rounded-xl border border-border-subtle bg-surface px-5 py-4">
                  <p className="text-sm font-medium text-primary">{r.title}</p>
                  <p className="mt-1 text-sm text-secondary">{r.body}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div>
            <Reveal className="flex flex-col gap-3">
              <span className="eyebrow">Honest gaps</span>
              <h3 className="font-display text-h2 font-semibold text-primary">{roadmap.honesty.title}</h3>
              <p className="text-sm text-secondary">Admitted, not discovered by someone else first.</p>
            </Reveal>
            <motion.ul
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-8 flex flex-col gap-3"
            >
              {roadmap.honesty.items.map((item) => (
                <motion.li
                  key={item.slice(0, 24)}
                  variants={fadeUp}
                  className="rounded-xl border border-dashed border-border-strong px-5 py-4 text-sm leading-relaxed text-tertiary"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
