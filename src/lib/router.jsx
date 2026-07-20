import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// Minimal path router — two routes don't justify a dependency.
// SSR-safe: the server passes initialPath; window is only touched client-side.
// Handles: history push/pop, cross-page hash targets (/#work), scroll restoration,
// and the GitHub-Pages SPA fallback (404.html redirects to /?p=<path>).

const RouterContext = createContext({ path: '/', navigate: () => {} })

function normalize(pathname) {
  const p = pathname.replace(/\/+$/, '')
  return p === '' ? '/' : p
}

function scrollToHash(hash) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return
  }
  const jump = () => {
    const el = document.getElementById(hash.slice(1))
    if (!el) return false
    const margin = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - margin, behavior: 'instant' })
    return true
  }
  // The target page mounts behind a route transition, so the element may not exist
  // yet — poll briefly, then re-anchor once more after content-visibility settles.
  window.scrollTo({ top: 0, behavior: 'instant' })
  let tries = 0
  const attempt = () => {
    if (jump()) {
      setTimeout(jump, 150)
    } else if (tries++ < 12) {
      setTimeout(attempt, 90)
    }
  }
  requestAnimationFrame(attempt)
}

export function RouterProvider({ children, initialPath }) {
  const [path, setPath] = useState(() => {
    if (initialPath) return normalize(initialPath)
    if (typeof window === 'undefined') return '/'
    return normalize(window.location.pathname)
  })

  const navigate = useCallback((to) => {
    const url = new URL(to, window.location.origin)
    const next = normalize(url.pathname)
    window.history.pushState(null, '', url.pathname + url.hash)
    setPath(next)
    // Let the new page render before resolving the hash target.
    requestAnimationFrame(() => scrollToHash(url.hash))
  }, [])

  useEffect(() => {
    // GH Pages fallback: 404.html redirected here with ?p=<intended path>.
    const params = new URLSearchParams(window.location.search)
    const stored = params.get('p')
    if (stored) {
      const url = new URL(stored, window.location.origin)
      window.history.replaceState(null, '', url.pathname + url.hash)
      setPath(normalize(url.pathname))
      requestAnimationFrame(() => scrollToHash(url.hash))
    }
  }, [])

  useEffect(() => {
    const onPop = () => {
      setPath(normalize(window.location.pathname))
      requestAnimationFrame(() => scrollToHash(window.location.hash))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export function useRouter() {
  return useContext(RouterContext)
}

// Internal link — intercepts clicks so navigation stays client-side.
export function Link({ to, children, ...props }) {
  const { navigate } = useRouter()
  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate(to)
    props.onClick?.(e)
  }
  return (
    <a href={to} {...props} onClick={onClick}>
      {children}
    </a>
  )
}
