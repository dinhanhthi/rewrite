import { createContext } from 'react'
import { EditorFrom, FormMenuOptions, FormSettings } from '../type'

export type TalkToBackgroundProps = {
  portName?: string
  message: {
    type: string
    prompt: string
  }
}

export type TalkToBackgroundFunc = (props: TalkToBackgroundProps) => Promise<any>

export type RewriteCtxType = {
  from: EditorFrom
  settings?: FormSettings
  menuOptions?: FormMenuOptions
  selectedText?: string
  talkToBackground?: TalkToBackgroundFunc
  mode?: 'browser' | 'playground'
}

export const RewriteCtx = createContext<RewriteCtxType>({
  from: 'menu',
  // settings: defaultSettings, // Cannot use defaultSettings here there is an error
  settings: {} as FormSettings,
  // menuOptions: defaultMenuOptionsForm, // Cannot use defaultMenuOptionsForm here there is an error
  menuOptions: {} as FormMenuOptions,
  selectedText: '',
  mode: 'playground',
  talkToBackground: {} as TalkToBackgroundFunc
})
