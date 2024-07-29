import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import ErrorBoundary from '../components/error-boundary'
import FormInput from '../components/form-input'
import FormSingleChoice from '../components/form-single-choice'
import { Button } from '../components/ui/button'
import { Form } from '../components/ui/form'
import { toast } from '../components/ui/use-toast'
import { services } from '../config'
import { cn, generateAPIKeyPlaceholder } from '../helpers/helpers'
import { Service } from '../type'
import OptionsHeader from './options-header'

export type OptionsWrapperProps = {
  className?: string
  version?: string
}

const serviceIds = services.map(e => e.value) as [string, ...string[]]

export const FormSettingsSchema = z.object({
  service: z.enum(serviceIds, {
    required_error: 'You need to select an AI service.'
  }),
  apiKey: z.string().min(1)
})

export default function OptionsWrapper(props: OptionsWrapperProps) {
  const form = useForm<z.infer<typeof FormSettingsSchema>>({
    defaultValues: {
      service: 'openai',
      apiKey: ''
    },
    resolver: zodResolver(FormSettingsSchema)
  })

  const service = useWatch({ control: form.control, name: 'service' }) as Service

  function onSubmit(data: z.infer<typeof FormSettingsSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  /* ###Thi */ console.log(`👉👉👉 watch(): `, form.watch())

  return (
    <ErrorBoundary>
      <div className={cn('w-full h-full flex flex-col', props.className)}>
        <OptionsHeader version={props.version} />

        {/* content */}
        <div className="container p-4 py-8 lg:max-w-3xl">
          <div className="flex flex-row">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormSingleChoice form={form} name="service" data={services} label={'AI service'} />
                <FormInput
                  form={form}
                  type="password"
                  name="apiKey"
                  label="API Key"
                  placeholder={generateAPIKeyPlaceholder(service)}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
