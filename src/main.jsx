import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/fredoka-one'
import '@fontsource/baloo-2'
import './index.css'
import App from './App.jsx'
import { initBrowserCompatibility } from './utils/browserCompatibility'

// Initialize browser compatibility checks
initBrowserCompatibility();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
