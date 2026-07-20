import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { architecture, modulePhases } from '../../data/broksforge.js'
import { easePremium } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Note } from '../ui/Draft.jsx'

// Interactive module explorer: pick a phase, pick a module, read what it owns.
// State is local and cheap; the detail panel animates height-free (opacity+y only).
function ModuleExplorer() {
  const [phaseIdx, setPhaseIdx] = useState(2) // Phase 3 — the Intelligence Layer — is the show
  const phase = modulePhases[phaseIdx]
  const [moduleId, setModuleId] = useState(phase.modules[3]?.id ?? phase.modules[0].id)
  const selected = phase.modules.find((m) => m.id === moduleId) ?? phase.modules[0]

  const pickPhase = (i) => {
    setPhaseIdx(i)
    setModuleId(modulePhases[i].modules[0].id)
  }

  return (
    <div className="card overflow-hidden">
      {/* phase tabs */}
      <div role="tablist" aria-label="Delivery phase" className="flex flex-wrap border-b border-border-subtle bg-raised/40">
        {modulePhases.map((p, i) => (
          <button
            key={p.phase}
            role="tab"
            aria-selected={i === phaseIdx}
            onClick={() => pickPhase(i)}
            className={`flex-1 whitespace-nowrap px-4 py-3.5 text-center font-mono text-[0.72rem] uppercase tracking-wider transition-colors duration-200 ${
              i === phaseIdx
                ? 'border-b-2 border-ember bg-white/[0.02] text-primary'
                : 'border-b-2 border-transparent text-tertiary hover:text-secondary'
            }`}
          >
            <span className="block">{p.phase}</span>
            <span className="mt-0.5 hidden text-[0.66rem] normal-case tracking-normal text-tertiary sm:block">{p.name}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        {/* module list */}
        <div className="border-b border-border-subtle p-5 lg:border-b-0 lg:border-r">
          <p className="text-sm text-secondary">{phase.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {phase.modules.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => setModuleId(m.id)}
                  aria-pressed={m.id === selected.id}
                  className={`rounded-lg border px-3 py-2 font-mono text-[0.78rem] transition-colors duration-150 ${
                    m.id === selected.id
                      ? 'border-ember/50 bg-ember/[0.08] text-ember'
                      : 'border-border-subtle bg-ink text-secondary hover:border-border-strong hover:text-primary'
                  }`}
                >
                  {m.label}/
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* detail panel */}
        <div className="relative min-h-[9.5rem] bg-ink-deep/50 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: easePremium }}
            >
              <p className="font-mono text-[0.78rem] text-ember">
                com.broksforge.modules.<span className="text-primary">{selected.label}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-secondary">{selected.detail}</p>
              <p className="mt-4 font-mono text-[0.68rem] text-tertiary">
                domain/ · repository/ · service/ · web/dto/ — dependencies point downward only
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function ArchitectureExplorer() {
  return (
    <section id="bf-architecture" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader eyebrow={architecture.eyebrow} title={architecture.title} subhead={architecture.subhead} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* layering */}
          <Reveal className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-tertiary">
                Every module, layered the same way
              </p>
              <Note rotate={-2} className="hidden sm:block">architect first</Note>
            </div>
            <div className="flex flex-col gap-2">
              {architecture.layers.map((l, i) => (
                <div
                  key={l.name}
                  className="rounded-xl border border-border-subtle bg-surface px-5 py-4"
                  style={{ marginLeft: `${i * 14}px` }}
                >
                  <p className="font-mono text-[0.84rem] font-medium text-primary">{l.name}</p>
                  <p className="mt-0.5 text-[0.8rem] text-tertiary">{l.detail}</p>
                </div>
              ))}
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {architecture.boundaryRules.map((r) => (
                <li key={r.slice(0, 20)} className="flex items-start gap-3 text-sm text-secondary">
                  <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-ember/80" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* explorer */}
          <Reveal delay={0.08}>
            <ModuleExplorer />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
