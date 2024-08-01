import React from 'react'
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
import { Textarea } from './ui/textarea'

type FormTextareaProps = {
  control: Control<any, any>
  name: string
  label?: string
  labelClassName?: string
  description?: string
  placeholder?: string
  wrap?: boolean
  className?: string
  disabled?: boolean
  rows?: number
  onFocus?: () => void
}

export default function FormTextarea(props: FormTextareaProps) {
  const {
    control,
    name,
    label,
    placeholder = '',
    description,
    className,
    labelClassName,
    disabled,
    rows = 3,
    onFocus
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex items-center gap-x-4',
            {
              'flex-wrap gap-y-2': props.wrap,
              'opacity-50': disabled
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
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              className="resize-none"
              rows={rows}
              onFocus={onFocus}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
