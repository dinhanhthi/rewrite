import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import React from 'react'
import { cn } from '../../helpers/helpers'

type EditorRoundBtnProps = {
  className?: string
  children?: React.ReactNode
  tooltipContent?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function EditorRoundBtn(props: EditorRoundBtnProps) {
  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={10} disableHoverableContent={true}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={props.onClick}
            className={cn(
              'flex items-center bg-white justify-center px-2 rounded-full group-active:scale-95 select-none transition-transform group-hover:bg-[#37352f14] text-slate-600 hover:text-green-700 gap-1.5 drop-shadow-md group',
              props.className
            )}
          >
            <div className='transition-transform group-active:scale-90'>{props.children}</div>
          </button>
        </TooltipTrigger>
        <TooltipContent className="text-[12px] text-white bg-black px-1.5 py-1 rounded-md">
          {props.tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
