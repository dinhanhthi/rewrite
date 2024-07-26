import React, { useEffect } from 'react'

import { getName } from '../helpers/helpers-browser'
import Panel from './panel'

export default function PanelBrowser() {
  const [name, setName] = React.useState<string>()
  useEffect(() => {
    ;(async () => {
      const name = await getName()
      setName(name)
    })()
  }, [])

  return <Panel className="fixed z-50 bottom-8 right-8" name={name} />
}
