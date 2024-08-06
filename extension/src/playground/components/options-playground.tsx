import React from 'react'
import { defaultSettings } from '../../config'
import useLocalStorage from '../../helpers/hooks/use-local-storage'
import OptionsWrapper from '../../options/options-wrapper'
import { FormSettings } from '../../type'

export default function OptionsPlayground() {
  const [settings, setSettings] = useLocalStorage<FormSettings>('settings', defaultSettings)
  return <OptionsWrapper settings={settings} setSettings={setSettings} />
}
