import React, { useEffect } from 'react'
import RewriteMenu from '../../components/rewrite-menu'
import { Menubar, MenubarMenu, MenubarTrigger } from '../../components/ui/menubar'
import { toast } from '../../components/ui/use-toast'
import { cn, createRewriteEditor, formatSelectedText } from '../../helpers/helpers'
import { RewriteCtx } from '../rewrite-ctx'
import RewriteBtn from './rewrite-btn'
import { MenuOptionType } from '../../options/options-wrapper'

type RewriteBtnWrapperProps = {
  className?: string
  btnClassName?: string
  alwaysShowMenu?: boolean
  preview?: boolean
  options?: MenuOptionType[]
}

export default function RewriteBtnWrapper(props: RewriteBtnWrapperProps) {
  const ctx = React.useContext(RewriteCtx)
  const [showMenu, setShowMenu] = React.useState(props.alwaysShowMenu ? 'rewrite-menu' : '')

  useEffect(() => {
    setShowMenu(props.alwaysShowMenu ? 'rewrite-menu' : '')
  }, [props.alwaysShowMenu])

  const handleItemClicked = async () => {
    if (ctx.mode === 'browser') {
      document.execCommand('copy')
      const [clipboardItem] = await navigator.clipboard.read()
      const outputBlob = await clipboardItem.getType('text/html')
      const output = await outputBlob.text()
      const formatedText = formatSelectedText(output)
      createRewriteEditor('menu', formatedText)
    } else {
      toast({ description: `Menu item clicked` })
    }
  }

  return (
    <Menubar
      value={showMenu}
      onValueChange={setShowMenu}
      className="h-full p-0 bg-transparent border-none rounded-none"
    >
      <MenubarMenu value="rewrite-menu">
        <MenubarTrigger asChild className="p-0 !bg-transparent">
          <div
            className={cn(
              props.className,
              'h-full w-full pr-1 border-r border-slate-200 group notion-ignore py-0 !rounded-none'
            )}
          >
            <RewriteBtn
              className={props.btnClassName}
              hideText={props.preview}
              tooltip={props.preview ? 'Preview' : undefined}
            />
          </div>
        </MenubarTrigger>
        <RewriteMenu
          options={props.options}
          className="w-0"
          handleItemClicked={handleItemClicked}
          disableFocusOutside={props.alwaysShowMenu}
        />
      </MenubarMenu>
    </Menubar>
  )
}
