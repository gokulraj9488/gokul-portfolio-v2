import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// The workshop's play layer — one context for every discoverable mode and reward.
// All state is client-only and defaults off, so the prerendered HTML never changes.
//
//   devMode      — Konami code (↑↑↓↓←→←→BA): blueprint overlays, debug grid, FPS
//   forgeMode    — hover the logo spark five times, a hammer appears; click it
//   paletteOpen  — press "/" anywhere: the workshop terminal
//   recruiter    — WORKSHOP://RECRUITER, for people with 40 tabs open
//   nyan         — you'll know it when you see it
//   achievements — curiosity has a scoreboard
//   toast(msg)   — small rewards

const WorkshopContext = createContext(null)

const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']

// name -> label. Deliberately small; every one is earnable in one visit.
export const ACHIEVEMENTS = {
  terminal: 'Hello, operator',
  sudo: 'Root access',
  konami: 'Behind the drywall',
  forge: 'Pyromaniac',
  recruiter: 'Speedrunner',
  radio: 'Vibe check',
  bike: 'Touched grass — 0.1% of visitors',
  nyan: 'Meme historian',
}
const ACHIEVEMENT_COUNT = Object.keys(ACHIEVEMENTS).length
const STORE_KEY = 'gq-achievements'

function isTypingTarget(el) {
  return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
}

export function WorkshopProvider({ children }) {
  const [devMode, setDevMode] = useState(false)
  const [forgeMode, setForgeMode] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [recruiterOpen, setRecruiterOpen] = useState(false)
  const [garageOpen, setGarageOpen] = useState(false)
  const [nyanRun, setNyanRun] = useState(0) // increments to launch the cat
  const [unlocked, setUnlocked] = useState([])
  const [toasts, setToasts] = useState([])
  const konamiPos = useRef(0)
  const toastId = useRef(0)

  // Achievements persist — curiosity should compound across visits.
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORE_KEY) || '[]')
      if (Array.isArray(stored)) setUnlocked(stored.filter((k) => ACHIEVEMENTS[k]))
    } catch {
      /* fresh start */
    }
  }, [])

  const toast = useCallback((text) => {
    const id = ++toastId.current
    setToasts((t) => [...t, { id, text }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  const unlock = useCallback(
    (key) => {
      if (!ACHIEVEMENTS[key]) return
      setUnlocked((prev) => {
        if (prev.includes(key)) return prev
        const next = [...prev, key]
        try {
          localStorage.setItem(STORE_KEY, JSON.stringify(next))
        } catch {
          /* private mode */
        }
        toast(`achievement unlocked — ${ACHIEVEMENTS[key]} (${next.length}/${ACHIEVEMENT_COUNT})`)
        return next
      })
    },
    [toast],
  )

  const toggleDevMode = useCallback(() => {
    setDevMode((v) => {
      if (!v) unlock('konami')
      toast(v ? 'developer mode off — the blueprints roll up' : 'developer mode — welcome behind the drywall')
      return !v
    })
  }, [toast, unlock])

  const toggleForgeMode = useCallback(() => {
    setForgeMode((v) => {
      if (!v) unlock('forge')
      toast(v ? 'the forge cools.' : 'the forge is lit.')
      return !v
    })
  }, [toast, unlock])

  const launchNyan = useCallback(() => {
    unlock('nyan')
    setNyanRun((n) => n + 1)
  }, [unlock])

  // Mode classes live on <html> so plain CSS can restyle everything.
  useEffect(() => {
    document.documentElement.classList.toggle('dev-mode', devMode)
  }, [devMode])
  useEffect(() => {
    document.documentElement.classList.toggle('forge-mode', forgeMode)
  }, [forgeMode])

  // Global keys: Konami anywhere, "/" for the terminal.
  useEffect(() => {
    const onKey = (e) => {
      if (isTypingTarget(e.target)) return
      const key = e.key.toLowerCase()

      if (key === KONAMI[konamiPos.current]) {
        konamiPos.current += 1
        if (konamiPos.current === KONAMI.length) {
          konamiPos.current = 0
          toggleDevMode()
        }
      } else {
        konamiPos.current = key === KONAMI[0] ? 1 : 0
      }

      if (key === '/' && !paletteOpen && !recruiterOpen) {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen, recruiterOpen, toggleDevMode])

  const value = {
    devMode,
    forgeMode,
    paletteOpen,
    recruiterOpen,
    nyanRun,
    unlocked,
    achievementCount: ACHIEVEMENT_COUNT,
    toast,
    unlock,
    launchNyan,
    toggleDevMode,
    toggleForgeMode,
    openPalette: () => {
      // Once someone has used the console, the idle hint retires forever.
      try {
        localStorage.setItem('gq-console-used', '1')
      } catch {
        /* private mode */
      }
      setPaletteOpen(true)
    },
    closePalette: () => setPaletteOpen(false),
    openRecruiter: () => {
      unlock('recruiter')
      setRecruiterOpen(true)
    },
    closeRecruiter: () => setRecruiterOpen(false),
    garageOpen,
    openGarage: () => {
      unlock('bike')
      setGarageOpen(true)
    },
    closeGarage: () => setGarageOpen(false),
  }

  return (
    <WorkshopContext.Provider value={value}>
      {children}
      {/* rewards — polite, small, gone in ~3s */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-lg border border-ember/30 bg-raised/95 px-4 py-2 font-mono text-[0.76rem] text-primary shadow-lift backdrop-blur"
          >
            {t.text}
          </div>
        ))}
      </div>
    </WorkshopContext.Provider>
  )
}

export function useWorkshop() {
  return useContext(WorkshopContext)
}
