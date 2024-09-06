import React from 'react'
import { defaultMenuOptionsForm, defaultSettings } from '../../config'
import { talkToBackground } from '../../helpers/helpers-browser'
import useChromeStorageLocal from '../../helpers/hooks/use-browser-storage'
import { FormMenuOptions, FormSettings } from '../../type'
import { RewriteCtx } from '../rewrite-ctx'
import RewriteOptWrapper from './rewrite-opt-wrapper'

type RewriteOptBrowserProps = {
  selectedText?: string
}

export default function RewriteOptBrowser(props: RewriteOptBrowserProps) {
  const [settings] = useChromeStorageLocal<FormSettings>('settings', defaultSettings)
  const [menuOptions] = useChromeStorageLocal<FormMenuOptions>(
    'menuOptions',
    defaultMenuOptionsForm
  )

  // /* ###Thi */ console.log(`👉👉👉 props.selectedText: `, props.selectedText);

  return (
    <RewriteCtx.Provider
      value={{
        from: 'opt',
        selectedText: props.selectedText,
        mode: 'browser',
        talkToBackground,
        settings,
        menuOptions
      }}
    >
      <RewriteOptWrapper />
    </RewriteCtx.Provider>
  )
}
