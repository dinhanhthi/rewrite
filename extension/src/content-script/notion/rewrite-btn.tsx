import React from 'react'
import TooltipThi from '../../components/ui/tooltip-thi'
import { cn } from '../../helpers/helpers'
import LogoRewriteIcon from '../../icons/logo-rewrite-icon'

type ReWriteBtnProps = {
  className?: string
  hideText?: boolean
  tooltip?: string
}

export default function RewriteBtn(props: ReWriteBtnProps) {
  return (
    <TooltipThi content={props.tooltip ?? 'Let AI help you rewrite your text'}>
      <button
        onClick={e => {
          e.preventDefault()
        }}
        className={cn(
          'flex items-center justify-center h-full w-full rounded-md group-active:scale-95 select-none transition-transform group-hover:bg-[#37352f14] text-green-700 gap-1.5',
          {
            'px-2': !props.hideText,
            'px-1': props.hideText
          },
          props.className
        )}
      >
        <LogoRewriteIcon className="w-5 h-5" />
        {!props.hideText && (
          <div className="text-[14.5px] font-medium whitespace-nowrap">Rewrite</div>
        )}
      </button>
    </TooltipThi>
  )
}
