import '../styles/content_script.scss'
import '../styles/global.scss'
import '../styles/tailwind.scss'
import { listenToMenuChanges } from './components/notion/cSRewriteBtn'
import { listenToPopoverChanges } from './components/notion/cSRewriteOpt'

listenToMenuChanges()
listenToPopoverChanges()

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
