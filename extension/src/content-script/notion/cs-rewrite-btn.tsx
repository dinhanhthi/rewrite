import React from 'react'
import { createRoot } from 'react-dom/client'
import { convertSelectedString, getSelectedHtml } from '../../helpers/helpers-notion'
import { decorateSelectedText } from '../content-script'
import RewriteBtnBrowser from './rewrite-btn-browser'

/**
 * When selecting words
 */
export function watchAndCreateRewriteBtn() {
  const notionOverlayContainer = document.querySelector('.notion-overlay-container')
  const observer = new MutationObserver((mutationsList, _observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if ((window?.getSelection()?.toString() || '').length > 0) {
          setTimeout(() => {
            showReWriteBtn()
            decorateSelectedText()
          }, 0)
        }
      }
    }
  })
  if (!notionOverlayContainer) {
    window.setTimeout(watchAndCreateRewriteBtn, 500)
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

  const selectedText = getSelectedHtml()
  /* ###Thi */ console.log(`👉👉👉 selectedText: `, selectedText)
  const extractedtext = convertSelectedString(selectedText)
  /* ###Thi */ console.log(`👉👉👉 extractedtext: `, extractedtext)

  root.render(<RewriteBtnBrowser />)
}

function getNotionMenu() {
  const notionTextActionMenu = document.querySelector('.notion-text-action-menu')
  // The container of the menu
  return notionTextActionMenu?.children?.[1]?.children?.[0] as HTMLElement
}

function decorateReWriteBtn(reWriteBtn: HTMLElement) {
  reWriteBtn.classList.add('dinhanhthi') // used for "important" in tailwind css
  reWriteBtn.classList.add('rewrite-btn')
  reWriteBtn.style.marginRight = '4px'
}

function isRewriteBtnAdded() {
  return document.querySelector('.rewrite-btn')
}
