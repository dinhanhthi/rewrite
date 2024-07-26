import React from 'react'
import RewriteMenu from '../../components/rewrite-menu'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../components/ui/menubar'
import { toast } from '../../components/ui/use-toast'
import { cn, createRewriteEditor, formatSelectedText } from '../../helpers/helpers'
import { RewriteCtx } from '../rewrite-ctx'
import RewriteBtn from './rewrite-btn'

type RewriteBtnWrapperProps = {
  className?: string
  btnClassName?: string
}

export default function RewriteBtnWrapper(props: RewriteBtnWrapperProps) {
  const ctx = React.useContext(RewriteCtx)

  const handleItemClicked = async () => {
    if (ctx.mode === 'browser') {
      document.execCommand('copy')
      const [clipboardItem] = await navigator.clipboard.read()
      const outputBlob = await clipboardItem.getType('text/html')
      const output = await outputBlob.text()
      const formatedText = formatSelectedText(output)
      // console.log(formatedText)
      createRewriteEditor('menu', formatedText)
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
