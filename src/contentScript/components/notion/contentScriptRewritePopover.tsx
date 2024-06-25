import React from 'react'
import { createRoot } from 'react-dom/client'
import RewritePopoverBrowser from './RewritePopoverBrowser'

export function listenToPopoverChanges() {
  const notionOverlayContainer = document.querySelector('.notion-overlay-container')
  const observer = new MutationObserver((mutationsList, _observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const selectedDecoBlocks = document.querySelectorAll('div.notion-selectable-halo')
        if (selectedDecoBlocks.length > 0) {
          setTimeout(() => {
            showRewritePopover(notionOverlayContainer)
          }, 0)
        }
      }
    }
  })
  if (!notionOverlayContainer) {
    //The node we need does not exist yet. Wait 500ms and try again
    window.setTimeout(listenToPopoverChanges, 500)
    return
  }
  const config = { childList: true }
  observer.observe(notionOverlayContainer, config)
}

function showRewritePopover(notionOverlayContainer: Element | null) {
  if (!notionOverlayContainer) return
  const divBelowSearch = notionOverlayContainer.querySelector('.notion-scroller.vertical')
  if (!divBelowSearch) return
  const divBelowSearchParent = divBelowSearch.parentElement
  if (!divBelowSearchParent) return
  // 👇 We don't show rewrite option when "new block" popover appears (eg. press "/")
  if ((divBelowSearchParent.firstChild as HTMLElement)?.classList?.contains('notion-scroller'))
    return

  const secondChild = divBelowSearchParent?.children[1]
  if (isRewritePopoverAdded()) return

  const rewritePopover = document.createElement('div')
  decorateRewritePopover(rewritePopover)
  divBelowSearchParent.insertBefore(rewritePopover, secondChild)
  const root = createRoot(rewritePopover)
  autoSetBgColorToNoneToOtherItems(rewritePopover, divBelowSearch)
  root.render(<RewritePopoverBrowser selected={getSelectedBlocksHtml()} />)
}

function autoSetBgColorToNoneToOtherItems(
  rewritePopover: HTMLElement,
  divBelowSearch: Element | null
) {
  rewritePopover.addEventListener('mouseenter', () => {
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

function decorateRewritePopover(rewriteBtn: HTMLElement) {
  rewriteBtn.classList.add('dinhanhthi') // used for "important" in tailwind css
  rewriteBtn.classList.add('re-write-popover')
}

function isRewritePopoverAdded() {
  return document.querySelector('.re-write-popover')
}

function getSelectedBlocksHtml() {
  const selectedDecoBlocks = document.querySelectorAll('div.notion-selectable-halo')
  let html = ''
  for (const block of selectedDecoBlocks) {
    const selectedBlock = block?.previousSibling?.firstChild?.firstChild as HTMLElement
    html += selectedBlock.outerHTML
  }
  return html
}
