import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { Check, Copy, RotateCcw, Settings2, X } from 'lucide-react'
import React from 'react'
import { cn } from '../helpers/helpers'
import LogoRewriteIcon from '../icons/logo-rewrite-icon'
import { Mode } from '../type'
import CancelDialog from './cancel-dialog'
import EditorRoundBtn from './editor-round-btn'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from './ui/alert-dialog'
import { Badge } from './ui/badge'
import { toast } from './ui/use-toast'

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

  const openOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    toast({ description: 'Open options clicked!' })
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
        <div className="w-full">
          {/* Main editor */}
          <div className="z-30 h-full">
            <div className="flex flex-col h-full w-full rounded-[6px] bg-white p-0 notion-box-shadow overflow-hidden">
              {/* Main editor */}
              <div className="h-full p-4 overflow-y-auto dat-scrollbar dat-scrollbar-small">
                {!!props.content && (
                  <div
                    ref={editorRef}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="h-full w-full text-[15px] cursor-text focus:border-none focus:outline-none whitespace-pre-wrap notion-editor-style"
                    dangerouslySetInnerHTML={{
                      __html: props.content || 'Start typing here...'
                    }}
                  ></div>
                )}
                {!props.content && (
                  <div className="text-transparent animate-pulse bg-clip-text bg-gradient-to-r from-green-700 to-violet-900">
                    AI is thinking...
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="z-50 flex items-center justify-between w-full gap-4 p-2 bg-slate-100">
                <div className="flex flex-row items-center gap-3">
                  <Badge
                    className="text-xs font-medium text-gray-600 border-gray-400 whitespace-nowrap"
                    variant="outline"
                  >
                    GPT-4o Mini
                  </Badge>
                  <EditorRoundBtn
                    onClick={openOptions}
                    tooltipContent="Open Settings"
                    className="w-6 h-6"
                  >
                    <Settings2 className="w-3.5 h-3.5" />
                  </EditorRoundBtn>
                </div>
                <div className="flex items-center gap-4">
                  <EditorRoundBtn
                    onClick={closeRewriteEditor}
                    tooltipContent="Close"
                    className="h-7 w-7"
                  >
                    <X className="w-4 h-4" />
                  </EditorRoundBtn>
                  <EditorRoundBtn
                    onClick={reGenerateContent}
                    tooltipContent="Regenerate"
                    className="h-7 w-7"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </EditorRoundBtn>
                  <EditorRoundBtn
                    onClick={copyThisContent}
                    tooltipContent="Copy"
                    className="h-7 w-7"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </EditorRoundBtn>
                  <div className="w-[130px]">
                    <div className="rounded-[1em] w-fit overflow-hidden">
                      <button
                        onClick={useThisContent}
                        className="flex items-center text-sm h-full gap-2 py-1 px-3 text-white transition-all bg-green-700 w-fit hover:px-3.5 _bg-rainbow group whitespace-nowrap group drop-shadow-md"
                      >
                        <LogoRewriteIcon className="w-4.5 h-4.5 transition-transform group-active:scale-90" />{' '}
                        {useThisTextLabel}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <AlertDialog
        defaultOpen={false}
        open={showDiscardWarning}
        onOpenChange={setShowDiscardWarning}
      >
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
