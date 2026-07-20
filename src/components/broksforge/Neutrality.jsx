import { neutrality } from '../../data/broksforge.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import Reveal from '../ui/Reveal.jsx'

// The SPI, drawn as it actually dispatches: callers → dispatcher → contract → invokers.
function SpiDiagram() {
  return (
    <div className="card grid-bed relative overflow-hidden p-6 sm:p-8">
      <div className="relative mx-auto flex max-w-md flex-col items-center gap-0 text-center">
        <div className="w-full rounded-xl border border-border-subtle bg-ink px-5 py-3.5">
          <p className="font-mono text-[0.8rem] text-primary">EvaluationJobExecutor · health checks · judges</p>
          <p className="mt-0.5 text-[0.74rem] text-tertiary">callers — never reference a concrete invoker</p>
        </div>
        <span aria-hidden="true" className="h-6 w-px bg-gradient-to-b from-ember/60 to-ember/20" />
        <div className="w-full rounded-xl border border-ember/35 bg-ember/[0.05] px-5 py-3.5">
          <p className="font-mono text-[0.8rem] text-ember">{neutrality.spi.dispatcher}</p>
          <p className="mt-0.5 text-[0.74rem] text-tertiary">registry + dispatcher — the single entry point</p>
        </div>
        <span aria-hidden="true" className="h-6 w-px bg-gradient-to-b from-ember/60 to-ember/20" />
        <div className="w-full rounded-xl border border-border-subtle bg-ink px-5 py-3.5">
          <p className="font-mono text-[0.8rem] text-primary">interface {neutrality.spi.contract}</p>
          <p className="mt-0.5 text-[0.74rem] text-tertiary">prompt + credentials in → output, latency, cost, tokens out</p>
        </div>
        <span aria-hidden="true" className="h-6 w-px bg-gradient-to-b from-ember/60 to-ember/20" />
        <div className="grid w-full gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-status/30 bg-status/[0.05] px-4 py-3">
            <p className="font-mono text-[0.76rem] text-status">AgentEndpointInvoker</p>
            <p className="mt-0.5 text-[0.72rem] text-tertiary">shipped — any agent that speaks HTTP</p>
          </div>
          <div className="rounded-xl border border-dashed border-border-strong px-4 py-3">
            <p className="font-mono text-[0.76rem] text-secondary">OpenAiInvoker · AnthropicInvoker · …</p>
            <p className="mt-0.5 text-[0.72rem] text-tertiary">extension point — code-only, no migration</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Neutrality() {
  return (
    <section id="bf-neutrality" className="section border-t border-border-subtle">
      <div className="container-edge">
        <SectionHeader eyebrow={neutrality.eyebrow} title={neutrality.title} subhead={neutrality.subhead} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <Reveal>
            <SpiDiagram />
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal className="card p-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-tertiary">Providers modeled</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {neutrality.providers.map((p) => (
                  <li key={p}>
                    <span className="pill">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.8rem] text-tertiary">
                Providers are text-backed enums — adding one touches code, never the schema.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="card p-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-tertiary">Agent frameworks described</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {neutrality.frameworks.map((f) => (
                  <li key={f}>
                    <span className="pill">{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.8rem] text-tertiary">
                An agent is metadata plus an HTTP endpoint — the platform never imports a framework&apos;s types.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
