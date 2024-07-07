import React from 'react'
import { RewriteCtx } from '../../RewriteCtx'
import RewriteBtnWrapper from './RewriteBtnWrapper'

type RewriteBrowserProps = {
  selected?: string
}

export default function ReWriteBtnBrowser(props: RewriteBrowserProps) {
  // /* ###Thi */ console.log(`👉👉👉 selected: `, props.selected);
  return (
    <RewriteCtx.Provider value={{ selected: props.selected, mode: 'browser' }}>
      <RewriteBtnWrapper />
    </RewriteCtx.Provider>
  )
}
