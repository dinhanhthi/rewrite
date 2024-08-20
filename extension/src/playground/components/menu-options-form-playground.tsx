import { zodResolver } from '@hookform/resolvers/zod'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from '../../components/ui/use-toast'
import { defaultMenuOptionsForm, FormMenuOptionsSchema } from '../../config'
import useLocalStorage from '../../helpers/hooks/use-local-storage'
import MenuOptionsFooter from '../../options/menu-options-footer'
import MenuOptionsForm from '../../options/menu-options-form'
import { FormMenuOptions } from '../../type'

export default function MenuOptionsModalPlayground() {
  const [menuOptions, setMenuOptions] = useLocalStorage<FormMenuOptions>(
    'menuOptions',
    defaultMenuOptionsForm
  )

  const [triggerAdd, setTriggerAdd] = useState(false)
  const [isFormChanged, setIsFormChanged] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const form = useForm<FormMenuOptions>({
    defaultValues: menuOptions,
    resolver: zodResolver(FormMenuOptionsSchema),
    mode: 'onChange'
  })

  useEffect(() => {
    // /* ###Thi */ console.log(`👉👉👉 watch: `, watch)
    // /* ###Thi */ console.log(`👉👉👉 props.menuOptions: `, props.menuOptions)
    const isChanged = !isEqual(form.watch, menuOptions)
    // /* ###Thi */ console.log(`👉👉👉 isChanged: `, isChanged)
    // /* ###Thi */ console.log(`👉👉👉 form.formState.isValid: `, form.formState.isValid)
    // /* ###Thi */ console.log(`👉👉👉 errors: `, form.formState.errors)
    setIsFormValid(form.formState.isValid)
    setIsFormChanged(isChanged)
  }, [form.watch])

  return (
    <div className="flex items-center justify-center w-full h-full bg-[#aaa]">
      <div className="max-h-[min(90%,600px)] w-full max-w-[min(95%,768px)] gap-4 bg-white overflow-hidden flex flex-col p-4 rounded-md">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className='text-lg font-semibold leading-none tracking-tight'>Menu options</h2>
          <p className="text-sm text-muted-foreground">
            This is the list of options when you click the Rewrite button.
          </p>
        </div>
        <MenuOptionsForm
          triggerAdd={triggerAdd}
          form={form}
          menuOptions={menuOptions}
          setMenuOptions={setMenuOptions}
        />
        <MenuOptionsFooter
          setOpen={() => toast({ description: `Close triggered` })}
          menuOptions={form.watch()}
          triggerAdd={triggerAdd}
          setTriggerAdd={setTriggerAdd}
          onSubmit={() => toast({ description: `Save triggered` })}
        />
      </div>
    </div>
  )
}
