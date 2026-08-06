import { ArrowRight, ArrowDown } from 'lucide-react'
import { stack, production } from '../../data/broksforge.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Note } from '../ui/Draft.jsx'

// Stack as layered fact, not a badge wall — grouped by role, exactly as named
// in the canonical doc. No invented per-item commentary.
function StackGroups() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stack.groups.map((g, i) => (
        <Reveal key={g.name} delay={i * 0.04} className="card p-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-ember">{g.name}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {g.items.map((item) => (
              <li key={item}>
                <span className="pill">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}

// Deployment topology — the real request path, split Vercel + AWS EC2.
function TopologyDiagram() {
  return (
    <div className="card blueprint-bed p-6 sm:p-8">
      <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
        {production.topology.map((n, i) => (
          <li key={n.id} className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row lg:gap-0">
            <div className="w-full rounded-xl border border-blueprint/25 bg-ink px-4 py-3 text-center">
              <p className="font-mono text-[0.78rem] font-medium text-primary">{n.label}</p>
              <p className="mt-0.5 text-[0.7rem] text-tertiary">{n.sub}</p>
            </div>
            {i < production.topology.length - 1 && (
              <>
                <ArrowRight size={14} className="mx-2 hidden flex-none text-blueprint/70 lg:block" aria-hidden="true" />
                <ArrowDown size={14} className="flex-none text-blueprint/70 lg:hidden" aria-hidden="true" />
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function StackDeployment() {
  return (
    <section id="bf-stack" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader eyebrow={stack.eyebrow} title={stack.title} />
        <div className="mt-12">
          <StackGroups />
        </div>

        <Reveal className="mt-16 flex max-w-2xl flex-col gap-3">
          <span className="eyebrow">{production.eyebrow}</span>
          <h3 className="font-display text-h2 font-semibold text-primary">{production.title}</h3>
          <p className="text-body-lg text-secondary">{production.subhead}</p>
        </Reveal>
        <Reveal delay={0.06} className="mt-8">
          <TopologyDiagram />
          <div className="mt-3 flex justify-end">
            <Note rotate={-1.5}>there is no staging on friday</Note>
          </div>
        </Reveal>

        {/* CI/CD — the unattended deploy, named workflows and all */}
        <Reveal delay={0.1} className="mt-8 rounded-2xl border border-border-subtle bg-surface p-6 sm:p-8">
          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-tertiary">9 GitHub Actions workflows</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {production.cicd.workflows.map((w) => (
              <li key={w}>
                <span className="pill">{w}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-secondary">{production.cicd.detail}</p>
        </Reveal>
      </div>
    </section>
  )
}
