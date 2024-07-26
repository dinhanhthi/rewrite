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
  const {
    children,
    content,
    contentClassName,
    delayDuration = 100,
    skipDelayDuration = 10,
    disableHoverableContent = true,
    asChild = true
  } = props
  return (
    <TooltipProvider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className={contentClassName ?? 'text-[12px] text-white bg-black px-1.5 py-1'}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
