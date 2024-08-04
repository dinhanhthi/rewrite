import { Languages, MessageCircleQuestion, MicVocal, Sparkles, SpellCheck } from 'lucide-react'
import { z } from 'zod'
import { generateTranslatePrompt } from './helpers/helpers'
import LongerIcon from './icons/longer-icon'
import ShorterIcon from './icons/shorter-icon'
import SummerizeIcon from './icons/summerize-icon'
import { FormSettings, MenuOptionType, ServiceObject } from './type'

export const services: ServiceObject[] = [
  {
    name: 'OpenAI',
    value: 'openai',
    available: true,
    models: [
      { value: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
      { value: 'gpt-4o-mini', name: 'GPT-4o Mini' },
      { value: 'gpt-4', name: 'GPT-4' },
      { value: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
      { value: 'gpt-4o', name: 'GPT-4o' }
    ]
  },
  {
    name: 'Mistral',
    value: 'mistral',
    available: true,
    models: [
      { value: 'mistral-tiny', name: 'Mistral Tiny' },
      { value: 'mistral-small-latest', name: 'Mistral Small' },
      { value: 'mistral-medium-latest', name: 'Mistral Medium' },
      { value: 'mistral-large-latest', name: 'Mistral Large' }
    ]
  },
  {
    name: 'Claude',
    value: 'claude',
    available: true,
    models: [
      { value: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' },
      { value: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet' },
      { value: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
      { value: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet' }
    ]
  },
  {
    name: 'Gemini',
    value: 'gemini',
    available: true,
    models: [
      { value: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
      { value: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' }
    ]
  }
  // { name: 'Llama', value: 'llama', available: false }
]

export const defaultMenuOptions: MenuOptionType[] = [
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
    prompt: 'Improve the given text.',
    nestedOptions: []
  },
  {
    system: true,
    icon: SummerizeIcon,
    value: 'summarize',
    displayName: 'Summarize',
    available: true,
    prompt: 'Summarize the given text.',
    nestedOptions: []
  },
  {
    system: true,
    icon: MessageCircleQuestion,
    value: 'explain-this',
    displayName: 'Explain this',
    available: true,
    prompt: 'Explain the given text.',
    nestedOptions: []
  },
  {
    system: true,
    icon: SpellCheck,
    value: 'fix-spelling-grammar',
    displayName: 'Fix spelling & grammar',
    available: true,
    prompt: 'Fix the spelling & grammar of the given text.',
    nestedOptions: []
  },
  {
    system: true,
    icon: ShorterIcon,
    value: 'make-shorter',
    displayName: 'Make shorter',
    available: true,
    prompt: 'Make the given text shorter.',
    nestedOptions: []
  },
  {
    system: true,
    icon: LongerIcon,
    value: 'make-longer',
    displayName: 'Make longer',
    available: true,
    prompt: 'Make the given text longer.',
    nestedOptions: []
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
        system: true,
        value: tone.toLowerCase(),
        displayName: tone,
        available: true,
        prompt: `Change the tone of the given text to ${tone.toLowerCase()}.`
      })
    )
  }
]

// Options form

export const MenuOptionSchema = z.object({
  system: z.boolean().optional(),
  icon: z.any().optional(),
  value: z.string().min(1),
  displayName: z.string().max(35, 'Max 35 characters allowed!').optional(),
  available: z.boolean().optional(),
  tooltip: z.string().optional(),
  prompt: z.string().optional()
})

export const menuOptionsSchema = MenuOptionSchema.extend({
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

export const FormSettingsSchema = z.object({
  service: z.enum(services.map(e => e.value) as [string, ...string[]], {
    required_error: 'You need to select an AI service.'
  }),
  model: z.string(),
  apiKey: z.string().min(1, 'This field is required.'),
  stream: z.boolean().optional().default(false),
  menuOptions: z.array(menuOptionsSchema).min(1, 'At least one option is required.')
})

export const defaultSettings: FormSettings = {
  service: 'openai',
  model: 'gpt-4o-mini',
  apiKey: 'xxxx', // ###Thi empty it
  stream: false,
  menuOptions: defaultMenuOptions
}
