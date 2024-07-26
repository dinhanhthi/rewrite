import React from 'react'
import { RewriteCtx } from '../../rewrite-ctx'
import RewriteBtnWrapper from './rewrite-btn-wrapper'

export default function ReWriteBtnBrowser() {
  return (
    <RewriteCtx.Provider value={{ mode: 'browser' }}>
      <RewriteBtnWrapper />
    </RewriteCtx.Provider>
  )
}
