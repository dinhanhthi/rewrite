import React from 'react'

import { Github, Globe, MessageSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import ErrorBoundary from '../components/error-boundary'
import FormSingleChoice from '../components/form-single-choice'
import { Badge } from '../components/ui/badge'
import TooltipThi from '../components/ui/tooltip-thi'
import { defaultSettings } from '../config'
import { cn } from '../helpers/helpers'
import LogoRewriteIcon from '../icons/logo-rewrite-icon'
import { Settings } from '../type'

export type OptionsWrapperProps = {
  className?: string
  version?: string
}

export default function OptionsWrapper(props: OptionsWrapperProps) {
  const {
    handleSubmit,
    control,
    formState,
    reset,
    setValue,
    getValues,
    // watch // ###M
  } = useForm<Settings>({ defaultValues: defaultSettings })

  return (
    <ErrorBoundary>
      <div className={cn('w-full h-full flex flex-col', props.className)}>
        {/* header */}
        <div className="flex items-center justify-center w-full border-b border-slate-200">
          <div className="container flex flex-row justify-between h-full p-4 lg:max-w-3xl">
            {/* Logo */}
            <div className="flex flex-row items-center gap-2">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <LogoRewriteIcon className="w-5 h-5" />
                <div className="text-xl font-medium whitespace-nowrap">Rewrite</div>
              </div>
              <Badge variant="secondary">{props.version || 'v0.0.0'}</Badge>
            </div>

            <div className="flex flex-row items-center gap-4 text-slate-500">
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

              <TooltipThi content="Discussion">
                <a target="_blank" href="https://github.com/dinhanhthi/rewrite/discussions">
                  <MessageSquare className="w-5 h-5 hover:text-green-700" />
                </a>
              </TooltipThi>
            </div>
          </div>
        </div>

        {/* content */}
        <div>
          <div className="flex flex-row">
            <FormSingleChoice
              data={['openai', 'mistral', 'claude', 'gemini', 'llama']}
              control={control}
              labelText="AI Model"
              formName="service"
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
