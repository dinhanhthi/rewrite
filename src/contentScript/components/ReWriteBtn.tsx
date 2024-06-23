import React from 'react'
import { cn } from '../../helpers/helpers'

type ReWriteBtnProps = {
  className?: string
}

export default function ReWriteBtn(props: ReWriteBtnProps) {
  function reWriteBtnClicked() {
    console.log('ReWriteBtn clicked')
    const reWriteBtn = document.querySelector('.re-write-btn')
    if (reWriteBtn) {
      reWriteBtn.remove()
    }
  }
  return (
    <button
      onClick={reWriteBtnClicked}
      className={cn(
        props.className,
        'bg-gradient-to-t from-[#38acde] to-[#4879eb] h-9 w-9 rounded-full transition-transform active:scale-90'
      )}
    >
      ✍
    </button>
  )
}
