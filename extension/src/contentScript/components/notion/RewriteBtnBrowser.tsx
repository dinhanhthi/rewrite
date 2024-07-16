import React from 'react'
import { RewriteCtx } from '../../RewriteCtx'
import RewriteBtnWrapper from './RewriteBtnWrapper'

export default function ReWriteBtnBrowser() {
  return (
    <RewriteCtx.Provider value={{ mode: 'browser' }}>
      <RewriteBtnWrapper />
    </RewriteCtx.Provider>
  )
}
