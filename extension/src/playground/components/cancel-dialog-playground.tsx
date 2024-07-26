import React from 'react'
import { toast } from '../../components/ui/use-toast'
import CancelDialog from '../../content-script/components/cancel-dialog'

export default function CancelDialogPlayground() {
  const actionClicked = (type: 'discard' | 'cancel') => {
    toast({
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} clicked!`
    })
  }
  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-500">
      <CancelDialog
        discard={() => actionClicked('discard')}
        cancel={() => actionClicked('cancel')}
      />
    </div>
  )
}
