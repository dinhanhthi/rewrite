import React from 'react'
import { RewriteCtx } from '../../RewriteCtx'
import RewriteBtnWrapper from './RewriteBtnWrapper'

type RewriteBrowserProps = {
  selected?: string
}

export default function ReWriteBtnBrowser(props: RewriteBrowserProps) {
  return (
    <RewriteCtx.Provider value={{ selected: props.selected }}>
      <RewriteBtnWrapper />
    </RewriteCtx.Provider>
  )
}
