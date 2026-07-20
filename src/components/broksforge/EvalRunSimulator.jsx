import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { RotateCcw, Check } from 'lucide-react'
import { easePremium } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import { DraftCorners, TitleBlock, Note } from '../ui/Draft.jsx'

// A replay of one real-shaped evaluation job: 500 dataset items fan out into runs,
// 9 metrics score every output, the summary lands in one row. Deterministic — the
// same run every time, like a recorded trace, not a random light show.

const TOTAL_RUNS = 500
const METRICS_PER_RUN = 9
const RUN_MS = 4200 // how long the fan-out takes to replay
const CELLS = 50 // dot grid — 1 cell = 10 runs
const FAIL_CELLS = new Set([7, 23, 41]) // ~29 failed runs → 94.2% pass
const FAILED_TOTAL = 29
const PASS_FINAL = (((TOTAL_RUNS - FAILED_TOTAL) / TOTAL_RUNS) * 100).toFixed(1) // 94.2

// Loading flavor — engineer humor, one line at a time while the run replays.
const FLAVOR = [
  'heating forge…',
  'sharpening axe…',
  'compiling coffee…',
  'finding missing semicolon…',
  'refactoring spaghetti…',
  'sacrificing RAM…',
]

const STAGES = [
  { id: 'queue', label: 'Job queued', detail: 'agent + dataset + prompt + profile, pinned by version id' },
  { id: 'invoke', label: 'Invoke', detail: 'provider-agnostic SPI calls the agent endpoint, per item' },
  { id: 'score', label: 'Score', detail: '9 metric strategies judge every output' },
  { id: 'summary', label: 'Summarize', detail: 'one precomputed row — benchmarks read this, not 4,500 results' },
]

function snapshotAt(progress) {
  const runs = Math.floor(progress * TOTAL_RUNS)
  const cells = Math.floor(progress * CELLS)
  let failed = 0
  for (const f of FAIL_CELLS) if (f < cells) failed += 10
  failed = Math.min(failed, FAILED_TOTAL)
  const pass = runs > 0 ? (((runs - failed) / runs) * 100).toFixed(1) : null
  return {
    runs,
    cells,
    results: runs * METRICS_PER_RUN,
    pass,
    cost: (progress * 0.42).toFixed(2),
    p95: progress > 0.12 ? '1.8s' : '—',
  }
}

const DONE = snapshotAt(1)

function StageRow({ stage, state }) {
  return (
    <li className="flex gap-3">
      <span
        className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[0.6rem] transition-colors duration-300 ${
          state === 'done'
            ? 'border-status/50 bg-status/10 text-status'
            : state === 'active'
              ? 'animate-pulse-soft border-ember bg-ember/10 text-ember'
              : 'border-border-subtle text-tertiary/60'
        }`}
        aria-hidden="true"
      >
        {state === 'done' ? <Check size={11} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      </span>
      <div className="min-w-0">
        <p className={`font-mono text-[0.8rem] transition-colors duration-300 ${state === 'pending' ? 'text-tertiary' : 'text-primary'}`}>
          {stage.label}
        </p>
        <p className="mt-0.5 text-[0.76rem] leading-snug text-tertiary">{stage.detail}</p>
      </div>
    </li>
  )
}

export default function EvalRunSimulator() {
  const reduce = useReducedMotion()
  const hostRef = useRef(null)
  const inView = useInView(hostRef, { once: true, amount: 0.35 })
  // 'idle' -> 'running' -> 'done'. SSR renders idle; reduced motion jumps straight to done.
  const [phase, setPhase] = useState('idle')
  const [snap, setSnap] = useState(snapshotAt(0))
  const [flavor, setFlavor] = useState(FLAVOR[0])
  const timerRef = useRef(null)

  const play = () => {
    if (reduce) {
      setSnap(DONE)
      setPhase('done')
      return
    }
    clearInterval(timerRef.current)
    setSnap(snapshotAt(0))
    setFlavor(FLAVOR[0])
    setPhase('running')
    const t0 = performance.now()
    timerRef.current = setInterval(() => {
      const elapsed = performance.now() - t0
      const progress = Math.min(elapsed / RUN_MS, 1)
      setSnap(snapshotAt(progress))
      setFlavor(FLAVOR[Math.floor(elapsed / 850) % FLAVOR.length])
      if (progress >= 1) {
        clearInterval(timerRef.current)
        setPhase('done')
      }
    }, 80)
  }

  useEffect(() => {
    if (inView && phase === 'idle') play()
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  const running = phase === 'running'
  const done = phase === 'done'
  const stageState = (id) => {
    if (done) return 'done'
    if (!running) return 'pending'
    if (id === 'queue') return 'done'
    if (id === 'invoke' || id === 'score') return 'active'
    return 'pending'
  }

  return (
    <section id="bf-run" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader
          eyebrow="Fig. 01 — watch a run"
          title="This is what the platform does."
          subhead="One evaluation job, replayed exactly as it runs in production: items fan out, every output is scored, and downstream readers get one summary row."
        />

        <Reveal className="relative mt-10">
          <div ref={hostRef} className="card grid-bed relative overflow-hidden shadow-lift">
            <DraftCorners />

            {/* header */}
            <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-raised/50 px-5 py-3.5 sm:px-6">
              <p className="font-mono text-[0.72rem] text-secondary">
                evaluation-job <span className="text-primary">7f3a92</span>
                <span className="hidden text-tertiary sm:inline"> · support-bot@v4 · customer-faq@v2</span>
              </p>
              <p
                aria-live="polite"
                className={`font-mono text-[0.68rem] uppercase tracking-[0.14em] ${
                  done ? 'text-status' : running ? 'text-ember' : 'text-tertiary'
                }`}
              >
                {done ? '● completed' : running ? '● running' : '○ pending'}
              </p>
            </div>

            <div className="relative grid gap-8 p-5 sm:p-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
              {/* stages */}
              <ol className="flex flex-col gap-4">
                {STAGES.map((s) => (
                  <StageRow key={s.id} stage={s} state={stageState(s.id)} />
                ))}
              </ol>

              {/* live panel */}
              <div className="flex flex-col gap-5">
                {/* counters */}
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border-subtle bg-border-subtle sm:grid-cols-4">
                  {[
                    [snap.runs.toLocaleString(), `runs / ${TOTAL_RUNS}`],
                    [snap.results.toLocaleString(), 'results scored'],
                    [snap.pass ? `${snap.pass}%` : '—', 'pass rate'],
                    [`$${snap.cost}`, `cost · p95 ${snap.p95}`],
                  ].map(([v, l]) => (
                    <div key={l} className="bg-ink-deep/60 px-3 py-3">
                      <p className="font-display text-lg font-semibold tabular-nums text-primary">{v}</p>
                      <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-tertiary">{l}</p>
                    </div>
                  ))}
                </div>

                {/* run grid — 1 cell = 10 runs */}
                <div>
                  <div className="grid grid-cols-10 gap-1.5" aria-hidden="true">
                    {Array.from({ length: CELLS }, (_, i) => {
                      const filled = i < snap.cells
                      const fail = filled && FAIL_CELLS.has(i)
                      return (
                        <span
                          key={i}
                          title={fail ? 'task failed successfully.' : undefined}
                          className={`h-2.5 rounded-[3px] transition-colors duration-200 ${
                            fail ? 'pointer-events-auto bg-ember/80' : filled ? 'bg-status/55' : 'bg-white/[0.05]'
                          }`}
                        />
                      )
                    })}
                  </div>
                  <div className="mt-2 flex items-center justify-between font-mono text-[0.62rem] text-tertiary">
                    <span>1 cell = 10 dataset items</span>
                    <span title="(╯°□°）╯︵ ┻━┻">
                      <span className="text-status/80">■</span> passing · <span className="text-ember/90">■</span> failures to diagnose
                    </span>
                  </div>
                </div>

                {/* summary lands (loading flavor keeps the seat warm) */}
                <div className="min-h-[3.4rem]">
                  {running && (
                    <p className="px-1 py-2 font-mono text-[0.74rem] text-tertiary" aria-hidden="true">
                      <span className="text-ember">▸</span> {flavor}
                    </p>
                  )}
                  <AnimatePresence>
                    {done && (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, scale: 1.03, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: easePremium }}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-status/25 bg-status/[0.05] px-4 py-3"
                      >
                        <p className="font-mono text-[0.78rem] text-secondary">
                          <span className="text-status">✓ summary written</span> — {PASS_FINAL}% pass · 471/500 ·{' '}
                          regression check passed
                        </p>
                        <button
                          type="button"
                          onClick={play}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle px-2.5 py-1.5 font-mono text-[0.7rem] text-secondary transition duration-200 hover:border-border-strong hover:text-primary"
                        >
                          <RotateCcw size={11} />
                          run it again
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <TitleBlock
              fields={[
                ['drawing', 'evaluation job — fan-out'],
                ['items', '500'],
                ['metrics', '9 per run'],
                ['source', 'job → run → result'],
              ]}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="font-mono text-[0.68rem] text-tertiary">
              fig. 01 — deterministic replay of one job. The 29 failures are the interesting part: the root-cause engine turns them into diagnoses.
            </p>
            <Note rotate={1.5} className="hidden whitespace-nowrap sm:block">
              red cells pay the rent
            </Note>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
