/**
 * This option is added to the popover when the user selects a block on Notion.
 */

import React, { useContext } from 'react'
import { RewriteCtx } from '../../RewriteCtx'

export default function RewriteOpt() {
  const ctx = useContext(RewriteCtx)

  function reWriteBtnClicked() {
    console.log('ReWriteBtn clicked')
    /* ###Thi */ console.log(`👉👉👉 selected: `, ctx.selected)
  }

  return (
    <div className="border-y mt-[6px] border-[#37352f17] h-full px-[4px] py-[6px] w-full">
      <button
        onClick={reWriteBtnClicked}
        className="flex items-center hover:bg-[#37352f14] w-full h-full px-[10px] rounded-[4px] group-hover:bg-[#37352f14] justify-between group"
      >
        <div className="text-[14.5px] font-medium text-transparent transition-transform select-none bg-clip-text bg-gradient-to-r from-sky-600 via-green-700 to-green-600 group-active:scale-95 whitespace-nowrap min-h-[28px] flex items-center justify-center">
          <span className="text-[16px]">✍</span> <span className="ml-[10px]">Rewrite</span>
        </div>
        <div className="text-[rgba(55,53,47,0.5)] text-[12px]">{`⌘+]`}</div>
      </button>
    </div>
  )
}
