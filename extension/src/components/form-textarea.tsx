import { Info, TriangleAlert } from 'lucide-react'
import React from 'react'
import { Control } from 'react-hook-form'
import { cn } from '../helpers/helpers'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form'
import { Textarea } from './ui/textarea'
import TooltipThi from './ui/tooltip-thi'

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
    wrap,
    onFocus
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem
          className={cn(
            'flex gap-x-4 items-start',
            {
              'flex-wrap gap-y-2': wrap,
              'opacity-50': disabled
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
                  <FormDescription className={!wrap ? 'hidden' : ''}>{description}</FormDescription>
                  {!wrap && (
                    <TooltipThi content={description}>
                      <Info className="w-4 h-4 opacity-60 hover:opacity-100" />
                    </TooltipThi>
                  )}
                </>
              )}
            </div>
          )}
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              className="resize-none"
              rows={rows}
              onFocus={onFocus}
            />
          </FormControl>
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  )
}
