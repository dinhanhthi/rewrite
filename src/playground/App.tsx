import cn from 'classnames'
import React from 'react'

import ReWriteBtn from '../contentScript/components/ReWriteBtn'
import '../styles/global.scss'
import '../styles/options.scss'
import '../styles/popup.scss'
import '../styles/tailwind.scss'

export default function App() {
  return (
    <div className={cn('flex h-screen w-screen flex-col items-center justify-center')}>
      <ReWriteBtn />
    </div>
  )
}
