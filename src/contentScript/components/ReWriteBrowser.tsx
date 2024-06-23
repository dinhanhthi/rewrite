import React from 'react'
import { cn } from '../../helpers/helpers'
import ReWriteBtn from './ReWriteBtn'

export default function ReWriteBrowser() {
  return (
    <div
      className={cn(
        'flex h-full tems-center justify-center items-center pl-1 pr-2 border-r border-slate-200'
      )}
    >
      <ReWriteBtn />
    </div>
  )
}
