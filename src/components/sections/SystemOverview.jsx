import { motion } from 'framer-motion'
import { stagger, fadeUp, inView } from '../../lib/motion.js'
import SectionHeader from '../ui/SectionHeader.jsx'
import { Note } from '../ui/Draft.jsx'

// System overview — the full production surface, visible without hunting.
// Grouped by role in the system; everything here has shipped or run in production work.
const SYSTEMS = [
  {
    group: 'Backend & runtime',
    items: ['Java 21', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Redis', 'Flyway', 'REST / OpenAPI', 'Node.js'],
  },
  {
    group: 'AI systems',
    items: ['LLM APIs (OpenAI · Anthropic · Gemini · Groq · Ollama)', 'RAG pipelines', 'embeddings & vector search', 'evaluation harness', 'prompt / dataset versioning', 'LLM-as-judge metrics', 'LangGraph · LangChain (integration)'],
  },
  {
    group: 'Infrastructure & ops',
    items: ['Docker', 'AWS EC2', 'Nginx + TLS', 'Prometheus', 'Grafana', 'structured logging', 'health probes', 'OpenTelemetry-ready', 'CI/CD (GitHub Actions)'],
  },
  {
    group: 'Data & cloud',
    items: ['GCP', 'BigQuery', 'Looker', 'LookML', 'SQL optimization', 'row-level security'],
  },
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Vite', 'TanStack Query'],
  },
  {
    group: 'Practice',
    items: ['clean architecture', 'modular monolith', 'ADRs', 'schema-first migrations', 'multi-tenant security', 'SSRF / IDOR hardening', 'documented testing strategy'],
  },
]

export default function SystemOverview() {
  return (
    <section id="systems" className="section border-t border-border-subtle">
      <div className="container-edge">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="System overview"
            title="The full production surface."
            subhead="Everything below has shipped in real systems — the platform, the products, or the day job. No aspirational logos."
          />
          <Note rotate={2} className="mb-1">no fluff. counted twice.</Note>
        </div>

        <motion.div
          variants={stagger(0.04)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3"
        >
          {SYSTEMS.map((s) => (
            <motion.div key={s.group} variants={fadeUp} className="bg-surface p-5">
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ember">{s.group}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((i) => (
                  <li key={i}>
                    <span className="pill">{i}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
