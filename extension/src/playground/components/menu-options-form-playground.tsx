import { zodResolver } from '@hookform/resolvers/zod'
import { isEqual } from 'lodash'
import { TriangleAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TooltipThi from '../../components/ui/tooltip-thi'
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

  const [triggerAdd, setTriggerAdd] = useState(0)
  const [isFormChanged, setIsFormChanged] = useState(false)

  const form = useForm<FormMenuOptions>({
    defaultValues: menuOptions,
    resolver: zodResolver(FormMenuOptionsSchema),
    // mode: 'onChange'
    mode: 'all'
  })

  useEffect(() => {
    const isChanged = !isEqual(form.watch(), menuOptions)
    setIsFormChanged(isChanged)
  }, [form.watch()])

  function onSubmit() {
    // /* ###Thi */ console.log(`👉👉👉 form.formState.errors: `, form.formState.errors);
    // /* ###Thi */ console.log(`👉👉👉 form.formState.isValid: `, form.formState.isValid);
    // /* ###Thi */ console.log(`👉👉👉 menuOptions: `, menuOptions);
    // /* ###Thi */ console.log(`👉👉👉 form.watch: `, form.watch());
    /* ###Thi */ console.log(`👉👉👉 isFormChanged: `, isFormChanged)
    /* ###Thi */ console.log(`👉👉👉 form.formState.isDirty: `, form.formState.isDirty)
    /* ###Thi */ console.log(`👉👉👉 props.form.formState.isValid: `, form.formState.isValid)
    if (form.formState.isValid && isFormChanged) {
      toast({ description: `Save triggered` })
      setMenuOptions(form.getValues())
      form.reset(form.getValues())
    }
  }

  function onReset() {
    /* ###Thi */ console.log(`👉👉👉 onReset called`)
    form.reset(defaultMenuOptionsForm)
    setMenuOptions(defaultMenuOptionsForm)
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-[#aaa]">
      <div className="max-h-[min(90%,600px)] w-full max-w-[min(95%,768px)] gap-4 bg-white overflow-hidden flex flex-col p-4 rounded-md">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="flex flex-row items-center gap-2 text-lg font-semibold leading-none tracking-tight">
            Menu options
            {!form.watch().options?.length && (
              <TooltipThi content="At least one option is required!">
                <TriangleAlert className="inline w-5 h-5 text-destructive" />
              </TooltipThi>
            )}
          </h2>
          <p className="text-sm text-muted-foreground">
            This is the list of options when you click the Rewrite button.
          </p>
        </div>
        <MenuOptionsForm triggerAdd={triggerAdd} form={form} />
        <MenuOptionsFooter
          onReset={onReset}
          setOpen={() => toast({ description: `Close triggered` })}
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
      </div>
    </div>
  )
}
