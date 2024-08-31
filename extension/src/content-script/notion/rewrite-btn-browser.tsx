import React from 'react'
import { defaultMenuOptionsForm, defaultSettings } from '../../config'
import { talkToBackground } from '../../helpers/helpers-browser'
import useChromeStorageLocal from '../../helpers/hooks/use-browser-storage'
import { FormMenuOptions, FormSettings } from '../../type'
import { RewriteCtx } from '../rewrite-ctx'
import RewriteBtnWrapper from './rewrite-btn-wrapper'

export default function ReWriteBtnBrowser() {
  const [settings] = useChromeStorageLocal<FormSettings>('settings', defaultSettings)
  const [menuOptions] = useChromeStorageLocal<FormMenuOptions>(
    'menuOptions',
    defaultMenuOptionsForm
  )

  return (
    <RewriteCtx.Provider value={{ mode: 'browser', talkToBackground, settings, menuOptions }}>
      <RewriteBtnWrapper options={menuOptions.options} />
    </RewriteCtx.Provider>
  )
}
