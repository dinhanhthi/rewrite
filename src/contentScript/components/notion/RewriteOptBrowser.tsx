import React from 'react'
import { RewriteCtx } from '../../RewriteCtx'
import RewriteOpt from './RewriteOpt'

type RewriteOptBrowserProps = {
  selected?: string
}

export default function RewriteOptBrowser(props: RewriteOptBrowserProps) {
  return (
    <RewriteCtx.Provider value={{ selected: props.selected }}>
      <RewriteOpt />
    </RewriteCtx.Provider>
  )
}
