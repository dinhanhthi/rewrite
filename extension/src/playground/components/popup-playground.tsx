import React from 'react'
import { optionsUrl, version } from '../../helpers/helpers-playground'
import PopupWrapper from '../../popup/popup-wrapper'

export default function PopupPlayground() {
  return (
    <PopupWrapper
      className="shadow-xl drop-shadow-xl"
      version={version}
      optionsUrl={optionsUrl}
    ></PopupWrapper>
  )
}
