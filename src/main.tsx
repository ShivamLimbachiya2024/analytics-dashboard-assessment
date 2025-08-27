import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Initialize Locator.js in development
if (process.env.NODE_ENV === 'development') {
  import('@locator/runtime').then(({ setupLocator }) => {
    setupLocator({
      adapter: 'vscode', // Change to your preferred editor
      // You can also use 'webstorm', 'sublime', 'atom', etc.
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
