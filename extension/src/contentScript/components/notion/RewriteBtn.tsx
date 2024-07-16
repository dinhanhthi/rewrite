import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../../../components/ui/tooltip'
import { cn } from '../../../helpers/helpers'
import LogoRewriteIcon from '../../../icons/LogoRewriteIcon'

type ReWriteBtnProps = {
  className?: string
}

export default function RewriteBtn(props: ReWriteBtnProps) {
  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={10} disableHoverableContent={true}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              props.className,
              'flex items-center justify-center h-full w-full px-2 rounded-md group-active:scale-95 select-none transition-transform group-hover:bg-[#37352f14] text-green-700 gap-1.5'
            )}
          >
            <LogoRewriteIcon className="w-5 h-5" />
            <div className="text-[14.5px] font-medium whitespace-nowrap">Rewrite</div>
          </button>
        </TooltipTrigger>
        <TooltipContent className='text-[12px] text-white bg-black px-1.5 py-1'>
          Let AI help you rewrite your text
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
