import { Github, Globe, MessageSquare } from 'lucide-react'
import React from 'react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import TooltipThi from '../components/ui/tooltip-thi'
import LogoRewriteIcon from '../icons/logo-rewrite-icon'
import OptionsHeaderSettings from './options-header-settings'

type OptionsHeaderProps = {
  version?: string
}

export default function OptionsHeader(props: OptionsHeaderProps) {
  return (
    <div className="flex items-center justify-center w-full border-b border-slate-200">
      <div className="container flex flex-row justify-between h-full p-4 lg:max-w-3xl">
        {/* Logo */}
        <div className="flex flex-row items-center gap-2">
          <div className="flex items-center justify-center gap-2 text-green-700">
            <LogoRewriteIcon className="w-6 h-6" />
            <div className="text-xl font-medium whitespace-nowrap">Rewrite</div>
          </div>
          <Badge variant="secondary">{props.version || 'v0.0.0'}</Badge>
        </div>

        <div className="flex flex-row items-center gap-2 text-slate-500">
          <OptionsHeaderSettings />

          <TooltipThi content="Source code">
            <Button variant="ghost" size="icon" asChild>
              <a target="_blank" rel="noreferrer" href="https://github.com/dinhanhthi/rewrite">
                <Github className="w-5 h-5" />
              </a>
            </Button>
          </TooltipThi>

          <TooltipThi content="Home page">
            <Button variant="ghost" size="icon" asChild>
              <a target="_blank" rel="noreferrer" href="https://rewrite.dinhanhthi.com/">
                <Globe className="w-5 h-5" />
              </a>
            </Button>
          </TooltipThi>

          <TooltipThi content="Discussion">
            <Button variant="ghost" size="icon" asChild>
              <a target="_blank" href="https://github.com/dinhanhthi/rewrite/discussions">
                <MessageSquare className="w-5 h-5" />
              </a>
            </Button>
          </TooltipThi>
        </div>
      </div>
    </div>
  )
}
