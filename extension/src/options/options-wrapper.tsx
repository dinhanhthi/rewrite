import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'

import { isEqual } from 'lodash'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import ErrorBoundary from '../components/error-boundary'
import FormInput from '../components/form-input'
import FormSelect from '../components/form-select'
import FormSingleChoice from '../components/form-single-choice'
import FormSwitch from '../components/form-switch'
import { Button } from '../components/ui/button'
import { Form } from '../components/ui/form'
import { FormSettingsSchema, services } from '../config'
import RewriteBtnWrapper from '../content-script/notion/rewrite-btn-wrapper'
import { cn, generateAPIKeyPlaceholder } from '../helpers/helpers'
import { FormSettings, Service, ServiceObject } from '../type'
import FormMenuOptions from './form-menu-options'
import OptionsHeader from './options-header'

export type OptionsWrapperProps = {
  className?: string
  version?: string
  settings: FormSettings
  setSettings: (settings: FormSettings) => void
}

export default function OptionsWrapper(props: OptionsWrapperProps) {
  const [loaded, setLoaded] = useState(false)
  const [models, setModels] = useState<ServiceObject['models']>(
    services.find(e => e.value === props.settings.service)!.models
  )
  const [isFormChanged, setIsFormChanged] = useState(false)

  const form = useForm<FormSettings>({
    defaultValues: props.settings,
    resolver: zodResolver(FormSettingsSchema),
    mode: 'onChange'
  })

  useEffect(() => {
    if (props.settings && !loaded) {
      setModels(services.find(e => e.value === props.settings.service)!.models)
      setTimeout(() => {
        form.reset(props.settings)
        setTimeout(() => {
          setLoaded(true)
        }, 200)
      }, 100)
    }
  }, [props.settings, form.reset, loaded])

  const watch = form.watch()
  useEffect(() => {
    const isChanged = !isEqual(watch, props.settings)
    setIsFormChanged(isChanged)
  }, [watch])

  const watchOptions = watch.menuOptions
  const watchService = watch.service as Service

  function onSubmit(data: FormSettings) {
    if (form.formState.isValid) {
      props.setSettings(data)
      form.reset(data)
    }
  }

  const verifyAPIKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('👉👉👉 verifyAPIKey')
  }

  const onServiceChange = (e: string) => {
    const mds = services.find(_e => _e.value === e)!.models
    setModels(mds)
    form.setValue('model', mds[0].value)
  }

  return (
    <ErrorBoundary>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('w-full h-full flex flex-col', props.className)}
        >
          <OptionsHeader version={props.version} />

          {loaded && (
            <>
              <div className="flex-1 w-full min-h-0 overflow-auto dat-scrollbar">
                <div className="container h-full p-4 lg:max-w-3xl ">
                  <div className="flex flex-row pt-4 pb-8">
                    <div className="flex flex-col w-full gap-6">
                      <FormSingleChoice
                        control={form.control}
                        name="service"
                        data={services.filter(e => e.available)}
                        label={'AI service'}
                        labelClassName="font-medium"
                        onChange={onServiceChange}
                      />
                      <FormSelect
                        control={form.control}
                        name="model"
                        data={models}
                        label={'AI model'}
                        labelClassName="font-medium"
                        triggerClassName="w-fit px-4"
                      />
                      <div className="flex flex-row items-center w-full gap-4">
                        <FormInput
                          className="flex-1"
                          control={form.control}
                          type="password"
                          name="apiKey"
                          label="API Key"
                          labelClassName="font-medium"
                          placeholder={generateAPIKeyPlaceholder(watchService)}
                        />
                        <Button onClick={e => verifyAPIKey(e)} variant="default">
                          Verify key
                        </Button>
                      </div>
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
                    disabled={!isFormChanged || !form.formState.isValid}
                    onClick={() => onSubmit(form.getValues())}
                    className="h-8 py-1 w-fit"
                    type="submit"
                  >
                    Save settings
                  </Button>
                </div>
              </div>
            </>
          )}

          {!loaded && (
            <div className="flex items-center justify-center flex-1 w-full min-h-0 animate-pulse">
              <LoaderCircle className="m-auto animate-spin text-slate-500" size={40} />
            </div>
          )}
        </form>
      </Form>
    </ErrorBoundary>
  )
}
