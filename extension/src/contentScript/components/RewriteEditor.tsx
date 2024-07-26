import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { Check, Copy, RotateCcw, X } from 'lucide-react'
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from '../../components/ui/alert-dialog'
import { toast } from '../../components/ui/use-toast'
import { cn } from '../../helpers/helpers'
import LogoRewriteIcon from '../../icons/LogoRewriteIcon'
import { Mode } from '../../type'
import CancelDialog from './CancelDialog'
import EditorRoundBtn from './EditorRoundBtn'

type RewriteEditorProps = {
  height?: number
  className?: string
  hideOverlay?: boolean // need it for the playground
  mode?: Mode
  content?: string
}

export default function RewriteEditor(props: RewriteEditorProps) {
  const [copied, setCopied] = React.useState(false)
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [showDiscardWarning, setShowDiscardWarning] = React.useState(false)
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

  const reGenerateContent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    if (props.mode === 'browser') {
      toast({ description: 'Regenerate clicked!' })
    } else {
      toast({ description: 'Regenerate clicked!' })
    }
  }

  const copyThisContent = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setCopied(true)
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
    } finally {
      setTimeout(() => {
        setCopied(false)
      }, 500)
    }
  }

  const discardBtnClicked = () => {
    if (props.mode === 'browser') {
      removeAllRewriteEditors()
    } else {
      toast({
        description: 'Discard clicked!'
      })
    }
    setShowDiscardWarning(false)
  }

  const cancelDialogBtnClicked = () => {
    setShowDiscardWarning(false)
  }

  function removeAllRewriteEditors() {
    const editors = document.querySelectorAll('#rewrite-editor')
    editors.forEach(editor => editor.remove())
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDiscardWarning(true)
  }

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const closeRewriteEditor = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDiscardWarning(true)
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
            <div className="h-full w-full rounded-[6px] bg-white p-[1.25em] pb-8 notion-box-shadow isolate">
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
          <div className="absolute bottom-[-15px] left-0 z-50 h-[32px] w-full gap-4 pr-4 justify-between flex items-center">
            <div className="flex items-center gap-4 pl-4">
              <div className='w-[140px]'>
                <div className="rounded-[1em] w-fit overflow-hidden h-[32px] text-[0.95em]">
                  <button
                    onClick={useThisContent}
                    className="flex items-center h-full gap-2 px-3 text-white transition-all bg-green-700 w-fit hover:px-3.5 _bg-rainbow group whitespace-nowrap group"
                  >
                    <LogoRewriteIcon className="w-5 h-5 transition-transform group-active:scale-90" />{' '}
                    {useThisTextLabel}
                  </button>
                </div>
              </div>

              <EditorRoundBtn
                onClick={reGenerateContent}
                tooltipContent="Regenerate"
                className="h-[32px] w-[32px]"
              >
                <RotateCcw className="w-5 h-5" />
              </EditorRoundBtn>

              <EditorRoundBtn
                onClick={copyThisContent}
                tooltipContent="Copy"
                className="h-[32px] w-[32px]"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </EditorRoundBtn>
            </div>

            <EditorRoundBtn onClick={closeRewriteEditor} tooltipContent="Close" className="h-[32px] w-[32px]">
              <X className="w-5 h-5" />
            </EditorRoundBtn>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <AlertDialog defaultOpen={false} open={showDiscardWarning} onOpenChange={setShowDiscardWarning}>
        <AlertDialogContent
          className="p-0 bg-transparent border-none rounded-md w-fit"
          container={document.querySelector('.rewrite-overlay')}
        >
          <VisuallyHidden.Root>
            <AlertDialogTitle></AlertDialogTitle>
          </VisuallyHidden.Root>
          <CancelDialog cancel={cancelDialogBtnClicked} discard={discardBtnClicked} />
          <VisuallyHidden.Root>
            <AlertDialogDescription></AlertDialogDescription>
          </VisuallyHidden.Root>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
