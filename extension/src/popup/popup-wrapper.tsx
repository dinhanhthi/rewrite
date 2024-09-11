import { Github, Globe, MessageSquare, Settings2 } from 'lucide-react'
import React from 'react'
import { Badge } from '../components/ui/badge'
import TooltipThi from '../components/ui/tooltip-thi'
import { cn } from '../helpers/helpers'
import LogoRewriteIcon from '../icons/logo-rewrite-icon'

export type PopupOptionsWrapperProps = {
  className?: string
  optionsUrl?: string
  version?: string
}

export default function PopupWrapper(props: PopupOptionsWrapperProps) {
  return (
    <div
      className={cn(
        'flex min-h-[100px] w-[300px] flex-col items-center justify-center bg-white px-4 py-6 gap-6',
        props.className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-2 text-green-700">
          <LogoRewriteIcon className="w-5 h-5" />
          <div className="text-xl font-medium whitespace-nowrap">Rewrite</div>
        </div>
        <Badge variant="secondary">{props.version || 'v0.0.0'}</Badge>
        <div className="text-sm text-center text-slate-600">
          Type your phrases and get back a better version.
        </div>
      </div>

      <div className="flex flex-row items-center justify-center w-full gap-6 text-slate-500">
        <TooltipThi content="Source code">
          <a target="_blank" rel="noreferrer" href="https://github.com/dinhanhthi/rewrite">
            <Github className="w-5 h-5 hover:text-green-700" />
          </a>
        </TooltipThi>

        <TooltipThi content="Home page">
          <a target="_blank" rel="noreferrer" href="https://rewrite.dinhanhthi.com/">
            <Globe className="w-5 h-5 hover:text-green-700" />
          </a>
        </TooltipThi>

        <TooltipThi content="Discussion & Feedback">
          <a target="_blank" href="https://github.com/dinhanhthi/rewrite/discussions">
            <MessageSquare className="w-5 h-5 hover:text-green-700" />
          </a>
        </TooltipThi>

        <TooltipThi content="Settings">
          <a target="_blank" href={props.optionsUrl}>
            <Settings2 className="w-5 h-5 hover:text-green-700" />
          </a>
        </TooltipThi>
      </div>
    </div>
  )
}
