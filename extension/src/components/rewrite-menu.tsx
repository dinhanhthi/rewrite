import { PencilLine } from 'lucide-react'
import React from 'react'
import { defaultMenuOptions, systemIcons } from '../config'
import { cn } from '../helpers/helpers'
import { MenuOptionType } from '../type'
import {
  MenubarContent,
  MenubarItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger
} from './ui/menubar'

type RewriteMenuProps = {
  options?: MenuOptionType[]
  className?: string
  forceMount?: boolean
  setShowRewriteEditor?: React.Dispatch<React.SetStateAction<boolean>>
  handleItemClicked: (prompt: string) => void
  disableFocusOutside?: boolean
}

export default function RewriteMenu(props: RewriteMenuProps) {
  const menus = props.options?.filter(opt => opt.available) ?? defaultMenuOptions

  const handleInteractOutside = (e: Event) => {
    if (props.disableFocusOutside) {
      e.preventDefault()
    }
  }

  return (
    <MenubarContent
      className={cn(props.className, 'w-fit')}
      container={document.querySelector('.rewrite-overlay')}
      onInteractOutside={handleInteractOutside}
    >
      {menus.map(menu => {
        const SysIcon = systemIcons.find(e => e.value === menu.value)?.icon
        if (menu.nestedOptions && menu.nestedOptions.length > 0) {
          return (
            <MenubarSub key={menu.value}>
              <MenubarSubTrigger className="w-full p-0">
                <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
                  {menu.system && !!SysIcon && <SysIcon className="w-4 h-4 text-green-700" />}
                  {!menu.system && menu.icon}
                  <div className="text-[14px] whitespace-nowrap cursor-pointer">
                    {menu.displayName}
                  </div>
                </div>
              </MenubarSubTrigger>
              <MenubarSubContent>
                {menu.nestedOptions
                  ?.filter(opt => opt.available)
                  .map(nestedMenu => (
                    <MenubarItem
                      onClick={() => props.handleItemClicked(nestedMenu.prompt!)}
                      className="w-full p-0"
                      key={nestedMenu.value}
                    >
                      <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
                        {!nestedMenu.system && nestedMenu.icon}
                        <div className="text-[14px] whitespace-nowrap">
                          {nestedMenu.displayName}
                        </div>
                      </div>
                    </MenubarItem>
                  ))}
                {!menu.nestedOptions?.filter(opt => opt.available)?.length && (
                  <div className="p-2 text-sm text-gray-600">Nested menu is empty.</div>
                )}
              </MenubarSubContent>
            </MenubarSub>
          )
        } else {
          return (
            <MenubarItem
              onClick={() => props.handleItemClicked(menu.prompt!)}
              className="w-full p-0"
              key={menu.value}
            >
              <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
                {menu.system && !!SysIcon && <SysIcon className="w-4 h-4 text-green-700" />}
                {!menu.system && menu.icon}
                <div className="text-[14px] whitespace-nowrap">{menu.displayName}</div>
              </div>
            </MenubarItem>
          )
        }
      })}
      <hr className="mt-2 mb-1.5" />
      <MenubarItem className="w-full p-0">
        <div className="flex text-gray-600 flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100 group-hover:text-gray-900">
          <PencilLine className="w-4 h-4" />
          <div className="text-[14px] whitespace-nowrap">Ask AI to do...</div>
        </div>
      </MenubarItem>
      {!menus.length && <div className="p-2 text-sm text-gray-600">Menu is empty.</div>}
    </MenubarContent>
  )
}
