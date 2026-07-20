import { Mail, Github, Linkedin } from 'lucide-react'
import { identity, social, contact } from '../../data/site.js'
import Reveal from '../ui/Reveal.jsx'
import Magnetic from '../ui/Magnetic.jsx'
import { Note } from '../ui/Draft.jsx'

export default function Contact() {
  const mailto = `mailto:${identity.email}?subject=${encodeURIComponent(contact.emailSubject)}`

  return (
    <section id="contact" className="section border-t border-border-subtle">
      <div className="container-edge">
        <Reveal className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
          {/* single restrained glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-[70%] rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(226,164,90,0.14), transparent)' }}
          />
          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-5">
            <span className="eyebrow">Contact</span>
            <h2 className="text-h1 font-semibold text-primary">{contact.headline}</h2>
            <p className="text-body-lg text-secondary">{contact.subline}</p>

            <Magnetic>
              <a
                href={mailto}
                title="usually replies before the CI finishes"
                className="btn-sparks mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-ink transition duration-200 hover:bg-white"
              >
                <span className="sp" aria-hidden="true" />
                <span className="sp" aria-hidden="true" />
                <span className="sp" aria-hidden="true" />
                <Mail size={16} />
                {identity.email}
              </a>
            </Magnetic>
            <Note rotate={-1.5}>{contact.note}</Note>

            <div className="mt-2 flex items-center gap-2">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle text-secondary transition duration-200 hover:border-border-strong hover:text-primary"
              >
                <Github size={18} />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle text-secondary transition duration-200 hover:border-border-strong hover:text-primary"
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
