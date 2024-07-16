import { createContext } from 'react'

type RewriteCtxType = {
  selected?: string
  mode?: 'browser' | 'playground'
}

export const RewriteCtx = createContext<RewriteCtxType>({
  selected: '',
  mode: 'playground'
})
