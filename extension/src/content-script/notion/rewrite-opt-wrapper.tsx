import React, { useContext, useEffect } from 'react'
import RewriteMenu from '../../components/rewrite-menu'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../components/ui/menubar'
import { RewriteCtx } from '../rewrite-ctx'
import RewriteOpt from './rewrite-opt'

type RewriteOptWrapperProps = {
  alwaysShowMenu?: boolean
}

export default function RewriteOptWrapper(props: RewriteOptWrapperProps) {
  const ctx = useContext(RewriteCtx)
  const [showMenu, setShowMenu] = React.useState(props.alwaysShowMenu ? 'rewrite-menu' : '')

  useEffect(() => {
    setShowMenu(props.alwaysShowMenu ? 'rewrite-menu' : '')
  }, [props.alwaysShowMenu])

  const handleMouseEnter = () => {
    setShowMenu('rewrite-menu')
  }

  const handleMouseLeave = () => {
    if (!props.alwaysShowMenu) {
      setShowMenu('')
    }
  }

  return (
    <Menubar
      value={showMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onValueChange={setShowMenu}
      className="relative flex-col w-full h-full p-0 bg-transparent border-none rounded-none"
    >
      <MenubarMenu value="rewrite-menu">
        <MenubarTrigger asChild className="p-0 !bg-transparent rounded-none">
          <div className="border-y mt-[6px] border-[#37352f17] h-full px-[4px] py-[6px] w-full">
            <RewriteOpt />
          </div>
        </MenubarTrigger>
        <RewriteMenu
          className="absolute left-[calc(var(--radix-menubar-trigger-width)-4px)] top-[calc(var(--radix-menubar-trigger-height)*(-1)-10px)]"
          disableFocusOutside={props.alwaysShowMenu}
          options={ctx.menuOptions?.options}
        />
      </MenubarMenu>
    </Menubar>
  )
}
