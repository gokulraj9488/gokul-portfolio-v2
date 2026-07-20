import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useWorkshop } from '../../lib/workshop.jsx'
import { useRouter } from '../../lib/router.jsx'
import { useScrollLock } from '../../hooks/useScrollLock.js'
import { identity, social, buildLog } from '../../data/site.js'

// The workshop terminal — press "/". More Warp than Raycast: a scrollback, a
// prompt with history + tab-completion, and commands that behave like an
// engineer wrote them at 2AM.

const FORTUNES = [
  'there is nothing more permanent than temporary code.',
  'it works on my machine is a distributed systems problem.',
  'weeks of coding can save you hours of planning.',
  'the best error message is the one that never shows up. the second best is honest.',
  'a deploy on friday is a story on saturday.',
  'documentation is a love letter to your future self.',
  "today's probability of fixing the bug: 73%\nprobability of introducing another: 98%",
]

// Primary commands only — this list also drives Tab-completion and the ghost
// suggestion, so secret ones (sudo hire gokulraj, nyan, rickroll, whereami…)
// stay unlisted on purpose. Aliases still work when typed; they're just not
// what gets suggested.
const HELP = [
  ['help', 'this list'],
  ['whoami', 'identity check'],
  ['coffee', 'compile motivation'],
  ['fortune', 'wisdom, randomly accessed'],
  ['ride', 'take the GT650 out — aka garage, bike'],
  ['benchmark', 'watch an evaluation run'],
  ['ship', 'ship it'],
  ['heat', 'light / cool the forge'],
  ['fixit', 'incident response — aka panic'],
  ['schematics', 'toggle developer mode — aka blueprint'],
  ['speedrun', 'the 30-second version — aka recruiter'],
  ['github', 'open the repos'],
  ['resume', 'download résumé (+10 XP)'],
  ['email', 'copy my email'],
  ['git log', 'recent ships'],
  ['clear', 'clean the scrollback'],
  ['???', 'some commands are not listed'],
]
const PRIMARY_COMMANDS = HELP.map(([c]) => c).filter((c) => c !== '???')

const HASHES = ['a3f9c2', 'c0ffee', '7f3a92', '5eed42']

const RIDE_LINES = [
  () => [['engine warm.', 'out'], ["let's clear our head.", 'out']],
  () => [['compiling thoughts…', 'dim'], ['launching GT650.', 'out']],
  () => [
    ['some race conditions are easier to solve at 80 km/h.', 'out'],
    ['*on a closed course. obviously.', 'dim'],
  ],
]

let LINE_ID = 0
const line = (text, tone = 'out') => ({ id: ++LINE_ID, text, tone })

export default function CommandPalette() {
  const ws = useWorkshop()
  const reduce = useReducedMotion()
  const { navigate } = useRouter()
  const [input, setInput] = useState('')
  const [lines, setLines] = useState([])
  const inputRef = useRef(null)
  const scrollRef = useRef(null)
  const timersRef = useRef([])
  const historyRef = useRef([])
  const historyIdxRef = useRef(0)
  useScrollLock(ws.paletteOpen)

  const push = (...ls) => setLines((prev) => [...prev, ...ls])
  const later = (ms, fn) => timersRef.current.push(setTimeout(fn, ms))

  useEffect(() => {
    if (ws.paletteOpen) {
      setInput('')
      setLines([line('workshop terminal — type help to look around. tab completes, ↑↓ recalls.', 'dim')])
      requestAnimationFrame(() => inputRef.current?.focus())
    }
    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [ws.paletteOpen])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const run = (raw) => {
    const trimmedRaw = raw.trim()
    const cmd = trimmedRaw.toLowerCase().replace(/\s+/g, ' ')
    if (!cmd) return

    if (historyRef.current[historyRef.current.length - 1] !== trimmedRaw) {
      historyRef.current.push(trimmedRaw)
    }
    historyIdxRef.current = historyRef.current.length

    push(line(`$ ${trimmedRaw}`, 'cmd'))
    ws.unlock('terminal')

    const close = (fn) => {
      ws.closePalette()
      fn?.()
    }

    switch (cmd) {
      case 'help':
        push(...HELP.map(([c, d]) => line(`  ${c.padEnd(12)} ${d}`)))
        break
      case 'whoami':
        push(
          line('AI Engineer'),
          line("Builder of Brok's Forge"),
          line('Professional debugger'),
          line('Occasional sleep enjoyer', 'dim'),
        )
        break
      case 'coffee': {
        push(line('brewing…'))
        const bar = line('░░░░░░░░░░░░░ 0%', 'bar')
        push(bar)
        let pct = 0
        const tick = () => {
          pct = Math.min(pct + 9, 100)
          const filled = Math.round((pct / 100) * 13)
          setLines((prev) =>
            prev.map((l) => (l.id === bar.id ? { ...l, text: `${'█'.repeat(filled)}${'░'.repeat(13 - filled)} ${pct}%` } : l)),
          )
          if (pct < 100) later(90, tick)
          else {
            push(line('motivation compiled ✓', 'ok'))
            later(320, () => push(line('performance +12%', 'dim')))
            later(520, () => push(line('patience +40%', 'dim')))
          }
        }
        later(90, tick)
        break
      }
      case 'fortune':
        push(line(`“${FORTUNES[Math.floor(Math.random() * FORTUNES.length)]}”`))
        break
      case 'sudo hire gokulraj':
        ws.unlock('sudo')
        push(line('Permission granted.', 'ok'))
        later(500, () => push(line('offer letter loading…', 'dim')))
        later(1300, () => push(line('Welcome aboard. ✓', 'ok')))
        break
      case 'sudo':
      case 'hire gokulraj':
        push(line('usage: sudo hire gokulraj', 'dim'))
        break
      case 'deploy friday':
      case 'deploy --friday':
        push(line('ERROR', 'err'), line('absolutely not.', 'err'), line('there is no staging on friday.', 'dim'))
        break
      case 'git push friday':
        push(line('ERROR', 'err'), line('nice try.', 'dim'))
        break
      case 'rm -rf bugs':
      case 'rm -rf /':
        push(line('permission denied.', 'err'), line('nice try.', 'dim'))
        break
      case 'git blame':
        push(line('mostly me.'), line('unfortunately.', 'dim'))
        break
      case 'git log':
      case 'git log --oneline':
        push(...buildLog.entries.map((e, i) => line(`${HASHES[i % HASHES.length]} (${e.date}) ${e.text.split('—')[0].trim()}`)))
        break
      case 'ship':
      case 'ship it':
        push(line('shipping…'), line('done. it was already in production.', 'ok'))
        break
      case 'fixit':
      case 'panic':
        push(line('(╯°□°）╯︵ ┻━┻', 'err'))
        later(700, () => push(line('rolling back production…', 'dim')))
        later(1500, () => push(line('┬─┬ ノ( ゜-゜ノ)  restored. we do not speak of this.', 'ok')))
        break
      case 'make demo':
        push(line("make: *** no rule to make target 'demo'.", 'err'), line('this workshop ships production.', 'dim'))
        break
      case 'heat':
      case 'ignite':
        close(() => ws.toggleForgeMode())
        break
      case 'schematics':
      case 'blueprint':
      case 'debug':
        close(() => ws.toggleDevMode())
        break
      case 'benchmark':
        close(() => navigate('/broksforge#bf-run'))
        break
      case 'speedrun':
      case 'recruiter':
        close(() => ws.openRecruiter())
        break
      case 'ride': {
        const picked = RIDE_LINES[Math.floor(Math.random() * RIDE_LINES.length)]()
        push(...picked.map(([t, tone]) => line(t, tone)))
        later(950, () => close(() => ws.openGarage()))
        break
      }
      case 'garage':
      case 'bike':
        close(() => ws.openGarage())
        break
      case 'github':
      case 'open github':
        close(() => window.open(social.github, '_blank', 'noopener'))
        break
      case 'resume':
      case 'résumé':
        close(() => {
          window.open(identity.resumeUrl, '_blank', 'noopener')
          ws.toast('+10 Recruiter XP')
        })
        break
      case 'email':
        navigator.clipboard
          ?.writeText(identity.email)
          .then(() => push(line(`copied ${identity.email} ✓`, 'ok')))
          .catch(() => push(line(identity.email)))
        break
      case 'forge':
      case "brok's forge":
        close(() => navigate('/broksforge'))
        break
      case 'nyan':
        close(() => ws.launchNyan())
        break
      case 'never gonna give you up':
      case 'rickroll':
        push(line('♪ you know the rules, and so do I…', 'ok'))
        later(900, () => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank', 'noopener'))
        break
      case 'whereami':
        push(line(`workshop://${window.location.pathname === '/' ? 'bench' : window.location.pathname.slice(1)}`))
        break
      case 'exit':
      case 'quit':
      case ':q':
        close()
        break
      case 'clear':
        setLines([])
        break
      default:
        push(line(`command not found: ${cmd}`, 'err'), line('try help. or sudo.', 'dim'))
    }
  }

  const tone = {
    cmd: 'font-medium text-primary',
    out: 'text-secondary',
    dim: 'text-tertiary',
    ok: 'text-status',
    err: 'text-ember',
    bar: 'text-ember',
  }

  const q = input.trim().toLowerCase()
  const suggestion = q ? PRIMARY_COMMANDS.find((c) => c !== q && c.startsWith(q)) : null

  const onInputKeyDown = (e) => {
    if (e.key === 'Escape') {
      ws.closePalette()
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestion) setInput(suggestion)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const hist = historyRef.current
      if (!hist.length) return
      historyIdxRef.current = Math.max(0, historyIdxRef.current - 1)
      setInput(hist[historyIdxRef.current])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const hist = historyRef.current
      const next = historyIdxRef.current + 1
      if (next >= hist.length) {
        historyIdxRef.current = hist.length
        setInput('')
      } else {
        historyIdxRef.current = next
        setInput(hist[next])
      }
    }
  }

  return (
    <AnimatePresence>
      {ws.paletteOpen && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Close terminal"
            onClick={ws.closePalette}
            className="absolute inset-0 cursor-default bg-ink/70 backdrop-blur-sm"
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={reduce ? { duration: 0.01 } : { type: 'spring', stiffness: 420, damping: 32, mass: 0.7 }}
            role="dialog"
            aria-modal="true"
            aria-label="Workshop terminal"
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border-subtle bg-ink-deep shadow-float"
          >
            {/* chrome */}
            <div className="flex items-center gap-2 border-b border-border-subtle bg-raised/60 px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              </span>
              <span className="mx-auto font-mono text-[0.68rem] text-tertiary">gokul@workshop — zsh</span>
              <kbd className="rounded border border-border-subtle px-1.5 py-0.5 font-mono text-[0.6rem] text-tertiary">esc</kbd>
            </div>

            {/* scrollback — scrolls independently; never leaks to the page behind it */}
            <div
              ref={scrollRef}
              tabIndex={0}
              role="log"
              aria-label="Terminal output"
              className="scroll-contain max-h-[42vh] min-h-[10rem] overflow-y-auto px-4 py-3 focus:outline-none"
            >
              <ol className="flex flex-col gap-1 font-mono text-[0.8rem] leading-relaxed">
                {lines.map((l, i) => (
                  <li
                    key={l.id}
                    className={`whitespace-pre-wrap break-words ${tone[l.tone]} ${l.tone === 'cmd' && i > 0 ? 'mt-2' : ''}`}
                  >
                    {l.text}
                  </li>
                ))}
              </ol>
            </div>

            {/* prompt — always visible, never scrolls away */}
            <form
              className="flex items-center gap-2 border-t border-border-subtle px-4 py-3"
              onSubmit={(e) => {
                e.preventDefault()
                run(input)
                setInput('')
              }}
            >
              <span className="font-mono text-[0.8rem] text-ember" aria-hidden="true">
                $
              </span>
              <div className="relative min-w-0 flex-1">
                {suggestion && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre font-mono text-[0.85rem]"
                  >
                    <span className="invisible">{input}</span>
                    <span className="text-tertiary/50">{suggestion.slice(input.length)}</span>
                  </div>
                )}
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  aria-label="Terminal command"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  className="relative z-10 w-full bg-transparent font-mono text-[0.85rem] text-primary caret-ember focus:outline-none"
                />
              </div>
              {suggestion && (
                <kbd className="hidden flex-none rounded border border-border-subtle px-1.5 py-0.5 font-mono text-[0.6rem] text-tertiary sm:inline-block">
                  tab
                </kbd>
              )}
            </form>

            {/* starter chips — discoverability without a manual */}
            <div className="flex flex-wrap gap-1.5 border-t border-border-subtle bg-raised/40 px-4 py-2.5">
              {['help', 'whoami', 'ride', 'coffee', 'fortune', 'fixit', 'sudo hire gokulraj'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    run(c)
                    inputRef.current?.focus()
                  }}
                  className="rounded-md border border-border-subtle px-2 py-1 font-mono text-[0.64rem] text-tertiary transition hover:border-ember/40 hover:text-ember"
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
