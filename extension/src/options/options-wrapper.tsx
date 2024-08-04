import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import ErrorBoundary from '../components/error-boundary'
import FormInput from '../components/form-input'
import FormSelect from '../components/form-select'
import FormSingleChoice from '../components/form-single-choice'
import FormSwitch from '../components/form-switch'
import { Button } from '../components/ui/button'
import { Form } from '../components/ui/form'
import { defaultSettings, FormSettingsSchema, services } from '../config'
import RewriteBtnWrapper from '../content-script/notion/rewrite-btn-wrapper'
import { cn, generateAPIKeyPlaceholder } from '../helpers/helpers'
import { FormSettings, Service } from '../type'
import FormMenuOptions from './form-menu-options'
import OptionsHeader from './options-header'

export type OptionsWrapperProps = {
  className?: string
  version?: string
}

export default function OptionsWrapper(props: OptionsWrapperProps) {
  // const [models, setModels] = useState<ServiceObject['models']>([])

  const form = useForm<FormSettings>({
    defaultValues: defaultSettings,
    resolver: zodResolver(FormSettingsSchema),
    mode: 'onTouched'
  })

  const watchOptions = form.watch('menuOptions')
  const watchService = form.watch('service') as Service
  const models = services.find(e => e.value === watchService)!.models

  useEffect(() => {
    form.setValue('model', models[0].value)
  }, [watchService, form.setValue])

  function onSubmit(data: FormSettings) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   )
    // })
    /* ###Thi */ console.log(`👉👉👉 data: `, data)
  }

  return (
    <ErrorBoundary>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('w-full h-full flex flex-col', props.className)}
        >
          <OptionsHeader version={props.version} />

          <div className="flex-1 w-full min-h-0 overflow-auto dat-scrollbar">
            <div className="container h-full p-4 py-8 lg:max-w-3xl ">
              <div className="flex flex-row">
                <div className="flex flex-col w-full gap-6">
                  <FormSingleChoice
                    control={form.control}
                    name="service"
                    data={services.filter(e => e.available)}
                    label={'AI service'}
                    labelClassName="font-medium"
                  />
                  <FormSelect
                    control={form.control}
                    name="model"
                    data={models}
                    label={'AI service'}
                    labelClassName="font-medium"
                    triggerClassName="w-fit px-4"
                  />
                  <FormInput
                    control={form.control}
                    type="password"
                    name="apiKey"
                    label="API Key"
                    labelClassName="font-medium"
                    placeholder={generateAPIKeyPlaceholder(watchService)}
                  />
                  <FormSwitch
                    control={form.control}
                    name="stream"
                    label="Streaming response"
                    labelClassName="gap-4"
                    size="smaller"
                    controlComesFirst={false}
                  />
                  <FormMenuOptions
                    control={form.control}
                    name="menuOptions"
                    nestedName="nestedOptions"
                    setValue={form.setValue}
                    getValue={form.getValues}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-slate-200">
            <div className="container flex flex-row items-center justify-between px-4 py-2 lg:max-w-3xl">
              <div className="flex flex-row items-center h-8 gap-0 w-9">
                <RewriteBtnWrapper
                  options={watchOptions}
                  preview={true}
                  className="w-8 border-none"
                  btnClassName="text-gray-500"
                />
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  👈 What it looks like
                </span>
              </div>

              <Button
                onClick={() => onSubmit(form.getValues())}
                className="h-8 py-1 w-fit"
                type="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </ErrorBoundary>
  )
}
