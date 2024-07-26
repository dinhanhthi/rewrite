import React from 'react'
import TooltipThi from '../../components/ui/tooltip-thi'
import { cn } from '../../helpers/helpers'
import LogoRewriteIcon from '../../icons/LogoRewriteIcon'

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
          props.className,
          'flex items-center justify-center h-full w-full px-2 rounded-md group-active:scale-95 select-none transition-transform group-hover:bg-[#37352f14] text-green-700 gap-1.5'
        )}
      >
        <LogoRewriteIcon className="w-5 h-5" />
        <div className="text-[14.5px] font-medium whitespace-nowrap">Rewrite</div>
      </button>
    </TooltipThi>
  )
}
