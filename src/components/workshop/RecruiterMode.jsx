import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FileText, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { useWorkshop } from '../../lib/workshop.jsx'
import { useScrollLock } from '../../hooks/useScrollLock.js'
import { identity, social } from '../../data/site.js'
import { broksforge } from '../../data/broksforge.js'
import { kuriosity } from '../../data/kuriosity.js'

// WORKSHOP://RECRUITER — not a modal, an operating mode. Boots with an access
// sequence, runs keyboard-first, leaves with ESC. The 30-second version.

const BOOT = [
  '> auth gokulraj --role=recruiter',
  '> verifying credentials … OK',
  '> ACCESS GRANTED',
  '> mounting workshop://recruiter …',
]

const PROJECTS = [
  {
    name: "Brok's Forge",
    tag: 'FINAL BOSS',
    line: 'Multi-tenant AI-agent engineering platform — registry, evaluation pipeline, benchmarking, regression detection, on-read advisor. Java 21 · Spring Boot · PostgreSQL · Next.js 15. Live on AWS.',
    links: [
      { label: 'live', href: 'https://broksforge.gokul.quest' },
      { label: 'source', href: 'https://github.com/gokulraj9488/broks-forge' },
    ],
  },
  {
    name: 'Kuriosity',
    tag: 'SIDE QUEST',
    line: 'RAG product in production — an AI student that quizzes you on your own notes. Custom pipeline, LLM evaluation loop, cross-session memory.',
    links: [{ label: 'live', href: 'https://kuriosity.gokul.quest' }],
  },
  {
    name: 'Tata Consultancy Services',
    tag: 'DAY JOB',
    line: 'Software Engineer — Google Cloud / Looker. Production LookML, ~35% faster BigQuery dashboards, row-level security for multi-tenant analytics.',
    links: [],
  },
]

const FACTS = [
  '22 modules', '29 migrations', '13 LLM providers', '17 ADRs', 'production on AWS',
  'Java 21', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'React', 'Next.js',
  'LLMs', 'RAG', 'evaluation', 'BigQuery', 'Looker', 'GCP',
]

function OsSection({ label, children }) {
  return (
    <section aria-label={label}>
      <p className="font-mono text-[0.64rem] uppercase tracking-[0.2em] text-tertiary">
        ── {label} ──
      </p>
      <div className="mt-3">{children}</div>
    </section>
  )
}

export default function RecruiterMode() {
  const ws = useWorkshop()
  const reduce = useReducedMotion()
  const [booted, setBooted] = useState(false)
  const [bootLines, setBootLines] = useState([])
  const rootRef = useRef(null)
  const timers = useRef([])
  useScrollLock(ws.recruiterOpen)

  // Boot sequence — the ACCESS GRANTED moment. Click or key skips it.
  useEffect(() => {
    if (!ws.recruiterOpen) return
    if (reduce) {
      setBooted(true)
      return
    }
    setBooted(false)
    setBootLines([])
    BOOT.forEach((l, i) => {
      timers.current.push(setTimeout(() => setBootLines((prev) => [...prev, l]), 220 + i * 330))
    })
    timers.current.push(setTimeout(() => setBooted(true), 220 + BOOT.length * 330 + 260))
    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws.recruiterOpen, reduce])

  // ESC exits; arrows walk the interactive items like a menu.
  useEffect(() => {
    if (!ws.recruiterOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        ws.closeRecruiter()
        return
      }
      if (!booted) {
        setBooted(true) // any key skips boot
        return
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const items = [...(rootRef.current?.querySelectorAll('[data-os-item]') ?? [])]
        if (!items.length) return
        e.preventDefault()
        const idx = items.indexOf(document.activeElement)
        const next = e.key === 'ArrowDown' ? Math.min(idx + 1, items.length - 1) : Math.max(idx - 1, 0)
        items[next === -1 ? 0 : next].focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws.recruiterOpen, booted])

  useEffect(() => {
    if (booted) rootRef.current?.querySelector('[data-os-item]')?.focus()
  }, [booted])

  if (!ws.recruiterOpen) return null

  const itemCls =
    'inline-flex items-center gap-2 rounded-md border border-border-subtle px-3 py-2 font-mono text-[0.78rem] text-secondary transition hover:border-ember/40 hover:text-primary focus-visible:border-ember/60'

  return (
    <div
      className="scroll-contain fixed inset-0 z-[85] overflow-y-auto bg-ink"
      role="dialog"
      aria-modal="true"
      aria-label="Recruiter mode — workshop operating system"
    >
      {!booted ? (
        <button
          type="button"
          onClick={() => setBooted(true)}
          aria-label="Skip boot sequence"
          className="flex min-h-full w-full cursor-default flex-col items-start justify-center px-6 text-left sm:px-[18vw]"
        >
          <ol className="flex flex-col gap-2 font-mono text-[0.9rem]">
            {bootLines.map((l) => (
              <li key={l} className={l.includes('ACCESS GRANTED') ? 'font-semibold text-status' : 'text-secondary'}>
                {l}
              </li>
            ))}
            <li aria-hidden="true" className="text-tertiary">
              <span className="term-cursor inline-block h-4 w-2 bg-secondary/70 align-middle" />
            </li>
          </ol>
        </button>
      ) : (
        <motion.div
          ref={rootRef}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0.01 } : { type: 'spring', stiffness: 300, damping: 28 }}
          className="container-edge py-8 sm:py-10"
        >
          {/* OS header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-4">
            <p className="font-mono text-[0.82rem] text-primary">
              WORKSHOP://<span className="text-ember">RECRUITER</span>
            </p>
            <div className="flex items-center gap-4 font-mono text-[0.66rem] uppercase tracking-wider">
              <span className="text-status">● access granted</span>
              <button onClick={ws.closeRecruiter} className="text-tertiary transition hover:text-primary">
                esc to return
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
            {/* left: status + links */}
            <div className="flex flex-col gap-8">
              <OsSection label="status">
                <p className="font-display text-2xl font-semibold text-primary">{identity.name}</p>
                <p className="mt-1 text-sm text-secondary">AI Engineer — builds and operates AI systems end to end</p>
                <p className="mt-3 flex items-center gap-2 font-mono text-[0.74rem] text-status">
                  <span className="h-1.5 w-1.5 rounded-full bg-status" aria-hidden="true" />
                  available · {identity.location}
                </p>
              </OsSection>

              <OsSection label="links">
                <div className="flex flex-col items-start gap-2">
                  <a
                    data-os-item
                    href={identity.resumeUrl}
                    download="Gokulraj M - Resume.pdf"
                    onClick={() => ws.toast('+10 Recruiter XP')}
                    title="+10 Recruiter XP"
                    className={itemCls}
                  >
                    <FileText size={13} /> resume.pdf
                  </a>
                  <a data-os-item href={`mailto:${identity.email}`} title="usually replies before the CI finishes" className={itemCls}>
                    <Mail size={13} /> {identity.email}
                  </a>
                  <a data-os-item href={social.github} target="_blank" rel="noopener noreferrer" title="warning: contains unhealthy amounts of commits" className={itemCls}>
                    <Github size={13} /> github/gokulraj9488
                  </a>
                  <a data-os-item href={social.linkedin} target="_blank" rel="noopener noreferrer" className={itemCls}>
                    <Linkedin size={13} /> linkedin/gokul-raj3003
                  </a>
                </div>
              </OsSection>

              <OsSection label="meters">
                <div className="flex flex-col gap-2.5 font-mono text-[0.7rem]">
                  <p className="whitespace-nowrap text-secondary">
                    recruiter xp&nbsp;&nbsp;<span className="text-ember">███████░</span> +10 on resume
                  </p>
                  <p className="whitespace-nowrap text-secondary">
                    tech debt&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-tertiary">█░░░░░░░</span> contained
                  </p>
                  <p className="whitespace-nowrap text-secondary">
                    achievements&nbsp;&nbsp;<span className="text-status">{ws.unlocked.length}/{ws.achievementCount}</span> found on this site
                  </p>
                </div>
              </OsSection>
            </div>

            {/* right: the work */}
            <div className="flex flex-col gap-8">
              <OsSection label="projects">
                <ul className="flex flex-col gap-2.5">
                  {PROJECTS.map((p) => (
                    <li key={p.name} className="rounded-lg border border-border-subtle bg-surface px-4 py-3.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="font-display text-[0.98rem] font-semibold text-primary">{p.name}</p>
                        <p className={`font-mono text-[0.62rem] tracking-[0.18em] ${p.tag === 'FINAL BOSS' ? 'text-ember' : 'text-tertiary'}`}>
                          {p.tag}
                        </p>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-secondary">{p.line}</p>
                      {p.links.length > 0 && (
                        <div className="mt-2 flex gap-3">
                          {p.links.map((l) => (
                            <a
                              key={l.label}
                              data-os-item
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded font-mono text-[0.72rem] text-ember transition hover:text-primary"
                            >
                              {l.label} <ExternalLink size={10} />
                            </a>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </OsSection>

              <OsSection label="quick facts">
                <ul className="flex flex-wrap gap-1.5">
                  {FACTS.map((f) => (
                    <li key={f} className="rounded-md border border-border-subtle bg-white/[0.02] px-2.5 py-1 font-mono text-[0.7rem] text-secondary">
                      {f}
                    </li>
                  ))}
                </ul>
              </OsSection>

              <p className="font-mono text-[0.68rem] text-tertiary">
                ↑↓ to navigate · enter to open · <button onClick={ws.closeRecruiter} className="underline decoration-border-strong underline-offset-2 transition hover:text-secondary">esc returns to the workshop</button>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
