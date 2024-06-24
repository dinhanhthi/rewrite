import React, { useContext } from 'react'
import { cn } from '../../helpers/helpers'
import { RewriteContext } from '../RewriteContext'

type ReWriteBtnProps = {
  className?: string
}

export default function RewriteBtn(props: ReWriteBtnProps) {
  const ctx = useContext(RewriteContext)

  function reWriteBtnClicked() {
    console.log('ReWriteBtn clicked')
    /* ###Thi */ console.log(`👉👉👉 selected: `, ctx.selected)
  }
  return (
    <div className={cn(props.className, 'h-full pr-1 border-r border-slate-200 mr-1 group')}>
      <button
        onClick={reWriteBtnClicked}
        className="flex items-center justify-center h-full px-2 rounded-md group-hover:bg-[#37352f14]"
      >
        <div className="text-[14.5px] font-medium text-transparent transition-transform select-none bg-clip-text bg-gradient-to-r from-sky-600 via-green-700 to-green-600 group-active:scale-95 whitespace-nowrap">
          ✍ Rewrite
        </div>
      </button>
    </div>
  )
}
