import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import React, { useState } from 'react'
import { RewriteCtx } from '../content-script/rewrite-ctx'
import { cn, handleMenuItemClicked, removeAllCustomPromptEditors } from '../helpers/helpers'
import LogoRewriteIcon from '../icons/logo-rewrite-icon'
import CancelDialog from './cancel-dialog'
import IframeWithInput from './iframe-input'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

type CustomPromptEditorProps = {
  className?: string
  mode: string
  hideOverlay?: boolean // need it for the playground
}

export default function CustomPromptEditor(props: CustomPromptEditorProps) {
  const ctx = React.useContext(RewriteCtx)
  const [query, setQuery] = useState('')
  const [showDiscardWarning, setShowDiscardWarning] = React.useState(false)

  const handleAskAI = () => {
    if (props.mode === 'playground') {
      toast({ description: `Button "Ask" clicked!` })
    } else {
      handleMenuItemClicked(ctx, query)
    }
    removeAllCustomPromptEditors()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDiscardWarning(true)
  }

  const discardBtnClicked = () => {
    if (props.mode === 'browser') {
      removeAllCustomPromptEditors()
    } else {
      toast({
        description: 'Discard clicked!'
      })
    }
    setShowDiscardWarning(false)
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
        className={cn(
          'w-full !p-0 border-none outline-none bg-transparent z-50 isolate relative flex items-end',
          props.className
        )}
      >
        <div className="w-full h-full">
          <div className="flex flex-row items-center w-full h-full gap-2 py-1.5 pl-3 pr-2 overflow-hidden bg-white border shadow-md rounded-xl">
            <LogoRewriteIcon className="w-6 h-6 text-green-700" />
            <div className="z-30 flex items-center w-full h-full">
              <IframeWithInput
                setValue={setQuery}
                placeholder="Ask AI anything..."
                onSubmit={handleAskAI}
              />
            </div>
            <Button
              onClick={handleAskAI}
              disabled={!query.length}
              className="px-3 py-0 text-sm transition-all duration-300 hover:px-4 rounded-2xl h-7"
              size="sm"
            >
              Ask
            </Button>
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
          <CancelDialog cancel={() => setShowDiscardWarning(false)} discard={discardBtnClicked} />
          <VisuallyHidden.Root>
            <AlertDialogDescription></AlertDialogDescription>
          </VisuallyHidden.Root>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
