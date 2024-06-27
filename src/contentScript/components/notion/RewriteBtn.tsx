import React, { useContext } from 'react'
import { cn } from '../../../helpers/helpers'
import { LogoRewriteIcon } from '../../../icons/LogoRewriteIcon'
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
        'flex items-center justify-center h-full w-full px-2 rounded-md group-active:scale-95 select-none transition-transform group-hover:bg-[#37352f14] text-green-700 gap-1.5'
      )}
    >
      <LogoRewriteIcon className="w-5 h-5" />
      <div className="text-[14.5px] font-medium whitespace-nowrap">Rewrite</div>
    </button>
  )
}
