import { useState } from 'react'
import { Menu, X, FileText, Github, Hammer } from 'lucide-react'
import { navLinks, sectionIds, identity, social } from '../../data/site.js'
import { useScrolled } from '../../hooks/useScrolled.js'
import { useActiveSection } from '../../hooks/useActiveSection.js'
import { Link, useRouter } from '../../lib/router.jsx'
import { useWorkshop } from '../../lib/workshop.jsx'

// One nav for both pages. Route links go through the client router;
// section links render as plain hash anchors on the home page (Lenis smooth-scrolls
// those) and as router links with a /# target from any other page.
function NavLink({ link, active, onHome, onClick, className }) {
  if (link.route) {
    return (
      <Link
        to={link.href}
        onClick={onClick}
        className={className}
        aria-current={active ? 'page' : undefined}
        title={link.label === "Brok's Forge" ? 'Final Boss' : undefined}
      >
        {link.label}
      </Link>
    )
  }
  const hash = link.href.replace('/', '') // '/#work' -> '#work'
  if (onHome) {
    return (
      <a href={hash} onClick={onClick} className={className}>
        {link.label}
      </a>
    )
  }
  return (
    <Link to={link.href} onClick={onClick} className={className}>
      {link.label}
    </Link>
  )
}

export default function Navbar() {
  const scrolled = useScrolled(24)
  const { path } = useRouter()
  const ws = useWorkshop()
  const onHome = path === '/'
  const active = useActiveSection(onHome ? sectionIds : [])
  const [open, setOpen] = useState(false)
  // Hover the spark five times and a hammer appears. Click it: the forge lights.
  const [sparkHovers, setSparkHovers] = useState(0)
  const hammerFound = sparkHovers >= 5

  const isActive = (link) => {
    if (link.route) return path === link.href
    return onHome && link.href === `/#${active}`
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-content items-center justify-between rounded-xl border px-4 py-2.5 transition-all duration-300 ${
          scrolled ? 'glass border-border-subtle shadow-lift' : 'border-transparent bg-transparent'
        }`}
      >
        <span className="flex items-center gap-2.5">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-[0.95rem] font-semibold text-primary"
            onMouseEnter={() => setSparkHovers((n) => n + 1)}
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-forge-breathe rounded-full bg-ember/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
            </span>
            Gokulraj
            <span className="hidden font-mono text-[0.66rem] font-normal lowercase tracking-[0.08em] text-tertiary sm:inline">
              / the workshop
            </span>
          </Link>
          {ws.forgeMode && (
            <span className="hidden font-mono text-[0.62rem] text-ember/80 lg:inline" aria-hidden="true">
              🔥 this is fine.
            </span>
          )}
          {hammerFound && (
            <button
              type="button"
              onClick={ws.toggleForgeMode}
              aria-label={ws.forgeMode ? 'Cool the forge' : 'Light the forge'}
              title={ws.forgeMode ? 'cool the forge' : 'you found the hammer. light the forge?'}
              className={`inline-flex h-6 w-6 items-center justify-center rounded-md border transition duration-300 ${
                ws.forgeMode
                  ? 'border-ember/60 bg-ember/15 text-ember'
                  : 'border-border-subtle text-tertiary hover:border-ember/40 hover:text-ember'
              }`}
            >
              <Hammer size={12} />
            </button>
          )}
        </span>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                link={link}
                onHome={onHome}
                active={isActive(link)}
                className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 ${
                  isActive(link) ? 'text-primary' : 'text-secondary hover:text-primary'
                } ${link.route ? 'font-medium' : ''}`}
              />
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={ws.openRecruiter}
              className="rounded-lg px-3 py-1.5 font-mono text-[0.72rem] text-tertiary transition-colors duration-200 hover:text-ember"
              title="the 30-second version"
            >
              Recruiter?
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="warning: contains unhealthy amounts of commits"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-secondary transition duration-200 hover:border-border-strong hover:text-primary sm:inline-flex"
          >
            <Github size={16} />
          </a>
          <a
            href={identity.resumeUrl}
            download="Gokulraj M - Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="+10 Recruiter XP"
            onClick={() => ws.toast('+10 Recruiter XP')}
            className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-ink transition duration-200 hover:bg-white sm:inline-flex"
          >
            <FileText size={14} aria-hidden="true" />
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
          className="glass absolute inset-x-4 top-[4.25rem] z-50 rounded-xl border border-border-subtle p-2 shadow-float md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  link={link}
                  onHome={onHome}
                  active={isActive(link)}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm ${
                    isActive(link) ? 'bg-white/[0.04] text-primary' : 'text-secondary'
                  }`}
                />
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  ws.openRecruiter()
                }}
                className="block w-full rounded-lg px-4 py-3 text-left font-mono text-[0.78rem] text-tertiary"
              >
                Recruiter? — the 30-second version
              </button>
            </li>
            <li>
              <a
                href={identity.resumeUrl}
                download="Gokulraj M - Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setOpen(false)
                  ws.toast('+10 Recruiter XP')
                }}
                className="mt-1 flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-ink"
              >
                <FileText size={14} aria-hidden="true" />
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
