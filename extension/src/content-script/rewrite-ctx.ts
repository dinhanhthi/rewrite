import { createContext } from 'react'
import { FormMenuOptions, FormSettings } from '../type'

export type TalkToBackgroundProps = {
  portName?: string
  message: {
    type: string
    prompt: string
  }
}

export type TalkToBackgroundFunc = (props: TalkToBackgroundProps) => Promise<any>

export type RewriteCtxType = {
  settings?: FormSettings
  menuOptions?: FormMenuOptions
  selectedText: string
  talkToBackground?: TalkToBackgroundFunc
  mode?: 'browser' | 'playground'
  // 👇 Used to get the container which we can use to insert the editors right below it. It's for the adaptive position.
  endContainer?: HTMLElement | null
}

export const RewriteCtx = createContext<RewriteCtxType>({
  // settings: defaultSettings, // Cannot use defaultSettings here, there will be an error
  settings: {} as FormSettings,
  // menuOptions: defaultMenuOptionsForm, // Same as defaultSettings
  menuOptions: {} as FormMenuOptions,
  selectedText: '',
  mode: 'playground',
  talkToBackground: {} as TalkToBackgroundFunc,
  endContainer: null
})
