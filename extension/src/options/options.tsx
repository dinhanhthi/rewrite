import React from 'react'

import { defaultSettings } from '../config'
import useChromeStorageLocal from '../helpers/hooks/use-browser-storage'
import { FormSettings } from '../type'
import OptionsWrapper from './options-wrapper'

export default function Options() {
  const [settings, setSettings] = useChromeStorageLocal<FormSettings>('settings', defaultSettings)
  return (
    <div className="flex flex-col w-screen h-screen">
      <OptionsWrapper settings={settings} setSettings={setSettings} />
    </div>
  )
}
