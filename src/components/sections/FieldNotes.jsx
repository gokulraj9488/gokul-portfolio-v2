import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { fieldNotes } from '../../data/fieldNotes.js'
import { stagger, fadeUp, inView, easePremium } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Card from '../ui/Card.jsx'
import { Note } from '../ui/Draft.jsx'

// Four real defects, diagnosed to root cause — the strongest evidence on the
// site, but also the densest reading on the page. Collapsed by default to
// title + the punchline (the lesson); the full Problem → Investigation → Fix
// stays exactly as written, one click away. Nothing here is shortened or
// removed — only deferred, so four titles and four lessons can be scanned in
// seconds instead of reading sixteen paragraphs up front.

function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[0.64rem] uppercase tracking-wider text-tertiary">{label}</span>
      <p className="text-sm leading-relaxed text-secondary">{children}</p>
    </div>
  )
}

function StoryCard({ s }) {
  const [open, setOpen] = useState(false)

  return (
    <Card spotlight className="flex flex-col gap-4 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-primary">{s.title}</h3>
        <span className="flex-none rounded-md border border-ember/25 bg-ember/[0.06] px-2 py-0.5 font-mono text-[0.64rem] text-ember">
          {s.tag}
        </span>
      </div>

      <p className="text-sm text-primary">
        <span className="font-mono text-[0.64rem] uppercase tracking-wider text-ember">Lesson </span>
        {s.lesson}
      </p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1.5 self-start font-mono text-[0.7rem] text-tertiary transition hover:text-ember"
      >
        {open ? 'Show less' : 'How I found it'}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: easePremium }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3.5 border-t border-border-subtle pt-3.5">
              <Row label="Problem">{s.problem}</Row>
              <Row label="Investigation">{s.investigation}</Row>
              <Row label="Fix">{s.fix}</Row>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default function FieldNotes() {
  return (
    <section id="field-notes" className="section border-t border-border-subtle">
      <div className="container-edge">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader eyebrow={fieldNotes.eyebrow} title={fieldNotes.title} subhead={fieldNotes.subhead} size="md" />
          <Note rotate={2} className="mb-1">exit code 0 is not evidence</Note>
        </div>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid gap-4 lg:grid-cols-2"
        >
          {fieldNotes.stories.map((s) => (
            <motion.div key={s.id} variants={fadeUp}>
              <StoryCard s={s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
