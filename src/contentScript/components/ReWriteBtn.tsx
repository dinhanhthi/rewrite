import React from 'react'
import { cn } from '../../helpers/helpers'

type ReWriteBtnProps = {
  className?: string
}

export default function ReWriteBtn(props: ReWriteBtnProps) {
  function reWriteBtnClicked() {
    console.log('ReWriteBtn clicked')
  }
  return (
    <div className={cn(props.className, 'h-full pr-1 border-r border-slate-200 mr-1 group')}>
      <div className="flex items-center justify-center h-full px-2 rounded-md group-hover:bg-[#37352f14]">
        <button
          onClick={reWriteBtnClicked}
          className="text-[14.5px] font-semibold text-transparent transition-transform select-none bg-clip-text bg-gradient-to-r from-sky-600 via-green-700 to-green-600 group-active:scale-95 whitespace-nowrap"
        >
          ✍ Rewrite
        </button>
      </div>
    </div>
  )
}
