import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import PlayerContextProvider from './context/PlayerContext.jsx'
import { SidebarRightProvider } from './context/SidebarRightContext.jsx'
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <PlayerContextProvider>
      <App />
    </PlayerContextProvider>
    
    </BrowserRouter>
  </StrictMode>,
)
