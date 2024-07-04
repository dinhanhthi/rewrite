/**
 * JS helpers used for both browser and playground
 * DON'T include any browser only code here, use helpersBrowser.ts for that
 */

import { clsx, type ClassValue } from 'clsx'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { twMerge } from 'tailwind-merge'
import RewriteEditor from '../contentScript/components/RewriteEditor'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createRewriteEditor() {
  removeAllRewriteEditors()

  const selectedText = window.getSelection()
  if (selectedText && selectedText.rangeCount > 0) {
    const range = selectedText.getRangeAt(0)
    let endContainer = range.endContainer as HTMLElement
    while (endContainer && !endContainer?.classList?.contains('notion-selectable')) {
      if (endContainer.parentNode) endContainer = endContainer.parentNode as HTMLElement
    }
    const scroller = endContainer.closest('.notion-scroller.vertical')
    const pos = {
      top: endContainer.offsetTop + endContainer.offsetHeight + 4,
      left: endContainer.offsetLeft,
      width: endContainer.offsetWidth
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

export function removeAllRewriteEditors() {
  const editors = document.querySelectorAll('#rewrite-editor')
  editors.forEach(editor => editor.remove())
}
