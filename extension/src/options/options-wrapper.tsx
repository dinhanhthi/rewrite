import React from 'react'

import ErrorBoundary from '../components/errorBoundary'
import { cn } from '../helpers/helpers'

export type OptionsWrapperProps = {
  className?: string
}

export default function OptionsWrapper(props: OptionsWrapperProps) {
  return (
    <ErrorBoundary>
      <div className={cn('w-full h-full flex flex-col', props.className)}>
      <div className="flex items-center justify-center w-full border-b border-slate-200">
          <div className="container h-full p-4 lg:max-w-5xl">

          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
