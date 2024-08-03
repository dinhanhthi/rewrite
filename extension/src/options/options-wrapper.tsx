import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { Languages, MessageCircleQuestion, MicVocal, Sparkles, SpellCheck } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import ErrorBoundary from '../components/error-boundary'
import FormInput from '../components/form-input'
import FormSingleChoice from '../components/form-single-choice'
import FormSwitch from '../components/form-switch'
import { Button } from '../components/ui/button'
import { Form } from '../components/ui/form'
import { services } from '../config'
import { cn, generateAPIKeyPlaceholder, generateTranslatePrompt } from '../helpers/helpers'
import { Service } from '../type'
import FormMenuOptions from './form-menu-options'
import OptionsHeader from './options-header'
import LongerIcon from '../icons/longer-icon'
import ShorterIcon from '../icons/shorter-icon'
import SummerizeIcon from '../icons/summerize-icon'

export type OptionsWrapperProps = {
  className?: string
  version?: string
}

const serviceIds = services.map(e => e.value) as [string, ...string[]]

const MenuOptionSchema = z.object({
  system: z.boolean().optional(),
  icon: z.any().optional(),
  value: z.string().min(1),
  displayName: z.string().max(35, 'Max 35 characters allowed!').optional(),
  available: z.boolean().optional(),
  tooltip: z.string().optional(),
  prompt: z.string().optional()
})

const menuOptionsSchema = MenuOptionSchema.extend({
  enableNestedOptions: z.boolean().optional(),
  nestedOptions: z.array(MenuOptionSchema).optional()
}).superRefine((data, ctx) => {
  if (data.enableNestedOptions) {
    if (!data.nestedOptions || data.nestedOptions.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one nested option is required.',
        path: ['nestedOptions']
      })
    } else {
      data.nestedOptions.forEach((nestedOption, index) => {
        if (!nestedOption.displayName || nestedOption.displayName.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'This field is required.',
            path: ['nestedOptions', index, 'displayName']
          })
        }

        if (!nestedOption.prompt || nestedOption.prompt.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'This field is required.',
            path: ['nestedOptions', index, 'prompt']
          })
        }
      })
    }
  } else {
    if (!data.prompt || data.prompt.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'This field is required.',
        path: ['prompt']
      })
    }
  }

  if (!data.displayName || data.displayName.trim().length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'This field is required.',
      path: ['displayName']
    })
  }
})

const FormSettingsSchema = z.object({
  service: z.enum(serviceIds, {
    required_error: 'You need to select an AI service.'
  }),
  apiKey: z.string().min(1, 'This field is required.'),
  stream: z.boolean().optional().default(false),
  menuOptions: z.array(menuOptionsSchema).min(1, 'At least one option is required.')
})

export type MenuOptionType = z.infer<typeof menuOptionsSchema>

export type MenuNestedOptionType = z.infer<typeof MenuOptionSchema>

export type FormSettings = z.infer<typeof FormSettingsSchema>

const defaultSettings: FormSettings = {
  service: 'openai',
  apiKey: 'xxxx', // ###Thi empty it
  stream: false,
  menuOptions: [
    {
      system: true,
      icon: Languages,
      value: 'translate',
      displayName: 'Translate',
      available: true,
      enableNestedOptions: true,
      nestedOptions: [
        'Vietnamese',
        'English',
        'Chinese',
        'Japanese',
        'Spanish',
        'French',
        'Russian',
        'Portuguese',
        'German',
        'Italian'
      ].map(lang => ({
        system: true,
        value: lang.toLowerCase(),
        displayName: lang,
        available: true,
        prompt: generateTranslatePrompt(lang)
      }))
    },
    {
      system: true,
      icon: Sparkles,
      value: 'rw-improve-writing',
      displayName: 'Improve writing',
      available: true,
      prompt: 'Improve the given text.'
    },
    {
      system: true,
      icon: SummerizeIcon,
      value: 'summarize',
      displayName: 'Summarize',
      available: true,
      prompt: 'Summarize the given text.'
    },
    {
      system: true,
      icon: MessageCircleQuestion,
      value: 'explain-this',
      displayName: 'Explain this',
      available: true,
      prompt: 'Explain the given text.'
    },
    {
      system: true,
      icon: SpellCheck,
      value: 'fix-spelling-grammar',
      displayName: 'Fix spelling & grammar',
      available: true,
      prompt: 'Fix the spelling & grammar of the given text.'
    },
    {
      system: true,
      icon: ShorterIcon,
      value: 'make-shorter',
      displayName: 'Make shorter',
      available: true,
      prompt: 'Make the given text shorter.'
    },
    {
      system: true,
      icon: LongerIcon,
      value: 'make-longer',
      displayName: 'Make longer',
      available: true,
      prompt: 'Make the given text longer.'
    },
    {
      system: true,
      icon: MicVocal,
      value: 'change-tone',
      displayName: 'Change tone',
      available: true,
      enableNestedOptions: true,
      nestedOptions: ['Professional', 'Casual', 'Straightforward', 'Confident', 'Friendly'].map(
        tone => ({
          value: tone.toLowerCase(),
          displayName: tone,
          available: true,
          prompt: `Change the tone of the given text to ${tone.toLowerCase()}.`
        })
      )
    }
  ]
}

export default function OptionsWrapper(props: OptionsWrapperProps) {
  const form = useForm<FormSettings>({
    defaultValues: defaultSettings,
    resolver: zodResolver(FormSettingsSchema),
    mode: 'onTouched'
  })

  form.setValue

  /* ###Thi */ console.log(`👉👉👉 formState: `, form.formState.errors)

  const service = useWatch({ control: form.control, name: 'service' }) as Service

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
      <div className={cn('w-full h-full flex flex-col', props.className)}>
        <OptionsHeader version={props.version} />

        <div className="flex-1 w-full min-h-0 overflow-auto dat-scrollbar">
          <div className="container h-full p-4 py-8 lg:max-w-3xl ">
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

                  {/* ###Thi ###TODO to remove or modify */}
                  <Button className="mx-auto w-fit" type="submit">
                    Save
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
