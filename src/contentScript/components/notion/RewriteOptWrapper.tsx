import React from 'react'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../../components/ui/menubar'
import { toast } from '../../../components/ui/use-toast'
import { Mode } from '../../../type'
import RewriteMenu from '../RewriteMenu'
import RewriteOpt from './RewriteOpt'
import { createRewriteEditor } from '../../../helpers/helpers'

type RewriteOptWrapperProps = {
  mode?: Mode
}

export default function RewriteOptWrapper(props: RewriteOptWrapperProps) {
  const [showMenu, setShowMenu] = React.useState('')

  const handleItemClicked = () => {
    /* ###Thi */ console.log(`👉👉👉 handleItemClicked()`);
    if (props.mode === 'browser') {
      // document.execCommand('paste') // enable later
      createRewriteEditor('opt')
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
