import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from '../../components/ui/alert-dialog'
import { toast } from '../../components/ui/use-toast'
import { cn } from '../../helpers/helpers'
import { Mode } from '../../type'
import CancelDialog from './CancelDialog'

type RewriteEditorProps = {
  height?: number
  className?: string
  hideOverlay?: boolean // need it for the playground
  mode?: Mode
  content?: string
}

export default function RewriteEditor(props: RewriteEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [openDialog, setOpenDialog] = React.useState(false)
  const useThisTextLabel = 'Use this text'

  const useThisContent = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    const editableDiv = editorRef.current
    try {
      const htmlContent = editableDiv!.innerHTML
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([htmlContent], { type: 'text/html' }),
        'text/plain': new Blob([editableDiv!.innerText], { type: 'text/plain' })
      })
      await navigator.clipboard.write([clipboardItem])
    } catch (err) {
      console.log('Oops, unable to copy', err)
    }

    if (props.mode === 'browser') {
      document.execCommand('paste') // enable later
      removeAllRewriteEditors()
    } else {
      toast({ description: `Button "${useThisTextLabel}" clicked!` })
    }
  }

  const discardClicked = () => {
    if (props.mode === 'browser') {
      removeAllRewriteEditors()
    } else {
      toast({
        description: 'Discard clicked!'
      })
    }
    setOpenDialog(false)
  }

  const cancelDialogClicked = () => {
    setOpenDialog(false)
  }

  function removeAllRewriteEditors() {
    const editors = document.querySelectorAll('#rewrite-editor')
    editors.forEach(editor => editor.remove())
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenDialog(true)
  }

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <>
      {!props.hideOverlay && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-10 block overflow-auto opacity-0 isolate dat-scrollbar"
        ></div>
      )}
      <div
        style={{ height: `${props.height}px` || '200px' }}
        onClick={handleEditorClick}
        className={cn(
          'w-full !p-0 border-none outline-none bg-transparent z-50 isolate relative',
          props.className
        )}
      >
        <div className="relative w-full h-full">
          {/* Main editor */}
          <div className="z-30 h-full">
            <div className="h-full w-full rounded-[6px] bg-white p-[1.25em] notion-box-shadow isolate">
              <div className="h-full overflow-y-auto dat-scrollbar dat-scrollbar-small">
                <div
                  ref={editorRef}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  className="h-full w-full text-[15px] cursor-text focus:border-none focus:outline-none whitespace-pre-wrap notion-editor-style"
                  dangerouslySetInnerHTML={{
                    __html: props.content || 'Start typing here...'
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
                className="h-full px-5 text-white transition-all bg-green-700 w-fit hover:px-6 _bg-rainbow group"
              >
                {useThisTextLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <AlertDialog defaultOpen={false} open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent
          className="p-0 bg-transparent border-none rounded-md w-fit"
          container={document.querySelector('.rewrite-overlay')}
        >
          <VisuallyHidden.Root>
            <AlertDialogTitle></AlertDialogTitle>
          </VisuallyHidden.Root>
          <CancelDialog cancel={cancelDialogClicked} discard={discardClicked} />
          <VisuallyHidden.Root>
            <AlertDialogDescription></AlertDialogDescription>
          </VisuallyHidden.Root>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
