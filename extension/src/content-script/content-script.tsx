import { watchAndCreateRewriteBtn } from './notion/cs-rewrite-btn'
import { watchAndCreateRewriteOpt } from './notion/cs-rewrite-opt'
import '../styles/content_script.scss'
import '../styles/global.scss'
import '../styles/tailwind.scss'

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

/**
 * Decorate the selected text by using the CSS Highlight API
 */
export function decorateSelectedText() {
  const selection = window.getSelection()
  if (!selection || selection.isCollapsed) return
  const range = selection.getRangeAt(0)
  const highlight = new Highlight(range);
  CSS.highlights.set("rewrite-highlight", highlight);
}
