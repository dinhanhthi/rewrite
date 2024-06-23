import React from 'react'
import { createRoot } from 'react-dom/client'

import '../styles/content_script.scss'
import '../styles/global.scss'
import '../styles/tailwind.scss'
import ReWriteBrowser from './components/ReWriteBrowser'

document.addEventListener('click', () => {
  if (getSelectedText().length > 0) {
    showReWriteBtn()
  }
})

document.addEventListener('selectionchange', () => {
  if (getSelectedText().length === 0) {
    removeReWriteBtn()
    return
  }
})

window.addEventListener(
  'wheel', // because "scroll" is not working (https://bit.ly/45zn533)
  () => {
    if (isReWriteBtnAdded()) {
      const reWriteBtn = getReWriteBtn()
      if (reWriteBtn) {
        const rect = getPosition()
        setPosition(reWriteBtn, rect)
      }
    }
  },
  false
)

function showReWriteBtn() {
  if (isReWriteBtnAdded()) return
  const rect = getPosition()
  const body = document.querySelector('body')
  const reWriteBtn = document.createElement('div')
  decorateReWriteBtn(reWriteBtn, rect)
  if (!reWriteBtn || !body) {
    throw new Error('Could not create the ReWriteBtn')
  }
  body.appendChild(reWriteBtn)
  const root = createRoot(reWriteBtn)
  root.render(<ReWriteBrowser position={{ left: rect.left, top: rect.top }} />)
}

function removeReWriteBtn() {
  const reWriteBtn = getReWriteBtn()
  if (reWriteBtn) {
    reWriteBtn.remove()
  }
}

function getSelectedText() {
  return window?.getSelection()?.toString() || ''
}

function getPosition(): DOMRect {
  return window?.getSelection()?.getRangeAt(0).getBoundingClientRect() || new DOMRect()
}

function decorateReWriteBtn(reWriteBtn: HTMLElement, rect: DOMRect) {
  reWriteBtn.classList.add('dinhanhthi') // used for tailwind css
  reWriteBtn.classList.add('re-write-btn')
  // reWriteBtn.classList.add('clearfix')
  reWriteBtn.style.width = '20px'
  reWriteBtn.style.height = '20px'
  reWriteBtn.style.position = 'absolute'
  reWriteBtn.style.zIndex = '9999'
  setPosition(reWriteBtn, rect)
}

function setPosition(reWriteBtn: HTMLElement, rect: DOMRect) {
  reWriteBtn.style.left = `${rect.left}px`
  reWriteBtn.style.top = `${rect.top}px`
}

function isReWriteBtnAdded(): boolean {
  return !!getReWriteBtn()
}

function getReWriteBtn(): HTMLElement | null {
  return document.querySelector('.re-write-btn')
}
