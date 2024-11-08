import { zodResolver } from '@hookform/resolvers/zod'
import { isEqual } from 'lodash'
import { Settings, TriangleAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../components/ui/dialog'
import TooltipThi from '../components/ui/tooltip-thi'
import { defaultMenuOptionsForm, FormMenuOptionsSchema } from '../config'
import { TalkToBackgroundFunc } from '../content-script/rewrite-ctx'
import { FormMenuOptions } from '../type'
import MenuOptionsFooter from './menu-options-footer'
import MenuOptionsForm from './menu-options-form'

export type MenuOptionsProps = {
  menuOptions: FormMenuOptions
  setMenuOptions: (menuOptions: FormMenuOptions) => void
  talkToBackground?: TalkToBackgroundFunc
}

export default function MenuOptions(props: MenuOptionsProps) {
  const [triggerAdd, setTriggerAdd] = useState(0)
  const [isFormChanged, setIsFormChanged] = useState(false)
  const [open, setOpen] = React.useState(false)

  const form = useForm<FormMenuOptions>({
    defaultValues: props.menuOptions,
    resolver: zodResolver(FormMenuOptionsSchema),
    // mode: 'onChange'
    mode: 'all'
    // mode: 'onBlur'
  })

  const watch = form.watch()
  useEffect(() => {
    const isChanged = !isEqual(watch, props.menuOptions)
    setIsFormChanged(isChanged)
  }, [watch])

  function onSubmit() {
    if (form.formState.isValid && isFormChanged) {
      props.setMenuOptions(form.getValues())
      form.reset(form.getValues())
      props.talkToBackground?.({ message: { type: 'reload' } })
    }
  }

  function onReset() {
    form.reset(defaultMenuOptionsForm)
    props.setMenuOptions(defaultMenuOptionsForm)
  }

  function handleModalOpenChange(open: boolean) {
    setOpen(open)
    if (!open) {
      form.reset(props.menuOptions)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleModalOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-h-[min(95%,700px)] max-w-[min(95%,768px)] overflow-hidden flex flex-col p-4"
        onPointerDownOutside={e => e.preventDefault()}
        onInteractOutside={e => e.preventDefault()}
        // onEscapeKeyDown={e => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            Menu options
            {!watch.options?.length && (
              <TooltipThi content="At least one option is required!">
                <TriangleAlert className="inline w-5 h-5 text-destructive" />
              </TooltipThi>
            )}
          </DialogTitle>
          <DialogDescription>
            This is the list of options when you click the Rewrite button.
          </DialogDescription>
        </DialogHeader>

        <MenuOptionsForm form={form} triggerAdd={triggerAdd} />

        <DialogFooter>
          <MenuOptionsFooter
            onReset={onReset}
            handleModalOpenChange={handleModalOpenChange}
            menuOptions={form.watch()}
            triggerAdd={triggerAdd}
            setTriggerAdd={setTriggerAdd}
            onSubmit={onSubmit}
            saveDisabled={
              (!form.formState.isValid && form.formState.isDirty && isFormChanged) ||
              !form.formState.isDirty ||
              !isFormChanged
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
