import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import ErrorBoundary from '../components/error-boundary'
import FormInput from '../components/form-input'
import FormSingleChoice from '../components/form-single-choice'
import { Button } from '../components/ui/button'
import { Form } from '../components/ui/form'
import { services } from '../config'
import { cn, generateAPIKeyPlaceholder, generateTranslatePrompt } from '../helpers/helpers'
import { Service } from '../type'
import FormMenuOptions from './form-menu-options'
import OptionsHeader from './options-header'

export type OptionsWrapperProps = {
  className?: string
  version?: string
}

const serviceIds = services.map(e => e.value) as [string, ...string[]]

const MenuOptionSchema = z.object({
  icon: z.optional(z.any()),
  value: z.string().min(1),
  displayName: z.string().min(1),
  available: z.optional(z.boolean()),
  tooltip: z.optional(z.string()),
  prompt: z.optional(z.string())
})

export type MenuOptionType = z.infer<typeof MenuOptionSchema>

export const FormSettingsSchema = z.object({
  service: z.enum(serviceIds, {
    required_error: 'You need to select an AI service.'
  }),
  apiKey: z.string().min(1),
  menuOptions: z.array(
    z.object({
      ...MenuOptionSchema.shape,
      enableNestedOptions: z.optional(z.boolean()),
      nestedOptions: z.optional(z.array(MenuOptionSchema))
    })
  )
})

type FormSettings = z.infer<typeof FormSettingsSchema>

const defaultSettings: FormSettings = {
  service: 'openai',
  apiKey: '',
  menuOptions: [
    {
      // icon: Languages,
      value: 'translate',
      displayName: 'Translate',
      available: true,
      enableNestedOptions: true,
      nestedOptions: [
        'Vietnamese',
        'English',
        'Chinese',
        // 'Japanese',
        // 'Spanish',
        // 'French',
        // 'Russian',
        // 'Portuguese',
        // 'German',
        // 'Italian'
      ].map(lang => ({
        value: lang.toLowerCase(),
        displayName: lang,
        available: true,
        prompt: generateTranslatePrompt(lang)
      }))
    },
    {
      // icon: Sparkles,
      value: 'improve-writing',
      displayName: 'Improve writing',
      available: true,
      prompt: 'Improve the given text.'
    },
    // {
    //   // icon: SummerizeIcon,
    //   value: 'summarize',
    //   displayName: 'Summarize',
    //   available: true,
    //   prompt: 'Summarize the given text.'
    // }
    // {
    //   icon: MessageCircleQuestion,
    //   value: 'explain-this',
    //   displayName: 'Explain this',
    //   available: true,
    //   prompt: 'Explain the given text.'
    // },
    // {
    //   icon: SpellCheck,
    //   value: 'fix-spelling-grammar',
    //   displayName: 'Fix spelling & grammar',
    //   available: true,
    //   prompt: 'Fix the spelling & grammar of the given text.'
    // },
    // {
    //   icon: ShorterIcon,
    //   value: 'make-shorter',
    //   displayName: 'Make shorter',
    //   available: true,
    //   prompt: 'Make the given text shorter.'
    // },
    // {
    //   icon: LongerIcon,
    //   value: 'make-longer',
    //   displayName: 'Make longer',
    //   available: true,
    //   prompt: 'Make the given text longer.'
    // },
    // {
    //   // icon: MicVocal,
    //   value: 'change-tone',
    //   displayName: 'Change tone',
    //   available: true,
    //   enableNestedOptions: true,
    //   nestedOptions: ['Professional', 'Casual', 'Straightforward', 'Confident', 'Friendly'].map(
    //     tone => ({
    //       value: tone.toLowerCase(),
    //       displayName: tone,
    //       available: true,
    //       prompt: `Change the tone of the given text to ${tone.toLowerCase()}.`
    //     })
    //   )
    // }
  ]
}

export default function OptionsWrapper(props: OptionsWrapperProps) {
  const form = useForm<FormSettings>({
    defaultValues: defaultSettings,
    resolver: zodResolver(FormSettingsSchema)
  })

  const service = useWatch({ control: form.control, name: 'service' }) as Service

  function onSubmit(data: FormSettings) {
    /* ###Thi */ console.log(`👉👉👉 onSubmit called`)
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

  form.control

  // /* ###Thi */ console.log(`👉👉👉 watch(): `, form.watch())
  const items = form.watch('menuOptions')

  return (
    <ErrorBoundary>
      <div className={cn('w-full h-full flex flex-col', props.className)}>
        <OptionsHeader version={props.version} />

        {/* content */}
        <div className="container p-4 py-8 lg:max-w-3xl">
          <div className="flex flex-row">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-6">
                <FormSingleChoice
                  control={form.control}
                  name="service"
                  data={services}
                  label={'AI service'}
                  labelClassName="font-medium"
                />
                <FormInput
                  control={form.control}
                  type="password"
                  name="apiKey"
                  label="API Key"
                  labelClassName="font-medium"
                  placeholder={generateAPIKeyPlaceholder(service)}
                />
                <FormMenuOptions
                  control={form.control}
                  name="menuOptions"
                  nestedName="nestedOptions"
                />
                <Button className="mx-auto w-fit" type="submit">
                  Save
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
