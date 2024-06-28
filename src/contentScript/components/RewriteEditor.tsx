import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { cn } from '../../helpers/helpers'

type RewriteEditorProps = {
  showRewriteEditor: boolean
  setShowRewriteEditor: React.Dispatch<React.SetStateAction<boolean>>
  contentClassName?: string
}

export default function RewriteEditor(props: RewriteEditorProps) {
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
            'flex items-center justify-center w-20 h-40 text-white bg-slate-800 !z-[9999]',
            props.contentClassName
          )}
        >
          Content
        </div>
      </PopoverContent>
    </Popover>
  )
}
