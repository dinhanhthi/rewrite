import { zodResolver } from '@hookform/resolvers/zod'
import { isEqual } from 'lodash'
import { Settings } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { FormMenuOptionsSchema } from '../config'
import RewriteBtnWrapper from '../content-script/notion/rewrite-btn-wrapper'
import { FormMenuOptions } from '../type'
import MenuOptionsForm from './menu-options-form'

export type MenuOptionsProps = {
  menuOptions: FormMenuOptions
  setMenuOptions: (menuOptions: FormMenuOptions) => void
}

export default function MenuOptions(props: MenuOptionsProps) {
  const [triggerAdd, setTriggerAdd] = useState(false)
  const [isFormChanged, setIsFormChanged] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const form = useForm<FormMenuOptions>({
    defaultValues: props.menuOptions,
    resolver: zodResolver(FormMenuOptionsSchema),
    // mode: 'onChange'
    // mode: 'all'
    mode: 'onBlur'
  })

  const watch = form.watch()
  useEffect(() => {
    // /* ###Thi */ console.log(`👉👉👉 watch: `, watch)
    // /* ###Thi */ console.log(`👉👉👉 props.menuOptions: `, props.menuOptions)
    const isChanged = !isEqual(watch, props.menuOptions)
    // /* ###Thi */ console.log(`👉👉👉 isChanged: `, isChanged)
    // /* ###Thi */ console.log(`👉👉👉 form.formState.isValid: `, form.formState.isValid)
    // /* ###Thi */ console.log(`👉👉👉 errors: `, form.formState.errors)
    setIsFormValid(form.formState.isValid)
    setIsFormChanged(isChanged)
  }, [watch])

  function onSubmit() {
    /* ###Thi */ console.log(`👉👉👉 isFormChanged: `, isFormChanged);
    /* ###Thi */ console.log(`👉👉👉 errors: `, form.formState.errors)
    if (form.formState.isValid && isFormChanged) {
      /* ###Thi */ console.log(`👉👉👉 Saved clicked`);
      // props.setMenuOptions(data)
      // form.reset(data)
    }
  }

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
          form={form}
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
            <Button variant="default" size="sm" onClick={() => onSubmit()}>
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
