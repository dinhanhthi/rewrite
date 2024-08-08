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
  const {
    control,
    name,
    label,
    placeholder = '',
    type = 'text',
    wrap,
    className,
    description,
    labelClassName,
    onFocus,
    disabled
  } = props
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem
            className={cn(
              'flex flex-row items-center gap-x-4',
              {
                'flex-wrap gap-y-2': wrap
              },
              className
            )}
          >
            {(!!label || !!description) && (
              <div
                className={cn('flex', {
                  'flex-row gap-2 items-center': !wrap,
                  'flex-col gap-0.5': wrap
                })}
              >
                {!!label && (
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel className={cn('text-base whitespace-nowrap', labelClassName)}>
                      {label}
                    </FormLabel>
                    {!!error?.message && (
                      <TooltipThi content={error.message}>
                        <TriangleAlert className="w-4 h-4 text-destructive" />
                      </TooltipThi>
                    )}
                  </div>
                )}
                {!!description && (
                  <>
                    <FormDescription className={!wrap ? 'hidden' : ''}>
                      {description}
                    </FormDescription>
                    {!wrap && (
                      <TooltipThi content={description}>
                        <Info className="w-4 h-4 opacity-60 hover:opacity-100" />
                      </TooltipThi>
                    )}
                  </>
                )}
              </div>
            )}

            <div className="flex flex-row items-center w-full gap-2 flex-nowrap">
              <div className="relative w-full">
                {type === 'password' && (
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
                    type={type === 'password' && showPassword ? 'text' : type}
                    placeholder={placeholder}
                    onChange={e => {
                      field.onChange(e)
                      props.onChange?.(e.target.value)
                    }}
                    value={field.value}
                    className="flex-1 min-w-0"
                    autoComplete={type === 'password' ? 'current-password' : undefined}
                    onFocus={onFocus}
                    disabled={disabled}
                  />
                </FormControl>
              </div>
              {type === 'password' && (
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
