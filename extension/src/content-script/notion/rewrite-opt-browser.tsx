import React from 'react'
import RewriteOptWrapper from './rewrite-opt-wrapper'
import { RewriteCtx } from '../rewrite-ctx'
import { talkToBackground } from '../../helpers/helpers-browser'

type RewriteOptBrowserProps = {
  selected?: string
}

export default function RewriteOptBrowser(props: RewriteOptBrowserProps) {
  return (
    <RewriteCtx.Provider value={{ selected: props.selected, mode: 'browser', talkToBackground }}>
      <RewriteOptWrapper />
    </RewriteCtx.Provider>
  )
}
