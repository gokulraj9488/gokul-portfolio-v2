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
          title="The work behind the workshop."
          subhead="Governed cloud data platforms by day; open-source AI infrastructure the rest of the time. Both are production systems with real users."
        />

        <div ref={ref} className="relative mt-12 pl-8 sm:pl-10">
          {/* dim base rail */}
          <span aria-hidden="true" className="absolute left-[11px] top-2 h-full w-px bg-border-subtle sm:left-[15px]" />
          {/* scroll-drawn fill */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[11px] top-2 h-full w-px origin-top bg-gradient-to-b from-ember/80 to-ember/30 sm:left-[15px]"
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
                    job.emphasis ? 'border-ember' : 'border-white/20'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${job.emphasis ? 'bg-ember' : 'bg-white/35'}`} />
                </span>

                <div className={`card p-6 ${job.emphasis ? 'ring-1 ring-ember/15' : ''}`}>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg font-semibold text-primary">{job.company}</h3>
                    <span className="font-mono text-[0.72rem] text-tertiary">{job.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-secondary">
                    {job.role}
                    <span className="text-tertiary"> · {job.location}</span>
                    {job.emphasis && (
                      <span className="ml-2 inline-flex items-center rounded-full border border-status/30 bg-status/[0.07] px-2 py-0.5 align-middle font-mono text-[0.64rem] text-status">
                        Current
                      </span>
                    )}
                  </p>
                  {job.points.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-2">
                      {job.points.map((p, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-secondary">
                          <span className="mt-2 h-1 w-1 flex-none rounded-full bg-ember/70" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {job.tags.map((t) => (
                        <li key={t}>
                          <span className="font-mono text-[0.7rem] text-tertiary">{t}</span>
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
