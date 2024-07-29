import { SingleChoiceType } from './components/form-single-choice'
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
