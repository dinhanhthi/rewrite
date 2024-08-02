import React from 'react'
import { Control } from 'react-hook-form'
import { cn } from '../helpers/helpers'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from './ui/form'
import { Switch, SwitchSize } from './ui/switch'
import TooltipThi from './ui/tooltip-thi'

type FormSwitchProps = {
  className?: string
  control: Control<any, any>
  name: string
  label?: string
  labelClassName?: string
  description?: string
  size?: SwitchSize
  tooltip?: string
  controlComesFirst?: boolean
}

export default function FormSwitch(props: FormSwitchProps) {
  const {
    control,
    className,
    name,
    label,
    description,
    size = 'default',
    labelClassName,
    tooltip,
    controlComesFirst
  } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col gap-1', className)}>
          <TooltipThi content={tooltip}>
            <div className={cn('flex items-center gap-3', {
              'flex-row-reverse justify-end': controlComesFirst
            })}>
              {!!label && (
                <FormLabel className={cn('text-base', labelClassName)}>{label}</FormLabel>
              )}
              <FormControl>
                <Switch {...field} checked={field.value} onCheckedChange={field.onChange} size={size} />
              </FormControl>
            </div>
          </TooltipThi>
          {!!description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  )
}
