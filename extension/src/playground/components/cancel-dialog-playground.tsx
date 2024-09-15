import React from 'react'
import CancelDialog from '../../components/cancel-dialog'
import { toast } from '../../components/ui/use-toast'

export default function CancelDialogPlayground() {
  const actionClicked = (type: 'discard' | 'cancel') => {
    toast({
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} clicked!`
    })
  }
  return (
    <div className="flex items-center justify-center w-full h-full bg-[#000c]">
      <CancelDialog
        discard={() => actionClicked('discard')}
        cancel={() => actionClicked('cancel')}
      />
    </div>
  )
}
