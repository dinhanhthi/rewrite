import React from 'react'
import { RewriteCtx } from '../../RewriteCtx'
import RewriteBtn from './RewriteBtn'

type RewriteBrowserProps = {
  selected?: string
}

export default function ReWriteBtnBrowser(props: RewriteBrowserProps) {
  return (
    <RewriteCtx.Provider value={{ selected: props.selected }}>
      <RewriteBtn />
    </RewriteCtx.Provider>
  )
}
