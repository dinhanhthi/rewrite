import React from 'react'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../../components/ui/menubar'
import RewriteMenu from '../RewriteMenu'
import RewriteOpt from './RewriteOpt'

export default function RewriteBtnWrapper() {
  const [open, setOpen] = React.useState('')
  /* ###Thi */ console.log(`👉👉👉 open: `, open)
  return (
    <Menubar
      value={open}
      onMouseEnter={() => setOpen('hello')}
      onMouseLeave={() => setOpen('')}
      onValueChange={setOpen}
      className="relative flex-col w-full h-full p-0 bg-transparent border-none rounded-none"
    >
      <MenubarMenu value="hello">
        <MenubarTrigger asChild className="p-0 !bg-transparent rounded-none">
          <div className="border-y mt-[6px] border-[#37352f17] h-full px-[4px] py-[6px] w-full">
            <RewriteOpt />
          </div>
        </MenubarTrigger>
        <RewriteMenu className="absolute left-[calc(var(--radix-menubar-trigger-width)-4px)] top-[calc(var(--radix-menubar-trigger-height)*(-1)-10px)]" />
      </MenubarMenu>
    </Menubar>
  )
}
