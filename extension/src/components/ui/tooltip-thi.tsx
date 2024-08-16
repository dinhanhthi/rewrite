import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

type TooltipThiProps = {
  children: React.ReactNode
  content?: string
  contentClassName?: string
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
  className?: string
  asChild?: boolean
}

export default function TooltipThi(props: TooltipThiProps) {
  return !!props.content ? (
    <TooltipProvider
      delayDuration={props.delayDuration ?? 100}
      skipDelayDuration={props.skipDelayDuration ?? 10}
      disableHoverableContent={props.disableHoverableContent}
    >
      <Tooltip>
        <TooltipTrigger asChild={props.asChild ?? true}>{props.children}</TooltipTrigger>
        <TooltipContent
          className={props.contentClassName ?? 'text-[12px] text-white bg-black px-1.5 py-1'}
        >
          {props.content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    props.children
  )
}
