import { motion } from 'framer-motion'
import { evaluationPipeline as ep } from '../../data/broksforge.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Note } from '../ui/Draft.jsx'

// The fan-out pipeline as a vertical rail: data flows down an animated dashed line;
// stages that fan out carry a ×N marker. Small, fast, readable on every viewport.
function StageRail() {
  const fanOut = { runs: '× dataset items', results: '× metrics per run' }
  return (
    <ol className="relative flex flex-col">
      {/* animated flow line */}
      <svg
        aria-hidden="true"
        className="absolute left-[13px] top-3 h-[calc(100%-24px)] w-px overflow-visible sm:left-[15px]"
      >
        <line x1="0" y1="0" x2="0" y2="100%" className="flow-line animate-flow" stroke="rgba(226,164,90,0.55)" strokeWidth="2" />
      </svg>

      {ep.stages.map((s, i) => (
        <motion.li key={s.id} variants={fadeUp} className="relative flex gap-5 pb-7 pl-0 last:pb-0">
          <span className="relative z-10 mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-ember/40 bg-ink font-mono text-[0.62rem] text-ember sm:h-8 sm:w-8 sm:text-[0.66rem]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1 rounded-xl border border-border-subtle bg-surface px-4 py-3.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="font-mono text-[0.86rem] font-medium text-primary">{s.label}</h3>
              {fanOut[s.id] && (
                <span className="rounded-md border border-ember/25 bg-ember/[0.06] px-2 py-0.5 font-mono text-[0.64rem] text-ember">
                  {fanOut[s.id]}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-secondary">{s.detail}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}

export default function EvaluationPipeline() {
  return (
    <section id="bf-pipeline" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader eyebrow={ep.eyebrow} title={ep.title} subhead={ep.subhead} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={inView}>
            <StageRail />
          </motion.div>

          <div className="flex flex-col gap-4">
            {ep.scaleNotes.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.05} className="card p-6">
                <h3 className="font-display text-[1rem] font-semibold text-primary">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{n.body}</p>
              </Reveal>
            ))}

            <Reveal delay={0.15} className="card p-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-tertiary">Metric strategies</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {ep.metricTypes.map((m) => (
                  <li key={m}>
                    <span className="pill">{m}</span>
                  </li>
                ))}
                {ep.judgeMetrics.map((m) => (
                  <li key={m}>
                    <span className="pill border-ember/25 text-ember">{m}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.8rem] text-tertiary">
                One strategy bean per type, resolved from a registry — adding a metric is an enum
                constant plus one class, never a migration. Judge-family metrics (highlighted) use a
                configurable LLM or embedding provider.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Benchmark axes */}
        <Reveal className="mt-14">
          <div className="flex items-center gap-3">
            <span className="eyebrow">Benchmark comparisons</span>
            <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
            <Note rotate={1.5} className="hidden sm:block">measure twice, ship once</Note>
          </div>
          <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
            {ep.benchmarkAxes.map((a) => (
              <div key={a.type} className="bg-surface p-5">
                <p className="font-mono text-[0.76rem] font-medium text-primary">{a.type}</p>
                <p className="mt-1.5 text-sm text-secondary">{a.what}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
