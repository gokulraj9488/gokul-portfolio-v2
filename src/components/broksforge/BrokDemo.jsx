import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CircleHelp, Quote, ArrowRight } from 'lucide-react'
import { brokDemo } from '../../data/brokDemo.js'
import { easePremium } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import { SignalDot } from '../ui/Draft.jsx'

// The differentiator, demonstrated instead of described. Pick a question,
// watch Brok resolve an intent, label its own confidence, and cite exactly
// the rows it composed from — or refuse outright when the record can't
// support an answer. This is a scripted walkthrough, not a live connection
// to the running system — said plainly, twice, because that's the site's
// own standard for honesty.
//
// The free-text box below is the same rule, not an exception to it: there's
// no model back there resolving arbitrary language — just a small keyword
// match against the three things this demo actually knows, and an honest
// "not on record" for everything else. Type something odd and watch it
// refuse instead of bluff — that refusal IS the demonstration, not a limit
// of the demo.

const STATE_TONE = {
  Derived: 'border-status/40 bg-status/[0.07] text-status',
  Inferred: 'border-ember/40 bg-ember/[0.07] text-ember',
  Suggested: 'border-ember/40 bg-ember/[0.07] text-ember',
  Unknown: 'border-tertiary/40 bg-white/[0.03] text-tertiary',
}

// Keyword hints toward the three scripted turns — deliberately simple
// substring matching, never a model. Anything that doesn't hit one of these
// falls through to the honest refusal, which is the point.
const TOPIC_HINTS = [
  { turn: 0, words: ['promot', 'v8', 'v7', 'checkout'] },
  { turn: 1, words: ['before', 'happened', 'again', 'precedent', 'failure mode', 'seen this'] },
  { turn: 2, words: ['uptime', 'latency', 'performance', 'fast', 'slow', 'speed', 'reliab'] },
]

function matchTopic(input) {
  const q = input.toLowerCase()
  for (const { turn, words } of TOPIC_HINTS) {
    if (words.some((w) => q.includes(w))) return turn
  }
  return null
}

const truncate = (s, n) => (s.length > n ? `${s.slice(0, n).trim()}…` : s)

export default function BrokDemo() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [query, setQuery] = useState('')
  const [customTurn, setCustomTurn] = useState(null)
  const turn = customTurn ?? brokDemo.turns[active]

  const pick = (i) => {
    setCustomTurn(null)
    setActive(i)
  }

  const ask = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    const matched = matchTopic(trimmed)
    if (matched !== null) {
      pick(matched)
    } else {
      const shown = truncate(trimmed, 100)
      setCustomTurn({
        question: shown,
        intent: 'unresolved — no matching intent in the record',
        state: 'Unknown',
        answer: `Nothing on record for “${shown}” — this scripted demo only knows the three questions on the left. That's not the demo running out of script. It's the same rule the real system runs on: answer from what's on record, or say so.`,
        sources: [],
        refusal: true,
      })
    }
    setQuery('')
  }

  return (
    <section id="bf-demo" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader eyebrow={brokDemo.eyebrow} title={brokDemo.title} subhead={brokDemo.subhead} />

        <Reveal className="mt-10">
          <div className="card overflow-hidden shadow-lift">
            {/* chrome */}
            <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-raised/50 px-5 py-3.5">
              <p className="font-mono text-[0.72rem] text-secondary">
                brok <span className="text-tertiary">— grounded Q&amp;A, zero LLM in the reasoning path</span>
              </p>
              <span className="rounded-md border border-border-subtle px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-tertiary">
                scripted, not live
              </span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              {/* questions */}
              <div className="border-b border-border-subtle p-5 lg:border-b-0 lg:border-r">
                <p className="font-mono text-[0.66rem] uppercase tracking-wider text-tertiary">ask brok</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {brokDemo.turns.map((t, i) => (
                    <li key={t.question}>
                      <button
                        type="button"
                        onClick={() => pick(i)}
                        aria-pressed={i === active && !customTurn}
                        className={`flex w-full items-start gap-2.5 rounded-lg border px-3.5 py-3 text-left text-sm transition-colors duration-150 ${
                          i === active && !customTurn
                            ? 'border-ember/45 bg-ember/[0.07] text-primary'
                            : 'border-border-subtle bg-ink text-secondary hover:border-border-strong hover:text-primary'
                        }`}
                      >
                        <CircleHelp size={14} className="mt-0.5 flex-none text-tertiary" aria-hidden="true" />
                        {t.question}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* the signature move — ask it something it never scripted for */}
                <form onSubmit={ask} className="mt-4 border-t border-border-subtle pt-4">
                  <label htmlFor="brok-query" className="font-mono text-[0.66rem] uppercase tracking-wider text-tertiary">
                    or ask your own — try to trick it
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-border-subtle bg-ink px-3 py-2 transition-colors focus-within:border-ember/40">
                    <input
                      id="brok-query"
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      maxLength={140}
                      placeholder="e.g. what's your favorite color?"
                      autoComplete="off"
                      className="min-w-0 flex-1 bg-transparent text-sm text-primary placeholder:text-tertiary/60 focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Ask Brok"
                      disabled={!query.trim()}
                      className="flex-none rounded-md p-1.5 text-tertiary transition-colors hover:text-ember disabled:pointer-events-none disabled:opacity-40"
                    >
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </form>
              </div>

              {/* answer */}
              <div className="relative min-h-[16rem] bg-ink-deep/50 p-6" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={customTurn ? `custom-${customTurn.question}` : active}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: easePremium }}
                    className="flex flex-col gap-4"
                  >
                    {customTurn && (
                      <p className="font-mono text-[0.78rem] text-secondary">“{customTurn.question}”</p>
                    )}

                    <p className="flex items-center gap-2 font-mono text-[0.72rem] text-tertiary">
                      <SignalDot />
                      {turn.intent}
                    </p>

                    <div
                      className={`inline-flex w-fit items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-wider ${STATE_TONE[turn.state]}`}
                    >
                      {turn.state}
                    </div>

                    <p className={`text-[0.95rem] leading-relaxed ${turn.refusal ? 'text-secondary' : 'text-primary'}`}>
                      {turn.refusal && (
                        <span className="mr-1.5 rounded border border-tertiary/40 px-1.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-tertiary">
                          refused
                        </span>
                      )}
                      {turn.answer}
                    </p>

                    {turn.sources.length > 0 && (
                      <div className="mt-auto rounded-lg border border-border-subtle bg-ink p-3.5">
                        <p className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-tertiary">
                          <Quote size={11} aria-hidden="true" /> composed from
                        </p>
                        <ul className="mt-2 flex flex-col gap-1.5">
                          {turn.sources.map((src) => (
                            <li key={src} className="font-mono text-[0.76rem] text-secondary">
                              · {src}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[0.68rem] text-tertiary">
            fig. 00 — a scripted illustration of shipped behavior, not a live call to the API.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
