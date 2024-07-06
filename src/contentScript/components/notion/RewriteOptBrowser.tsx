import React from 'react'
import { RewriteCtx } from '../../RewriteCtx'
import RewriteOptWrapper from './RewriteOptWrapper'

type RewriteOptBrowserProps = {
  selected?: string
}

export default function RewriteOptBrowser(props: RewriteOptBrowserProps) {
  return (
    <RewriteCtx.Provider value={{ selected: props.selected }}>
      <RewriteOptWrapper mode="browser" />
    </RewriteCtx.Provider>
  )
}
