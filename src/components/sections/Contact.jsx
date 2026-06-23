import { Mail, Github, Linkedin } from 'lucide-react'
import { identity, social, contact } from '../../data/site.js'
import Reveal from '../ui/Reveal.jsx'

export default function Contact() {
  const mailto = `mailto:${identity.email}?subject=${encodeURIComponent(contact.emailSubject)}`

  return (
    <section id="contact" className="section border-t border-border-subtle">
      <div className="container-edge">
        <Reveal className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
          {/* one of two glow surfaces */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[80%] rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(230,177,126,0.2), transparent)' }}
          />
          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-5">
            <span className="eyebrow">Contact</span>
            <h2 className="text-h1 font-semibold text-primary">{contact.headline}</h2>
            <p className="text-body-lg text-secondary">{contact.subline}</p>

            <a
              href={mailto}
              className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-amber px-6 py-3.5 text-sm font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:shadow-glow"
            >
              {/* shimmer sweep */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <Mail size={16} className="relative" />
              <span className="relative">{identity.email}</span>
            </a>

            <div className="mt-2 flex items-center gap-2">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle text-secondary transition duration-200 hover:border-white/20 hover:text-primary"
              >
                <Github size={18} />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle text-secondary transition duration-200 hover:border-white/20 hover:text-primary"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
