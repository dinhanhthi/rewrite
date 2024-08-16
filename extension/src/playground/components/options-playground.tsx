import React from 'react'
import { defaultMenuOptionsForm, defaultSettings } from '../../config'
import useLocalStorage from '../../helpers/hooks/use-local-storage'
import OptionsWrapper from '../../options/options-wrapper'
import { FormMenuOptions, FormSettings } from '../../type'

export default function OptionsPlayground() {
  const [settings, setSettings] = useLocalStorage<FormSettings>('settings', defaultSettings)
  const [menuOptions, setMenuOptions] = useLocalStorage<FormMenuOptions>(
    'menuOptions',
    defaultMenuOptionsForm
  )
  return (
    <OptionsWrapper
      settings={settings}
      setSettings={setSettings}
      menuOptions={menuOptions}
      setMenuOptions={setMenuOptions}
    />
  )
}
