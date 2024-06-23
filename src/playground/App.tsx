import cn from 'classnames'
import React from 'react'

import '../styles/global.scss'
import '../styles/options.scss'
import '../styles/playground.scss'
import '../styles/popup.scss'
import '../styles/tailwind.scss'
import NotionMenuBar from './components/NotionMenuBar'

export default function App() {
  return (
    <div className={cn('flex h-screen w-screen flex-col items-center justify-center')}>
      <NotionMenuBar />
    </div>
  )
}
