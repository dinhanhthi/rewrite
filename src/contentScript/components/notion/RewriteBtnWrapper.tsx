import React from 'react'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../../components/ui/menubar'
import { cn } from '../../../helpers/helpers'
import RewriteMenu from '../RewriteMenu'
import RewriteBtn from './RewriteBtn'

type RewriteBtnWrapperProps = {
  className?: string
  btnClassName?: string
}

export default function RewriteBtnWrapper(props: RewriteBtnWrapperProps) {
  return (
    <Menubar className="h-full p-0 bg-transparent border-none rounded-none">
      <MenubarMenu>
        <MenubarTrigger asChild className="p-0 !bg-transparent">
          <div
            className={cn(
              props.className,
              'h-full w-full pr-1 border-r border-slate-200 group notion-ignore py-0'
            )}
          >
            <RewriteBtn className={props.btnClassName} />
          </div>
        </MenubarTrigger>
        <RewriteMenu />
      </MenubarMenu>
    </Menubar>
  )
}
