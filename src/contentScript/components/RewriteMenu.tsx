import { Languages, MessageCircleQuestion, MicVocal, Sparkles, SpellCheck } from 'lucide-react'
import React from 'react'
import {
  MenubarContent,
  MenubarItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger
} from '../../components/ui/menubar'
import LongerIcon from '../../icons/LongerIcon'
import ShorterIcon from '../../icons/ShorterIcon'
import SummerizeIcon from '../../icons/SummerizeIcon'

type RewriteMenuProps = {
  className?: string
}

export default function RewriteMenu(props: RewriteMenuProps) {
  return (
    <div className="dinhanhthi">
      <MenubarContent
        className={props.className}
        container={document.querySelector('.rewrite-overlay')}
      >
        {menus.map(menu => {
          if (menu.subs) {
            return (
              <MenubarSub key={menu.name}>
                <MenubarSubTrigger className="w-full p-0">
                  <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
                    <menu.icon className="w-4 h-4 text-green-700" />
                    <div>{menu.name}</div>
                  </div>
                </MenubarSubTrigger>
                <MenubarSubContent>
                  {menu.subs.map(sub => (
                    <MenubarItem key={sub}>{sub}</MenubarItem>
                  ))}
                </MenubarSubContent>
              </MenubarSub>
            )
          } else {
            return (
              <MenubarItem className="w-full p-0" key={menu.name}>
                <div className="flex flex-row items-center gap-3 py-1.5 pl-2 pr-6 rounded-sm hover:cursor-pointer group-hover:bg-gray-100">
                  <menu.icon className="w-4 h-4 text-green-700" />
                  <div>{menu.name}</div>
                </div>
              </MenubarItem>
            )
          }
        })}
      </MenubarContent>
    </div>
  )
}

const menus: { name: string; icon: any; subs?: string[] }[] = [
  {
    name: 'Translate',
    icon: Languages,
    subs: [
      'Vietnamese',
      'English',
      'Chinese',
      'Japanese',
      'Spanish',
      'French',
      'Russian',
      'Portuguese',
      'German',
      'Italian',
    ]
  },
  {
    name: 'Improve writing',
    icon: Sparkles
  },
  {
    name: 'Summerize',
    icon: SummerizeIcon
  },
  {
    name: 'Explain this',
    icon: MessageCircleQuestion
  },
  {
    name: 'Fix spelling & grammar',
    icon: SpellCheck
  },
  {
    name: 'Make shorter',
    icon: ShorterIcon
  },
  {
    name: 'Make longer',
    icon: LongerIcon
  },
  {
    name: 'Change tone',
    icon: MicVocal,
    subs: ['Professional', 'Casual', 'Straightforward', 'Confident', 'Friendly']
  }
]
