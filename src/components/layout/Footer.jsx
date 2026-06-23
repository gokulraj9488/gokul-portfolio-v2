import { identity, social } from '../../data/site.js'

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="container-edge flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="font-mono text-[0.74rem] text-tertiary">
          © {identity.name} · Building intelligent systems
        </p>
        <div className="flex items-center gap-5 font-mono text-[0.74rem] text-tertiary">
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-secondary">
            GitHub
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-secondary">
            LinkedIn
          </a>
          <a href={`mailto:${identity.email}`} className="transition-colors hover:text-secondary">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
