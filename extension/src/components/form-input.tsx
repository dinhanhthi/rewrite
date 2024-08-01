import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { Control } from 'react-hook-form'
import { cn } from '../helpers/helpers'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'

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
}

export default function FormInput(props: FormInputProps) {
  const {
    control,
    name,
    label,
    placeholder = '',
    type = 'text',
    className,
    description,
    labelClassName,
    onFocus
  } = props
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-center gap-x-4',
            {
              'flex-wrap gap-y-2': props.wrap
            },
            className
          )}
        >
          {(!!label || !!description) && (
            <div className="flex flex-col gap-0.5">
              {!!label && (
                <FormLabel className={cn('text-base whitespace-nowrap', labelClassName)}>
                  {label}
                </FormLabel>
              )}
              {!!description && <FormDescription>{description}</FormDescription>}
            </div>
          )}
          <FormControl>
            <div className="flex flex-row items-center w-full gap-2 flex-nowrap">
              <Input
                type={type === 'password' && showPassword ? 'text' : type}
                placeholder={placeholder}
                onChange={field.onChange}
                value={field.value}
                className="flex-1 min-w-0"
                autoComplete={type === 'password' ? 'current-password' : undefined}
                onFocus={onFocus}
              />
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
