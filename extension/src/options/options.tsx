import React from 'react'

import { defaultMenuOptions, defaultSettings } from '../config'
import useChromeStorageLocal from '../helpers/hooks/use-browser-storage'
import { FormMenuOptions, FormSettings } from '../type'
import OptionsWrapper from './options-wrapper'

export default function Options() {
  const [settings, setSettings] = useChromeStorageLocal<FormSettings>('settings', defaultSettings)
  const [menuOptions, setMenuOptions] = useChromeStorageLocal<FormMenuOptions>(
    'menuOptions',
    defaultMenuOptions
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
