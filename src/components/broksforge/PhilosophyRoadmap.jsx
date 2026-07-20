import { motion } from 'framer-motion'
import { philosophy, timeline, roadmap } from '../../data/broksforge.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function PhilosophyRoadmap() {
  return (
    <section id="bf-philosophy" className="section border-t border-border-subtle">
      <div className="container-edge">
        {/* Philosophy */}
        <SectionHeader
          eyebrow={philosophy.eyebrow}
          title={philosophy.title}
          subhead="Eight rules from the Master Architecture document — each one is enforced in review, not aspirational."
        />
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

        {/* Timeline */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal className="flex flex-col gap-3">
              <span className="eyebrow">{timeline.eyebrow}</span>
              <h3 className="font-display text-h2 font-semibold text-primary">{timeline.title}</h3>
            </Reveal>
            <motion.ol
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="relative mt-8 flex flex-col gap-6 border-l border-border-subtle pl-6"
            >
              {timeline.phases.map((p) => (
                <motion.li key={p.name} variants={fadeUp} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border border-ember/60 bg-ink"
                  />
                  <p className="font-mono text-[0.82rem] font-medium text-primary">{p.name}</p>
                  <p className="mt-1 text-sm text-secondary">{p.detail}</p>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          {/* Roadmap */}
          <div>
            <Reveal className="flex flex-col gap-3">
              <span className="eyebrow">{roadmap.eyebrow}</span>
              <h3 className="font-display text-h2 font-semibold text-primary">{roadmap.title}</h3>
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
            <Reveal delay={0.1} className="mt-5 rounded-xl border border-dashed border-border-strong px-5 py-4">
              <p className="text-[0.82rem] leading-relaxed text-tertiary">{roadmap.honesty}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
