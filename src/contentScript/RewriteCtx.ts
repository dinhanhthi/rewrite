import { createContext } from 'react'

type RewriteCtxType = {
  selected?: string
}

export const RewriteCtx = createContext<RewriteCtxType>({
  selected: ''
})
