import { Languages, MessageCircleQuestion, MicVocal, Sparkles, SpellCheck } from 'lucide-react'
import { SingleChoiceType } from './components/form-single-choice'
import { generateTranslatePrompt } from './helpers/helpers'
import LongerIcon from './icons/longer-icon'
import ShorterIcon from './icons/shorter-icon'
import SummerizeIcon from './icons/summerize-icon'
import { MenuOptionType } from './options/options-wrapper'
import { Settings } from './type'

export const defaultSettings: Settings = {
  service: 'openai'
}

export const services: SingleChoiceType[] = [
  { name: 'OpenAI', value: 'openai', available: true },
  { name: 'Mistral', value: 'mistral', available: true },
  { name: 'Claude', value: 'claude', available: true },
  { name: 'Gemini', value: 'gemini', available: true },
  { name: 'Llama', value: 'llama', available: false }
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
        system: true,
        value: tone.toLowerCase(),
        displayName: tone,
        available: true,
        prompt: `Change the tone of the given text to ${tone.toLowerCase()}.`
      })
    )
  }
]
