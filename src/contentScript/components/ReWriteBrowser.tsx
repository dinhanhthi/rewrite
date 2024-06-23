import React from 'react'
import { RewriteContext } from '../RewriteContext'
import RewriteBtn from './RewriteBtn'

type RewriteBrowserProps = {
  selected?: string
}

export default function ReWriteBrowser(props: RewriteBrowserProps) {
  return (
    <RewriteContext.Provider value={{ selected: props.selected }}>
      <RewriteBtn />
    </RewriteContext.Provider>
  )
}
