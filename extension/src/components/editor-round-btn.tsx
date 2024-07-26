import React from 'react'
import TooltipThi from './ui/tooltip-thi'
import { cn } from '../helpers/helpers'

type EditorRoundBtnProps = {
  className?: string
  children?: React.ReactNode
  tooltipContent?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function EditorRoundBtn(props: EditorRoundBtnProps) {
  return (
    <TooltipThi content={props.tooltipContent}>
      <button
        className={cn(
          'flex items-center justify-center h-full w-full group px-2 hover:text-green-700 bg-white rounded-full drop-shadow-md text-slate-700',
          props.className
        )}
      >
        <div className='transition-transform group-active:scale-[0.85]'>
        {props.children}
        </div>
      </button>
    </TooltipThi>
  )
}
