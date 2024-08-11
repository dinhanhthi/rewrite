import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useRef, useState } from 'react'

import { isEqual } from 'lodash'
import { Check, LoaderCircle, Search, XCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import ErrorBoundary from '../components/error-boundary'
import FormInput from '../components/form-input'
import FormSelect from '../components/form-select'
import FormSingleChoice from '../components/form-single-choice'
import FormSwitch from '../components/form-switch'
import { Button } from '../components/ui/button'
import { Form } from '../components/ui/form'
import TooltipThi from '../components/ui/tooltip-thi'
import { FormSettingsSchema, services } from '../config'
import RewriteBtnWrapper from '../content-script/notion/rewrite-btn-wrapper'
import { cn, generateAPIKeyPlaceholder, validateApiKey } from '../helpers/helpers'
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
  // We need this "trick" instead of using formState.isValid directly because it's not updated in time
  // especially when we remove an item from the array
  const [isFormValid, setIsFormValid] = useState(false)

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
    setIsFormValid(form.formState.isValid)
    setIsFormChanged(isChanged)
  }, [watch])

  function onSubmit(data: FormSettings) {
    if (form.formState.isValid) {
      props.setSettings(data)
      form.reset(data)
      setIsValidKey(null)
    }
  }

  const [isVerifyingKey, setIsVerifyingKey] = useState(false)
  const [isValidKey, setIsValidKey] = useState<boolean | null>(null)
  const verifyAPIKey = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVerifyingKey(true)
    const isValid = await validateApiKey(watch.service as Service, watch.apiKey, watch.model)
    setIsValidKey(isValid)
    setIsVerifyingKey(false)
  }

  const onServiceChange = (e: string) => {
    const mds = services.find(_e => _e.value === e)!.models
    setModels(mds)
    form.setValue('model', mds[0].value)
  }

  const bodyContainerRef = useRef<HTMLDivElement>(null)

  return (
    <ErrorBoundary>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('w-full h-full flex flex-col', props.className)}
        >
          <OptionsHeader
            version={props.version}
            settings={props.settings}
            setSettings={props.setSettings}
          />

          {loaded && (
            <>
              <div ref={bodyContainerRef} className="flex-1 w-full min-h-0 overflow-auto dat-scrollbar">
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
                          placeholder={generateAPIKeyPlaceholder(watch.service as Service)}
                          onChange={() => setIsValidKey(null)}
                        />
                        {isValidKey && (
                          <TooltipThi content="API Key is valid">
                            <Check className="w-6 h-6 text-green-500" />
                          </TooltipThi>
                        )}
                        {!isValidKey && isValidKey !== null && (
                          <TooltipThi content="Invalid API Key">
                            <XCircle className="w-6 h-6 text-destructive" />
                          </TooltipThi>
                        )}
                        <Button
                          onClick={e => verifyAPIKey(e)}
                          className="flex flex-row items-center h-8 gap-2 px-3"
                          variant="default"
                        >
                          {!isVerifyingKey && <Search className="w-4 h-4" />}
                          {isVerifyingKey && <LoaderCircle className="w-4 h-4 animate-spin" />}
                          Verify
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
                        bodyContainerRef={bodyContainerRef}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full border-t border-slate-200">
                <div className="container flex flex-row items-center justify-between px-4 py-2 lg:max-w-3xl">
                  <div className="flex flex-row items-center h-8 gap-0 w-9">
                    <RewriteBtnWrapper
                      options={watch.menuOptions}
                      preview={true}
                      className="w-8 border-none"
                      btnClassName="text-gray-500"
                    />
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      👈 What it looks like
                    </span>
                  </div>

                  <Button
                    disabled={!isFormChanged || !isFormValid}
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
