import React from 'react'
import { cn } from '../../helpers/helpers'
import ReWriteBtn from './ReWriteBtn'

type ReWriteBrowserProps = {
  position: {
    top: number
    left: number
  }
}

export default function ReWriteBrowser(props: ReWriteBrowserProps) {
  return (
    <div
      style={{
        top: `${props.position.top}px`,
        left: `${props.position.left}px`
      }}
      className={cn('flex tems-center justify-center')}
    >
      <ReWriteBtn />
    </div>
  )
}
