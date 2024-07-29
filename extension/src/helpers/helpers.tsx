/**
 * JS helpers used for both browser and playground
 * DON'T include any browser only code here, use helpersBrowser.ts for that
 */

import { clsx, type ClassValue } from 'clsx'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { twMerge } from 'tailwind-merge'
import RewriteEditor from '../components/rewrite-editor'
import { EditorFrom, Service } from '../type'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createRewriteEditor(from: EditorFrom, content?: string) {
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
      root.render(<RewriteEditor mode="browser" height={editorHeight} content={content} />)

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

/**
 * We use execCommand('copy') to get the already-transformed HTML (by Notion). However, when user
 * selects only text inside a paragraph, the HTML is not transformed. So we need to format it
 */
export function formatSelectedText(text: string) {
  if (text.includes('<span style="')) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    const formattedText = textInsideParagraph(doc.body)
    return formattedText
  }

  return text
    .replace('<meta charset="utf-8">', '') // from notion
    .replace(/<!--\s*notionvc:\s*[a-f0-9\-]+\s*-->/gi, '') // from notion
    .replace(/(\r\n|\n|\r)/gm, '') // remove all new lines
}

function textInsideParagraph(doc: HTMLElement) {
  function wrapTextWithTags(text: string, tags: string[]) {
    tags.forEach(tag => {
      text = `<${tag}>${text}</${tag}>`
    })
    return text
  }

  const spans = doc.querySelectorAll('span')

  spans.forEach(span => {
    const style = span.getAttribute('style')
    if (style) {
      let tags = []

      if (style.includes('font-weight:600')) {
        tags.push('b')
      }
      if (style.includes('font-style:italic')) {
        tags.push('i')
      }
      if (style.includes('border-bottom:0.05em solid;word-wrap:break-word')) {
        tags.push('u')
      }
      if (style.includes('text-decoration:line-through')) {
        tags.push('s')
      }
      if (
        style.includes('font-family') &&
        (style.includes('Courier') || style.includes('monospace'))
      ) {
        tags.push('code')
      }

      if (tags.length > 0) {
        const text = span.innerHTML
        const wrappedText = wrapTextWithTags(text, tags)
        span.outerHTML = wrappedText // replace completely current <span> with the new wrapped text
      }
    }
  })

  return doc.innerHTML
}

// TODO: remove or remove export only?
export const notionBlockTypes = [
  'notion-text-block',
  'notion-header-block',
  'notion-sub_header-block',
  'notion-sub_sub_header-block',
  'notion-bulleted_list-block',
  'notion-numbered_list-block',
  'notion-to_do-block',
  'notion-toggle-block',
  'notion-quote-block',
  'notion-callout-block',
  'notion-bookmark-block',
  'notion-image-block',
  'notion-video-block',
  'notion-audio-block',
  'notion-file-block',
  'notion-pdf-block',
  'notion-equation-block',
  'notion-code-block',
  'notion-embed-block',
  'notion-collection_view-block',
  'notion-table_of_contents-block',
  'notion-child-page-block',
  'notion-breadcrumb-block',
  'notion-divider-block',
  'notion-column-list-block',
  'notion-column-block',
  'notion-page-block',
  'notion-unsupported-block'
]

export function generateAPIKeyPlaceholder(service: Service): string {
  switch (service) {
    case 'openai':
    default:
      return 'sk-xxx...xxx'
    case 'mistral':
      return '1bx...w0'
    case 'claude':
      return 'sk-ant-api-xxx...xxx'
    case 'gemini':
      return 'AIza...xxx'
  }
}
