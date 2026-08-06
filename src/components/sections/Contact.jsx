import { useState } from 'react'
import { Github, Linkedin } from 'lucide-react'
import { identity, social, contact } from '../../data/site.js'
import Reveal from '../ui/Reveal.jsx'
import { Note, SignalDot } from '../ui/Draft.jsx'

// The ending, not just a form. Mailto is the primary path — one click, your
// mail app opens, done. There's no reliable JS signal for "a mail app
// actually opened," so this uses the closest real one: launching a protocol
// handler steals window focus almost immediately, launching nothing doesn't.
// If focus never leaves within the window, assume there's no mail client
// and fall back automatically — copy the address, say so plainly. Manual
// copy is the last resort, never the default.
function ApproveSignal() {
  const [state, setState] = useState('idle') // idle | trying | opened | fallback | manual
  const mailto = `mailto:${identity.email}?subject=${encodeURIComponent(contact.emailSubject)}`

  const approve = () => {
    setState('trying')
    let blurred = false
    const onBlur = () => {
      blurred = true
    }
    window.addEventListener('blur', onBlur)
    window.location.href = mailto
    setTimeout(() => {
      window.removeEventListener('blur', onBlur)
      if (blurred) {
        setState('opened')
        return
      }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(identity.email).then(
          () => setState('fallback'),
          () => setState('manual'),
        )
      } else {
        setState('manual')
      }
    }, 800)
  }

  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return // let new-tab/copy-link work normally
    e.preventDefault()
    approve()
  }

  return (
    <a
      href={mailto}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'y') {
          e.preventDefault()
          approve()
        }
      }}
      aria-label={`Email ${identity.email} — opens your mail app, or copies the address if it can't`}
      title="press Y"
      className="group block w-full max-w-sm overflow-hidden rounded-xl border border-border-subtle bg-ink-deep text-left shadow-lift transition duration-200 hover:border-ember/40 focus-visible:border-ember/60 focus-visible:outline-none"
    >
      <div className="flex items-center gap-2 border-b border-border-subtle bg-raised/50 px-4 py-2 font-mono text-[0.64rem] uppercase tracking-wider text-tertiary">
        <SignalDot />
        incoming signal
      </div>
      <div className="px-4 py-4 font-mono text-[0.84rem]">
        {state === 'idle' && (
          <>
            <p className="text-secondary">candidate detected.</p>
            <p className="mt-2 flex items-center gap-2 text-primary">
              approve?
              <kbd className="rounded border border-ember/40 bg-ember/10 px-2 py-0.5 text-[0.76rem] font-semibold text-ember transition duration-150 group-hover:bg-ember/20">
                Y
              </kbd>
              <span className="term-cursor inline-block h-3 w-[3px] flex-none bg-secondary/60" aria-hidden="true" />
            </p>
          </>
        )}
        {state === 'trying' && <p className="text-secondary">reaching out…</p>}
        {state === 'opened' && <p className="text-status">✓ opened in your mail app.</p>}
        {state === 'fallback' && (
          <>
            <p className="text-secondary">Couldn't open your mail app.</p>
            <p className="mt-1 text-status">I've copied my email instead — {identity.email}</p>
          </>
        )}
        {state === 'manual' && <p className="text-secondary">{identity.email} — select to copy.</p>}
      </div>
    </a>
  )
}

export default function Contact() {
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

            <div className="mt-2 flex justify-center">
              <ApproveSignal />
            </div>
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
