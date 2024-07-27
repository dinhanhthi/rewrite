export type Mode = 'browser' | 'playground'

export type EditorFrom = 'menu' | 'opt'

export type Service = 'openai' | 'mistral' | 'claude' | 'gemini' | 'llama'

export type Settings = {
  service: Service
}

export type SettingsKeys = keyof Settings