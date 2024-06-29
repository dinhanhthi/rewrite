import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { cn } from '../../helpers/helpers'

type RewriteEditorProps = {
  showRewriteEditor: boolean
  setShowRewriteEditor: React.Dispatch<React.SetStateAction<boolean>>
  contentClassName?: string
}

export default function RewriteEditor(props: RewriteEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)

  const useThisContent = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    /* ###Thi */ console.log(`👉👉👉 useThisContent clicked`)

    await copyToClipboard()
    document.execCommand('paste')
  }

  // copy the content of editorRef to clipboard
  const copyToClipboard = async () => {
    if (!editorRef.current) return
    // const range = document.createRange()
    // range.selectNode(editorRef.current)
    // window.getSelection()?.removeAllRanges()
    // window.getSelection()?.addRange(range)
    // document.execCommand('copy')
    // window.getSelection()?.removeAllRanges()

    const input = editorRef.current.innerHTML;
    const inputBlob = new Blob([input], { type: 'text/html' });
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': inputBlob,
      }),
    ]);

    /* ###Thi */ console.log(`👉👉👉 copied!`);
  }

  return (
    <Popover open={props.showRewriteEditor}>
      <PopoverTrigger></PopoverTrigger>
      <PopoverContent
        asChild
        container={document.querySelector('.rewrite-overlay')}
        onPointerDownOutside={() => props.setShowRewriteEditor(false)}
      >
        <div
          className={cn(
            'h-[250px] w-[420px] !p-0 border-none outline-none bg-transparent',
            props.contentClassName
          )}
        >
          <div className="relative w-full h-full">
            {/* Main editor */}
            <div className="h-full">
              <div className="h-full w-full rounded-xl border-2 border-solid bg-white p-[0.75em] pb-[1.25em] border-green-700">
                <div className="overflow-y-auto dat-scrollbar dat-scrollbar-small">
                  <div
                    ref={editorRef}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="h-full w-full text-[15px] cursor-text focus:border-none focus:outline-none whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      // __html:
                      //   '<p><span style="font-weight:600;background:rgba(251, 243, 219, 1)" data-token-index="0" class="notion-enable-hover">Mistral and Claude</span><span style="background:rgba(251, 243, 219, 1)" data-token-index="1" class="notion-enable-hover"> don’t accept </span><span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(251, 243, 219, 1);color:#EB5757;border-radius:4px;font-size:85%;padding:0.2em 0.4em" data-token-index="2" spellcheck="false" class="notion-enable-hover">null</span><span style="background:rgba(251, 243, 219, 1)" data-token-index="3" class="notion-enable-hover"> in the request body</span>. OpenAI allows that. In OpenAI request, if you input <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:#EB5757;border-radius:4px;font-size:85%;padding:0.2em 0.4em" data-token-index="5" spellcheck="false" class="notion-enable-hover">null</span>, the default value for that property will be used. However, there will be an error if you put <span style="font-family:&quot;SFMono-Regular&quot;, Menlo, Consolas, &quot;PT Mono&quot;, &quot;Liberation Mono&quot;, Courier, monospace;line-height:normal;background:rgba(135,131,120,.15);color:#EB5757;border-radius:4px;font-size:85%;padding:0.2em 0.4em" data-token-index="7" spellcheck="false" class="notion-enable-hover">null</span> in the request body of Mistral.<!-- notionvc: 364ad7b0-fef0-49b1-afe6-51e3056c3e3f --><br></p>'
                      __html: 'Thu nghiem <code>null</code> xem <b>the nao</b> nhe!'
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Controls */}
            {/* -15px = (32 height - 2 border) / 2 */}
            <div className="absolute bottom-[-15px] right-0 z-50 flex h-[32px] gap-4 pr-4">
              <div className="rounded-[1em] w-fit bg-white overflow-hidden h-[32px] inline-flex items-center justify-center text-[0.95em] whitespace-nowrap">
                <button
                  onClick={useThisContent}
                  className="h-full px-5 text-white transition-all bg-green-700 w-fit hover:px-6 _bg-rainbow"
                >
                  Use this text
                </button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
