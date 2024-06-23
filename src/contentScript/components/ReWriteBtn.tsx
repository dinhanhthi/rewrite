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
    <button
      onClick={reWriteBtnClicked}
      className={cn(
        props.className,
        'bg-gradient-to-t from-[#38acde] to-[#4879eb] h-6 w-6 rounded-full transition-transform active:scale-90'
      )}
    >
      ✍
    </button>
  )
}
