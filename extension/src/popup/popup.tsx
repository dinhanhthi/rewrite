import React from 'react'

import { optionsUrl, version } from '../helpers/helpersBrowser'
import PopupWrapper from './popupWrapper'

export default function Popup() {
  return <PopupWrapper version={version} optionsUrl={optionsUrl} />
}
