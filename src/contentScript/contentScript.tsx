import '../styles/content_script.scss'
import '../styles/global.scss'
import '../styles/tailwind.scss'
import { watchAndCreateRewriteBtn } from './components/notion/cSRewriteBtn'
import { watchAndCreateRewriteOpt } from './components/notion/cSRewriteOpt'

addRewriteOverlay()

watchAndCreateRewriteBtn()

watchAndCreateRewriteOpt()

/**
 * Add overlay div, our popover elements will be appended to this div
 */
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
