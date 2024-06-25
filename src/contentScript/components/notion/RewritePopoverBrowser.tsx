import React from 'react'
import { RewriteContext } from '../../RewriteContext'
import RewritePopoverOption from './RewritePopover'

type RewritePopoverBrowserProps = {
  selected?: string
}

export default function RewritePopoverBrowser(props: RewritePopoverBrowserProps) {
  return (
    <RewriteContext.Provider value={{ selected: props.selected }}>
      <RewritePopoverOption />
    </RewriteContext.Provider>
  )
}
