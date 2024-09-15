import { z } from 'zod'
import {
  FormMenuOptionsSchema,
  FormSettingsSchema,
  MenuOptionSchema,
  menuOptionsSchema
} from './config'

export type Mode = 'browser' | 'playground'

export type EditorFrom = 'menu' | 'opt'

export type Service = 'openai' | 'mistral' | 'claude' | 'gemini' | 'llama'

export interface ServiceObject {
  name: string
  value: string
  available?: boolean
  models: { value: string; name: string }[]
  disabled?: boolean // still shown but disabled
  note?: string
}

export type MenuOptionType = z.infer<typeof menuOptionsSchema>

export type MenuNestedOptionType = z.infer<typeof MenuOptionSchema>

export type FormSettings = z.infer<typeof FormSettingsSchema>

export type FormMenuOptions = z.infer<typeof FormMenuOptionsSchema>
