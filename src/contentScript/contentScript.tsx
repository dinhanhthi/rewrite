import '../styles/content_script.scss'
import '../styles/global.scss'
import '../styles/tailwind.scss'
import { watchAndCreateRewriteBtn } from './components/notion/cSRewriteBtn'
import { watchAndCreateRewriteOpt } from './components/notion/cSRewriteOpt'

// Overlay div for popover
addRewriteOverlay()

// When selecting words
watchAndCreateRewriteBtn()

// When selecting a block or clicking on "..." in the menu bar (after selecting words)
watchAndCreateRewriteOpt()

function addRewriteOverlay() {
  const overlay = document.createElement('div')
  overlay.classList.add('dinhanhthi')
  overlay.classList.add('rewrite-overlay')
  document.body.appendChild(overlay)
}

export function getSelectedText() {
  return window?.getSelection()?.toString() || ''
}

/**
 * Get all the HTML of the selection
 */
export function getSelectedHtml() {
  const range = window.getSelection()?.getRangeAt(0)
  if (!range) return ''
  const fragment = range.cloneContents()
  const div = document.createElement('div')
  div.appendChild(fragment)
  const htmlString = div.innerHTML
  return htmlString
}
