import { X, Check } from 'lucide-react'
import { problem, solution } from '../../data/broksforge.js'
import Reveal from '../ui/Reveal.jsx'

export default function ProblemSolution() {
  return (
    <section id="bf-problem" className="section">
      <div className="container-edge grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Problem */}
        <Reveal className="flex flex-col gap-4">
          <span className="eyebrow">{problem.eyebrow}</span>
          <h2 className="text-h1 font-semibold">{problem.title}</h2>
          {problem.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-body-lg text-secondary">
              {p}
            </p>
          ))}
          <ul className="mt-2 flex flex-col gap-2.5">
            {problem.gaps.map((g) => (
              <li key={g} className="flex items-start gap-3 text-sm text-secondary">
                <X size={15} className="mt-0.5 flex-none text-tertiary" aria-hidden="true" />
                {g}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Solution */}
        <Reveal delay={0.08} className="flex flex-col gap-4 lg:pt-16">
          <div className="card flex h-full flex-col gap-4 p-7 sm:p-9">
            <span className="eyebrow">{solution.eyebrow}</span>
            <h3 className="font-display text-h2 font-semibold text-primary">{solution.title}</h3>
            {solution.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-secondary sm:text-base">
                {p}
              </p>
            ))}
            <ul className="mt-auto flex flex-col gap-2.5 border-t border-border-subtle pt-5">
              {[
                'Reproducible by construction — evaluations pin immutable versions',
                'Objective comparison — leaderboards over precomputed summaries',
                'Regressions caught by the pipeline, before users see them',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-secondary">
                  <Check size={15} className="mt-0.5 flex-none text-status" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
