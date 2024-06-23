import React from 'react'
import { createRoot } from 'react-dom/client'

import '../styles/content_script.scss'
import '../styles/global.scss'
import '../styles/tailwind.scss'
import ReWriteBrowser from './components/ReWriteBrowser'

document.addEventListener('selectionchange', () => {
  checkAndShowReWriteBtn()
})

document.addEventListener('click', () => {
  checkAndShowReWriteBtn()
})

function checkAndShowReWriteBtn() {
  if (getSelectedText().length > 0) {
    setTimeout(() => {
      showReWriteBtn()
    }, 300) // wait for Notion's menu to be created
  }
}

function showReWriteBtn() {
  const notionMenu = getNotionMenu()
  if (!notionMenu) return
  if (isRewriteBtnAdded()) return
  const reWriteBtn = document.createElement('div')
  decorateReWriteBtn(reWriteBtn)
  notionMenu.insertBefore(reWriteBtn, notionMenu.firstChild)
  const root = createRoot(reWriteBtn)
  root.render(<ReWriteBrowser />)
}

function getNotionMenu() {
  const notionTextActionMenu = document.querySelector('.notion-text-action-menu')
  // Return the container of menu items
  return notionTextActionMenu?.children?.[1]?.children?.[0] as HTMLElement
}

function getSelectedText() {
  return window?.getSelection()?.toString() || ''
}

function decorateReWriteBtn(reWriteBtn: HTMLElement) {
  reWriteBtn.classList.add('dinhanhthi') // used for tailwind css
  reWriteBtn.classList.add('re-write-btn')
}

function isRewriteBtnAdded() {
  return document.querySelector('.re-write-btn')
}
