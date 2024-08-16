import { Settings } from 'lucide-react'
import React from 'react'
import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../components/ui/dialog'
import RewriteBtnWrapper from '../content-script/notion/rewrite-btn-wrapper'
import { FormMenuOptions } from '../type'
import MenuOptionsForm from './menu-options-form'

export type MenuOptionsProps = {
  menuOptions: FormMenuOptions
  setMenuOptions: (menuOptions: FormMenuOptions) => void
}

export default function MenuOptions(props: MenuOptionsProps) {
  const [triggerAdd, setTriggerAdd] = React.useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-h-[95%] max-w-[min(95%,768px)] overflow-hidden flex flex-col p-4"
        onPointerDownOutside={e => e.preventDefault()}
        onInteractOutside={e => e.preventDefault()}
        onEscapeKeyDown={e => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Menu options</DialogTitle>
          <DialogDescription>
            This is the list of options when you click the Rewrite button.
          </DialogDescription>
        </DialogHeader>

        <MenuOptionsForm
          menuOptions={props.menuOptions}
          setMenuOptions={props.setMenuOptions}
          triggerAdd={triggerAdd}
        />

        <DialogFooter className="flex flex-row items-center !justify-between">
          <div className="flex flex-row items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setTriggerAdd(trigger => !trigger)}
            >
              Add option
            </Button>
            <div className="w-8 h-8">
              <RewriteBtnWrapper
                options={props.menuOptions.options}
                preview={true}
                className="w-full border-none"
                btnClassName="text-gray-500"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <DialogClose asChild>
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="default" size="sm">
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
