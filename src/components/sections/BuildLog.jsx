import { motion } from 'framer-motion'
import { buildLog } from '../../data/site.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import { Note } from '../ui/Draft.jsx'

// The workshop journal — real ships with real dates. Nothing here is decorative:
// every entry is verifiable in the repos.
export default function BuildLog() {
  return (
    <section id="log" className="section border-t border-border-subtle">
      <div className="container-edge">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeader eyebrow={buildLog.eyebrow} title={buildLog.title} size="md" />
            {/* on the bench */}
            <div className="card relative overflow-hidden p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 animate-forge-breathe rounded-full blur-2xl"
                style={{ background: 'radial-gradient(closest-side, rgba(226,164,90,0.16), transparent 70%)' }}
              />
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ember">On the bench now</p>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{buildLog.now}</p>
            </div>
            <Note className="self-start">{buildLog.note}</Note>
          </div>

          <motion.ol
            variants={stagger(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="relative flex flex-col gap-6 border-l border-border-subtle pl-6"
          >
            {buildLog.entries.map((e, i) => (
              <motion.li key={i} variants={fadeUp} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border border-ember/60 bg-ink"
                />
                <p className="font-mono text-[0.7rem] uppercase tracking-wider text-tertiary">{e.date}</p>
                <p className="mt-1 text-sm leading-relaxed text-secondary">{e.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
