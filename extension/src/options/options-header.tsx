import { Github, Globe, MessageSquare } from 'lucide-react'
import React from 'react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import TooltipThi from '../components/ui/tooltip-thi'
import RewriteBtnWrapper from '../content-script/notion/rewrite-btn-wrapper'
import LogoRewriteIcon from '../icons/logo-rewrite-icon'
import { FormSettings, MenuOptionType } from '../type'
import OptionsHeaderSettings from './options-header-settings'

type OptionsHeaderProps = {
  version?: string
  watchOptions?: MenuOptionType[]
  settings: FormSettings
  setSettings: (settings: FormSettings) => void
}

export default function OptionsHeader(props: OptionsHeaderProps) {
  return (
    <div className="flex items-center justify-center w-full border-b border-slate-200">
      <div className="container flex flex-row justify-between h-full px-4 py-2 lg:max-w-3xl">
        <div className="flex flex-row items-center gap-2">
          <div className="flex items-center justify-center gap-2 text-green-700">
            <LogoRewriteIcon className="w-6 h-6" />
            <div className="text-xl font-medium whitespace-nowrap">Rewrite</div>
          </div>
          <Badge variant="secondary">{props.version || 'v0.0.0'}</Badge>
        </div>

        <div className="flex flex-row items-center gap-1 text-slate-500">
          {props.watchOptions?.length && (
            <div className="h-full w-9">
              <RewriteBtnWrapper
                options={props.watchOptions}
                preview={true}
                className="w-8 border-none"
                btnClassName="text-gray-500"
              />
            </div>
          )}

          <OptionsHeaderSettings settings={props.settings} setSettings={props.setSettings} />

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

          <TooltipThi content="Discussion & Feedback">
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
