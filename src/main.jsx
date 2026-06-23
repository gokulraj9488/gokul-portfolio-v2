import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { applyPerfClass } from './lib/device.js'

// Tag <html> with the device tier before first paint so CSS gates effects with no flash.
applyPerfClass()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
