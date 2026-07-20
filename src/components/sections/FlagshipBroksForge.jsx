import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { broksforge } from '../../data/broksforge.js'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import { Link } from '../../lib/router.jsx'
import Badge from '../ui/Badge.jsx'
import Reveal from '../ui/Reveal.jsx'
import CountUp from '../ui/CountUp.jsx'
import { Note, Sparks } from '../ui/Draft.jsx'

// The engineering loop the platform owns — rendered as a quiet flow strip.
const loop = ['Register', 'Version', 'Evaluate', 'Benchmark', 'Advise']

export default function FlagshipBroksForge() {
  return (
    <section id="work" className="section border-t border-border-subtle">
      <div className="container-edge">
        <Reveal className="flex max-w-3xl flex-col gap-3">
          <span className="eyebrow">Flagship</span>
          <h2 className="text-h1 font-semibold">
            Brok&apos;s Forge — {broksforge.tagline}
          </h2>
          <p className="text-body-lg text-secondary">{broksforge.oneLiner}</p>
          <Note rotate={-1.5} className="mt-1 self-start">
            the résumé is the repo →
          </Note>
        </Reveal>

        <Reveal className="card relative mt-10 overflow-hidden shadow-lift">
          {/* hearth glow — the forge behind the sheet */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-forge-breathe rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(226,164,90,0.13), transparent 70%)' }}
          />
          <Sparks count={3} className="[mask-image:linear-gradient(to_left,black,transparent_55%)]" />
          {/* header row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-raised/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-base font-semibold text-primary">Brok&apos;s Forge</span>
              <span className="font-mono text-[0.72rem] text-tertiary">{broksforge.version} · {broksforge.license}</span>
            </div>
            <Badge tone="live">
              <span className="h-1.5 w-1.5 rounded-full bg-status" aria-hidden="true" />
              {broksforge.status}
            </Badge>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* left: the loop + CTAs */}
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-tertiary">
                  The engineering loop it owns
                </p>
                <ol className="mt-4 flex flex-wrap items-center gap-y-2.5">
                  {loop.map((step, i) => (
                    <li key={step} className="flex items-center">
                      <span className="rounded-md border border-border-subtle bg-ink px-2.5 py-1.5 font-mono text-[0.74rem] text-primary">
                        {step}
                      </span>
                      {i < loop.length - 1 && (
                        <ArrowRight size={12} className="mx-1.5 text-tertiary" aria-hidden="true" />
                      )}
                    </li>
                  ))}
                </ol>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-secondary">
                  Framework-agnostic (LangGraph, CrewAI, AutoGen, Spring AI, custom HTTP) and
                  provider-agnostic (OpenAI, Anthropic, Gemini, Groq, Ollama and more) — every
                  provider behind one SPI, every result reproducible by construction.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/broksforge"
                  title="Final Boss"
                  className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-ink transition duration-200 hover:bg-white"
                >
                  Full product page
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={broksforge.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-5 py-3 text-sm font-medium text-primary transition duration-200 hover:border-border-strong hover:bg-white/[0.03]"
                >
                  Live platform
                  <ExternalLink size={14} />
                </a>
                <a
                  href={broksforge.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-5 py-3 text-sm font-medium text-primary transition duration-200 hover:border-border-strong hover:bg-white/[0.03]"
                >
                  <Github size={15} />
                  Source
                </a>
              </div>
            </div>

            {/* right: verified numbers */}
            <motion.ul
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-subtle bg-border-subtle sm:grid-cols-3 lg:grid-cols-2"
            >
              {broksforge.stats.map((s) => (
                <motion.li key={s.label} variants={fadeUp} className="bg-ink p-4">
                  <span className="block font-display text-2xl font-semibold text-primary">
                    <CountUp value={s.value} prefix={s.prefix ?? ''} />
                  </span>
                  <span className="mt-1 block text-[0.8rem] leading-snug text-tertiary">{s.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
