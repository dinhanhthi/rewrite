import React from 'react'
import LogoRewriteIcon from '../../icons/logo-rewrite-icon'

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-20">
      <div className="flex items-center justify-center">
        <LogoRewriteIcon className="text-green-700 w-80 h-80" />
      </div>

      <div className="flex items-center justify-center gap-8 text-green-700">
        <LogoRewriteIcon className="w-40 h-40" />
        <div className="text-[145px] font-medium whitespace-nowrap">Rewrite</div>
      </div>
    </div>
  )
}
