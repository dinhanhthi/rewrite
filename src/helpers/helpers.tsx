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

export function createRewriteEditor(from: EditorFrom, selected?: string) {
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
      root.render(<RewriteEditor mode="browser" height={editorHeight} selected={selected} />)

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
 * Selected html is a string of raw html content, we need to format it before
 * sending to the LLM services.
 *
 * Use FormatSelectedPlayground for playground mode.
 */
export function formatSelectedText(text: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'text/html')

  const isInsideParagraph = !doc.body.querySelector('div')

  if (isInsideParagraph) {
    return textInsideParagraph(doc.body)
  } else {
    /**
     * Because Notion splits all HTML elements into div blocks, even ul and ol. We need to "group"
     * the div with the same of ul or ol or other kind of types before we can further process them.
     */


    const list = processList(doc.body)
    if (list) {
      return list.outerHTML
    }
  }

  return doc.body.innerHTML
}

/**
 * Process ul, ol
 */
function processList(parentDiv: HTMLElement) {
  let list: any
  let typeClass: string = ''
  const firstChild = parentDiv.querySelector(':scope > div[class$="_list-block"]')
  if (!firstChild) return null

  if (firstChild.classList.contains('notion-numbered_list-block')) {
    list = document.createElement('ol')
    typeClass = '.notion-numbered_list-block'
  } else if (firstChild.classList.contains('notion-bulleted_list-block')) {
    list = document.createElement('ul')
    typeClass = '.notion-bulleted_list-block'
  }

  let blocks = parentDiv.querySelectorAll(`:scope > ${typeClass}`) as any
  if (blocks?.length > 0) {
    blocks = Array.from(blocks)?.filter(
      (nB: any) => !!nB.querySelector('div.notranslate[contenteditable="true"]')
    )
  }

  blocks.forEach((block: any) => {
    const contentDiv = block?.querySelector('div.notranslate[contenteditable="true"]')
    if (contentDiv) {
      const li = document.createElement('li')
      li.textContent = contentDiv.textContent // TODO: apply spans logics

      const _block = block?.querySelector('div[class$="_list-block"]')
      const _blockParent = _block?.parentElement
      let nestedBlocks = _blockParent?.querySelectorAll(':scope > div[class$="_list-block"]')

      // Make sure there is no ul, ol with empty children
      if (nestedBlocks?.length > 0) {
        nestedBlocks = Array.from(nestedBlocks)?.filter(
          (nB: any) => !!nB.querySelector('div.notranslate[contenteditable="true"]')
        )
      }

      if (nestedBlocks?.length > 0) {
        const nestedList = processList(_blockParent)
        if (nestedList) {
          li.appendChild(nestedList)
        }
      }

      list.appendChild(li)
    }
  })

  return list
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