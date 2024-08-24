import { createContext } from 'react'

export type TalkToBackgroundProps = {
  portName?: string
  message: {
    type: string
    prompt: string
    text: any
  }
}

type TalkToBackgroundFunc = (props: TalkToBackgroundProps) => Promise<any>

type RewriteCtxType = {
  selected?: string
  talkToBackground?: TalkToBackgroundFunc
  mode?: 'browser' | 'playground'
}

export const RewriteCtx = createContext<RewriteCtxType>({
  selected: '',
  mode: 'playground',
  talkToBackground: {} as TalkToBackgroundFunc,
})
