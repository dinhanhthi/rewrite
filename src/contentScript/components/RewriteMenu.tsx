import {
  ChevronRight,
  Languages,
  ListFilter,
  MessageCircleQuestion,
  MicVocal,
  Sparkles,
  SpellCheck
} from 'lucide-react'
import React from 'react'
import { cn } from '../../helpers/helpers'
import LongerIcon from '../../icons/LongerIcon'
import ShorterIcon from '../../icons/ShorterIcon'

type RewriteMenuProps = {
  className?: string
}
export default function RewriteMenu(props: RewriteMenuProps) {
  return (
    <div className={cn(props.className, 'flex flex-col p-1.5 text-sm')}>
      <div className="group">
        <div className="flex flex-row items-center gap-3 py-1.5 pl-2 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
          <Languages className="w-4 h-4 text-green-700" />
          <div className="flex flex-row items-center justify-between flex-1 gap-3">
            <div>Translate</div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="group">
        <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
          <Sparkles className="w-4 h-4 text-green-700" />
          <div>Improve writing</div>
        </div>
      </div>

      <div className="group">
        <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
          <ListFilter className="w-4 h-4 text-green-700" />
          <div>Summerize</div>
        </div>
      </div>

      <div className="group">
        <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
          <MessageCircleQuestion className="w-4 h-4 text-green-700" />
          <div>Explain this</div>
        </div>
      </div>

      <div className="group">
        <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
          <SpellCheck className="w-4 h-4 text-green-700" />
          <div>Fix spelling & grammar</div>
        </div>
      </div>

      <div className="group">
        <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
          <ShorterIcon className="w-4 h-4 text-green-700" />
          <div>Make shorter</div>
        </div>
      </div>

      <div className="group">
        <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
          <LongerIcon className="w-4 h-4 text-green-700" />
          <div>Make longer</div>
        </div>
      </div>

      <div className="group">
        <div className="flex flex-row items-center gap-3 py-1.5 pl-2 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
          <MicVocal className="w-4 h-4 text-green-700" />
          <div className="flex flex-row items-center justify-between flex-1 gap-3">
            <div>Change tone</div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
