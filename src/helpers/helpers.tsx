/**
 * JS helpers used for both browser and playground
 * DON'T include any browser only code here, use helpersBrowser.ts for that
 */

import { clsx, type ClassValue } from 'clsx'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { twMerge } from 'tailwind-merge'
import RewriteEditor from '../contentScript/components/RewriteEditor'
import { EditorFrom } from '../type'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createRewriteEditor(from: EditorFrom) {
  removeAllRewriteEditors()

  let endContainer: HTMLElement | null = null
  if (from === 'menu') {
    const selectedText = window.getSelection()
    if (selectedText && selectedText.rangeCount > 0) {
      const range = selectedText.getRangeAt(0)
      endContainer = range.endContainer as HTMLElement
      while (endContainer && !endContainer?.classList?.contains('notion-selectable')) {
        if (endContainer.parentNode) endContainer = endContainer.parentNode as HTMLElement
      }
    }
  } else if (from === 'opt') {
    const notionHalos = document.querySelectorAll('.notion-selectable-halo')
    endContainer = notionHalos?.[notionHalos.length - 1]?.parentNode as HTMLElement
  }

  if (endContainer) {
    const pos = {
      top: endContainer.offsetTop + endContainer.offsetHeight + 4,
      left: endContainer.offsetLeft,
      width: endContainer.offsetWidth
    }
    const scroller = endContainer.closest('.notion-scroller.vertical') as HTMLElement
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
      const editorHeight = 200
      root.render(<RewriteEditor mode="browser" height={editorHeight} />)

      /**
       * We don't use `rect.bottom` because the editor isn't rendered yet, instead we use
       * `rect.top + editorHeight`
       */
      const rect = editor.getBoundingClientRect()
      const isEditorInViewport =
        rect.top >= 0 &&
        rect.top + editorHeight <= (window.innerHeight || document.documentElement.clientHeight)

      if (!isEditorInViewport) {
        scroller.scrollTo({
          top: scroller.scrollTop + editorHeight + 10,
          behavior: 'smooth'
        })
      }
    }
  }
}

export function removeAllRewriteEditors() {
  const editors = document.querySelectorAll('#rewrite-editor')
  editors.forEach(editor => editor.remove())
}
