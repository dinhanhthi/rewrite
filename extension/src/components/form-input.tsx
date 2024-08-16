import { Eye, EyeOff, Info, TriangleAlert } from 'lucide-react'
import React, { useState } from 'react'
import { Control } from 'react-hook-form'
import { cn } from '../helpers/helpers'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import TooltipThi from './ui/tooltip-thi'

type FormInputProps = {
  control: Control<any, any>
  name: string
  label?: string
  labelClassName?: string
  placeholder: string
  type?: string
  wrap?: boolean
  className?: string
  description?: string
  onFocus?: () => void
  disabled?: boolean
  onChange?: (value: string) => void
}

export default function FormInput(props: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem
            className={cn(
              'flex flex-row items-center gap-x-4',
              {
                'flex-wrap gap-y-2': props.wrap
              },
              props.className
            )}
          >
            {(!!props.label || !!props.description) && (
              <div
                className={cn('flex', {
                  'flex-row gap-2 items-center': !props.wrap,
                  'flex-col gap-0.5': props.wrap
                })}
              >
                {!!props.label && (
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel className={cn('text-base whitespace-nowrap', props.labelClassName)}>
                      {props.label}
                    </FormLabel>
                    {!!error?.message && (
                      <TooltipThi content={error.message}>
                        <TriangleAlert className="w-4 h-4 text-destructive" />
                      </TooltipThi>
                    )}
                  </div>
                )}
                {!!props.description && (
                  <>
                    <FormDescription className={!props.wrap ? 'hidden' : ''}>
                      {props.description}
                    </FormDescription>
                    {!props.wrap && (
                      <TooltipThi content={props.description}>
                        <Info className="w-4 h-4 opacity-60 hover:opacity-100" />
                      </TooltipThi>
                    )}
                  </>
                )}
              </div>
            )}

            <div className="flex flex-row items-center w-full gap-2 flex-nowrap">
              <div className="relative w-full">
                {props.type === 'password' && (
                  <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    style={{ display: 'none' }}
                  ></input>
                )}
                <FormControl>
                  <Input
                    {...field}
                    type={props.type === 'password' && showPassword ? 'text' : props.type}
                    placeholder={props.placeholder ?? ''}
                    onChange={e => {
                      field.onChange(e)
                      props.onChange?.(e.target.value)
                    }}
                    value={field.value}
                    className="flex-1 min-w-0"
                    autoComplete={props.type === 'password' ? 'current-password' : undefined}
                    onFocus={props.onFocus}
                    disabled={props.disabled}
                  />
                </FormControl>
              </div>
              {props.type === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 text-gray-600"
                >
                  {!showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              )}
            </div>
          </FormItem>
        )
      }}
    />
  )
}
