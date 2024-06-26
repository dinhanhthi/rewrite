import React, { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { cn } from '../../../helpers/helpers'
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
            'h-full w-full pr-1 border-r border-slate-200 mr-1 group notion-ignore'
          )}
        >
          <RewriteBtn className={props.btnClassName} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="z-[9999]" container={document.querySelector('.rewrite-overlay')}>
        Place content for the popover here.
        <Input type="email" placeholder="Email" />
        <Button onClick={() => console.log('Test btn clicked')}>Test</Button>
      </PopoverContent>
    </Popover>
  )
}
