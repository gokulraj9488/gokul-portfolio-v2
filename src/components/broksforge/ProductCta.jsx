import { ArrowUpRight, Github, ArrowLeft } from 'lucide-react'
import { broksforge } from '../../data/broksforge.js'
import { Link } from '../../lib/router.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function ProductCta() {
  return (
    <section className="section border-t border-border-subtle">
      <div className="container-edge">
        <Reveal className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[70%] rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(226,164,90,0.14), transparent)' }}
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <span className="eyebrow">See it running</span>
            <h2 className="text-h1 font-semibold text-primary">
              The platform is live. The architecture is public.
            </h2>
            <p className="text-body-lg text-secondary">
              Register an agent, run an evaluation, read the Master Architecture document and the 17
              ADRs behind it — everything on this page is verifiable.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={broksforge.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-ink transition duration-200 hover:bg-white"
              >
                Open Brok&apos;s Forge
                <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={broksforge.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-6 py-3.5 text-sm font-medium text-primary transition duration-200 hover:border-border-strong hover:bg-white/[0.03]"
              >
                <Github size={15} />
                Read the source
              </a>
            </div>
            <Link
              to="/"
              className="mt-3 inline-flex items-center gap-2 font-mono text-[0.78rem] text-tertiary transition-colors hover:text-secondary"
            >
              <ArrowLeft size={13} />
              Back to portfolio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
