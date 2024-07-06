import React from 'react'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../../components/ui/menubar'
import { toast } from '../../../components/ui/use-toast'
import { cn, createRewriteEditor } from '../../../helpers/helpers'
import { Mode } from '../../../type'
import RewriteMenu from '../RewriteMenu'
import RewriteBtn from './RewriteBtn'
import { RewriteCtx } from '../../RewriteCtx'

type RewriteBtnWrapperProps = {
  mode?: Mode
  className?: string
  btnClassName?: string
}

export default function RewriteBtnWrapper(props: RewriteBtnWrapperProps) {
  const ctx = React.useContext(RewriteCtx)

  const handleItemClicked = () => {
    if (props.mode === 'browser') {
      createRewriteEditor('menu', ctx.selected)
    } else {
      toast({ description: `Menu item clicked` })
    }
  }

  return (
    <>
      <Menubar className="h-full p-0 bg-transparent border-none rounded-none">
        <MenubarMenu value="rewrite-menu">
          <MenubarTrigger asChild className="p-0 !bg-transparent">
            <div
              className={cn(
                props.className,
                'h-full w-full pr-1 border-r border-slate-200 group notion-ignore py-0 !rounded-none'
              )}
            >
              <RewriteBtn className={props.btnClassName} />
            </div>
          </MenubarTrigger>
          <RewriteMenu handleItemClicked={handleItemClicked} />
        </MenubarMenu>
      </Menubar>
    </>
  )
}
