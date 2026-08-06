import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { architecture, modules } from '../../data/broksforge.js'
import { easePremium } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Note } from '../ui/Draft.jsx'

// Ten real Maven modules, one flat list — V2 has no delivery phases to tab
// between, so this is a chip explorer, not a phase switcher. Click a module,
// read what it owns.
function ModuleExplorer() {
  const [moduleId, setModuleId] = useState('forge-fxp')
  const selected = modules.find((m) => m.id === moduleId) ?? modules[0]

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-border-subtle bg-raised/40 p-5">
        <p className="font-mono text-[0.68rem] uppercase tracking-wider text-tertiary">
          10 Maven modules — the repository, as it actually is
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {modules.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => setModuleId(m.id)}
                aria-pressed={m.id === selected.id}
                className={`rounded-lg border px-3 py-2 font-mono text-[0.76rem] transition-colors duration-150 ${
                  m.id === selected.id
                    ? 'border-ember/50 bg-ember/[0.08] text-ember'
                    : 'border-border-subtle bg-ink text-secondary hover:border-border-strong hover:text-primary'
                }`}
              >
                {m.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative min-h-[7.5rem] bg-ink-deep/50 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: easePremium }}
          >
            <p className="font-mono text-[0.78rem] text-ember">{selected.label}/</p>
            <p className="mt-3 text-sm leading-relaxed text-secondary">{selected.detail}</p>
          </motion.div>
        </AnimatePresence>
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
          {/* the 5-layer read-down stack */}
          <Reveal className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-tertiary">
                Read down. Never duplicate.
              </p>
              <Note rotate={-2} className="hidden sm:block">architect first</Note>
            </div>
            <div className="relative flex flex-col gap-2">
              {/* the read-down rail — a literal diagram connector, blueprint-cyan
                  since this is the one place on the page that's a real drawing.
                  Dots stay in a straight column; only the boxes cascade right,
                  so the rail never has to bend. */}
              <div aria-hidden="true" className="absolute bottom-3 left-[3px] top-3 w-px bg-blueprint/25" />
              {architecture.layers.map((l, i) => (
                <div key={l.name} className="relative flex items-start gap-3">
                  <span aria-hidden="true" className="relative z-10 mt-5 h-1.5 w-1.5 flex-none rounded-full bg-blueprint" />
                  <div
                    className="min-w-0 flex-1 rounded-xl border border-blueprint/20 bg-surface px-5 py-4"
                    style={{ marginLeft: `${i * 14}px` }}
                  >
                    <p className="font-mono text-[0.84rem] font-medium text-primary">{l.name}</p>
                    <p className="mt-0.5 text-[0.8rem] text-tertiary">{l.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-secondary">{architecture.monolith}</p>
          </Reveal>

          {/* module explorer */}
          <Reveal delay={0.08}>
            <ModuleExplorer />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
