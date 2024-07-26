import React, { useState } from 'react'
import { Switch } from '../../components/ui/switch'
import RewriteEditor from '../../content-script/components/rewrite-editor'

export default function RewriteEditorPlayground() {
  const defaultChecked = true
  const [hideOverlay, setHideOverlay] = useState(defaultChecked)
  const handleOnCheckedChange = (val: boolean) => {
    setHideOverlay(val)
  }
  return (
    <>
      <div id="rewrite-editor" className="w-[708px] h-auto">
        <RewriteEditor hideOverlay={hideOverlay} mode="playground" />
      </div>
      {/* z-index of below switch container must be greater than the overlay div in RewriteEditor */}
      <div className="fixed z-20 flex items-center gap-2 left-8 bottom-4">
        <Switch
          defaultChecked={defaultChecked}
          onCheckedChange={handleOnCheckedChange}
          id="hide-overlay"
        />
        <label htmlFor="hide-overlay">Disable cliking outside</label>
      </div>
    </>
  )
}
