import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { applyPerfClass } from './lib/device.js'

// Tag <html> with the device tier before first paint so CSS gates effects with no flash.
applyPerfClass()

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Prerendered HTML (scripts/prerender.mjs) hydrates; a bare shell mounts fresh.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
