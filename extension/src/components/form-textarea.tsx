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
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field, fieldState: { error } }) => (
        <FormItem
          className={cn(
            'flex gap-x-4 items-start',
            {
              'flex-wrap gap-y-2': props.wrap,
              'opacity-50': props.disabled
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
          <FormControl>
            <Textarea
              {...field}
              placeholder={props.placeholder ?? ''}
              disabled={props.disabled}
              className="resize-none"
              rows={props.rows ?? 3}
              onFocus={props.onFocus}
            />
          </FormControl>
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  )
}
