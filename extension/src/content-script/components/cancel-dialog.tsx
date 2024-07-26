import React from 'react'
import { Button } from '../../components/ui/button'
import LogoRewriteIcon from '../../icons/logo-rewrite-icon'

type CancelDialogProps = {
  className?: string
  discard: () => void
  cancel: () => void
}

export default function CancelDialog(props: CancelDialogProps) {
  return (
    <div
      className={
        'flex text-base flex-col items-center justify-center gap-4 p-6 w-[300px] bg-white border rounded-md shadow-lg bg-background'
      }
    >
      <LogoRewriteIcon className="w-6 h-6 text-green-700" />
      <div className="leading-tight text-center">Do you want to discard the AI response?</div>
      <div className="flex flex-col w-full gap-2">
        <Button className="w-full" variant="outline" onClick={() => props.discard()}>
          Discard
        </Button>
        <Button variant="outline" onClick={() => props.cancel()}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
