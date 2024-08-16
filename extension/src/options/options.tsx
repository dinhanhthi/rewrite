import React from 'react'

import { defaultMenuOptionsForm, defaultSettings } from '../config'
import useChromeStorageLocal from '../helpers/hooks/use-browser-storage'
import { FormMenuOptions, FormSettings } from '../type'
import OptionsWrapper from './options-wrapper'

export default function Options() {
  const [settings, setSettings] = useChromeStorageLocal<FormSettings>('settings', defaultSettings)
  const [menuOptions, setMenuOptions] = useChromeStorageLocal<FormMenuOptions>(
    'menuOptions',
    defaultMenuOptionsForm
  )
  return (
    <div className="flex flex-col w-screen h-screen">
      <OptionsWrapper
        settings={settings}
        setSettings={setSettings}
        menuOptions={menuOptions}
        setMenuOptions={setMenuOptions}
      />
    </div>
  )
}
