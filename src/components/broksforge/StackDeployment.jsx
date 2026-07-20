import { ArrowRight, ArrowDown } from 'lucide-react'
import { stack, deployment } from '../../data/broksforge.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Note } from '../ui/Draft.jsx'

// Stack as layered architecture — grouped by role in the system, not a badge wall.
function StackGroups() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stack.groups.map((g, i) => (
        <Reveal key={g.name} delay={i * 0.04} className="card p-6">
          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-ember">{g.name}</p>
          <ul className="mt-4 flex flex-col gap-3">
            {g.items.map((item) => (
              <li key={item.tech} className="flex flex-col gap-0.5 border-l border-border-subtle pl-3">
                <span className="text-sm font-medium text-primary">{item.tech}</span>
                <span className="text-[0.78rem] text-tertiary">{item.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}

// Deployment topology — the request path, drawn as it runs.
function TopologyDiagram() {
  return (
    <div className="card grid-bed p-6 sm:p-8">
      <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
        {deployment.nodes.map((n, i) => (
          <li key={n.id} className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row lg:gap-0">
            <div className="w-full rounded-xl border border-border-subtle bg-ink px-4 py-3 text-center">
              <p className="font-mono text-[0.78rem] font-medium text-primary">{n.label}</p>
              <p className="mt-0.5 text-[0.7rem] text-tertiary">{n.sub}</p>
            </div>
            {i < deployment.nodes.length - 1 && (
              <>
                <ArrowRight size={14} className="mx-2 hidden flex-none text-ember/70 lg:block" aria-hidden="true" />
                <ArrowDown size={14} className="flex-none text-ember/70 lg:hidden" aria-hidden="true" />
              </>
            )}
          </li>
        ))}
      </ol>
      <ul className="mt-6 grid gap-2.5 border-t border-border-subtle pt-5 sm:grid-cols-2">
        {deployment.practices.map((p) => (
          <li key={p.slice(0, 20)} className="flex items-start gap-3 text-[0.82rem] text-secondary">
            <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-ember/80" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
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
          <span className="eyebrow">{deployment.eyebrow}</span>
          <h3 className="font-display text-h2 font-semibold text-primary">{deployment.title}</h3>
          <p className="text-body-lg text-secondary">{deployment.subhead}</p>
        </Reveal>
        <Reveal delay={0.06} className="mt-8">
          <TopologyDiagram />
          <div className="mt-3 flex justify-end">
            <Note rotate={-1.5}>there is no staging on friday</Note>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
