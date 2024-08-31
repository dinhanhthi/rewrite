import React from 'react'
import { createRoot } from 'react-dom/client'
import RewriteOptBrowser from './rewrite-opt-browser'

/**
 * When selecting a block or clicking on "..." in the menu bar (after selecting words)
 */
export function watchAndCreateRewriteOpt() {
  const notionOverlayContainer = document.querySelector('.notion-overlay-container')
  const observer = new MutationObserver((mutationsList, _observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const selectedDecoBlocks = document.querySelectorAll('div.notion-selectable-halo')
        if (selectedDecoBlocks.length > 0) {
          setTimeout(() => {
            showRewriteOpt(notionOverlayContainer)
          }, 0)
        }
      }
    }
  })
  if (!notionOverlayContainer) {
    window.setTimeout(watchAndCreateRewriteOpt, 500)
    return
  }
  const config = { childList: true }
  observer.observe(notionOverlayContainer, config)
}

function showRewriteOpt(notionOverlayContainer: Element | null) {
  if (!notionOverlayContainer) return
  const divBelowSearch = notionOverlayContainer.querySelector('.notion-scroller.vertical')
  if (!divBelowSearch) return
  const divBelowSearchParent = divBelowSearch.parentElement
  if (!divBelowSearchParent) return
  // 👇 We don't show rewrite option when "new block" popover appears (eg. press "/")
  if ((divBelowSearchParent.firstChild as HTMLElement)?.classList?.contains('notion-scroller'))
    return

  const secondChild = divBelowSearchParent?.children[1]
  if (isRewriteOptAdded()) return

  const rewriteOpt = document.createElement('div')
  decorateRewriteOpt(rewriteOpt)
  divBelowSearchParent.insertBefore(rewriteOpt, secondChild)
  const root = createRoot(rewriteOpt)
  autoSetBgColorToNoneToOtherItems(rewriteOpt, divBelowSearch)
  root.render(<RewriteOptBrowser selectedText={getSelectedBlocksHtml()} />)
}

function autoSetBgColorToNoneToOtherItems(rewriteOpt: HTMLElement, divBelowSearch: Element | null) {
  rewriteOpt.addEventListener('mouseenter', () => {
    const commentDivOpt = divBelowSearch?.querySelectorAll('div[role="option"]')?.[0] as HTMLElement
    if (commentDivOpt) {
      // make sure when we leave the rewrite popover, the bg of this will be back to normal
      commentDivOpt.classList.add('notion-popover-item-hover')
    }

    // When click "..." in the menu
    const commentDivMenuItem = divBelowSearch?.querySelectorAll(
      'div[role="menuitem"]'
    )?.[0] as HTMLElement
    if (commentDivMenuItem) {
      commentDivMenuItem.classList.add('notion-popover-item-hover')
    }
  })
}

function decorateRewriteOpt(rewriteBtn: HTMLElement) {
  rewriteBtn.classList.add('dinhanhthi') // used for "important" in tailwind css
  rewriteBtn.classList.add('rewrite-opt')
}

function isRewriteOptAdded() {
  return document.querySelector('.rewrite-opt')
}

/**
 * Notion uses it own selection method (CSS) for selecting whole blocks. There is no native browser's
 * selection!
 *
 * TIP: Inspect element > choose div.notion-overlay-container > unselect z-index so that we can
 * inspect the below elements
 */
function getSelectedBlocksHtml() {
  const selectedDecoBlocks = document.querySelectorAll('div.notion-selectable-halo')
  let html = ''
  for (const block of selectedDecoBlocks) {
    const selectedBlock = block?.previousSibling as HTMLElement
    html += selectedBlock?.outerHTML
  }
  return html
}
