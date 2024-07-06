import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// used for "important" in tailwind css
document.body.classList.add('dinhanhthi')

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
