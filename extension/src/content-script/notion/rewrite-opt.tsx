/**
 * This option is added to the popover when the user selects a block on Notion.
 */

import { ChevronRight } from 'lucide-react'
import React from 'react'
import LogoRewriteIcon from '../../icons/logo-rewrite-icon'

export default function RewriteOpt() {
  return (
    <button className="flex items-center hover:bg-[#37352f14] w-full h-[28px] px-[10px] rounded-[4px] group-hover:bg-[#37352f14] justify-between group">
      <div className="text-[14.5px] font-medium transition-transform select-none  group-active:scale-95 whitespace-nowrap min-h-[28px] flex items-center justify-center text-green-700 gap-1.5">
        <LogoRewriteIcon className="w-5 h-5" />
        <div className="text-[14.5px] font-medium whitespace-nowrap">Rewrite</div>
      </div>
      {/* <div className="text-[rgba(55,53,47,0.5)] text-[12px]">{`⌘+]`}</div> */}
      <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
    </button>
  )
}
