import { useState } from 'react'
import { Menu, X, FileText } from 'lucide-react'
import { navLinks, sectionIds, identity } from '../../data/site.js'
import { useScrolled } from '../../hooks/useScrolled.js'
import { useActiveSection } from '../../hooks/useActiveSection.js'

export default function Navbar() {
  const scrolled = useScrolled(24)
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)

  const isActive = (href) => href === `#${active}`

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-content items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? 'border-border-subtle bg-ink/70 backdrop-blur-xl shadow-float'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#hero" className="flex items-center gap-2 font-display text-[0.98rem] font-semibold text-primary">
          <span className="inline-block h-2 w-2 rounded-full bg-amber shadow-glow-soft" aria-hidden="true" />
          Gokulraj
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 ${
                  isActive(link.href) ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-amber" aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={identity.resumeUrl}
            download="Gokulraj M - Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-amber px-4 py-2 text-sm font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:shadow-glow sm:inline-flex"
          >
            <FileText size={15} aria-hidden="true" />
            Resume
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-primary md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-4 top-[4.5rem] z-50 rounded-2xl border border-border-subtle bg-ink/95 p-2 backdrop-blur-xl shadow-float md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm ${
                    isActive(link.href) ? 'bg-white/[0.04] text-primary' : 'text-secondary'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={identity.resumeUrl}
            download="Gokulraj M - Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-xl bg-amber px-4 py-3 text-sm font-medium text-ink"
              >
                <FileText size={15} aria-hidden="true" />
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
