import React from 'react'

import { optionsUrl, version } from '../helpers/helpers-browser'
import PopupWrapper from './popup-wrapper'

export default function Popup() {
  return <PopupWrapper version={version} optionsUrl={optionsUrl} />
}
