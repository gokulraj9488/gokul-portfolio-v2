import { useEffect } from 'react'

// Per-route document title + meta description (no head-manager dependency).
export function usePageMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title
    if (description) {
      const el = document.querySelector('meta[name="description"]')
      if (el) el.setAttribute('content', description)
    }
  }, [title, description])
}
