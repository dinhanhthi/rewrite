import React from 'react'
import { cn } from '../helpers/helpers'
import LogoRewriteIcon from '../icons/LogoRewriteIcon'
import { Github } from 'lucide-react'

export type PopupOptionsWrapperProps = {
  className?: string
}

export default function PopupWrapper(props: PopupOptionsWrapperProps) {
  return (
    <div
      className={cn(
        'flex min-h-[370px] min-w-[400px] w-fit flex-col gap-3 bg-white p-4',
        props.className
      )}
    >
      <div className="flex items-center justify-center gap-2 text-green-700">
        <LogoRewriteIcon className="w-8 h-8" />
        <div className="text-2xl font-medium whitespace-nowrap">Rewrite</div>
      </div>

      <div className="flex flex-row gap-4">
        <Github className="w-8 h-8" />
      </div>
    </div>
  )
}
