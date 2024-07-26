import React from 'react'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../../components/ui/menubar'
import { toast } from '../../../components/ui/use-toast'
import { createRewriteEditor, formatSelectedText } from '../../../helpers/helpers'
import { RewriteCtx } from '../../rewrite-ctx'
import RewriteMenu from '../rewrite-menu'
import RewriteOpt from './rewrite-opt'

export default function RewriteOptWrapper() {
  const ctx = React.useContext(RewriteCtx)
  const [showMenu, setShowMenu] = React.useState('')

  const handleItemClicked = async () => {
    if (ctx.mode === 'browser') {
      document.execCommand('copy')
      const [clipboardItem] = await navigator.clipboard.read()
      const outputBlob = await clipboardItem.getType('text/html')
      const output = await outputBlob.text()
      const formatedText = formatSelectedText(output)
      console.log(formatedText)
      createRewriteEditor('opt', formatedText)
    } else {
      toast({ description: `Menu item clicked` })
    }
  }

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
        <RewriteMenu
          className="absolute left-[calc(var(--radix-menubar-trigger-width)-4px)] top-[calc(var(--radix-menubar-trigger-height)*(-1)-10px)]"
          handleItemClicked={handleItemClicked}
        />
      </MenubarMenu>
    </Menubar>
  )
}
