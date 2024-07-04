import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../../components/ui/alert-dialog'
import { cn } from '../../helpers/helpers'

type RewriteEditorProps = {
  // showRewriteEditor: boolean
  // setShowRewriteEditor: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
  hideOverlay?: boolean // need it for the playground
}

export default function RewriteEditor(props: RewriteEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [openDialog, setOpenDialog] = React.useState(false)

  // const useThisContent = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   /* ###Thi */ console.log(`👉👉👉 useThisContent clicked`)

  //   // await copyToClipboard()
  //   document.execCommand('paste') // enable later
  //   removeAllRewriteEditors()
  // }

  const useThisContent = async () => {
    const editableDiv = editorRef.current

    try {
      // Get the HTML content of the contenteditable div
      const htmlContent = editableDiv!.innerHTML

      // Create a new ClipboardItem with HTML content
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([htmlContent], { type: 'text/html' }),
        'text/plain': new Blob([editableDiv!.innerText], { type: 'text/plain' })
      })

      // Write the ClipboardItem to the clipboard
      await navigator.clipboard.write([clipboardItem])
      console.log('Copy successful!')
    } catch (err) {
      console.log('Oops, unable to copy', err)
    }

    document.execCommand('paste') // enable later
    removeAllRewriteEditors()
  }

  // const handleNothing = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   /* ###Thi */ console.log(`👉👉👉 handleNothing clicked`)
  // }

  function removeAllRewriteEditors() {
    const editors = document.querySelectorAll('#rewrite-editor')
    editors.forEach(editor => editor.remove())
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    /* ###Thi */ console.log(`👉👉👉 handleOverlayClick clicked`)
    // removeAllRewriteEditors()
    setOpenDialog(true)
  }

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    /* ###Thi */ console.log(`👉👉👉 handleEditorClick clicked`)
  }

  return (
    <>
      {!props.hideOverlay && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-10 block opacity-0 isolate"
        ></div>
      )}
      <div
        onClick={handleEditorClick}
        className={cn(
          'h-[200px] w-full !p-0 border-none outline-none bg-transparent z-50 isolate relative',
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
                    // __html: 'w thu to mobile use, try to thu tstrap'
                    // __html: '<ul><li>asdasdasdas</li><li>asdasdasd</li></ul>'
                    // __html: `<p>thu nghiem xem the nao</p><p>The highlight is kept too? Maybe, text</p><p>w thu to The highlight is kept too? Maybe, text thu tstrap</p>`
                    // __html: `<pre><code class="language-jsx">async function test() {// somthing}</code></pre>`

                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* <button
            onClick={handleNothing}
            className="absolute top-0 left-0 z-50 w-full h-full"
          ></button> */}

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

      {/* Dialog */}
      <AlertDialog defaultOpen={false} open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent container={document.querySelector('.rewrite-overlay')}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => removeAllRewriteEditors()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
