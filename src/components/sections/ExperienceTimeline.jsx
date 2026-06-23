import { useRef } from 'react'
import { motion, useScroll, useReducedMotion } from 'framer-motion'
import { experience } from '../../data/experience.js'
import { fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'

export default function ExperienceTimeline() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 70%'],
  })

  return (
    <section id="experience" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader
          eyebrow="Experience"
          title="A short, deliberate path."
          subhead="From shipping games and VR end-to-end to building governed cloud analytics at TCS."
        />

        <div ref={ref} className="relative mt-12 pl-8 sm:pl-10">
          {/* dim base rail */}
          <span aria-hidden="true" className="absolute left-[11px] top-2 h-full w-px bg-border-subtle sm:left-[15px]" />
          {/* scroll-drawn fill */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[11px] top-2 h-full w-px origin-top bg-gradient-to-b from-amber via-amber to-signal sm:left-[15px]"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
          />

          <ol className="flex flex-col gap-8">
            {experience.map((job) => (
              <motion.li
                key={`${job.company}-${job.period}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                className="relative"
              >
                {/* node */}
                <span
                  className={`absolute -left-8 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-ink sm:-left-10 ${
                    job.emphasis ? 'border-amber shadow-glow-soft' : 'border-white/25'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${job.emphasis ? 'bg-amber' : 'bg-white/40'}`} />
                </span>

                <div className={`card p-6 ${job.emphasis ? 'ring-1 ring-amber/20' : ''}`}>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg font-semibold text-primary">{job.company}</h3>
                    <span className="font-mono text-[0.74rem] text-tertiary">{job.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-secondary">
                    {job.role}
                    <span className="text-tertiary"> · {job.location}</span>
                    {job.emphasis && (
                      <span className="ml-2 inline-flex items-center rounded-full border border-status/30 bg-status/[0.08] px-2 py-0.5 align-middle font-mono text-[0.66rem] text-status">
                        Current
                      </span>
                    )}
                  </p>
                  {job.points.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-2">
                      {job.points.map((p, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-secondary">
                          <span className="mt-2 h-1 w-1 flex-none rounded-full bg-amber/70" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {job.tags.map((t) => (
                        <li key={t}>
                          <span className="font-mono text-[0.72rem] text-amber/90">{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
