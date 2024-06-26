import React, { useContext } from 'react'
import { cn } from '../../../helpers/helpers'
import { RewriteCtx } from '../../RewriteCtx'

type ReWriteBtnProps = {
  className?: string
}

export default function RewriteBtn(props: ReWriteBtnProps) {
  const ctx = useContext(RewriteCtx)

  function reWriteBtnClicked() {
    console.log('ReWriteBtn clicked')
    /* ###Thi */ console.log(`👉👉👉 selected: `, ctx.selected)
  }

  return (
    <button
      onClick={reWriteBtnClicked}
      className={cn(
        props.className,
        'flex items-center justify-center h-full w-full px-2 rounded-md group-hover:bg-[#37352f14]'
      )}
    >
      <div className="text-[14.5px] inline-flex items-center gap-1.5 font-medium text-transparent transition-transform select-none bg-clip-text bg-gradient-to-r from-sky-600 via-green-700 to-green-600 group-active:scale-95 whitespace-nowrap">
        ✍ Rewrite
      </div>
    </button>
  )
}
