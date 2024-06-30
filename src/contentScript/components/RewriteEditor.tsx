import React from 'react'
import { cn } from '../../helpers/helpers'
import { removeAllRewriteEditors } from '../../helpers/helpersBrowser'

type RewriteEditorProps = {
  // showRewriteEditor: boolean
  // setShowRewriteEditor: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
}

export default function RewriteEditor(props: RewriteEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)

  const useThisContent = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    /* ###Thi */ console.log(`👉👉👉 useThisContent clicked`)

    await copyToClipboard()
    // document.execCommand('paste') // enable later
    removeAllRewriteEditors()
  }

  // copy the content of editorRef to clipboard
  const copyToClipboard = async () => {
    if (!editorRef.current) return
    const input = editorRef.current.innerHTML
    const inputBlob = new Blob([input], { type: 'text/html' })
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': inputBlob
      })
    ])
  }

  const handleNothing = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    /* ###Thi */ console.log(`👉👉👉 handleNothing clicked`)
  }

  return (
    <div
      onClick={e => e.stopPropagation()}
      className={cn(
        'h-[200px] w-full !p-0 border-none outline-none bg-transparent',
        props.className
      )}
    >
      <div className="relative w-full h-full">
        {/* Main editor */}
        <div className="z-30 h-full">
          <div className="h-full w-full rounded-[6px] bg-white p-[0.75em] pb-[1.25em] notion-box-shadow isolate">
            <div className="overflow-y-auto dat-scrollbar dat-scrollbar-small">
              <div
                ref={editorRef}
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="h-full w-full text-[15px] cursor-text focus:border-none focus:outline-none whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  // __html: 'Thu nghiem <code>null</code> xem <b>the nao</b> nhe <s>bi cat</s> con day la <mark>highlight</mark>!'
                  // __html:
                  //   'w thu <span style="color:rgba(193, 76, 138, 1);fill:rgba(193, 76, 138, 1)">nge </span>to mobile use, try to thu tstrap'
                  __html:
                    '<span style="font-weight: 500;"></span>w thu to mobile use, try to thu tstrap'
                }}
              ></div>
            </div>
          </div>
        </div>

        <button onClick={handleNothing} className='absolute top-0 left-0 z-50 w-full h-full'></button>

        {/* Controls */}
        {/* -15px = (32 height - 2 border) / 2 */}
        <div className="absolute bottom-[-15px] right-0 z-50 flex h-[32px] gap-4 pr-4">
          <div className="rounded-[1em] w-fit bg-white overflow-hidden h-[32px] inline-flex items-center justify-center text-[0.95em] whitespace-nowrap">
            <button
              onClick={useThisContent}
              className="h-full px-5 text-white transition-all bg-green-700 w-fit hover:px-6 _bg-rainbow group"
            >
              Use this text
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
