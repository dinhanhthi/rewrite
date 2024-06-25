import React from 'react'
import { createRoot } from 'react-dom/client'
import { getSelectedHtml, getSelectedText } from '../../contentScript'
import RewriteBtnBrowser from './RewriteBtnBrowser'

export function listenToMenuChanges() {
  const notionOverlayContainer = document.querySelector('.notion-overlay-container')
  const observer = new MutationObserver((mutationsList, _observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if (getSelectedText().length > 0) {
          setTimeout(() => {
            showReWriteBtn()
          }, 0)
        }
      }
    }
  })
  if (!notionOverlayContainer) {
    //The node we need does not exist yet. Wait 500ms and try again
    window.setTimeout(listenToMenuChanges, 500)
    return
  }
  const config = { childList: true }
  observer.observe(notionOverlayContainer, config)
}

function showReWriteBtn() {
  const notionMenu = getNotionMenu()
  if (!notionMenu) return
  if (isRewriteBtnAdded()) return
  const reWriteBtn = document.createElement('div')
  decorateReWriteBtn(reWriteBtn)
  notionMenu.insertBefore(reWriteBtn, notionMenu.firstChild)
  const root = createRoot(reWriteBtn)
  root.render(<RewriteBtnBrowser selected={getSelectedHtml()} />)
}

function getNotionMenu() {
  const notionTextActionMenu = document.querySelector('.notion-text-action-menu')
  // The container of the menu
  return notionTextActionMenu?.children?.[1]?.children?.[0] as HTMLElement
}

function decorateReWriteBtn(reWriteBtn: HTMLElement) {
  reWriteBtn.classList.add('dinhanhthi') // used for "important" in tailwind css
  reWriteBtn.classList.add('re-write-btn')
}

function isRewriteBtnAdded() {
  return document.querySelector('.re-write-btn')
}
