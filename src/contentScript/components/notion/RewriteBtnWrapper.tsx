import React from 'react'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../../components/ui/menubar'
import { cn } from '../../../helpers/helpers'
import { createRewriteEditor } from '../../../helpers/helpersBrowser'
import RewriteMenu from '../RewriteMenu'
import RewriteBtn from './RewriteBtn'

type RewriteBtnWrapperProps = {
  className?: string
  btnClassName?: string
}

export default function RewriteBtnWrapper(props: RewriteBtnWrapperProps) {
  const handleItemClicked = () => {
    /* ###Thi */ console.log(`👉👉👉 handleItemClicked()`)
    createRewriteEditor()
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
