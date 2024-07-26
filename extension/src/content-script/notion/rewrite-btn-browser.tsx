import React from 'react'
import RewriteBtnWrapper from './rewrite-btn-wrapper'
import { RewriteCtx } from '../rewrite-ctx'

export default function ReWriteBtnBrowser() {
  return (
    <RewriteCtx.Provider value={{ mode: 'browser' }}>
      <RewriteBtnWrapper />
    </RewriteCtx.Provider>
  )
}
