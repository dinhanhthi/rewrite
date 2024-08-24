import React from 'react'
import { talkToBackground } from '../../helpers/helpers-browser'
import { RewriteCtx } from '../rewrite-ctx'
import RewriteBtnWrapper from './rewrite-btn-wrapper'

export default function ReWriteBtnBrowser() {
  return (
    <RewriteCtx.Provider value={{ mode: 'browser', talkToBackground }}>
      <RewriteBtnWrapper />
    </RewriteCtx.Provider>
  )
}
