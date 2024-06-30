/*
 * Helpers used only for the browser
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import browser from 'webextension-polyfill'
import RewriteEditor from '../contentScript/components/RewriteEditor'

export async function getName(): Promise<string> {
  const { name } = await browser.storage.sync.get(['name'])
  return name
}

export async function handleSaveName(name: string) {
  const response = await browser.runtime.sendMessage({
    type: 'saveName',
    name
  })
  if (!response) return
}

export function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

export function createRewriteEditor() {
  removeAllRewriteEditors()

  const selectedText = window.getSelection()
  if (selectedText && selectedText.rangeCount > 0) {
    const range = selectedText.getRangeAt(0)
    let paragraph = range.commonAncestorContainer as HTMLElement
    // Ensure the paragraph is a <p> or <div> element (could be a text node)
    while (paragraph && paragraph.nodeType !== Node.ELEMENT_NODE) {
      if (paragraph.parentNode) paragraph = paragraph.parentNode as HTMLElement
    }
    const scroller = paragraph.closest('.notion-scroller.vertical')
    const pos = {
      top: paragraph.offsetTop + paragraph.offsetHeight + 4,
      left: paragraph.offsetLeft,
      width: paragraph.offsetWidth
    }
    if (scroller) {
      const editor = document.createElement('div')
      editor.classList.add('dinhanhthi')
      editor.id = 'rewrite-editor'
      editor.style.position = 'absolute'
      editor.style.top = pos.top + 'px'
      editor.style.left = pos.left + 'px'
      editor.style.width = pos.width + 'px'
      editor.style.height = 'auto'
      editor.style.zIndex = '1000'
      scroller.appendChild(editor)
      const root = createRoot(editor)
      root.render(<RewriteEditor />)
    }
  }
}

// function handleClickOutsideRewriteEditor(event) {
//   if (!temporaryDisable && targetDiv && !targetDiv.contains(event.target)) {
//       messageDiv.textContent = 'Clicked outside the div!';
//       alert('Clicked outside the div!');
//   }
// }

export function removeAllRewriteEditors() {
  const editors = document.querySelectorAll('#rewrite-editor')
  editors.forEach(editor => editor.remove())
}
