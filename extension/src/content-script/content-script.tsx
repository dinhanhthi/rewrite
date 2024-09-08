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