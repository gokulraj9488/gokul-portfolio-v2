import { motion } from 'framer-motion'
import { Database, BrainCircuit, Layers } from 'lucide-react'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'

// The thesis — now positioned AFTER Kuriosity, so each layer points at proof already shown.
const layers = [
  {
    icon: Database,
    title: 'Data Layer',
    blurb: 'Clean, governed, queryable.',
    detail: 'GCP · BigQuery · Looker · LookML · row-level security',
    seenIn: 'Seen in: TCS — 10+ Looker dashboards, multi-tenant governance',
  },
  {
    icon: BrainCircuit,
    title: 'Intelligence Layer',
    blurb: 'Models that reason over that data.',
    detail: 'LLM APIs · embeddings · RAG · vector search',
    seenIn: 'Seen in: Kuriosity — RAG pipeline grounding every response',
  },
  {
    icon: Layers,
    title: 'Product Layer',
    blurb: 'Interfaces real people use.',
    detail: 'React · full-stack apps · shipped, deployed products',
    seenIn: 'Seen in: Kuriosity — live, three-platform production deploy',
  },
]

export default function BuildingSystems() {
  return (
    <section id="systems" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader
          eyebrow="Philosophy"
          title="Every system I build has three layers."
          subhead="It isn't a slogan — it's the literal shape of the work above, and everything below maps back to it."
        />

        <motion.ol
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="relative mt-12 flex flex-col gap-4"
        >
          {/* connecting spine */}
          <span
            aria-hidden="true"
            className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-amber/60 via-amber/30 to-signal/40"
          />
          {layers.map((layer, i) => {
            const Icon = layer.icon
            return (
              <motion.li key={layer.title} variants={fadeUp} className="relative flex gap-5">
                <span className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-border-subtle bg-surface text-amber">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div className="card flex-1 p-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[0.72rem] text-tertiary">0{i + 1}</span>
                    <h3 className="font-display text-xl font-semibold text-primary">{layer.title}</h3>
                    <span className="text-secondary">— {layer.blurb}</span>
                  </div>
                  <p className="mt-2 font-mono text-[0.8rem] text-tertiary">{layer.detail}</p>
                  <p className="mt-3 text-sm text-amber/90">{layer.seenIn}</p>
                </div>
              </motion.li>
            )
          })}
        </motion.ol>
      </div>
    </section>
  )
}
