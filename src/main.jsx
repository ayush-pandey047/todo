import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(  // Why we use render()?  laana {Displaying Stuff that is what is rendering coversation of JSX}
  <StrictMode>
    <App />
  </StrictMode>,
)
