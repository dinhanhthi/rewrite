import React from 'react'
import { cn } from '../helpers/helpers'
import TooltipThi from './ui/tooltip-thi'

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
        onClick={props.onClick}
        className={cn(
          'flex items-center justify-center h-full w-full group px-2 hover:text-green-700 bg-white rounded-full text-slate-700 border border-gray-300 hover:border-green-700',
          props.className
        )}
      >
        <div className="transition-transform group-active:scale-[0.85]">{props.children}</div>
      </button>
    </TooltipThi>
  )
}
