import React from 'react'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../../components/ui/menubar'
import RewriteEditor from '../RewriteEditor'
import RewriteMenu from '../RewriteMenu'
import RewriteOpt from './RewriteOpt'

export default function RewriteBtnWrapper() {
  const [showMenu, setShowMenu] = React.useState('')
  const [showRewriteEditor, setShowRewriteEditor] = React.useState(false)

  return (
    <Menubar
      value={showMenu}
      onMouseEnter={() => setShowMenu('rewrite-menu')}
      onMouseLeave={() => setShowMenu('')}
      onValueChange={setShowMenu}
      className="relative flex-col w-full h-full p-0 bg-transparent border-none rounded-none"
    >
      <MenubarMenu value="rewrite-menu">
        <MenubarTrigger asChild className="p-0 !bg-transparent rounded-none">
          <div className="border-y mt-[6px] border-[#37352f17] h-full px-[4px] py-[6px] w-full">
            <RewriteOpt />
          </div>
        </MenubarTrigger>
        <RewriteEditor
          showRewriteEditor={showRewriteEditor}
          setShowRewriteEditor={setShowRewriteEditor}
          contentClassName="mt-5"
        />
        <RewriteMenu
          className="absolute left-[calc(var(--radix-menubar-trigger-width)-4px)] top-[calc(var(--radix-menubar-trigger-height)*(-1)-10px)]"
          setShowRewriteEditor={setShowRewriteEditor}
        />
      </MenubarMenu>
    </Menubar>
  )
}
