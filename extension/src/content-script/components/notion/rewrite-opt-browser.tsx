import React from 'react'
import { RewriteCtx } from '../../rewrite-ctx'
import RewriteOptWrapper from './rewrite-opt-wrapper'

type RewriteOptBrowserProps = {
  selected?: string
}

export default function RewriteOptBrowser(props: RewriteOptBrowserProps) {
  return (
    <RewriteCtx.Provider value={{ selected: props.selected, mode: 'browser' }}>
      <RewriteOptWrapper />
    </RewriteCtx.Provider>
  )
}
