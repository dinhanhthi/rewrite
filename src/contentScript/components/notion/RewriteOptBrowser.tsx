import React from 'react'
import { RewriteCtx } from '../../RewriteCtx'
import RewriteOptWrapper from './RewriteOptWrapper'

type RewriteOptBrowserProps = {
  selected?: string
}

export default function RewriteOptBrowser(props: RewriteOptBrowserProps) {
  /* ###Thi */ console.log(`👉👉👉 block selected: `, props.selected);
  return (
    <RewriteCtx.Provider value={{ selected: props.selected, mode: 'browser' }}>
      <RewriteOptWrapper />
    </RewriteCtx.Provider>
  )
}
