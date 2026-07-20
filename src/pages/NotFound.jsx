import { GitBranch } from 'lucide-react'
import { Link } from '../lib/router.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { Note } from '../components/ui/Draft.jsx'

export default function NotFound() {
  usePageMeta({ title: '404 — wrong branch', description: 'This page checked out the wrong branch.' })

  return (
    <section className="relative flex min-h-[92svh] items-center justify-center scroll-mt-24">
      <div className="container-edge flex flex-col items-center gap-6 text-center">
        <p className="font-mono text-[0.78rem] text-tertiary">
          <GitBranch size={13} className="mr-2 inline text-ember" aria-hidden="true" />
          HEAD detached at <span className="text-ember">404</span>
        </p>
        <h1 className="max-w-[22ch] font-display text-h1 font-semibold text-primary [text-wrap:balance]">
          Looks like this page checked out the wrong branch.
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-ink-deep px-5 py-3 font-mono text-sm text-primary transition duration-200 hover:border-border-strong hover:bg-white/[0.03]"
        >
          <span className="text-ember">$</span> git checkout main
        </Link>
        <Note rotate={-2}>nothing was force-pushed. probably.</Note>
      </div>
    </section>
  )
}
