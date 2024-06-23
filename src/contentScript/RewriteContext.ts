import { createContext } from 'react'

type RewriteContextType = {
  selected?: string
}

export const RewriteContext = createContext<RewriteContextType>({
  selected: ''
})
