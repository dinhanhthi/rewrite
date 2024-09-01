import * as React from 'react'

import { cn } from '@/src/helpers/helpers'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  noDeco?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, noDeco, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background':
              !noDeco,
            'outline-none': noDeco
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
