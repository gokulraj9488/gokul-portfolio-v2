import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import { projects } from '../../data/projects.js'
import { social } from '../../data/site.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Card from '../ui/Card.jsx'

function Row({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[0.68rem] uppercase tracking-wider text-tertiary">{label}</span>
      <p className="text-sm text-secondary">{children}</p>
    </div>
  )
}

export default function SelectedProjects() {
  return (
    <section id="projects" className="section border-t border-border-subtle">
      <div className="container-edge">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Selected Projects"
            title="Problem, approach, outcome."
            subhead="Each one maps back to a layer — intelligence that sees, or products that ship."
          />
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border-subtle px-4 py-2.5 text-sm text-primary transition duration-200 hover:border-white/20 hover:bg-white/[0.03]"
          >
            <Github size={16} />
            View GitHub
          </a>
        </div>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <Card spotlight className="flex h-full flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-amber/90">
                    {p.layer} layer
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug text-primary">{p.title}</h3>
                <div className="flex flex-col gap-3">
                  <Row label="Problem">{p.problem}</Row>
                  <Row label="Approach">{p.approach}</Row>
                  <Row label="Outcome">{p.outcome}</Row>
                </div>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {p.stack.map((s) => (
                    <li key={s}>
                      <span className="pill">{s}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
