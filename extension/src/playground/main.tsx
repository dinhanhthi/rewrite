/**
 * This uses ./index.html
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// used for "important" in tailwind css
// Although inside index.html, we have already set the class to "dinhanhthi" but this one is
// also required for the dialog to work properly
document.body.classList.add('dinhanhthi')

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
