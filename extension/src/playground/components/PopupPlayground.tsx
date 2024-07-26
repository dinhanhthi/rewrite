import React from 'react'
import { optionsUrl, version } from '../../helpers/helpersPlayground'
import PopupWrapper from '../../popup/popupWrapper'

export default function PopupPlayground() {
  return (
    <PopupWrapper
      className="shadow-xl drop-shadow-xl"
      version={version}
      optionsUrl={optionsUrl}
    ></PopupWrapper>
  )
}
