import React from 'react'
import { defaultMenuOptionsForm, defaultSettings } from '../../config'
import { talkToBackground } from '../../helpers/helpers-browser'
import useChromeStorageLocal from '../../helpers/hooks/use-browser-storage'
import { FormMenuOptions, FormSettings } from '../../type'
import { RewriteCtx } from '../rewrite-ctx'
import RewriteOptWrapper from './rewrite-opt-wrapper'
// import { formatSelectedText } from '../../helpers/helpers'

type RewriteOptBrowserProps = {
  endContainer: HTMLElement | null
  selectedText: string
  range?: Range
}

export default function RewriteOptBrowser(props: RewriteOptBrowserProps) {
  const [settings] = useChromeStorageLocal<FormSettings>('settings', defaultSettings)
  const [menuOptions] = useChromeStorageLocal<FormMenuOptions>(
    'menuOptions',
    defaultMenuOptionsForm
  )

  return (
    <RewriteCtx.Provider
      value={{
        selectedText: props.selectedText,
        mode: 'browser',
        talkToBackground,
        settings,
        menuOptions,
        endContainer: props.endContainer,
        range: props.range
      }}
    >
      <RewriteOptWrapper />
    </RewriteCtx.Provider>
  )
}
