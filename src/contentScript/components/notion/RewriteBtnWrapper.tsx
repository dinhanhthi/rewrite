import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { cn } from '../../../helpers/helpers'
import RewriteMenu from '../RewriteMenu'
import RewriteBtn from './RewriteBtn'

type RewriteBtnWrapperProps = {
  className?: string
  btnClassName?: string
}

export default function RewriteBtnWrapper(props: RewriteBtnWrapperProps) {
  const [openPopover, setOpenPopover] = useState(false)

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            props.className,
            'h-full w-full pr-1 border-r border-slate-200 group notion-ignore'
          )}
        >
          <RewriteBtn className={props.btnClassName} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="z-[9999] mt-1 p-0 w-fit"
        container={document.querySelector('.rewrite-overlay')}
      >
        <RewriteMenu />
      </PopoverContent>
    </Popover>
  )
}
