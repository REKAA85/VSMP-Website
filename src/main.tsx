import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App.tsx'

// Restore the real path after the GitHub Pages 404.html SPA redirect (see public/404.html).
const redirect = new URLSearchParams(location.search).get('redirect')
if (redirect) {
  history.replaceState(null, '', import.meta.env.BASE_URL.replace(/\/$/, '') + redirect)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
