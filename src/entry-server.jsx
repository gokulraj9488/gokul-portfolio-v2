import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Build-time prerender entry (scripts/prerender.mjs). Renders a route to static
// HTML so first paint carries real content; the client bundle hydrates it.
export function render(path) {
  return renderToString(<App initialPath={path} />)
}
