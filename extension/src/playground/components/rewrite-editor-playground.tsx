import React, { useState } from 'react'
import RewriteEditor from '../../components/rewrite-editor'
import { Switch } from '../../components/ui/switch'

export default function RewriteEditorPlayground() {
  const defaultChecked = true
  const [hideOverlay, setHideOverlay] = useState(defaultChecked)
  const handleOnCheckedChange = (val: boolean) => {
    setHideOverlay(val)
  }
  return (
    <>
      <div id="rewrite-editor" className="w-[708px] h-auto flex flex-col gap-6">
        {/* z-index of below switch container must be greater than the overlay div in RewriteEditor */}
        <div className="z-20 flex items-center gap-2">
          <Switch
            className='bg-green-700'
            defaultChecked={defaultChecked}
            onCheckedChange={handleOnCheckedChange}
            id="hide-overlay"
          />
          <label htmlFor="hide-overlay" className='text-base'>Disable cliking outside</label>
        </div>
        <RewriteEditor hideOverlay={hideOverlay} mode="playground" />
      </div>
    </>
  )
}