/**
 * Notion uses it own selection method (CSS) for selecting whole blocks. There is no native browser's
 * selection!
 *
 * TIP: Inspect element > choose div.notion-overlay-container > unselect z-index so that we can
 * inspect the below elements
 */
export function getSelectedBlocksHtml() {
  const selectedDecoBlocks = document.querySelectorAll('div.notion-selectable-halo')
  let html = ''
  for (const block of selectedDecoBlocks) {
    const selectedBlock = block?.previousSibling as HTMLElement
    html += selectedBlock?.outerHTML
  }
  return html
}

export function getSelectedHtml() {
  let selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    let range = selection.getRangeAt(0)
    let div = document.createElement('div')
    div.appendChild(range.cloneContents())
    return div.innerHTML
  }
  return ''
}

/**
 * Notion html contains many divs of many different block types. This method will convert them to
 * a standard HTML string like p, ul, ol, li, code, etc.
 */
export function convertSelectedString(html: string): string {
  if (!html.includes('<div')) return convertParagraph(html)

  const container = document.createElement('div')
  container.innerHTML = html
  const blocks = Array.from(container.children) as HTMLDivElement[]
  let currentUl: HTMLUListElement | null = null
  let currentOl: HTMLOListElement | null = null
  blocks.forEach(block => {
    const contentDiv = block.querySelector('div[contenteditable="true"]') as HTMLDivElement
    if (contentDiv) {
      if (block.classList.contains('notion-bulleted_list-block')) {
        if (!currentUl) {
          currentUl = document.createElement('ul')
          block.parentNode?.insertBefore(currentUl, block) // Insert UL before the first block
        }
        const li = document.createElement('li')
        li.innerHTML = convertParagraph(contentDiv.innerHTML)
        currentUl.appendChild(li)
        block.remove()
      } else if (block.classList.contains('notion-numbered_list-block')) {
        if (!currentOl) {
          currentOl = document.createElement('ol')
          block.parentNode?.insertBefore(currentOl, block) // Insert UL before the first block
        }
        const li = document.createElement('li')
        li.innerHTML = convertParagraph(contentDiv.innerHTML)
        currentOl.appendChild(li)
        block.remove()
      } else {
        const p = document.createElement('p')
        const content = convertParagraph(contentDiv.innerHTML)
        p.innerHTML = content
        block.parentNode?.insertBefore(p, block)
        block.remove()
        currentUl = null
        currentOl = null
      }
    }
  })
  return container.innerHTML
}

/**
 * On select texts inside a paragraph. Not contain any divs.
 */
function convertParagraph(text?: string) {
  if (!text) return ''
  if (text.includes('<span style="')) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    const formattedText = covertSpansAndText(doc.body)
    return formattedText
  }

  return text
    .replace('<meta charset="utf-8">', '') // from notion
    .replace(/<!--\s*notionvc:\s*[a-f0-9\-]+\s*-->/gi, '') // from notion
    .replace(/(\r\n|\n|\r)/gm, '') // remove all new lines

  function covertSpansAndText(doc: HTMLElement) {
    function wrapTextWithTags(text: string, tags: string[]) {
      tags.forEach(tag => {
        text = `<${tag}>${text}</${tag}>`
      })
      return text
    }
    const spans = doc?.querySelectorAll('span')
    spans.forEach(span => {
      const style = span.getAttribute('style')?.replace(/: /g, ':')
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
}
