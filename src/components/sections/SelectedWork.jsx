import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { kuriosity } from '../../data/kuriosity.js'
import { projects } from '../../data/projects.js'
import { social } from '../../data/site.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import Badge from '../ui/Badge.jsx'
import Card from '../ui/Card.jsx'
import { SignalDot } from '../ui/Draft.jsx'

export default function SelectedWork() {
  return (
    <section id="projects" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader
          eyebrow="Also in production"
          title="Kuriosity — the other side of the loop."
          subhead="Brok's Forge evaluates AI systems; Kuriosity is one — a live RAG product I built and operate end to end. Building both is the point: I understand the platform and the workload it serves."
          size="md"
        />

        {/* Kuriosity — secondary product card */}
        <Reveal className="card mt-10 overflow-hidden shadow-lift">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-raised/50 px-6 py-4">
            <div className="flex items-center gap-3" title="Side Quest">
              <span className="font-display text-base font-semibold text-primary">{kuriosity.name}</span>
              <span className="hidden font-mono text-[0.72rem] text-tertiary sm:inline">{kuriosity.tagline}</span>
            </div>
            <Badge tone="live">
              <SignalDot tone="status" />
              {kuriosity.status}
            </Badge>
          </div>

          <div className="p-6 sm:p-8">
            <p className="max-w-3xl text-sm leading-relaxed text-secondary sm:text-base">{kuriosity.pitch}</p>

            <motion.div
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-6 grid gap-4 sm:grid-cols-2"
            >
              {kuriosity.highlights.map((h) => (
                <motion.div key={h.title} variants={fadeUp} className="rounded-xl border border-border-subtle bg-ink p-5">
                  <h3 className="font-display text-[0.95rem] font-semibold text-primary">{h.title}</h3>
                  <p className="mt-1.5 text-sm text-secondary">{h.body}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-1.5">
                {kuriosity.stack.map((s) => (
                  <li key={s}>
                    <span className="pill">{s}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <a
                  href={kuriosity.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-4 py-2.5 text-sm font-medium text-primary transition duration-200 hover:border-border-strong hover:bg-white/[0.03]"
                >
                  Visit live
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Earlier systems — compact supporting row */}
        <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
          <Reveal className="flex flex-col gap-2">
            <span className="eyebrow">Earlier systems</span>
            <p className="max-w-xl text-sm text-secondary">
              Applied computer vision and systems fundamentals — the range behind the platform work.
            </p>
          </Reveal>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-4 py-2.5 text-sm text-primary transition duration-200 hover:border-border-strong hover:bg-white/[0.03]"
          >
            <Github size={15} />
            All repositories
          </a>
        </div>

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-6 grid gap-4 md:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <Card spotlight className="flex h-full flex-col gap-3 p-6">
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-tertiary">{p.domain}</span>
                <h3 className="font-display text-[1.02rem] font-semibold leading-snug text-primary">{p.title}</h3>
                <p className="text-sm text-secondary">{p.body}</p>
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
